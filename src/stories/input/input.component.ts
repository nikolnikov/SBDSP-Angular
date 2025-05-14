import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'qds-input',
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
                    <span class="ds-icon--info"></span>
                </button>
            </mat-label>
            <span
                *ngIf="iconLeft"
                class="ds-icon--{{ iconLeft }} ds-input__icon --left"
                matPrefix
            ></span>
            <input
                matInput
                [id]="inputId"
                [placeholder]="placeholder"
                [required]="isRequired"
                [type]="type"
            />
            <span
                *ngIf="iconRight"
                class="ds-icon--{{ iconRight }} ds-input__icon --right"
                matSuffix
            ></span>
            <span *ngIf="isLoading && !iconRight" matSuffix>
                <qds-loader [isSmall]="true" />
            </span>

            <div *ngIf="hintMessage && !errorMessage" class="ds-input__hint">
                {{ hintMessage }}
            </div>

            <div *ngIf="hasError && errorMessage" class="ds-input__error">
                {{ errorMessage }}
            </div>
        </mat-form-field>
    `
})
export class QDSInputComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() errorMessage: string = '';
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

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
