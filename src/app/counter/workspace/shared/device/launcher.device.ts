import { Injectable } from '@angular/core';
import { QmsService, XWinMiniMode } from './shared';

@Injectable()
export class LauncherService {

  constructor(
    private qmsService: QmsService
  ) { }

  SetMiniMode(mode: XWinMiniMode) {
    if (!mode.enable) return;
    const rect = mode.rect;
    rect.height = this.ratio(rect.height);
    rect.width = this.ratio(rect.width);
    this.qmsService.__x.SetMiniMode(mode.rect, true, mode.options);
  }

  private ratio(v: number) {
    if (v < 0.01 || v >= 1) {
      v = 0.2;
    } 
    return v;
  }
  
}
