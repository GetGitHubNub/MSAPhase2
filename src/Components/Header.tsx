// import AddCircle from '@material-ui/icons/AddCircle'

import * as React from 'react';
import DateAppLogo from './DateAppLogo.png';

// current date
interface IState{

    dateInput: any,
    datePickerIsOpen: any,
    startDate: any,
}

export default class Header extends React.Component<{},IState> {
    
    public dateValue:Date= new Date();
    
    public constructor(props:any){
        super(props);
        this.state = {

            dateInput: "",
            datePickerIsOpen:false,
            startDate: new Date(),
        }
        this.handleChange   = this.handleChange.bind(this);
        this.openDatePicker = this.openDatePicker.bind(this);
    }

    public handleChange(dateValue: Date) {
        this.setState({
          startDate: dateValue
        });
      }

    public openDatePicker() {
        this.setState({
          datePickerIsOpen: !this.state.datePickerIsOpen,
        });
      };

    public render() {
        // const { open } = this.state;
        return (
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-3 justify-content-center align-self-center">
                            <img src= { DateAppLogo } height='100'/>&nbsp; React App for MSA 2019 Phase 2 &nbsp;
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
