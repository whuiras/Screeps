export class RoomPlanner {

  private room: Room;
  private roomID: Id<Room>;

  public constructor(roomID: Id<Room>) {
    this.room = Game.getObjectById(roomID) as Room;
    this.roomID = roomID;
  }

  public planRoom(): void {
    //
  }

  private findPOI(): [number, number] {


    return [0, 0];
  }

  /**
   * Calculates how many walls are within the core (d < 4) distance from a POI.
   * @param x x coord of the room
   * @param y y coord of the room
   * @param start starting distance from the origin
   * @param end ending distance from the origin
   * @private
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private calcWallDensity(x: number, y: number, start: number, end: number): number {
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
    const pairs = []
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

}
