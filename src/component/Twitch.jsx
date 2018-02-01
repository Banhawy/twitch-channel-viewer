import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
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
        this.getStreamer();
    }
    
    setImg(url, width, height) {
      return url.replace(/{width}/i, width).replace(/{height}/i, height);
    }
    
    getGame(id) {
      fetch(`https://api.twitch.tv/helix/games?id=${id}`, {
              method: 'GET',
              headers: new Headers({
                'Client-ID': 'dg02z8hegynkveisuu555wxuxr885j'
              })})
              .then(response => {
                return response.json();
              })
              .then(d => {
                this.setState({
                  gameName : d.data[0]['name'],
                  gameImg : d.data[0]['box_art_url']
                })
              })
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
                  if (this.state.online) {
                  this.setState({
                    streamTitle: d.data[0]['title'],
                    streamImage: d.data[0]['thumbnail_url'],
                    viewerCount : d.data[0]['viewer_count'],
                    gameId: d.data[0]['game_id']
                  })
                  this.getGame(this.state.gameId)
                }
                },
                () => {
                  this.setState({
                    requestFailed: true
                  });
                }
              )
    }
    
    getStreamer(){
       fetch(`https://api.twitch.tv/helix/users?login=imaqtpie`, {
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
                    twitchData: d,
                    displayName: d.data[0]['display_name'],
                    description: d.data[0]['description'],
                    profileImage: d.data[0]['profile_image_url'],
                    streamId : d.data[0]["id"]
                  })
        },
        () => {
          this.setState({
            requestFailed: true
          });
        }
      )
      .then(id => { 
        this.getStream(this.state.streamId);
        });
    }
    
    render () {
      
      if (this.state.requestFailed) return <p>Failed</p>;
      if (!this.state.twitchData) return <p>No answer</p>;
        return (
            <div>
                <h1>{this.state.twitchData.data[0]['display_name']}</h1>
                <h2>{this.state.online ? "Online!" : "Offline"}</h2>
                <h1>{this.state.twitchData.data[0]['description']}</h1>
                {this.state.gameImg?
                <img src={this.setImg(this.state.gameImg, 300, 600)} alt="..." />
                  :
                  <br/>
                }
            </div>
        )
    }
}

export default Twitch