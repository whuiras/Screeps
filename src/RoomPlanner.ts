

export class RoomPlanner {

  private room: Room;
  private roomID: Id<Room>;

  public constructor(roomID: Id<Room>) {
    this.room = Game.getObjectById(roomID) as Room;
    this.roomID = roomID;
  }

  public planRoom(): void {
    //
    const POI: number[] = this.findPOI(25, 25, 5)
  }

  /**
   * This function scans then entire room and returns the (x,y) coordinate of where a base should be located
   * @private
   */
  private findPOI(x: number, y: number, windowSize: number): number[] {
    let scoredPairs: number[][] = []

    if (windowSize < 1) {
      return []
    }

    const coords = this.genPOICoords(x, y, windowSize)
    for (const coord of coords) {
      // check the core of the base (no walls allowed in the core)
      if(this.sumWallTiles(coord[0], coord[1], 0, 4) === 0) {
        scoredPairs.push([coord[0], coord[1], this.sumWallTiles(coord[0], coord[1], 4, 14)])
      }
    }

    log.debug("")

    scoredPairs = scoredPairs.sort(function(a, b) {
      return b[0] - a[0];
    });

    // grab top 3 candidates and recursively get better POI's
    let newPairs = []
    newPairs.push(this.findPOI(scoredPairs[0][0], scoredPairs[0][0], windowSize-1))
    newPairs.push(this.findPOI(scoredPairs[1][0], scoredPairs[1][0], windowSize-1))
    newPairs.push(this.findPOI(scoredPairs[2][0], scoredPairs[2][0], windowSize-1))

    newPairs = newPairs.sort(function(a, b) {
      return b[0] - a[0];
    });

    const bestCoord = newPairs[0]

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

    for (let i = start; i === end; i++) {
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
    let sum = 0;

    for (let i = 0; i < 4; i++) {
      const candidateX = x + dx;
      const candidateY = y + dy;
      const terrain = this.room.getTerrain().get(candidateX, candidateY)
      if (terrain === terrainType) {
        sum++;
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

    while (this.inBounds(newX, newY)) {
      newX -= windowSize
    }
    while (this.inBounds(newX, newY)) {
      newY -= windowSize
    }

    // Now we can iterate through two, cleaner loops
    pairs.push([newX, newY])
    for (let i = newX; i < 44; i += windowSize) {
      for (let j = newY; j < 44; j += windowSize) {
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
    return (x > 5 && x < 44 && y > 5 && y < 44)
  }

}
