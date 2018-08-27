import * as actions from './actions';
import { combineReducers } from 'redux';
import data from './data';

const errandApp = ( state = initialState, action) => {
  // console.log("ACTIONS:: ",action)
  const {meta, type , payload} = action;
  switch (type) {
    case actions.GET_BOARD_STATE:
      const {board}=payload;
      return Object.assign({...state},board);
    case actions.ADD_CARD:
      return {...state}
      break;
    case actions.MOVE_CARD:
      return {...state}
      break;
    case actions.DELETE_CARD:
      return {...state}
      break;
    default:
      //console.log("default")
    return state
  }
}



const initialState =  {
  "lanes": [
    {
      "id": "LANE1",
      "title": "Planned Tasks",
      "label": "20/70",
      "style": {"width": 280},
      "cards": [
        {
        "id": "Plan1",
          "title": "Stand-Up Meetings",
          "label": "15 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Hold daily disucssions in the morning to discuss our progress the day prior and our goals for the current work day."
        },
        {
          "id": "Plan2",
          "title": "Trello Board Carding",
          "label": "10 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Parse work into modular taks. Claim tasks of interest to work on. "
        }
      ]
    },
    {
      "id": "LANE2",
      "title": "Finished Tasks",
      "label": "20/70",
      "style": {"width": 280},
      "cards": [
        {
        "id": "Plan3",
          "title": "Make Final Presenation",
          "label": "15 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Create a presentation of all the work we have accomplished over the past 9 weeks."
        }
      ]
    }
  ]
}


export default errandApp;
