import { TestBed } from '@angular/core/testing';

import { ArtistRequestService } from './artist-request.service';

describe('ArtistRequestService', () => {
  let service: ArtistRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
