import React, {Component} from 'react'
import './App.css'
import {Board} from 'react-trello'
import { getBoardState, addCard, moveCard, deleteCard } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
const data = require('../data.js')

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
  constructor (props) {
    super(props);
    this.state = {
      boardData: { lanes: [] },
      eventBus: ""
    };
  }

componentDidMount() {
    getBoardState();
    const laneData = this.props;
    this.setState({
      boardData:  laneData  ,
    })
    //const cards = this.state.lanes.cards
     console.log("PROPS", this.props)
  }

    setEventBus = eventBus => {
      console.log("setEventBus")
        this.setState({eventBus})
        console.log(this.state)
    }

    onDataChange = nextData => {
        console.log('onDataChange(New card has been added)')
        console.log(nextData)
    };

  	onCardAdd = (cards, laneId) => {
  		console.log(`onCardAdd( New card added to lane ${ laneId })`)
  		console.dir( cards )
      addCard( cards );
  	};

    onCardDelete = (cardId, metadata, laneId)=>{
      //TODO delete callback to HC
      console.log("onCardDelete: ", cardId, metadata , laneId);
    };

    onCardClick = (cardId, metadata, laneId)=>{
      //TODO Expand the Card to see better and edit
      console.log("onCardClick: ",cardId, metadata , laneId);
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
const mapStateToProps = state => {
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getBoardState, addCard, moveCard, deleteCard }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
