import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegsitroSolicitanteComponent } from './regsitro-solicitante.component';

describe('RegsitroSolicitanteComponent', () => {
  let component: RegsitroSolicitanteComponent;
  let fixture: ComponentFixture<RegsitroSolicitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegsitroSolicitanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegsitroSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
