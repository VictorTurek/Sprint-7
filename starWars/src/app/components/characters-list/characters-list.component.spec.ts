import { ComponentFixture, TestBed } from '@angular/core/testing';

import { charactersListComponent } from './characters-list.component';

describe('CharactersListComponent', () => {
  let component: charactersListComponent;
  let fixture: ComponentFixture<charactersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [charactersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(charactersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
