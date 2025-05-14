import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'qds-divider',
    template: ` <hr [class]="customClasses" [ngClass]="getColor()" /> `
})
export class QDSDividerComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() color: string = '';

    getColor() {
        return this.color ? `ds-${this.color}--bg` : '';
    }

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
