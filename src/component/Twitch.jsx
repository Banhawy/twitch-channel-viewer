import React, { Component } from 'react';
import channels from '../variables/streamers.jsx';

class Twitch extends Component {
    constructor (props) {
        super(props);
        this.state = {
            twitchData: null,
            requestFailed: false
        }
    }
    componentDidMount () {
        this.getData();
    }
    
    getData(){
       fetch(`https://api.twitch.tv/helix/streams?user_login=freecodecamp`, {
              method: 'GET',
              headers: new Headers({
                'Client-ID': 'dg02z8hegynkveisuu555wxuxr885j'
              })})
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed");
        }
        return response.json();
      })
      .then(
        d => {
          this.setState({
            twitchData: d
          });
        },
        () => {
          this.setState({
            requestFailed: true
          });
        }
      );
    }
    
    render () {
      if (this.state.requestFailed) return <p>Failed</p>;
      if (!this.state.twitchData) return <p>No answer</p>;
        return (
            <div>
                <h1> Success!  </h1>
                <h2>Maybe..</h2>
            </div>
        )
    }
}

export default Twitch