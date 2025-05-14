import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2,
    ViewChild
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'qds-tooltip',
    template: `
        <span
            #tooltip="matTooltip"
            matTooltip="{{ message }}"
            [matTooltipPosition]="position"
        >
            <ng-content #trigger></ng-content>
        </span>
    `
})
export class QDSTooltipComponent implements AfterViewInit {
    @Input() message: string = '';
    @Input() position: 'above' | 'below' | 'left' | 'right' = 'above';

    @ViewChild('tooltip', { static: true }) tooltip!: MatTooltip;
    @ViewChild('trigger', { static: true }) trigger!: ElementRef;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
