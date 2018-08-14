import * as A from './actions';
import { combineReducers } from 'redux';
import data from './data';

const initialState =  {
  "lanes": [
    {
      "id": "TASK",
      "title": "Planned Tasks",
      "label": "20/70",
      "style": {"width": 280},
      "cards": [
        {
        "id": "Plan1",
          "title": "Buy milk",
          "label": "15 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "2 Gallons of milk at the Deli store"
        },
        {
          "id": "Plan2",
          "title": "Dispose Garbage",
          "label": "10 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Sort out recyclable and waste as needed"
        }
      ]
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
