import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'qds-toggle',
    template: `
        <mat-slide-toggle
            class="ds-toggle-switch"
            [class]="customClasses"
            [class.--disabled]="isDisabled"
            [id]="inputId"
            [labelPosition]="labelPosition"
            [attr.aria-label]="label"
            [checked]="isChecked"
        >
            {{ label }}
        </mat-slide-toggle>
    `
})
export class QDSToggleComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() inputId: string = '';
    @Input() isChecked: boolean = false;
    @Input() isDisabled: boolean = false;
    @Input() label: string = '';
    @Input() labelPosition: 'before' | 'after' = 'after';

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
