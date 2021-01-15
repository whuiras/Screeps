/**
 * This file contains hard-coded coordinates of build locations, relative to a point-of-interest
 */

/**
 * extensionCoords contain 64 locations to build extensions (The max number of extensions that can be placed in a room
 * is 60. 64 are listed here in case locations are blocked by walls). This list is in order of which extensions
 * should be built before others.
 */
export const extensionCoords: [number, number][] =
  [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 3],
    [2, 3],
    [3, 2],
    [3, 1],
    [3, -1],
    [3, -2],
    [2, -3],
    [1, -3],
    [-1, -3],
    [-2, -3],
    [-3, -2],
    [-3, -1],
    [-3, 1],
    [-3, 2],
    [-2, 3],
    [-1, 3],
    [2, 4],
    [3, 4],
    [4, 3],
    [4, 2],
    [4, -2],
    [4, -3],
    [3, -4],
    [2, -4],
    [-2, -4],
    [-3, -4],
    [-4, -3],
    [-4, -2],
    [-4, 2],
    [-4, 3],
    [-3, 4],
    [-2, 4],
    [1, 5],
    [3, 5],
    [4, 5],
    [5, 4],
    [5, 3],
    [5, 1],
    [5, -1],
    [5, -3],
    [5, -4],
    [4, -5],
    [3, -5],
    [1, -5],
    [-1, -5],
    [-3, -5],
    [-4, -5],
    [-5, -4],
    [-5, -3],
    [-5, -1],
    [-5, 1],
    [-5, 3],
    [-5, 4],
    [-4, 5],
    [-3, 5],
    [-1, 5]
  ];

/**
 * roadCoords contains locations where roads are to be built. The order doesn't matter much here.
 */
export const roadCoords: [number, number][] =
  [
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [0, -2],
    [0, -3],
    [0, -4],
    [0, -5],
    [-1, 0],
    [-2, 0],
    [-3, 0],
    [-4, 0],
    [-5, 0],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [1, -1],
    [2, -2],
    [3, -3],
    [4, -4],
    [5, -5],
    [-1, -1],
    [-2, -2],
    [-3, -3],
    [-4, -4],
    [-5, -5],
    [-1, 1],
    [-2, 2],
    [-3, 3],
    [-4, 4],
    [-5, 5],
    [1, 4],
    [2, 5],
    [1, -4],
    [2, -5],
    [-1, -4],
    [-2, -5],
    [-1, 4],
    [-2, 5],
    [4, 1],
    [5, 2],
    [4, -1],
    [5, -2],
    [-4, -1],
    [-5, -2],
    [-4, 1],
    [-5, 2]
  ];

/**
 * storageCoord contains the location of the room's storage (mostly for posterity)
 */
export const storageCoords: [number, number][] =
  [[0,0]]

/**
 * linkCoords contains the location of the rooms two, core links
 */
export const linkCoords: [number, number][] =
  [
    [0,1],
    [0,-1]
  ]

