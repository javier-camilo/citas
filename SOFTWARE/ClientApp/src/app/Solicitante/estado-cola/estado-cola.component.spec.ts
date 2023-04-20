import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoColaComponent } from './estado-cola.component';

describe('EstadoColaComponent', () => {
  let component: EstadoColaComponent;
  let fixture: ComponentFixture<EstadoColaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoColaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoColaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
