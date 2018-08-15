// Holochain actions
/*=============================================
=            Action Exports
=============================================*/
export const GET_BOARD_STATE = "getBoardState";
export const ADD_CARD = "newCard";
export const ADD_LANE = "newLane";
export const MOVE_CARD = "moveCard";
export const DELETE_CARD = "deleteCard";
export const namespace = "boards";

/*=============================================
=            Action Definitions
=============================================*/
/*======== Board State Management =========*/
//returns the board info only (as json)
export function getBoardState() {
  return {
    type: GET_BOARD_STATE,
    meta: {
      isHc: true,
      namespace: namespace,
    }
  }
}

/*======== Card State Management =========*/
export function addCard (card_info, then) {
  console.log("card_info inside actions", card_info);
  return {
      type: ADD_CARD,
      meta: {
        isHc: true,
        namespace: namespace,
        data: card_info,
        then
      }
    }
  }

//card should change lanes id
export function moveCard(lane) {
  return {
    type: MOVE_CARD,
    meta: {
      isHc: true,
      namespace: namespace,
      data: lane,
    }
  }
}

//
export function deleteCard(card_id) {
  return {
    type: DELETE_CARD,
    meta: {
      isHc: true,
      namespace: namespace,
      data: card_id,
    }
  }
}
