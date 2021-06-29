import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneIssueComponent } from './one-issue.component';

describe('OneIssueComponent', () => {
  let component: OneIssueComponent;
  let fixture: ComponentFixture<OneIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
