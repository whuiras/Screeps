import { AbstractPhase } from "./AbstractPhase";

export abstract class AbstractLevelInit extends AbstractPhase {

  protected abstract fillBuildQueue(): void
}
