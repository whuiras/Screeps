import { Logger } from "./Logger";


export class RoomPlanner {

  private roomID: Id<Room>;

  public constructor(roomID: Id<Room>) {
    this.roomID = roomID;
  }

  public planRoom(): void {
    //
    console.log(" ")
    console.log(" ")
    const POI: number[] = this.findPOI(25, 25, 5)
    console.log(" ")
    console.log("POI is: ")
    // console.log(POI[0], POI[1])
    console.log(" ")
    console.log(" ")

    //console.log("sumWallTiles test: ")
    //console.log(this.sumWallTiles(18,31, 0, 3))
    console.log(" ")
  }

  /**
   * This function scans then entire room and returns the (x,y) coordinate of where a base should be located
   * NOTE: This is incredibly expensive, though it only runs once per room
   * @param x The x origin we are find POI around
   * @param y The y origin we are find POI around
   * @param windowSize The size of the area we are finding POI in
   * @private
   */
  private findPOI(x: number, y: number, windowSize: number): number[] {
    let scoredPairs: number[][] = []

    if (windowSize < 1) {
      return []
    }

    const coords = this.genPOICoords(x, y, windowSize)
    if (windowSize === 5)
      console.log(coords)
    for (const coord of coords) {
      // check the core of the base (no walls allowed in the core)
      if(this.sumWallTiles(coord[0], coord[1], 0, 2) === 0) {
        scoredPairs.push([coord[0], coord[1], this.sumWallTiles(coord[0], coord[1], 2, 5)])
      }
    }


    scoredPairs = scoredPairs.sort(function(a, b) {
      return a[2] - b[2];
    });

    if (windowSize === 5) {
      console.log('scored pairs are: ')
      console.log(scoredPairs)
    }

    // grab top 3 candidates and recursively get better POI's
    let newPairs : number[][] = []
    newPairs.push(this.findPOI(scoredPairs[0][0], scoredPairs[0][1], windowSize-2))
    // newPairs.push(this.findPOI(scoredPairs[1][0], scoredPairs[1][1], windowSize-2))
    // newPairs.push(this.findPOI(scoredPairs[2][0], scoredPairs[2][1], windowSize-2))

    newPairs = newPairs.sort(function(a, b) {
      return a[2] - b[2];
    });

    const bestCoord = newPairs[0]

    if (windowSize === 5) {
      console.log('best coord is: ' + bestCoord.toString())
    }

    return bestCoord;
  }

  /**
   * Calculates how many walls are within the core (d < 4) distance from a POI.
   * @param x x coord of the room
   * @param y y coord of the room
   * @param start starting distance from the origin
   * @param end ending distance from the origin
   * @private
   */
  private sumWallTiles(x: number, y: number, start: number, end: number): number {
    let wallScore = 0;
    for (let i = start; i <= end; i++) {
      const coords = this.genSymmSumCoords(i)
      for (const coord of coords) {
        wallScore += this.symmSumTerrain(x, y, coord[0], coord[1])
      }

    }
    return wallScore;
  }

  /**
   * This scans in a rotation for a specific terrain type, and returns the sum.
   * @param x x coord of the room
   * @param y y coord of the room
   * @param dx x distance from the origin
   * @param dy y distance from the origin
   * @param terrainType The terrain type we are counting. Defaults to TERRAIN_MASK_WALL
   * @private
   */
  private symmSumTerrain(x: number, y: number, dx: number, dy: number, terrainType: number = TERRAIN_MASK_WALL): number {
    let sum = 0
    const room = Game.rooms[this.roomID]

    if (room === null) {
      Logger.logError("symmSumTerrain received null room")
      return 0
    }

    // early stop if dx and dy are 0
    if (dx === 0 && dy === 0) {
      if (room) {
        const terrain = room.getTerrain().get(x, y)
        if (terrain === terrainType) {
          sum++;
        }
      }
      return sum
    }

    for (let i = 0; i < 4; i++) {
      const candidateX = x + dx;
      const candidateY = y + dy;
      if (room) {
        const terrain = room.getTerrain().get(candidateX, candidateY)
        if (terrain === terrainType) {
          sum++;
        }
      }

      const temp = dy;
      dy = dx;
      dx = temp;
      dy = -dy;
    }

    return sum;
  }

  /**
   * Returns a quadrant of pairs x distance from an origin
   * @param distance The distance we are from the origin
   * @private
   */
  private genSymmSumCoords(distance: number): number[][] {
    const pairs: number[][] = []
    // first go across
    for(let x = 0; x < distance+1; x++) {
      pairs.push([x, distance])
    }
    // then down, leaving off the last element
    for(let y = distance-1; y > 1; y--) {
      pairs.push([distance, y])
    }

    return pairs
  }

  /**
   * Generates an array of candidate POI's from around an origin point, a specified distance apart
   * @param x The x coord
   * @param y The y coord
   * @param windowSize The distance between points
   * @private
   */
  private genPOICoords(x: number, y: number, windowSize: number): number[][] {
    const pairs: number[][] = []

    // first navigate to the top right candidate so we can simplify our loops (this is a little scrappy)
    let newX: number = x
    let newY: number = y
    while (this.inBounds(newX - windowSize, y)) {
      newX -= windowSize
    }
    while (this.inBounds(x, newY - windowSize)) {
      newY -= windowSize
    }

    // Now we can iterate through two, cleaner loops
    for (let i = newX; i < 45; i += windowSize) {
      for (let j = newY; j < 45; j += windowSize) {
        pairs.push([i,j])
      }
    }

    return pairs
  }

  /**
   * Returns true if a coordinate is in bounds per POI purposes
   * @param x The x coord
   * @param y The y coord
   * @private
   */
  private inBounds(x: number, y: number) {
    return (x >= 14 && x <= 35 && y >= 14 && y <= 35)
  }

}
