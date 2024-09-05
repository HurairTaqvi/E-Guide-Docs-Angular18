import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashwaveComponent } from './cashwave.component';

describe('CashwaveComponent', () => {
  let component: CashwaveComponent;
  let fixture: ComponentFixture<CashwaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashwaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashwaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
