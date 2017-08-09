import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import ResultList from './ResultList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import $ from 'jquery';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      search: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleInputChange(e) {
    this.setState({ 
      value: e.target.value
    });
  };

  handleSearchClick() {
    this.setState({search: this.state.value});

    fetch('https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyAjgZ00458ELrs43Qe3zhFRTWiteFzytZ8',{
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
      })
    })
    .then((res) => console.log(res))
    .catch((error) => ('fetch get failure', error));
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <h1>Google Querier</h1>
          <TextField id='searchBar' onChange={this.handleInputChange} value={this.state.value} hintText='Search'/>
          <div><FlatButton id='searchButton' label="Google Search" primary={true} onClick={()=>this.handleSearchClick()}/></div>
          <Map searchValue={this.state.search}/>
          <ResultList />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
