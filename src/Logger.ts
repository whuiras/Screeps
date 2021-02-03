export class Logger {

  private static level: number;

  public constructor(level: number) {
    Logger.level = level;
  }

  public static logDebug(toLog: string): void {
    if (this.level >= 2) {
      console.log("[DEBUG]: " + toLog);
    }
  }

  public static logInfo(toLog: string): void {
    if (this.level >= 3) {
      console.log("[INFO]: " + toLog);
    }
  }

  public static logWarn(toLog: string): void {
    if (this.level >= 4) {
      console.log("[WARN]: " + toLog);
    }
  }

  public static logError(toLog: string): void {
    if (this.level >= 5) {
      console.log("[ERROR]: " + toLog);
    }
  }

  public static logFatal(toLog: string): void {
    if (this.level >= 6) {
      console.log("[FATAL]: " + toLog);
    }
  }

}
