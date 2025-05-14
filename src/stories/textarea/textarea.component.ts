import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'qds-textarea',
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
                    <span class="ds-icon--info"></span>
                </button>
            </mat-label>

            <textarea
                matInput
                [id]="inputId"
                [placeholder]="placeholder"
                [required]="isRequired"
            ></textarea>

            <div *ngIf="hintMessage && !errorMessage" class="ds-input__hint">
                {{ hintMessage }}
            </div>

            <div *ngIf="hasError && errorMessage" class="ds-input__error">
                {{ errorMessage }}
            </div>
        </mat-form-field>
    `
})
export class QDSTextareaComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() errorMessage: string = '';
    @Input() hasError: boolean = false;
    @Input() hintMessage: string = '';
    @Input() inputId: string = '';
    @Input() isDisabled: boolean = false;
    @Input() isRequired: boolean = false;
    @Input() label: string = '';
    @Input() onChange: Function = () => {};
    @Input() placeholder: string = '';
    @Input() tooltip: string = '';

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
