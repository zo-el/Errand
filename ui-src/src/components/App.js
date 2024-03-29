import React, {Component} from 'react'
import './App.css'
import CreateLaneForm from "./CreateLaneForm"
import { Board } from 'react-trello'
import { getBoardState, addCard, moveCard, deleteCard } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

const handleDragStart = (cardId, laneId) => {
    console.log('drag started')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
}


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      boardData: { lanes: [] },
      showModal: false,
      eventBus: ""
    };
  }

    initApp = () => {
      setInterval(
        () => {
          this.props.getBoardState();
          const laneData = this.props.state;
          this.setState({
            boardData:  laneData  ,
          })
          //console.log("PROPS", this.props)

        },
        50
      );
    }

    componentDidMount() {
      this.initApp();
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
      this.props.addCard( cards,laneId );
  	};

    handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
        console.log('drag ended')
        console.log(`cardId: ${cardId}`)
        console.log(`sourceLaneId: ${sourceLaneId}`)
        console.log(`targetLaneId: ${targetLaneId}`)
        this.props.moveCard(cardId, sourceLaneId, targetLaneId);
    }

    onCardDelete = (cardId,laneId)=>{
      //TODO delete callback to HC
      console.log("onCardDelete: ", cardId,laneId);
      this.props.deleteCard(cardId,laneId);
    };

    onCardClick = (cardId, metadata, laneId)=>{
      //TODO Expand the Card to see better and edit
      console.log("onCardClick: ",cardId, metadata , laneId);
    };

    createLane = () => {
      this.setState({showModal: !this.state.showModal});
    }

    render() {
          const modalDiv = (
            <div className="interstitial-modal-overlay">
              <div className="interstitial-modal">
                <div className="modal-container register-modal">
                  <div className="modal">
                    <CreateLaneForm onCreate={this.createLane}/>
                  </div>
                </div>
              </div>
            </div>
          )
          return (
            <div className="App">
                <div className="App-header">
                <img src="errand.png" height="42" width="42" />
                    <h1>Trollo</h1>
                </div>
                <div className="App-intro">
                  <div className="lane-btn-container"><button className="lane-btn" onClick={this.createLane}>Add Lane</button></div>
                    <Board
                      data={this.state.boardData}
                      eventBusHandle={this.setEventBus}
                      draggable={true}
                      // laneDraggable={true} /*default*/
                      // cardDraggable={true} /*default*/
                      collapsibleLanes={true}
                      editable={true}
                      // handleDragStart={this.handleDragStart}
                      handleDragEnd={this.handleDragEnd}
                      onCardClick={this.onCardClick}
                      onCardAdd={this.onCardAdd}
                      onCardDelete={this.onCardDelete}
                      onDataChange={this.onDataChange}
                      />
                </div>
                { this.state.showModal ? modalDiv : null }
            </div>
        )
    }
}
const mapStateToProps = state => {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getBoardState, addCard, moveCard, deleteCard }, dispatch);
}

// const mapDispatchToProps = dispatch => {
//   return {
//     getBoardState: () => dispatch(getBoardState()),
//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(App)
