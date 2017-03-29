import { TestBed, inject } from '@angular/core/testing';

import { ExportExcelService } from './export-excel.service';

describe('ExportExcelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportExcelService]
    });
  });

  it('should ...', inject([ExportExcelService], (service: ExportExcelService) => {
    expect(service).toBeTruthy();
  }));
});
