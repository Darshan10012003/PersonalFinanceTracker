import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawAndDepositeByCashComponent } from './withdraw-and-deposite-by-cash.component';

describe('WithdrawAndDepositeByCashComponent', () => {
  let component: WithdrawAndDepositeByCashComponent;
  let fixture: ComponentFixture<WithdrawAndDepositeByCashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawAndDepositeByCashComponent]
    });
    fixture = TestBed.createComponent(WithdrawAndDepositeByCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
