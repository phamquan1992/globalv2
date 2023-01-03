import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsystemComponent } from './logsystem.component';

describe('LogsystemComponent', () => {
  let component: LogsystemComponent;
  let fixture: ComponentFixture<LogsystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogsystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
