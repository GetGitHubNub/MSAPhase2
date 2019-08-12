import Close from '@material-ui/icons/Close'
import Star from '@material-ui/icons/Star'
import StarBorder from '@material-ui/icons/StarBorder'
import * as React from 'react'

interface IState{
    toDoList: any
}

export default class VideoList extends React.Component<{}, IState>{
    public constructor(props:any){
        super(props);
        this.state = {
            toDoList: []
        }
        this.updateList();
    }

    public deleteVideo = (id:any) => {
        fetch("https://msaphase2api.azurewebsites.net/api/Videos/"+id,{
            method:'DELETE'
        }).then(() => {
            this.updateList()
        })
    }

    public updateList = () => {
        fetch('https://msaphase2api.azurewebsites.net/api/Videos',{
            method:'GET'
        }).then((ret:any) => {
            return ret.json();
        }).then((result:any) => {
            const output:any[] = []
            result.forEach((video:any) => {
                const row = (<tr>
                    <td className="align-middle" onClick={() => this.handleLike(video)}>{video.isFavourite === true?<Star/>:<StarBorder/>}</td>
                    <td className="align-middle video-list-close"><button onClick={() => this.deleteVideo(video.videoId)}><Close/></button></td>
                </tr>)
                if(video.isFavourite){
                    output.unshift(row);
                }else{
                    output.push(row);
                }
            });
            this.setState({toDoList:output})
        })
    }

    public handleLike = (video:any) => {
        const toSend = [{
            "from":"",
            "op":"replace",
            "path":"/isFavourite",
            "value":!video.isFavourite,
        }]
        fetch("https://msaphase2api.azurewebsites.net/api/Videos/update/"+video.videoId, {
            body:JSON.stringify(toSend),
            headers: {
              Accept: "text/plain",
              "Content-Type": "application/json-patch+json"
            },
            method: "PATCH"
          }).then(() => {
              this.updateList();
          })
    }

    public render() {
        return (
            <div className="video-list">
                <h1 className="play-heading"><span className="red-heading">play</span>video</h1>
                <table className="table">
                    {this.state.toDoList}
                </table>
            </div>
        )
    }
}