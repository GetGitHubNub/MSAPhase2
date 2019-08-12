import * as React from 'react';
import WeatherArea from 'src/Components/WeatherArea';
import Header from 'src/Components/Header';
import PetInfo from 'src/Components/PetInfo';
import PetList from 'src/Components/PetList';
import 'src/App.css'

// React Modal Import
import Modal from 'react-responsive-modal';
 
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

interface IState {
  
  currentPet:        any,
  isOpen:            boolean,
  pets:              any[],
  startDate:         Date,
  uploadFileList:    any,

}

class App extends React.Component<{}, IState>{

  public constructor(props: any) {
    super(props);
    this.state = {
      
      currentPet: {"id":0, "title":"Loading ","url":"","tag":"⚆ _ ⚆","uploaded":"","width":"0","height":"0"},
      isOpen:     false,
      pets:       [],
      startDate:  new Date(),
      uploadFileList: null,

    }

    this.fetchPets("")
		this.selectNewPet = this.selectNewPet.bind(this)
		this.handleFileUpload = this.handleFileUpload.bind(this)
		this.fetchPets = this.fetchPets.bind(this)
    this.uploadPet = this.uploadPet.bind(this)

    this.handleChange = this.handleChange.bind(this);

  }

	public render() {
		const { isOpen } = this.state;
		return (
		<div>
			<div className="header-wrapper">
				<div className="container header">
					<Header />
					<div className="btn btn-primary btn-action btn-add" onClick={this.onOpenModal}>Report Missing</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-7">
						<PetInfo currentPet={this.state.currentPet} />
					</div>
					<div className="col-5">
						<PetList pets={this.state.pets} selectNewPet={this.selectNewPet} searchByTag={this.fetchPets}/>
					</div>
				</div>
			</div>
			<Modal open={isOpen} onClose={this.onCloseModal}>
				<form>
					<div className="form-group">
						<label>Pet Type</label>
						<input type="text" className="form-control" id="pet-type-input" placeholder="Enter Type" />
						<small className="form-text text-muted">Type of pet is used for search</small>
					</div>
					<div className="form-group">
						<label>Pet Breed</label>
						<input type="text" className="form-control" id="pet-tag-input" placeholder="Enter Breed" />
						<small className="form-text text-muted">You can edit any details later</small>
					</div>
					<div className="form-group">
						<label>Image</label>
						<input type="file" onChange={this.handleFileUpload} className="form-control-file" id="pet-image-input" />
					</div>

					<button type="button" className="btn" onClick={this.uploadPet}>Upload</button>
				</form>
			</Modal>
      <WeatherArea />
		</div>
		);
	}

    private handleChange(date: Date) {
      this.setState({
       startDate: date
      });
    }

    // Modal open
	  private onOpenModal = () => {
		this.setState({ isOpen: true });
    };

    // Modal close
	private onCloseModal = () => {
		this.setState({ isOpen: false });
	};
	
	// Change selected meme
	private selectNewPet(newPet: any) {
		this.setState({
			currentPet: newPet
		})
	}

	// GET memes
	private fetchPets(tag: any) {
		let url = "http://MSAPhase2API.azurewebsites.net/api/pet"
		if (tag !== "") {
			url += "/tag?=" + tag
		}
        fetch(url, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(json => {
			let currentPet = json[0]
			if (currentPet === undefined) {
				currentPet = {"id":0, "title":"No Pets under that tag","url":"","tag":"try a different tag","uploaded":"","width":"0","height":"0"}
			}
			this.setState({
				currentPet,
				pets: json
			})
        });
	}

	// Sets file list
	private handleFileUpload(fileList: any) {
		this.setState({
			uploadFileList: fileList.target.files
		})
	}

	// POST meme
	private uploadPet() {
		const titleInput = document.getElementById("pet-title-input") as HTMLInputElement
		const tagInput = document.getElementById("pet-tag-input") as HTMLInputElement
		const imageFile = this.state.uploadFileList[0]

		if (titleInput === null || tagInput === null || imageFile === null) {
			return;
		}

		const title = titleInput.value
		const tag = tagInput.value
		const url = "http://MSAPhase2API.azurewebsites.net/api/pet/upload"

		const formData = new FormData()
		formData.append("Title", title)
		formData.append("Tags", tag)
		formData.append("image", imageFile)

		fetch(url, {
			body: formData,
			headers: {'cache-control': 'no-cache'},
			method: 'POST'
		})
        .then((response : any) => {
			if (!response.ok) {
				// Error State
				alert(response.statusText)
			} else {
				location.reload()
			}
		  })
	}
}

export default App;