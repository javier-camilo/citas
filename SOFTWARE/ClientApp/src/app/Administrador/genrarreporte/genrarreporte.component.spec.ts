import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrarreporteComponent } from './genrarreporte.component';

describe('GenrarreporteComponent', () => {
  let component: GenrarreporteComponent;
  let fixture: ComponentFixture<GenrarreporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenrarreporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenrarreporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
