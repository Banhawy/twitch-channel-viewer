import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactCardFlip from 'react-card-flip';
import Front from '../Card/Front.jsx';
import Back from '../Card/Back.jsx';

class Twitch extends Component {
    constructor (props) {
        super(props);
        this.state = {
            twitchData: null,
            isFlipped: false,
            requestFailed: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount () {
        this.getStreamer();
    }
    //When card is clicked flip to other side
    handleClick(e) {
    e.preventDefault();
    this.setState({ isFlipped: !this.state.isFlipped });
    }
    // Takes in an image url sting with variable width and height and injects them in url string
    setImg(url, width, height) {
      return url.replace(/{width}/i, width).replace(/{height}/i, height);
    }
    // Api call to get streamer's game data: game name and image
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
                if(d.data){
                this.setState({
                  gameName : d.data[0]['name'],
                  gameImg : d.data[0]['box_art_url']
                })
                }
              })
    }
    //Api call to get streamer's stream, set status, title, stream thumbnail, and viewer count
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
                  if (d.data){
                    this.setState({
                      streamerData: d,
                      online : d.data.length>0
                    })
                  }
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
    // Api call to get and set streamer name, description, and profile image
    getStreamer(){
       fetch(`https://api.twitch.tv/helix/users?login=${this.props.streamer}`, {
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
      const displayName = this.state.twitchData.data[0]['display_name'];
      const online = this.state.online ;
      const status = online ? "Online!" : "Offline";
      const description = this.state.twitchData.data[0]['description'];
      const profileImage = this.state.profileImage ? this.setImg(this.state.profileImage, 300, 300) : '';
      const streamImage = this.state.streamImage ? this.setImg(this.state.streamImage, 300, 300) : '';
      const gameImg = this.state.gameImg ? this.setImg(this.state.gameImg, 200, 400) : '';
      const liveStream = `https://player.twitch.tv/?channel=${this.props.streamer}`;
  
        return (
          <div onClick={this.handleClick} className="card-flip">
            <ReactCardFlip isFlipped={this.state.isFlipped}>
              <Front key="front"
                    online={online}
                    streamImage={streamImage}
                    profileImage={profileImage}
                    displayName={displayName}
                    status={status}
                    description={description}
                    >
              </Front>
      
              <Back key="back"
                    online={online}
                    liveStream={liveStream}
                    profileImage={profileImage}>
              </Back>
            </ReactCardFlip>
            </div>
        )
    }
}


export default Twitch;