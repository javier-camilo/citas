import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaSolicitanteComponent } from './consulta-solicitante.component';

describe('ConsultaSolicitanteComponent', () => {
  let component: ConsultaSolicitanteComponent;
  let fixture: ComponentFixture<ConsultaSolicitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaSolicitanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
