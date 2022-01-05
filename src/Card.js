import React, { Component } from 'react';
import './Card.css';

class Card extends Component{
    constructor(props){
        super(props);
        let angle = Math.random() * 90 -45;
        let xPos = Math.random() *40 -20;
        let yPos = Math.random() *40 -20;
        // Adding to the class/  component object
        // This is in constructor so it only runs once not every render
        this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
    }

    render(){
       
        return(
            <div className="Card">
                <img 
                    style={{transform: this._transform}} 
                    src={this.props.img} 
                    alt={this.props.description}
                />
            </div>
        )
    }
}

export default Card;