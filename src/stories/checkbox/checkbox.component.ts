import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'qds-checkbox',
    standalone: true,
    imports: [MatCheckboxModule],
    template: `
        <mat-checkbox
            class="ds-input__checkbox"
            [class]="customClasses"
            [class.mat-mdc-checkbox-checked]="isChecked"
            [class.mdc-checkbox--disabled]="
                formControlId?.disabled || isDisabled
            "
            [class.--required]="isRequired"
            [class.mat-checkbox-indeterminate]="isIndeterminate"
            [id]="inputId"
            [name]="name"
        >
            {{ label }}
        </mat-checkbox>
    `
})
export class QDSCheckboxComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() inputId: string = '';
    @Input() isChecked: boolean = false;
    @Input() isDisabled: boolean = false;
    @Input() isRequired: boolean = false;
    @Input() isIndeterminate: boolean = false;
    @Input() label: string = '';
    @Input() name: string = '';

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
