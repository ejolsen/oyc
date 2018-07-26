import React, {Component} from 'react';
import axios from 'axios';
import DocTools from '../Components/Admin/Admin_Sub_Comp/DocTools';


class Sandbox extends Component {
    constructor() {
        super();

        this.state = {
        };
    };

    componentDidMount() {
        axios.get()
    };
  
  render() {
    return (
        <div>
           <DocTools/> 
        </div>
        
    )
  };

};
  
export default Sandbox






