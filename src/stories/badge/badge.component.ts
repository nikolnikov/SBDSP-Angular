import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'qds-badge',
    template: `
        <div
            class="ds-badge"
            [class]="customClasses"
            [ngClass]="getColor()"
            [ngClass]="getStatus()"
            [class.--circle]="isCircle"
            [class.--secondary]="secondary"
            [class.--dot]="hasNotification"
            [class.--neutral]="!status"
            role="status"
        >
            {{ label }}
        </div>
    `
})
export class QDSBadgeComponent implements AfterViewInit {
    @Input() color: string = '';
    @Input() customClasses: string = '';
    @Input() hasNotification: boolean = false;
    @Input() isCircle: boolean = false;
    @Input() label: string = '';
    @Input() secondary: boolean = false;
    @Input() status:
        | 'neutral'
        | 'informative'
        | 'success'
        | 'warning'
        | 'error'
        | 'new' = 'neutral';

    getColor() {
        return `--${this.color}`;
    }

    getStatus() {
        return `--${this.status}`;
    }

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
