import { TestBed } from '@angular/core/testing';

import { FermentacaoService } from './fermentacao.service';

describe('FermentacaoService', () => {
  let service: FermentacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FermentacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
