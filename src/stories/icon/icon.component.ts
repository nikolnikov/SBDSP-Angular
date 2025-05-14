import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'qds-icon',
    template: `
        <span
            [ngClass]="getIconClasses()"
            [attr.aria-label]="name"
            role="img"
        ></span>
    `
})
export class QDSIconComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() color: string = '';
    @Input() matPrefix: boolean = false;
    @Input() matSuffix: boolean = false;
    @Input() name: string = '';
    @Input() size: string = '';

    getIconClasses() {
        return {
            [`ds-icon--${this.name}`]: !!this.name,
            [this.customClasses]: !!this.customClasses,
            [this.getColor()]: !!this.color,
            [this.getSize()]: !!this.size,
            [`matPrefix`]: !!this.matPrefix,
            [`matSuffix`]: !!this.matSuffix
        };
    }

    getColor() {
        return `ds-${this.color}`;
    }

    getSize() {
        return `ds-font-${this.size}`;
    }

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
