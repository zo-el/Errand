import React, {Component} from 'react';
import './CreateLaneForm.css';
import { newLane } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

class CreateLaneForm extends React.Component {
  inDescription = null
  constructor(props) {
    super(props)
    this.state = {
        errorMessage: null
      }
  }

  render() {
    let errorDisplay = null
    if (this.state.errorMessage) {
      errorDisplay = <div className="error-message">{ this.state.errorMessage }</div>
    }
    return <div className="create-game-form" onKeyUp={this.handleEnter}>
      <h1 className="registration-header">Lane Creation</h1>
      <input className="register-input" type="text" ref={el => this.inDescription = el} placeholder="Lane Title"/>
      <br/>
      <br/>
      <button className="modal-button" onClick={this.handleCreate}>New Game</button>
    </div>

  }

  handleCreate = () => {
    const { inDescription } = this;
    if (inDescription) {
      const title = inDescription.value
      console.log("Lane Name: ",this.props)
      this.props.newLane(title);
    }
  }

 handleEnter = (event) => {
    const { inDescription } = this;
    if (event.keyCode === 13 && inDescription.value) {
      this.handleCreate();
    }
    else if (event.keyCode === 13) {
      this.setState({errorMessage: "Please be sure to name your lane!"})
    }
  }
}

const mapStateToProps = state => {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ newLane }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLaneForm);
