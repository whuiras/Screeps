/**
 * Handles memory updating
 *
 * Some of these functions could be moved to a utils dir and imported, see: isInBounds()
 */

enum Period {
  EVERY = 1,
  SHORT = 10,
  LONG = 100,
}


export class MemoryHandler {


  public updateMemory(): void {
    this.deleteCreepMem();
    this.updateRooms();

  }

  /**
   * Updates memory for all rooms
   * @private
   */
  public updateRooms(): void {
    const numRooms = Object.keys(Game.rooms).length

    for (let i = 0; i < numRooms; i++) {
      const roomMem = Memory.rooms[i]
      const room = Object.values(Game.rooms)[i]

      // There might be a better way of doing this than just a straight, 'has this been init' flag.
      if (!roomMem.init) {
        this.initRoomMem(roomMem, room)
      }

    }
  }

  /**
   * Initializes memory for a specific room. Updates fields like 'id' that are only set once.
   * @param roomMem Location in memory of the room
   * @param room Room game object we are going to init
   * @private
   */
  private initRoomMem(roomMem: RoomMemory, room: Room): void {
    roomMem.id = room.name
    const controller = room.controller
    if (controller !== undefined) {
      roomMem.controller = controller.id
    }
    roomMem.maxHarvesters = this.calcMaxRoomHarvesters(room)
    roomMem.init = true
  }

  private deleteCreepMem(): void {
    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
      if (!(name in Game.creeps)) {
        delete Memory.creeps[name];
      }
    }
  }

  private calcMaxRoomHarvesters(room: Room): number {
    const sources: Source[] = room.find(FIND_SOURCES);
    let sum = 0;

    for (const source of sources) {
      sum += this.calcMaxSourceHarvesters(room, source);
    }
    return sum;
  }

  private calcMaxSourceHarvesters(room: Room, source: Source): number {
    const position = source.pos;
    let sum = 0
    sum += this.symmScan(room, position.x, position.y, 0, 1)
    sum += this.symmScan(room, position.x, position.y, 1, 1)
    return sum
  }

  /**
   * Checks whether a room coordinate is in bounds
   * @param x
   * @param y
   * @private
   */
  private isInBounds(x: number, y: number): boolean {
    return (x > 0 && x < 49 && y > 0 && y < 49);
  }

  private symmScan(room: Room, x: number, y: number, dx: number, dy: number): number {
    let sum = 0
    for (let i = 0; i < 4; i++) {
      const candidateX = x + dx
      const candidateY = y + dy
      if (this.isInBounds(candidateX, candidateY)) {
        if (room.getTerrain().get(candidateX, candidateY) !== TERRAIN_MASK_WALL) {
          sum++
        }
      }
    }
    return sum
  }


}