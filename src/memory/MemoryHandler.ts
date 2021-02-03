/**
 * Handles memory updating
 *
 * Some of these functions could be moved to a utils dir and imported, see: isInBounds()
 */
import { RoomPlanner } from "../roomPlanning/RoomPlanner";
import { Logger } from "../Logger";
import * as RelBuildCoords from "../roomPlanning/relBuildCoords";
import { RoomPlan } from "../roomPlanning/RoomPlan";

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

    if (Memory.initRoom === undefined) {
      Memory.initRoom = {} as RoomMemory;
      this.initRoomMem(Memory.initRoom, Object.values(Game.rooms)[0]);
      console.log(Memory.initRoom);
      console.log(typeof Memory.initRoom);
    }

    if (Memory.rooms === undefined) {
      Memory.rooms = [];
    }

    const numRooms = Object.keys(Game.rooms).length;
    for (let i = 0; i < numRooms; i++) {
      if (Memory.rooms[i] === undefined) {
        Memory.rooms[i] = {} as RoomMemory;
      }
      this.initRoomMem(Memory.rooms[i], Object.values(Game.rooms)[i]);
    }
  }

  /**
   * These need to be pushed in order of build order
   * @param roomMem
   * @param roomPlan
   */
  public static setBuildPlanMem(roomMem: RoomMemory, roomPlan: RoomPlan): void {
    if (roomMem) {
      roomMem.roomPlan = {
        extractors: [],
        labs: [],
        observer: [],
        powerSpawn: [],
        spawns: [],
        terminal: [],
        links: [],
        controllerLinks: [],
        coreLinks: [],
        sourceLinks: [],
        containers: [],
        extensions: [],
        ramparts: [],
        roads: [],
        coreRoads: [],
        capRoads: [],
        storage: [],
        towers: [],
        walls: []
      };
      for (const coord of roomPlan.coreRoads) {
        roomMem.roomPlan.coreRoads.push(coord);
      }
      for (const coord of roomPlan.capRoads) {
        roomMem.roomPlan.capRoads.push(coord);
      }
      for (const coord of roomPlan.containers) {
        roomMem.roomPlan.containers.push(coord);
      }
      for (const coord of roomPlan.spawns) {
        roomMem.roomPlan.spawns.push(coord);
      }
      for (const coord of roomPlan.extensions) {
        roomMem.roomPlan.extensions.push(coord);
      }
      for (const coord of roomPlan.ramparts) {
        roomMem.roomPlan.ramparts.push(coord);
      }
      for (const coord of roomPlan.walls) {
        roomMem.roomPlan.walls.push(coord);
      }
      for (const coord of roomPlan.towers) {
        roomMem.roomPlan.towers.push(coord);
      }
      for (const coord of roomPlan.storage) {
        roomMem.roomPlan.storage.push(coord);
      }
      for (const coord of roomPlan.coreLinks) {
        roomMem.roomPlan.coreLinks.push(coord);
      }
      for (const coord of roomPlan.sourceLinks) {
        roomMem.roomPlan.sourceLinks.push(coord);
      }
      for (const coord of roomPlan.controllerLinks) {
        roomMem.roomPlan.controllerLinks.push(coord);
      }
      for (const coord of roomPlan.extractors) {
        roomMem.roomPlan.extractors.push(coord);
      }
      for (const coord of roomPlan.labs) {
        roomMem.roomPlan.labs.push(coord);
      }
      for (const coord of roomPlan.terminals) {
        roomMem.roomPlan.terminal.push(coord);
      }
      for (const coord of roomPlan.observers) {
        roomMem.roomPlan.observer.push(coord);
      }
      for (const coord of roomPlan.powerSpawns) {
        roomMem.roomPlan.powerSpawn.push(coord);
      }
    }
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

    roomMem.maxHarvesters = this.calcMaxRoomHarvesters(room);

    const roomPlanner: RoomPlanner = new RoomPlanner(room.name as Id<Room>);
    const roomPlan: RoomPlan = roomPlanner.planRoom();
    MemoryHandler.setBuildPlanMem(roomMem, roomPlan);
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
    let sum = 0;
    sum += this.symmScan(room, position.x, position.y, 0, 1);
    sum += this.symmScan(room, position.x, position.y, 1, 1);
    return sum;
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
    let sum = 0;
    for (let i = 0; i < 4; i++) {
      const candidateX = x + dx;
      const candidateY = y + dy;
      if (this.isInBounds(candidateX, candidateY)) {
        if (room.getTerrain().get(candidateX, candidateY) !== TERRAIN_MASK_WALL) {
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


}
