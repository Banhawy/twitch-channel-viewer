import React, { Component } from 'react';

// const apiUrl = channel => `https://wind-bow.gomix.me/twitch-api/channels/${channel}`

// var myHeaders = new Headers();

// myHeaders.append('Content-Type', 'text/xml');

// var myInit = { method: 'GET',
//                headers: myHeaders,
//                mode: 'cors',
//                cache: 'default' };

class Twitch extends Component {
    constructor (props) {
        super(props);
        this.state = {
            requestFailed: false
        }
    }
    componentDidMount () {
        fetch('https://wind-bow.gomix.me/twitch-api/channels/freecodecamp')
        .then(response => {
        if (!response.ok) {
          throw Error("Network request failed");
        }
        return response;
      })
      .then(d => d.json())
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