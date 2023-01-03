import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlhethongComponent } from './qlhethong.component';

describe('QlhethongComponent', () => {
  let component: QlhethongComponent;
  let fixture: ComponentFixture<QlhethongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlhethongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlhethongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
