import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    Renderer2
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'qds-datepicker',
    imports: [
        CommonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule
    ],
    template: `
        <ng-container *ngIf="isRange; else singleDate">
            <mat-form-field
                class="ds-input"
                [class]="customClasses"
                [class.--error]="hasError"
                [class.mat-form-field-invalid]="hasError"
                [class.--required]="isRequired"
                [class.mat-form-field-disabled]="isDisabled"
            >
                <mat-label *ngIf="label" class="ds-input__label">
                    <span>{{ label }}</span>
                </mat-label>

                <mat-date-range-input
                    [rangePicker]="pickerRange"
                    [min]="minDate ? minDate : ''"
                    [max]="maxDate ? maxDate : ''"
                >
                    <input
                        matStartDate
                        [id]="inputId"
                        placeholder="{{ placeholder }}"
                    />
                    <input
                        matEndDate
                        [id]="endInputId"
                        placeholder="{{ placeholder }}"
                    />
                </mat-date-range-input>

                <mat-datepicker-toggle
                    matSuffix
                    [for]="pickerRange"
                ></mat-datepicker-toggle>
                <mat-date-range-picker
                    [panelClass]="panelClasses"
                    #pickerRange
                ></mat-date-range-picker>

                <div *ngIf="hintMessage" class="ds-input__hint">
                    {{ hintMessage }}
                </div>

                <div *ngIf="errorMessage" class="ds-input__error">
                    {{ errorMessage }}
                </div>
            </mat-form-field>
        </ng-container>
        <ng-template #singleDate>
            <mat-form-field
                class="ds-input"
                [class]="customClasses"
                [class.--error]="hasError"
                [class.mat-form-field-invalid]="hasError"
                [class.--disabled]="isDisabled"
                [class.--required]="isRequired"
            >
                <mat-label *ngIf="label" class="ds-input__label">
                    <span>{{ label }}</span>
                </mat-label>

                <ng-container *ngIf="isSimple; else datepicker">
                    <input
                        matInput
                        placeholder="{{ placeholder }}"
                        value=""
                        [id]="inputId"
                        type="date"
                        [min]="minDate ? minDate : ''"
                        [max]="maxDate ? maxDate : ''"
                    />
                </ng-container>
                <ng-template #datepicker>
                    <input
                        matInput
                        placeholder="{{ placeholder }}"
                        value=""
                        [id]="inputId"
                        [matDatepicker]="picker"
                        [min]="minDate ? minDate : ''"
                        [max]="maxDate ? maxDate : ''"
                    />
                </ng-template>

                <mat-datepicker-toggle
                    *ngIf="!isSimple"
                    matSuffix
                    [for]="picker"
                ></mat-datepicker-toggle>

                <mat-datepicker
                    [panelClass]="panelClasses"
                    #picker
                ></mat-datepicker>

                <div *ngIf="hintMessage" class="ds-input__hint">
                    {{ hintMessage }}
                </div>

                <div *ngIf="errorMessage" class="ds-input__error">
                    {{ errorMessage }}
                </div>
            </mat-form-field>
        </ng-template>
    `
})
export class QDSDatepickerComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() formControlId: FormControl = new FormControl();
    @Input() formControlEndId: FormControl = new FormControl();
    @Input() errorMessage: string = '';
    @Input() hintMessage: string = '';
    @Input() inputId: string = '';
    @Input() endInputId: string = '';
    @Input() hasError: boolean = false;
    @Input() isDisabled: boolean = false;
    @Input() isRange: boolean = false;
    @Input() isRequired: boolean = false;
    @Input() isSimple: boolean = false;
    @Input() label: string = '';
    @Input() maxDate: Date | null = null;
    @Input() minDate: Date | null = null;
    @Input() panelClasses: string = '';
    @Input() placeholder: string = '';

    @Output() getSelection = new EventEmitter<any>();

    onSelectionChange(selection: any) {
        this.getSelection.emit(selection);
    }

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
