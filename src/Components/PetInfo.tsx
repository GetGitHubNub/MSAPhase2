import * as React from "react";
import Modal from 'react-responsive-modal';

interface IProps {
    currentPet: any
}

interface IState {
    open: boolean
}

export default class MemeDetail extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props)   
        this.state = {
            open: false
        }

        this.updatePet = this.updatePet.bind(this)
    }

    public render() {
        const currentPet = this.props.currentPet
        const { open } = this.state;
		return (
			<div className="container pet-wrapper">
                <div className="row pet-heading">
                    <b>{currentPet.title}</b>&nbsp; ({currentPet.tags})
                </div>
                <div className="row pet-date">
                    {currentPet.uploaded}
                </div>
                <div className="row pet-img">
                    <img src={currentPet.url}/>
                </div>
                
                <div className="row pet-done-button">
                    <div className="btn"                        onClick={this.downloadPet.bind(this, currentPet.url)}>Download </div>
                    <div className="btn btn-primary btn-action" onClick={this.onOpenModal}>Edit </div>
                    <div className="btn btn-primary btn-action" onClick={this.deletePet.bind(this, currentPet.id)}>Delete </div>
                </div>
                <Modal open={open} onClose={this.onCloseModal}>
                    <form>
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" className="form-control" id="meme-edit-title-input" placeholder="Enter Title"/>
                            <small className="form-text text-muted">You can edit any details later</small>
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <input type="text" className="form-control" id="meme-edit-tag-input" placeholder="Enter Tag"/>
                            <small className="form-text text-muted">Category is used for search</small>
                        </div>
                        <button type="button" className="btn" onClick={this.updatePet}>Save</button>
                    </form>
                </Modal>
            </div>
		);
    }

    // Modal Open
    private onOpenModal = () => {
        this.setState({ open: true });
	  };
    
    // Modal Close
    private onCloseModal = () => {
		this.setState({ open: false });
	};

    // Open meme image in new tab
    private downloadPet(url: any) {
        window.open(url);
    }

    // DELETE meme
    private deletePet(id: any) {
        const url = "http://phase2apitest.azurewebsites.net/api/meme/" + id

		fetch(url, {
			method: 'DELETE'
		})
        .then((response : any) => {
			if (!response.ok) {
				// Error Response
				alert(response.statusText)
			}
			else {
              location.reload()
			}
		  })
    }

    // PUT meme
    private updatePet(){
        const titleInput = document.getElementById("pet-edit-title-input") as HTMLInputElement
        const tagInput = document.getElementById("pet-edit-tag-input") as HTMLInputElement

        if (titleInput === null || tagInput === null) {
			return;
		}

        const currentPet = this.props.currentPet
        const url = "http://phase2apitest.azurewebsites.net/api/meme/" + currentPet.id
        const updatedTitle = titleInput.value
        const updatedTag = tagInput.value
		fetch(url, {
			body: JSON.stringify({
                "height": currentPet.height,
                "id": currentPet.id,
                "tags": updatedTag,
                "title": updatedTitle,
                "uploaded": currentPet.uploaded,
                "url": currentPet.url,
                "width": currentPet.width
            }),
			headers: {'cache-control': 'no-cache','Content-Type': 'application/json'},
			method: 'PUT'
		})
        .then((response : any) => {
			if (!response.ok) {
				// Error State
				alert(response.statusText + " " + url)
			} else {
				location.reload()
			}
		  })
    }
}