import { TestBed, inject } from '@angular/core/testing';

import { SupperCounterTicketService } from './supper-counter-ticket.service';

describe('SupperCounterTicketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupperCounterTicketService]
    });
  });

  it('should be created', inject([SupperCounterTicketService], (service: SupperCounterTicketService) => {
    expect(service).toBeTruthy();
  }));
});
