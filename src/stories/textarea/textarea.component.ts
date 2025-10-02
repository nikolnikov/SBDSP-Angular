import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QDSIconComponent } from '../icon/icon.component';

@Component({
    selector: 'qds-textarea',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        QDSIconComponent
    ],
    template: `
        <mat-form-field
            class="ds-textarea"
            [class]="customClasses"
            [class.--disabled]="isDisabled"
            [class.--error]="hasError"
            [class.--required]="isRequired"
        >
            <mat-label *ngIf="label" class="ds-input__label">
                <span>{{ label }}</span>

                <button
                    *ngIf="tooltip"
                    class="ds-tooltip ds-button --icon --sm"
                    aria-label="button text"
                    matTooltip="{{ tooltip }}"
                    matTooltipPosition="above"
                >
                    <qds-icon name="info" />
                </button>
            </mat-label>

            <textarea
                matInput
                [id]="inputId"
                [formControl]="formControlId"
                [placeholder]="placeholder"
                [required]="isRequired"
                [value]="formControlId.value"
                (change)="onChange($event)"
            ></textarea>

            <div *ngIf="hintMessage" class="ds-input__hint">
                {{ hintMessage }}
            </div>

            <div
                *ngIf="
                    formControlId &&
                    formControlId.invalid &&
                    formControlId.touched
                "
                class="ds-input__error"
            >
                {{ errorMessage }}
            </div>
        </mat-form-field>
    `
})
export class QDSTextareaComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() errorMessage: string = '';
    @Input() formControlId: FormControl = new FormControl();
    @Input() hasError: boolean = false;
    @Input() hintMessage: string = '';
    @Input() inputId: string = '';
    @Input() isDisabled: boolean = false;
    @Input() isRequired: boolean = false;
    @Input() label: string = '';
    @Input() onChange: Function = () => {};
    @Input() placeholder: string = '';
    @Input() tooltip: string = '';

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
