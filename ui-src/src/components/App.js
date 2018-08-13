import React, {Component} from 'react'

import './App.css'
import {Board} from 'react-trello'
import {fetchJSON} from '../common'


const data = require('../data.json')

const handleDragStart = (cardId, laneId) => {
    console.log('drag started')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
}

class App extends Component {
    state = {"boardData": {"lanes": []}};

    setEventBus = eventBus => {
      console.log("setEventBus")
        this.setState({eventBus})
    }

    async componentWillMount() {
        const response = await this.getBoard()
        this.setState({boardData: response})
    }

    getBoard = () => {
        return new Promise(resolve => {
            resolve(data)
        })
    }

    onDataChange = nextData => {
        console.log('onDataChange(New card has been added)')
        console.log(nextData)
    };

  	onCardAdd = (card, laneId) => {
  		console.log(`onCardAdd( New card added to lane ${laneId})`)
  		console.dir(card)
  	};

    onCardDelete = (cardId, metadata, laneId)=>{
      //TODO delete callback to HC
      console.log("onCardDelete: ",cardId, metadata ,  laneId);
    };

    onCardClick = (cardId, metadata, laneId)=>{
      //TODO Expand the Card to see better and edit
      console.log("onCardClick: ",cardId, metadata ,  laneId);
    };

    // completeCard = () => {
    //     this.state.eventBus.publish({
    //         type: 'ADD_CARD',
    //         laneId: 'COMPLETED',
    //         card: {id: 'Milk', title: 'Buy Milk', label: '15 mins', description: 'Use Headspace app'}
    //     })
    //     this.state.eventBus.publish({type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: 'Milk'})
    // };
    //
    // addCard = () => {
    //     this.state.eventBus.publish({
    //         type: 'ADD_CARD',
    //         laneId: 'BLOCKED',
    //         card: {id: 'Ec2Error', title: 'EC2 Instance Down', label: '30 mins', description: 'Main EC2 instance down'}
    //     })
    // };

    // componentWillMount(){
    //   // fetchJSON('/fn/boards/getBoard').then(() =>{
    //   //
    //   // });
    // }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                <img src="errand.png" height="42" width="42" />
                    <h1>Errand</h1>

                </div>
                <div className="App-intro">

                    <Board
                      data={this.state.boardData}
                      eventBusHandle={this.setEventBus}
                      draggable={true}
                      // laneDraggable={true} /*default*/
                      // cardDraggable={true} /*default*/
                      collapsibleLanes={true}
                      editable={true}
                      // handleDragStart={this.handleDragStart}
                      handleDragEnd={handleDragEnd}
                      onCardClick={this.onCardClick}
                      onCardAdd={this.onCardAdd}
                      onCardDelete={this.onCardDelete}
                      onDataChange={this.onDataChange}
                      />
                </div>
            </div>
        )
    }
}

export default App
