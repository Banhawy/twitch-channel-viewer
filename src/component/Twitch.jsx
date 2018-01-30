import React, { Component } from 'react';
//import channels from '../variables/streamers.jsx';

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
    
    getStream(id){
      fetch(`https://api.twitch.tv/helix/streams?user_id=${id}`, {
              method: 'GET',
              headers: new Headers({
                'Client-ID': 'dg02z8hegynkveisuu555wxuxr885j'
              })})
              .then(response => {
                return response.json();
              })
              .then (
                d => {
                  this.setState({
                    streamerData: d,
                    online : d.data.length>0
                  })
                },
                () => {
                  this.setState({
                    requestFailed: true
                  });
                }
              )
    }
    
    getData(){
       fetch(`https://api.twitch.tv/helix/users?login=freecodecamp`, {
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
                  })
          return d["data"][0]["id"];
        },
        () => {
          this.setState({
            requestFailed: true
          });
        }
      )
      .then(id => { 
        this.getStream(id);
        });
    }
    
    render () {
      if (this.state.requestFailed) return <p>Failed</p>;
      if (!this.state.twitchData) return <p>No answer</p>;
        return (
            <div>
                <h1>{this.state.twitchData.data[0]['display_name']}</h1>
                <h2>{this.state.twitchData.data[0]['description']}</h2>
                <h1>{this.state.online? "Online!" : "Offline"}</h1>
            </div>
        )
    }
}

export default Twitch