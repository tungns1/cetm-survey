import { Injectable } from '@angular/core';
import { QmsService, XWinMiniMode } from './shared';

@Injectable()
export class LauncherService {

  constructor(
    private qmsService: QmsService
  ) { }

  SetMiniMode(mode: XWinMiniMode) {
    if (!mode || !mode.enable) return;
    const rect = mode.rect || {};
    this.qmsService.__x.initWindow(mode.options);
    this.qmsService.__x.SetMiniMode(mode.rect, mode.enable, mode.options);
  }
  
}
