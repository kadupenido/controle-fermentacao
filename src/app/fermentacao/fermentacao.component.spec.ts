import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermentacaoComponent } from './fermentacao.component';

describe('FermentacaoComponent', () => {
  let component: FermentacaoComponent;
  let fixture: ComponentFixture<FermentacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FermentacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FermentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
