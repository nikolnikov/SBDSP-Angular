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
import { QDSLoaderComponent } from '../loader/loader.component';

@Component({
    selector: 'qds-input',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        QDSIconComponent,
        QDSLoaderComponent
    ],
    template: `
        <mat-form-field
            class="ds-input"
            [class]="customClasses"
            [class.--error]="hasError"
            [class.mat-form-field-disabled]="isDisabled"
            [class.--loading]="isLoading"
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
            <qds-icon
                *ngIf="iconLeft"
                class="ds-input__icon --left"
                name="{{ iconLeft }}"
                [matPrefix]="true"
            />
            <input
                matInput
                [id]="inputId"
                [formControl]="formControlId"
                [placeholder]="placeholder"
                [required]="isRequired"
                [type]="type"
                [value]="formControlId.value"
                (change)="onChange($event)"
            />
            <qds-icon
                *ngIf="iconRight"
                class="ds-input__icon --right"
                name="{{ iconRight }}"
                [matSuffix]="true"
            />
            <span *ngIf="isLoading && !iconRight" matSuffix>
                <qds-loader [isSmall]="true" />
            </span>

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
export class QDSInputComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() errorMessage: string = '';
    @Input() formControlId: FormControl = new FormControl();
    @Input() hasError: boolean = false;
    @Input() hintMessage: string = '';
    @Input() inputId: string = '';
    @Input() isDisabled: boolean = false;
    @Input() isLoading: boolean = false;
    @Input() isRequired: boolean = false;
    @Input() label: string = '';
    @Input() iconLeft: string = '';
    @Input() iconRight: string = '';
    @Input() onChange: Function = () => {};
    @Input() placeholder: string = '';
    @Input() tooltip: string = '';
    @Input() type: string = 'text';

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
