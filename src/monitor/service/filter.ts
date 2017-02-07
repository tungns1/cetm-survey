import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



const FilterModeSummary = "SUMMARY";

@Injectable()
export class FilterService {
    private mode: string;

    constructor(private router: Router) {

    }

    SummaryMode() {
        this.mode = FilterModeSummary;
    }

    Refresh(branches: string[]) {
        switch (this.mode) {
            case FilterModeSummary:
                this.router.navigate(["/ticket/summary", branches.join(",")]);
                return;
        }
    }
}