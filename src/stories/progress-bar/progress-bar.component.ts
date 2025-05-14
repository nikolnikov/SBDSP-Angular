import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'qds-progress-bar',
    template: `
        <div
            class="ds-progressbar"
            [class]="customClasses"
            role="progressbar"
            aria-label="Progress"
        >
            <div
                class="--fill"
                [ngStyle]="{ width: fillPercentage + '%' }"
            ></div>
        </div>
    `
})
export class QDSProgressBarComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() fillPercentage: string = '50';

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
