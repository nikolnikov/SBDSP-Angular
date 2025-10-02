import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'qds-progress-bar',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="ds-progressbar" [class]="customClasses" role="progressbar">
            <div
                class="--fill"
                [ngStyle]="{ width: fillPercentage + '%' }"
                aria-label="Progress"
            ></div>
        </div>
    `
})
export class QDSProgressBarComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() fillPercentage: string = '50';

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
