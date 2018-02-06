import React, { Component } from 'react';
import FaTwitch from 'react-icons/lib/fa/twitch';
import FaExchange from 'react-icons/lib/fa/exchange';

class Back extends Component {
  render() {
    const bottomContent = <div className="user">
                              <div className="user">
                                      {this.props.online ?
                                      <div>
                                      <h5>Playing: {this.props.gameName}</h5>
                                      <span>Current Viewers: {this.props.viewerCount}</span>
                                      </div>
                                      : 
                                      <span>Total Views: {this.props.totalViews}</span>
                                      }
                              </div>
                              <div className="icons-bot">
                              <a href={this.props.user_url} target="_blank">
                                  <FaTwitch
                                  style={{width: '3rem'}}/>
                              </a>
                              <FaExchange
                              onClick={this.props.onClick}
                              style={{width: '3rem'}}/>
                              </div>
                          </div>;
    const liveStreamDiv = this.props.online?
                <div className="content"  key={this.props.key} >
                <iframe 
                  title="liveStream"
                  src={this.props.liveStream}
                  height="300"
                  width="300"
                  scrolling="true"
                  frameborder="1"
                  allowfullscreen="true">
                </iframe>
                {bottomContent}
                </div>
                  :
                <div className="content" key={this.props.key} >
                  <img src={this.props.profileImage} alt="User Profile Pic" />
                  {bottomContent}
                </div>;
    return (liveStreamDiv)
  }
}

export default Back;