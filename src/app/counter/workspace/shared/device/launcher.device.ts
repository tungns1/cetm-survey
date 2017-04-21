import { Injectable } from '@angular/core';
import { QmsService, XWinRectangle } from './shared';

@Injectable()
export class LauncherService {

  constructor(
    private qmsService: QmsService
  ) { }

  SetMiniMode(ratio: XWinRectangle) {
    this.qmsService.__x.SetMiniMode(ratio);
  }

}
