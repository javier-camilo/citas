import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarhorarioComponent } from './consultarhorario.component';

describe('ConsultarhorarioComponent', () => {
  let component: ConsultarhorarioComponent;
  let fixture: ComponentFixture<ConsultarhorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarhorarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarhorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
