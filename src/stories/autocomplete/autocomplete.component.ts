import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';

@Component({
    selector: 'qds-autocomplete',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule
    ],
    template: `
        <div class="ds-input__wrapper">
            <mat-form-field
                class="ds-input"
                [class]="customClasses"
                [class.--error]="hasError"
                [class.mat-form-field-disabled]="isDisabled"
                [class.--required]="isRequired"
                [ngStyle]="{ 'max-width.px': maxWidth ? maxWidth : null }"
            >
                <mat-label *ngIf="label" class="ds-input__label">
                    <span>{{ label }}</span>
                </mat-label>
                <span *ngIf="hasIcon" class="ds-icon--search" matPrefix></span>
                <input
                    type="text"
                    matInput
                    [matAutocomplete]="auto"
                    [formControl]="formControlId"
                    [id]="inputId"
                    [placeholder]="placeholder"
                    [required]="isRequired"
                />
                <mat-autocomplete
                    class="ds-dropdown"
                    [class]="panelClasses"
                    #auto="matAutocomplete"
                    (optionSelected)="onSelectionChange($event.option.value)"
                >
                    <mat-option
                        *ngFor="
                            let option of filteredOptions | async;
                            trackBy: trackByOption
                        "
                        class="ds-dropdown__item"
                        [value]="option"
                    >
                        {{ option }}
                    </mat-option>
                </mat-autocomplete>
            </mat-form-field>

            <div *ngIf="hintMessage && !errorMessage" class="ds-input__hint">
                {{ hintMessage }}
            </div>

            <div *ngIf="errorMessage && hasError" class="ds-input__error">
                {{ errorMessage }}
            </div>
        </div>
    `
})
export class QDSAutocompleteComponent {
    @Input() customClasses: string = '';
    @Input() formControlId: FormControl = new FormControl();
    @Input() errorMessage: string = '';
    @Input() hintMessage: string = '';
    @Input() hasError: boolean = false;
    @Input() hasIcon: boolean = false;
    @Input() inputId: string = '';
    @Input() label: string = '';
    @Input() panelClasses: string = '';
    @Input() placeholder: string = '';
    @Input() isDisabled: boolean = false;
    @Input() isRequired: boolean = false;
    @Input() maxWidth: number = 0;
    @Input() options: any[] = [];

    @Output() getSelection = new EventEmitter<any>();

    filteredOptions: Observable<string[]> | undefined;

    trackByOption(index: number, option: string): string {
        return option;
    }

    onSelectionChange(selection: any) {
        this.getSelection.emit(selection);
    }

    ngOnInit() {
        this.filteredOptions = this.formControlId.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || ''))
        );
    }
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option =>
            option.toLowerCase().includes(filterValue)
        );
    }
}
