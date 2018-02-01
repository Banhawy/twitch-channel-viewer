import React, { Component } from 'react';


export class Card extends Component{
    render(){
        return (
            <div className="card">
                <div className="profileImage">
                    <img src={this.props.profileImage} alt="..."/>
                </div>
                <div className="content">
                    <div className="user">
                            <h4 className="title">{this.props.displayName}</h4>
                                <br />
                                <h5>{this.props.status}</h5>
                    </div>
                    <p className="description text-center">
                        {this.props.description}
                    </p>
                </div>
            </div>
        );
    }
}

export default Card;
