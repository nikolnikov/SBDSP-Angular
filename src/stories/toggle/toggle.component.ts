import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
    selector: 'qds-toggle',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatSlideToggleModule],
    template: `
        <mat-slide-toggle
            class="ds-toggle-switch"
            [class]="customClasses"
            [class.--disabled]="formControlId.disabled || isDisabled"
            [checked]="isChecked"
            [formControl]="formControlId"
            [id]="inputId"
            [labelPosition]="labelPosition"
            [attr.aria-label]="label"
        >
            {{ label }}
        </mat-slide-toggle>
    `
})
export class QDSToggleComponent implements AfterViewInit {
    @Input() formControlId: FormControl = new FormControl();
    @Input() customClasses: string = '';
    @Input() inputId: string = '';
    @Input() isChecked: boolean = false;
    @Input() isDisabled: boolean = false;
    @Input() label: string = '';
    @Input() labelPosition: 'before' | 'after' = 'after';

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
