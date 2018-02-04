import React, { Component } from 'react';
import logo from '../../assets/images/twitch-logo.png';
import '../../assets/styles/styles.css';

import Twitch from '../../component/Twitch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Twitch Streamers Hub</h1>
        </header>
          <div className="card-container">
            <Twitch streamer="dyrus"/>
          </div>
      </div>
    );
  }
}

export default App;