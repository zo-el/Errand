"use strict";
/*************************
**    zome functions    **
**************************/
exports.__esModule = true;
/**
 * POST to `url` with JSON `data` and parse response as JSON
 */
exports.fetchJSON = function (url, data) {
    return fetch(url, {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post'
    }).then(function (r) { return r.json(); });
};
// export const fetchCurrentGames =
// (): Promise<Array<[Hash, GameBoard]>> =>
//   fetchJSON('/fn/minersweeper/getCurrentGames')
//     .then(games => {
//       store.dispatch({
//         games,
//         type: 'FETCH_CURRENT_GAMES'
//       })
//       return games
//     })
