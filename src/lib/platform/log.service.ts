import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  constructor() { }

  Error(...args) {
    console.error(args);
  }

  Debug(...args) {
    console.log("[DEBUG]", ...args);
  }

  Info(...args) {
    console.info(args);
  }

  Tag(tag: string, debug = false) {
    return new TagLog(tag, debug, this);
  }
}

export class TagLog extends LogService {
  constructor(
    private tag: string,
    private debug: boolean,
    private logService: LogService
  ) {
    super();
  }

  Error(...args) {
    this.logService.Error(this.Tag, ...args);
  }

  Debug(...args) {
    if (this.debug) {
      this.logService.Debug(this.tag, ...args);
    }
  }

  Info(...args) {
    this.logService.Info(this.tag, ...args);
  }

}
