import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../../core/animations/route.animations';
import { CertifCreateService } from '../../certif-create.service';

@Component({
  selector: 'x-certif-chip',
  template: `
    <mat-form-field class="chip-list" appearance="fill">
      <mat-label>{{ title }}</mat-label>
      <mat-chip-list #chipList>
        <mat-chip
          *ngFor="let item of items"
          [selectable]="selectable"
          [removable]="removable"
          (removed)="remove(item)"
        >
          {{ item }}
          <button #remove matChipRemove *ngIf="removable">
            <mat-icon><fa-icon [icon]="faTimes" size="1x"></fa-icon></mat-icon>
          </button>
        </mat-chip>
        <input
          placeholder="Add {{ title }}..."
          #itemInput
          (focus)="refresh()"
          [formControl]="formCtrl"
          [matAutocomplete]="auto"
          [matChipInputFor]="chipList"
          [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
          (matChipInputTokenEnd)="add($event)"
        />
      </mat-chip-list>
      <mat-autocomplete
        #auto="matAutocomplete"
        (optionSelected)="selected($event)"
      >
        <mat-option *ngFor="let item of filteredItems | async" [value]="item">
          {{ item }}
        </mat-option>
      </mat-autocomplete>
    </mat-form-field>
  `,
  styles: [
    `
      .chip-list {
        width: 100%;
      }
      #action {
        margin: 20px 10px 0 0;
      }
      #remove {
        display: flex;
        margin: 0px 0px 0 10px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertifChipComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  @Output() selectEvent = new EventEmitter<string[]>();
  @Input() fullItems: string[]; // Doesn't change. Contain the full list
  @Input() selectedItems: string[]; // the entry selected list
  @Input() title: string;

  allItems: string[]; // items in the autocomplete -
  items: string[] = []; // The final selected list

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  formCtrl = new FormControl();
  filteredItems: Observable<string[]>;

  faTimes = faTimes;

  constructor(
    private fb: FormBuilder,
    private certifCreateService: CertifCreateService
  ) {}

  ngOnInit() {
    this.formCtrl.setValue(null);
  }

  ngOnChanges() {
    console.log(JSON.stringify(this.fullItems));
    if (this.fullItems == null) {
      this.formCtrl.setValue(null);
      this.items = [];
      return;
    }
    this.filteredItems = this.formCtrl.valueChanges.pipe(
      map((item: string | null) =>
        item ? this._filter(item) : this.allItems.slice()
      )
    );
    // Clean up state
    this.formCtrl.setValue(null);
    this.allItems = [...this.fullItems];
    this.items = [];
    // Add selected items
    if (this.selectedItems) this.selectedItems.forEach((i) => this.addValue(i));
  }

  add(event: MatChipInputEvent): void {
    this.addValue(event.value);
  }

  // Called when "enter" is pressed
  addValue(v: string): void {
    if (!v) return;

    let value = (v || '').trim();
    //UpperCase first letter for matching
    value = value.charAt(0).toUpperCase() + value.slice(1);

    //Select the first item that match with the provided string
    let b = true;
    this.allItems.forEach((v) => {
      if (v.substring(0, value.length) == value && b) {
        value = v;
        b = false;
      }
    });

    if (value && this.allItems.indexOf(value) != -1) {
      //Add the new item in the list
      this.items.push(value);

      //Remove from fullList
      let i = this.allItems.indexOf(value);
      this.allItems.splice(i, 1);
    }

    // Clear the input value
    //event.chipInput!.clear();
    console.log('addValue completed: ' + v);

    this.refresh();
  }

  remove(item: string): void {
    const index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1);
      // Add to the full list
      this.allItems.push(item);
    }
    // Clear the input value to refresh the list
    this.itemInput.nativeElement.value = '';
    this.formCtrl.setValue(null);
    this.refresh();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let v = event.option.viewValue;
    this.items.push(v);
    //Remove from the full list
    let i = this.allItems.indexOf(v);
    this.allItems.splice(i, 1);

    this.refresh();
  }

  private _filter(value: string): string[] {
    /* if (value === null || value === undefined || value =="")
            return
            */
    if (!value) return;
    const filterValue = value.toLowerCase();
    return this.allItems.filter((item) =>
      item ? item.toLowerCase().includes(filterValue) : null
    );
  }

  // Emit the event to the parent component
  updateCertif() {
    this.selectEvent.emit(this.items);
  }

  refresh() {
    if (this.itemInput) this.itemInput.nativeElement.value = '';
    this.formCtrl.setValue(null);
    this.updateCertif();
  }
}
