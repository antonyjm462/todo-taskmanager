import { TestBed } from '@angular/core/testing';

import { SlackserviceService } from './slackservice.service';

describe('SlackserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SlackserviceService = TestBed.get(SlackserviceService);
    expect(service).toBeTruthy();
  });
});
