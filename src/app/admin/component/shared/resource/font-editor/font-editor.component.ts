import { Component, Optional, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UI } from '../shared';

@Component({
  selector: 'app-font-editor',
  templateUrl: './font-editor.component.html',
  styleUrls: ['./font-editor.component.scss']
})
export class FontEditorComponent {
  /**
   * Safely clone the obj
   * @param obj the given object
   */
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: UI,
    private dialog: MatDialogRef<UI>,
    private dialogEditTemp: MatDialog
  ) { }

  data: UI;

  ngOnInit() {
    this.data = this.dialogData;
  }

  Save() {
    this.dialog.close(this.data);
  }

  Cancel() {
    this.dialog.close(null)
  }

}