import React, { Component } from 'react';
import FaTwitch from 'react-icons/lib/fa/twitch';
import FaExchange from 'react-icons/lib/fa/exchange';

class Back extends Component {
  render() {
    const bottomContent = <div className="content">
                              <div className="user">
                                      {this.props.online ?
                                      <span>Current Viewers: {this.props.viewerCount}</span>
                                      : 
                                      <span>Total Views: {this.props.totalViews}</span>
                                      }
                              </div>
                              <p className="description text-center">
                              <div className="twitch-icon">
                              <a href={this.props.user_url} target="_blank">
                                  <FaTwitch
                                  style={{width: '3rem'}}/>
                              </a>
                              <FaExchange
                              style={{width: '3rem'}}/>
                              </div>
                              </p>
                          </div>;
    const liveStreamDiv = this.props.online?
                <div key={this.props.key} >
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
                <div key={this.props.key} >
                  <img src={this.props.profileImage} alt="User Profile Pic" />
                  {bottomContent}
                </div>;
    return (liveStreamDiv)
  }
}

export default Back;