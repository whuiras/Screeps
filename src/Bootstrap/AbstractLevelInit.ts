import { AbstractPhase } from "./AbstractPhase";

export abstract class AbstractLevelInit extends AbstractPhase {

  protected fillBuildQueue(): void {
    this.fillRoads()
    this.fillContainers()
  }

  protected abstract fillRoads(): void

  protected abstract fillContainers(): void
}
