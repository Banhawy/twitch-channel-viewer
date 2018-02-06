import React, { Component } from 'react';

class Back extends Component {
  render() {
    const liveStreamDiv = this.props.online?
                <div key={this.props.key} >
                <iframe 
                  src={this.props.liveStream}
                  height="300"
                  width="300"
                  scrolling="true"
                  frameborder="1"
                  allowfullscreen="true">
                </iframe>
                </div>
                  :
                <div key={this.props.key} >
                <img src={this.props.profileImage} alt="..." />
                </div>;
    return (liveStreamDiv)
  }
}

export default Back;