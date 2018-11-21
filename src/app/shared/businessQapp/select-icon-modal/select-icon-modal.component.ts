import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-select-icon-modal',
  templateUrl: './select-icon-modal.component.html',
  styleUrls: ['./select-icon-modal.component.scss']
})
export class SelectIconModalComponent implements OnInit {

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData,
    private dialog: MatDialogRef<any>
  ) { }

  iconList: string[] = [];
  selectedIcon: string = null;
  doubleClickCount: number = 0;

  ngOnInit() {
    this.iconList = this.dialogData.iconList;
    this.selectedIcon = this.dialogData.selected;
  }

  Save() {
    this.dialog.close(this.selectedIcon);
  }

  Cancel() {
    this.dialog.close(null)
  }

  selectIcon(iconIndex) {
    this.doubleClickCount++;
    setTimeout(_ => {
      this.doubleClickCount = 0;
    }, 200)
    this.selectedIcon = this.iconList[iconIndex];
    if (this.doubleClickCount === 2) {
      this.Save();
    }
  }

}
