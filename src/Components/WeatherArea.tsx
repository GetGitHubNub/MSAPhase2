import Button from '@material-ui/core/Button';
import * as React from 'react';

interface IState{

    error: any,
    isLoading: any, 
    location: any, 
    selectWeather:any,
    time: any,
    weather:any[]
  
}

export default class WeatherArea extends React.Component<{}, IState> {
  constructor(props:any){
    super(props)
    this.state = {
        
        error: null,     
        isLoading: false, 
        location: "",
        selectWeather: "",
        time: "",
        weather:[]
          
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  public handleChange(event: any) {
    this.setState({location: event.target.value});
    
  }

  public handleSubmit(event: any) {
    const city = this.state.location;
    const api = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=8e1240fe1c9cb0b1aa6913b72827d210';  
     
    fetch(api)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('API error');
      }
    })
    .then(data => this.setState({weather: data.list, isLoading: false}))
    .catch(error => this.setState({error, isLoading: false}))
    event.preventDefault();
  }

  public render() {
    const {weather, isLoading, error} = this.state;

    if(error){

        alert("The location you typed does not exist");
        location.reload();             
    }

    if(isLoading){
      return<p>Loading ...</p>;
    }

    return (
        <div className= "centreText">
        <h2>Weather and Temperature </h2>
        <form onSubmit={this.handleSubmit}>
        <label>
            Location: 
            <input type="text" placeholder="Enter the Location" value={this.state.location} onChange={this.handleChange} /> 
        </label>
        
        <Button variant="contained" type="submit"  size="medium" style={{maxWidth: '40px', maxHeight: '40px', minWidth: '10px', minHeight: '10px'}} > Submit </Button>
        
        {/* onClick = {this.searchByDate} */}

        </form>
        <div className="showWeather">
        <table className="table">

        <div className="row meme-list-table">
            <table className="table table-striped">
                <tbody>
                    {/* {this.createTable()} */}
                </tbody>
            </table>
        </div>

        <tbody>
            <tr><th> Date </th><th> Description </th><th> Temperature Range </th></tr>
            {
              weather.map((hit) =>
              
                <tr key={hit}><td>{hit.dt_txt}</td><td><img src={"https://openweathermap.org/img/w/" + hit.weather[0].icon + ".png"}/> {hit.weather[0].description} </td>
                <td><img src="https://imgur.com/19uj8tj.jpg"  height="25" width="25"/>{Math.round((hit.main.temp_min -273.15)*100) / 100}°C - {Math.round((hit.main.temp_max  -273.15) * 100) / 100}°C<br/></td></tr>
              )}

          </tbody>
          </table>
        </div>
        </div>

    );
}
    
    // Construct table using weather search
	// private createTable() {
    //     const table:any[] = []
    //     const weatherList = this.state.weather
    //     if (weatherList == null) {
    //         return table
    //     }

    //     for (let i = 0; i < weatherList.length; i++) {
    //         const children = []
    //         const weather = weatherList[i]
    //         children.push(<td key={"id" + i}>{weather.id}</td>)
    //         children.push(<td key={"name" + i}>{weather.title}</td>)
    //         children.push(<td key={"tags" + i}>{weather.tags}</td>)
    //         table.push(<tr key={i+""} id={i+""} onClick= {this.selectRow.bind(this, i)}>{children}</tr>)
    //     }
    //     return table
    // }

//     // Weather selection handler to display selected weather in details component
//     private selectRow(index: any) {
//         const selectedWeather = this.state.weather[index]
//         if (selectedWeather != null) {
//             this.state.selectWeather(selectedWeather)
//         }
//     }

//     // Search weather by tag
//     private searchByTag() {
//         const textBox = document.getElementById("search-tag-textbox") as HTMLInputElement
//         if (textBox === null) {
//             return;
//         }
//     }

// }
}