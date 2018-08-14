import * as A from './actions';
import { combineReducers } from 'redux';
import data from './data';

const initialState = {
  "id": "TASK",
  "title": "Planned Tasks",
  "label": "20/70",
  "cards": [
    {
    "id": "Plan1",
      "title": "Buy milk",
      "label": "15 mins",
      "description": "2 Gallons of milk at the Deli store"
    }
  ]
}

const errandApp = ( state = initialState, action) => {
  const {meta, type} = action;

  switch (type) {
    case A.GET_BOARD_STATE:
     return {...state}
      break;
    case A.ADD_CARD:
      return {...state}
      break;
    case A.MOVE_CARD:
      return {...state}
      break;
    case A.DELETE_CARD:
      return {...state}
      break;
    default: return state
  }
}

export default errandApp;
