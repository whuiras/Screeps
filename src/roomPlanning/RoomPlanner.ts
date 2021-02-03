import { Logger } from "../Logger";
import * as RelBuildCoords from "./relBuildCoords";
import { POIFinder } from "./POIFinder";
import { MemoryHandler } from "../memory/MemoryHandler";

export class RoomPlanner {

  private roomID: Id<Room>;
  private roomPlan: structMemory;
  private poiFinder: POIFinder;
  private POI: number[];
  private terrain: RoomTerrain;

  public constructor(roomID: Id<Room>) {
    this.roomID = roomID;

    const roomMem = MemoryHandler.getRoomMem(roomID);
    if (roomMem) {
      this.roomPlan = roomMem.roomPlan;
    } else {
      Logger.logFatal("Could not get roomMem to plan room");
      this.roomPlan = {} as structMemory;
    }

    this.poiFinder = new POIFinder(this.roomID);
    this.POI = this.poiFinder.findPOI();
    this.terrain = Game.rooms[this.roomID].getTerrain();
  }

  public planRoom(): void {

    // mark the core base
    this.addCoreBuildingType(this.roomPlan.coreEdges, RelBuildCoords.edgeCoords);
    this.addCoreBuildingType(this.roomPlan.coreLinks, RelBuildCoords.linkCoords);
    this.addCoreBuildingType(this.roomPlan.storage, RelBuildCoords.storageCoords);
    this.addCoreBuildingType(this.roomPlan.extensions, RelBuildCoords.extensionCoords);
    this.addCoreBuildingType(this.roomPlan.coreRoads, RelBuildCoords.roadCoords);


    // convert edge coordinates to room positions
    const edgePositions = [];
    for (const coreEdge of this.roomPlan.coreEdges) {
      edgePositions.push(new RoomPosition(coreEdge[0], coreEdge[1], this.roomID));
    }

    // add roads to controller and a controller link
    const controller = Game.rooms[this.roomID].controller;
    if (controller !== undefined) {
      this.addCapRoadsAndLink(this.roomPlan.controllerLinks, controller.pos, edgePositions);
    }

    // add roads to sources and source links
    for (const source of Game.rooms[this.roomID].find(FIND_SOURCES)) {
      this.addCapRoadsAndLink(this.roomPlan.sourceLinks, source.pos, edgePositions);
    }
  }

  private addCapRoadsAndLink(linkPlanCoords: number[][], origin: RoomPosition, edgePositions: RoomPosition[]): void {
    const pathObject = PathFinder.search(origin, edgePositions);
    if (!pathObject.incomplete) {
      for (const point of pathObject.path) {
        this.roomPlan.capRoads.push([point.x, point.y]);
      }

      // add link location, we want to avoid the controller itself, and the penultimate road.
      const avoid = [[origin.x, origin.y], [pathObject.path[1].x, pathObject.path[1].y]];
      const linkSite = this.findLinkSite([pathObject.path[0].x, pathObject.path[0].y], avoid);
      linkPlanCoords.push(linkSite);

    } else {
      Logger.logError("No path to base from controller");
    }
  }

  private addCoreBuildingType(planCoords: number[][], relCoords: number[][]) {
    for (const relCoord of relCoords) {
      const storCoord = [this.POI[0] + relCoord[0], this.POI[1] + relCoord[1]];
      if (this.terrain.get(storCoord[0], storCoord[1]) !== TERRAIN_MASK_WALL) {
        planCoords.push(storCoord);
      }
    }
  }

  private findLinkSite(origin: number[], avoid: number[][]): number[] {
    const relCoords = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
    for (const relCoord of relCoords) {
      const candidateX = relCoord[0] + origin[0];
      const candidateY = relCoord[1] + origin[1];
      if (this.terrain.get(candidateX, candidateY) !== TERRAIN_MASK_WALL
        && !avoid.includes([candidateX, candidateY])) {
        return [candidateX, candidateY];
      }
    }

    Logger.logError("No suitable site for link found");
    return [0, 0];

  }


}
