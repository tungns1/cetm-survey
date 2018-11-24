import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Optional } from 'ag-grid';
import { BookingService } from '../../shared/service/booking-service.service';
import { ModalComponent } from '../../shared';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {

    constructor(
        private dialog: MatDialog,
        private bookingService: BookingService,
        @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
    ) { }
    data = {};
    manager$ = this.bookingService.listManager$;
    @ViewChild(ModalComponent) modal: ModalComponent;

    ngOnInit() {
        this.data = this.dialogData;
        this.bookingService.getStoreManager(this.dialogData.branch_id);
        // console.log(this.data)
    }

    
    Close() {
        this.dialog.closeAll();
    }

}
