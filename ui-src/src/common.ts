/*************************
**    zome functions    **
**************************/

/**
 * POST to `url` with JSON `data` and parse response as JSON
 */

export const fetchJSON =
(url: string, data?: any): Promise<any> => {
  return fetch(url, {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
  }).then(r => r.json())
}

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
