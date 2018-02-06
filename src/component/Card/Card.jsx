import React, { Component } from 'react';
import FaExchange from 'react-icons/lib/fa/exchange';

export class Card extends Component{
    render(){
        return (
            <div className="card-content">
                <div className="profileImage">
                    <img src={this.props.profileImage} alt="..."/>
                </div>
                <div className="content">
                    <div className="user">
                            <h4 className="title">{this.props.displayName}</h4>
                                <div className={this.props.online ? "online" : "offline"}></div>
                                <h5>{this.props.status}</h5>
                    </div>
                    <p className="description text-center">
                        {this.props.description}
                    </p>
                </div>
                <div className="icons-bot">
                <FaExchange
                onClick={this.props.onClick}
                style={{width: '3rem'}}/>
                </div>
            </div>
        );
    }
}

export default Card;
