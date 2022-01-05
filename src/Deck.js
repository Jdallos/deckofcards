import React, { Component } from 'react';
import Card from './Card.js';
import axios from 'axios';
import "./Deck.css";

// Could add the API_url as a const seperate from props and state
// up here
// can also be a base url to work for both APi calls

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // We could store the entire response.data in state...
            deckID: '',
            cards: [
                // DON'T NEED THIS, IT REMOVES THE BLANK cARD COMPONENT ISSUE
                // { image: '', description: '' }
            ],
            cardsRemaining: ''
        }
        this.getCard = this.getCard.bind(this);
    }

    // Get deck ID from API
    async componentDidMount() {
        // USING .THEN()
        // axios.get('https://deckofcardsapi.com/api/deck/new/shuffle').then(res => {
        //     // console.log(res.data.deck_id);
        //     this.setState({ deckID: res.data.deck_id });
        // })

        // NOW USING ASYNC AWAIT
        let res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle');
        // We could store the entire response.data in state...
        this.setState({ deckID: res.data.deck_id });
    }

    // could also be an async function- be consistent
    getCard() {
        // Could refactor this url, combined with the base url above
        try {
            if (this.state.cardsRemaining === 0) {
                throw new Error("The Deck is empty");
            }
            axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=1`).then(res => {
                // console.log(res.data);
                let remaining = res.data.remaining;
                // could put the entire card object (includes all img, des etc) and select specifics in the setState below
                let description = res.data.cards[0].value + ' of ' + res.data.cards[0].suit;
                let image = res.data.cards[0].image;
                this.setState((st) => ({
                    cards: [
                        ...st.cards,
                        {
                            image: image,
                            // I use this as key and img alt, many alternative options
                            description: description
                        }
                    ],
                    cardsRemaining: remaining
                }));

            })
        } catch (err) {
            alert(err);
        }


    }

    // Map Card compnents from cards.state
    displayCards() {
        return this.state.cards.map((card) => (
            // How to remove first blank Card due to empty state?
            <Card
                img={card.image}
                description={card.description}
                key={card.description}
            />
        ));
    }

    render() {
        return (
            <div>
                <h1 className="Deck-title">💎Card Dealer💎</h1>
                <h2 className="Deck-title subtitle">💎A React demo💎</h2>
                <button className="Deck-btn" onClick={this.getCard}>Hit me!</button>
                <div className="Deck-cardarea">
                    {this.displayCards()}
                </div>
            </div>
        )
    }
}

export default Deck;