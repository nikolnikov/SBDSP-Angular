import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
    MatNativeDateModule,
    MAT_DATE_FORMATS,
    DateAdapter,
    NativeDateAdapter
} from '@angular/material/core';

// Custom US date format: mm/dd/yyyy
export const QDS_US_DATE_FORMATS = {
    parse: { dateInput: 'input' },
    display: {
        dateInput: 'input',
        // Use object form so NativeDateAdapter treats it distinctly (prevents accidental reuse of 'input')
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: 'MM/dd/yyyy',
        monthYearA11yLabel: 'MMMM yyyy'
    }
};

// Custom adapter that ensures zero-padded month/day for 'input' display format
class QDSNativeDateAdapter extends NativeDateAdapter {
    override format(date: Date, displayFormat: any): string {
        // Ensure only the input token gets full mm/dd/yyyy with leading zeros
        if (displayFormat === 'input') {
            const mm = this._to2(date.getMonth() + 1);
            const dd = this._to2(date.getDate());
            const yyyy = date.getFullYear();
            return `${mm}/${dd}/${yyyy}`;
        }
        // Allow the month/year label object format to pass through to native logic (e.g., 'Oct 2025')
        return super.format(date, displayFormat);
    }

    override parse(value: any): Date | null {
        if (typeof value === 'string' && value.includes('/')) {
            const parts = value.split('/').map(p => p.trim());
            if (parts.length === 3) {
                const [mm, dd, yyyy] = parts;
                const month = Number(mm) - 1;
                const day = Number(dd);
                const year = Number(yyyy);
                if (
                    !isNaN(month) &&
                    !isNaN(day) &&
                    !isNaN(year) &&
                    month >= 0 &&
                    month < 12 &&
                    day > 0 &&
                    day <= 31
                ) {
                    const d = new Date(year, month, day);
                    if (!isNaN(d.getTime())) return d;
                }
            }
        }
        return super.parse(value);
    }

    private _to2(v: number): string {
        return v < 10 ? `0${v}` : `${v}`;
    }
}

@Component({
    selector: 'qds-datepicker',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    template: `
        <ng-container *ngIf="isRange; else singleDate">
            <mat-form-field
                class="ds-input"
                [class]="customClasses"
                [class.--error]="
                    (formControlId &&
                        formControlId.invalid &&
                        formControlId.touched) ||
                    (formControlEndId &&
                        formControlEndId.invalid &&
                        formControlEndId.touched) ||
                    hasError
                "
                [class.mat-form-field-invalid]="
                    (formControlId &&
                        formControlId.invalid &&
                        formControlId.touched) ||
                    (formControlEndId &&
                        formControlEndId.invalid &&
                        formControlEndId.touched) ||
                    hasError
                "
                [class.--required]="isRequired"
                [class.mat-form-field-disabled]="
                    (formControlId && formControlId.disabled) ||
                    (formControlEndId && formControlEndId.disabled) ||
                    isDisabled
                "
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
                        [formControl]="formControlId"
                        [id]="inputId"
                        placeholder="{{ placeholder }}"
                    />
                    <input
                        matEndDate
                        [formControl]="formControlEndId"
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
                    xPosition="end"
                ></mat-date-range-picker>
            </mat-form-field>
        </ng-container>
        <ng-template #singleDate>
            <mat-form-field
                class="ds-input"
                [class]="customClasses"
                [class.--error]="
                    (formControlId &&
                        formControlId.invalid &&
                        formControlId.touched) ||
                    hasError
                "
                [class.mat-form-field-disabled]="
                    (formControlId && formControlId.disabled) ||
                    (formControlEndId && formControlEndId.disabled) ||
                    isDisabled
                "
                [class.--required]="isRequired"
            >
                <mat-label *ngIf="label" class="ds-input__label">
                    <span>{{ label }}</span>
                </mat-label>

                <input
                    matInput
                    placeholder="{{ placeholder }}"
                    value=""
                    [formControl]="formControlId"
                    [id]="inputId"
                    [matDatepicker]="picker"
                    [min]="minDate ? minDate : ''"
                    [max]="maxDate ? maxDate : ''"
                />

                <mat-datepicker-toggle
                    matSuffix
                    [for]="picker"
                ></mat-datepicker-toggle>

                <mat-datepicker
                    [panelClass]="panelClasses"
                    #picker
                    xPosition="end"
                ></mat-datepicker>
            </mat-form-field>
        </ng-template>

        <ng-container *ngIf="isRange; else singleDateMessages">
            <div *ngIf="hintMessage && !errorMessage" class="ds-input__hint">
                {{ hintMessage }}
            </div>

            <div
                *ngIf="
                    (formControlId &&
                        formControlId.invalid &&
                        formControlId.touched) ||
                    (formControlEndId &&
                        formControlEndId.invalid &&
                        formControlEndId.touched &&
                        errorMessage)
                "
                class="ds-input__error"
            >
                {{ errorMessage }}
            </div>
        </ng-container>
        <ng-template #singleDateMessages>
            <div *ngIf="hintMessage && !errorMessage" class="ds-input__hint">
                {{ hintMessage }}
            </div>

            <div
                *ngIf="
                    formControlId &&
                    formControlId.invalid &&
                    formControlId.touched &&
                    errorMessage
                "
                class="ds-input__error"
            >
                {{ errorMessage }}
            </div>
        </ng-template>
    `,
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: QDS_US_DATE_FORMATS },
        { provide: DateAdapter, useClass: QDSNativeDateAdapter }
    ]
})
export class QDSDatepickerComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() formControlId: FormControl = new FormControl();
    @Input() formControlEndId: FormControl = new FormControl();
    @Input() errorMessage: string = '';
    @Input() hasError: boolean = false;
    @Input() hintMessage: string = '';
    @Input() inputId: string = '';
    @Input() endInputId: string = '';
    @Input() isDisabled: boolean = false;
    @Input() isRange: boolean = false;
    @Input() isRequired: boolean = false;
    @Input() label: string = '';
    @Input() maxDate: Date | null = null;
    @Input() minDate: Date | null = null;
    @Input() panelClasses: string = '';
    @Input() placeholder: string = '';

    @Output() getSelection = new EventEmitter<any>();

    onSelectionChange(selection: any) {
        this.getSelection.emit(selection);
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
