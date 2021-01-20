import { MemoryHandler } from "../memory/MemoryHandler";

export abstract class AbstractPhase {

  private _roomMem: RoomMemory;

  public constructor(roomID: Id<Room> = {} as Id<Room>) {
    const roomMem = MemoryHandler.getRoomMem(roomID);
    if (roomMem) {
      this._roomMem = roomMem;
    } else {
      this._roomMem = {} as RoomMemory;
    }
  }

  public get roomMem(): RoomMemory {
    return this._roomMem;
  }

  public set roomMem(value: RoomMemory) {
    this._roomMem = value;
  }

  public abstract run(): void

}
