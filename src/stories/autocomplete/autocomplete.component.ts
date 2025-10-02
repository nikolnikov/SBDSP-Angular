import {
    Component,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    Renderer2,
    AfterViewInit,
    OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
    selector: 'qds-autocomplete',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule
    ],
    template: `
        <div class="ds-input__wrapper">
            <mat-form-field
                class="ds-input"
                [class]="customClasses"
                [class.--disabled]="
                    (formControlId && formControlId.disabled) || isDisabled
                "
                [class.--error]="
                    (formControlId &&
                        formControlId.invalid &&
                        formControlId.touched) ||
                    hasError
                "
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

            <div
                *ngIf="
                    (formControlId &&
                        formControlId.invalid &&
                        formControlId.touched) ||
                    (hasError && errorMessage)
                "
                class="ds-input__error"
            >
                {{ errorMessage }}
            </div>
        </div>
    `,
    styles: [':host { display: block; }']
})
export class QDSAutocompleteComponent implements OnInit, AfterViewInit {
    @Input() customClasses: string = '';
    @Input() formControlId: FormControl = new FormControl();
    @Input() errorMessage: string = '';
    @Input() hintMessage: string = '';
    @Input() hasError: boolean = false;
    @Input() hasIcon: boolean = false;
    @Input() inputId: string = '';
    @Input() isDisabled: boolean = false;
    @Input() isRequired: boolean = false;
    @Input() label: string = '';
    @Input() panelClasses: string = '';
    @Input() placeholder: string = '';
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

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
