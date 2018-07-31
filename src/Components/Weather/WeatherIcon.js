import './weather.css';
import React, {Component} from 'react';
import axios from 'axios';
import ClearIcon from '../../images/weatherSVG/clear.svg';
import CloudIcon from '../../images/weatherSVG/cloudy.svg';
import RainIcon from '../../images/weatherSVG/rain.svg';
import ThunderIcon from '../../images/weatherSVG/thunder.svg';
import SnowIcon from '../../images/weatherSVG/snow.svg';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Paper from 'material-ui/Paper';
import Weather from './Weather';



class WeatherIcon extends Component {
    constructor(){
        super()
        this.state = {
            temp: '',
            skyCond: '',
            open: false
        }
    };

    componentDidMount() {
        axios.get('http://api.openweathermap.org/data/2.5/weather?id=4499379&appid='+process.env.REACT_APP_WX_API)
        .then(res => {
            console.log(res.data)
            this.setState({
                temp: Math.round((res.data.main.temp-273.15)*9/5+32),
                skyCond: res.data.weather[0].main
            })
        })
    };

    handleClick = (event) => {
        event.preventDefault();
        this.setState({
          open: true,
          anchorEl: event.currentTarget
        });
    };

    handleRequestClose = () => {
        this.setState({
          open: false,
        });
    };
    

    render() {

        return (
            <div className='weather-container'>
            <button   onClick={this.handleClick} className='weather-box'>
                <div className='weather-top'>
                    <div className='high-low'>
                        <div className='wx-high'>80</div>
                        <div className='wx-slash'>/</div>
                        <div className='wx-low'>74</div>
                    </div>
                    <div className='weather-icons'>
                        <div className='weather-icons'>
                            {
                                this.state.skyCond === "Clear"
                                ?
                                <img src={ClearIcon}/>
                                :
                                null
                            }
                        </div>
                        <div className='weather-icons'>
                            {
                                this.state.skyCond === 'Clouds'
                                ?
                                <img src={CloudIcon}/>
                                :
                                null
                            }
                        </div>
                        <div className='weather-icons'>
                            {
                                this.state.skyCond === 'Rain'
                                ?
                                <img src={RainIcon}/>
                                :
                                null
                            }
                        </div>
                        <div className='weather-icons'>
                            {
                                this.state.skyCond === 'Drizzle'
                                ?
                                <img src={RainIcon}/>
                                :
                                null
                            }
                        </div>
                        <div className='weather-icons'>
                            {
                                this.state.skyCond === 'Thunderstorm'
                                ?
                                <img src={ThunderIcon}/>
                                :
                                null
                            }
                        </div>
                        <div className='weather-icons'>
                            {
                                this.state.skyCond === "Snow"
                                ?
                                <img src={SnowIcon}/>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
               <div className='weather-bottom'>
                    <div className='wx-temp'>
                        {this.state.temp}°
                    </div>
               </div>
            </button>
            <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleRequestClose}
                animation={PopoverAnimationVertical}
                style={{
                    width: '600px',
                    height: '600px',
                    padding: '0px'
                }}>
            
                <Paper 
                    style={{
                        width: '650px', 
                        height: '650px', 
                        padding: '0px, 0px', 
                        boxShadow: "none"
                    }}>
                    <Weather/>
                </Paper>
            </Popover>
            </div>
        );
    };
};

export default WeatherIcon