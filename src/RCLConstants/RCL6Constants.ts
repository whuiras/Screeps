import { AbstractRCLConstants } from "./AbstractRCLConstants";

export class RCL6Constants extends AbstractRCLConstants {


  public get roads(): number {
    return this._roads;
  }

  public get containers(): number {
    return this._containers;
  }

  public get spawns(): number {
    return this._spawns;
  }

  public get extensions(): number {
    return this._extensions;
  }

  public get ramparts(): number {
    return this._ramparts;
  }

  public get towers(): number {
    return this._towers;
  }

  public get storage(): number {
    return this._storage;
  }

  public get links(): number {
    return this._links;
  }

  public get coreLinks(): number {
    return this._coreLinks;
  }

  public get sourceLinks(): number {
    return this._sourceLinks;
  }

  public get controllerLinks(): number {
    return this._controllerLinks;
  }

  public get extractor(): number {
    return this._extractor;
  }

  public get labs(): number {
    return this._labs;
  }

  public get terminal(): number {
    return this._terminal;
  }

  public get observer(): number {
    return this._observer;
  }

  public get powerSpawn(): number {
    return this._powerSpawn;
  }

  private _roads = 54;
  private _containers = 5;
  private _spawns = 1;
  private _extensions = 40;
  private _ramparts = 0;
  private _towers = 2;
  private _storage = 1;
  private _links = 3;
  private _coreLinks = 1;
  private _sourceLinks = 1;
  private _controllerLinks = 1;
  private _extractor = 1;
  private _labs = 3;
  private _terminal = 1;
  private _observer = 0;
  private _powerSpawn = 0;
}
