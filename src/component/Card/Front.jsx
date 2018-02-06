import React, { Component } from 'react';
import Card from './Card.jsx';

class Front extends Component {
  render() {
    return (
             <div key={this.props.key} className="card-item" >
                <Card 
                  profileImage={this.props.online? this.props.streamImage : this.props.profileImage}
                  displayName={this.props.displayName}
                  status={this.props.status}
                  online={this.props.online}
                  description={this.props.description}
                  onClick={this.props.onClick}
                />
            </div>
      )
  }
  
}

export default Front;