import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareCampsComponent } from './compare-camps.component';

describe('CompareCampsComponent', () => {
  let component: CompareCampsComponent;
  let fixture: ComponentFixture<CompareCampsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompareCampsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareCampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
