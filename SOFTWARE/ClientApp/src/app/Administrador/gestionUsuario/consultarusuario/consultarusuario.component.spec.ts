import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarusuarioComponent } from './consultarusuario.component';

describe('ConsultarusuarioComponent', () => {
  let component: ConsultarusuarioComponent;
  let fixture: ComponentFixture<ConsultarusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarusuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
