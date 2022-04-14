const PREFIX = 'Wallet adapter';

class Logger {
  public static showLog = true;
  public static info = (...rest: any): void => {
    if (Logger.showLog) {
      console.info(PREFIX, ...rest);
    }
  }

  public static error = (...rest: any): void => {
    if (Logger.showLog) {
      console.error(PREFIX, ...rest);
    }
  }

  public static debug = (...rest: any): void => {
    if (Logger.showLog) {
      console.debug(PREFIX, ...rest);
    }
  }

  public static warn = (...rest: any): void => {
    if (Logger.showLog) {
      console.warn(PREFIX, ...rest);
    }
  }

  public static assert = (...rest: any): void => {
    if (Logger.showLog) {
      console.assert(PREFIX, ...rest);
    }
  }

  public static clear = (): void => {
    if (Logger.showLog) {
      console.clear();
    }
  }

  public static count = (): void => {
    if (Logger.showLog) {
      console.count();
    }
  }

  public static countReset = (): void => {
    if (Logger.showLog) {
      console.countReset();
    }
  }

  public static dir = (): void => {
    if (Logger.showLog) {
      console.dir();
    }
  }

  public static dirxml = (): void => {
    if (Logger.showLog) {
      console.dirxml();
    }
  }

  public static group = (): void => {
    if (Logger.showLog) {
      console.group();
    }
  }

  public static groupCollapsed = (): void => {
    if (Logger.showLog) {
      console.groupCollapsed();
    }
  }

  public static groupEnd = (): void => {
    if (Logger.showLog) {
      console.groupEnd();
    }
  }

  public static log = (...rest: any): void => {
    if (Logger.showLog) {
      console.log(PREFIX, ...rest);
    }
  }

  public static profile = (): void => {
    if (Logger.showLog) {
      console.profile();
    }
  }

  public static profileEnd = (): void => {
    if (Logger.showLog) {
      console.profileEnd();
    }
  }

  public static trace = (): void => {
    if (Logger.showLog) {
      console.trace();
    }
  }
}

export default Logger;