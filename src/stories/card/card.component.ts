import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'qds-card',
    template: `
        <div class="ds-card" [class]="customClasses">
            <div class="ds-card__content">
                <h3 *ngIf="title">{{ title }}</h3>
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class QDSCardComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() title: string = '';

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
