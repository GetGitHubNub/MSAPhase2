import * as React from "react";

interface IProps {
    pets: any[],
    selectNewPet: any,
    searchByTag: any
}

export default class PetList extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props)   
        this.searchByTag = this.searchByTag.bind(this)
    }

	public render() {
		return (
			<div className="container meme-list-wrapper">
                <div className="row meme-list-heading">
                    <div className="input-group">
                        <input type="text" id="search-tag-textbox" className="form-control" placeholder="Search By Tags" />
                        <div className="input-group-append">
                            <div className="btn btn-outline-secondary search-button" onClick = {this.searchByTag}>Search</div>
                        </div>
                    </div>  
                </div>
                <div className="row meme-list-table">
                    <table className="table table-striped">
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </table>
                </div>
            </div>
		);
    }

    // Construct table using meme list
	private createTable() {
        const table:any[] = []
        const petList = this.props.pets
        if (petList == null) {
            return table
        }

        for (let i = 0; i < petList.length; i++) {
            const children = []
            const pet = petList[i]
            children.push(<td key={"id" + i}>{pet.id}</td>)
            children.push(<td key={"name" + i}>{pet.title}</td>)
            children.push(<td key={"tags" + i}>{pet.tags}</td>)
            table.push(<tr key={i+""} id={i+""} onClick= {this.selectRow.bind(this, i)}>{children}</tr>)
        }
        return table
    }
    
    // Meme selection handler to display selected meme in details component
    private selectRow(index: any) {
        const selectedPet = this.props.pets[index]
        if (selectedPet != null) {
            this.props.selectNewPet(selectedPet)
        }
    }

    // Search meme by tag
    private searchByTag() {
        const textBox = document.getElementById("search-tag-textbox") as HTMLInputElement
        if (textBox === null) {
            return;
        }
        const tag = textBox.value 
        this.props.searchByTag(tag)  
    }
}