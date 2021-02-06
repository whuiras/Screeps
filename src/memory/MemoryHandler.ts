/**
 * Handles memory updating
 *
 * Some of these functions could be moved to a utils dir and imported, see: isInBounds()
 */
import { RoomPlanner } from "../roomPlanning/RoomPlanner";
import { Logger } from "../Logger";

export class MemoryHandler {


  public updateMemory(): void {
    this.deleteCreepMem();
    this.updateRooms();
  }

  /**
   * getter for room memory
   * @param roomID The id of the room to get
   */
  public static getRoomMem(roomID: Id<Room>): RoomMemory | null {
    for (const roomMem of Memory.rooms) {
      if (roomMem.id === roomID) {
        return roomMem;
      }
    }
    Logger.logError("room ID does not exist in memory");
    return null;
  }

  /**
   * Updates memory for all rooms
   * @private
   */
  public updateRooms(): void {

    if (Memory.rooms === undefined) {
      Memory.rooms = [];
    }

    const numRooms = Object.keys(Game.rooms).length;
    for (let i = 0; i < numRooms; i++) {
      if (Memory.rooms[i] === undefined) {
        Memory.rooms[i] = {
          buildQueue: [],
          controller: "",
          id: "",
          init: false,
          lastUpdated: 0,
          levelInit: false,
          maxHarvesters: 0,
          roomPlan: {
            coreEdges: [],
            containers: [],
            extensions: [],
            roads: [],
            coreRoads: [],
            capRoads: [],
            towers: [],
            walls: [],
            ramparts: [],
            links: [],
            coreLinks: [],
            controllerLinks: [],
            sourceLinks: [],
            storage: [],
            spawns: [],
            extractors: [],
            labs: [],
            terminal: [],
            observer: [],
            powerSpawn: []
          },
          sources: [],
          spawn: "",
          structures: {
            coreEdges: [],
            containers: [],
            extensions: [],
            roads: [],
            coreRoads: [],
            capRoads: [],
            towers: [],
            walls: [],
            ramparts: [],
            links: [],
            coreLinks: [],
            controllerLinks: [],
            sourceLinks: [],
            storage: [],
            spawns: [],
            extractors: [],
            labs: [],
            terminal: [],
            observer: [],
            powerSpawn: []
          },
        }
      }
      this.initRoomMem(Memory.rooms[i], Object.values(Game.rooms)[i]);
    }
  }

  public static getCapRoadLen(roomMem: RoomMemory): number {
    if (roomMem) {
      if (roomMem.roomPlan) {
        return roomMem.roomPlan.capRoads.length;
      }
    }
    Logger.logError("Could not get length of capRoads");
    return 0;
  }

  /**
   * Initializes memory for a specific room. Updates fields like 'id' that are only set once.
   * @param roomMem
   * @param room Room game object we are going to init
   * @private
   */
  private initRoomMem(roomMem: RoomMemory, room: Room) {
    // There might be a better way of doing this than just a straight, 'has this been init' flag.
    if (roomMem.init) {
      return;
    }
    roomMem.id = room.name;
    const controller = room.controller;
    if (controller !== undefined) {
      roomMem.controller = controller.id;
    }
    const sources = room.find(FIND_SOURCES);
    for (const source of sources) {
      roomMem.sources.push(source.id);
    }

    const roomPlanner: RoomPlanner = new RoomPlanner(room.name as Id<Room>);
    roomPlanner.planRoom();
    roomMem.init = true;
  }

  private deleteCreepMem(): void {
    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
      if (!(name in Game.creeps)) {
        delete Memory.creeps[name];
      }
    }
  }
  
}
