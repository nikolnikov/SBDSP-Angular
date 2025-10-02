import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'qds-overlay',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div
            class="ds-overlay"
            [class]="customClasses"
            [ngClass]="{ '--opened': isOpen }"
            (click)="backdropClickable && clickHandler.emit($event)"
        ></div>
    `
})
export class QDSOverlayComponent implements AfterViewInit {
    @Input() backdropClickable: boolean = true;
    @Input() customClasses: string = '';
    @Input() isOpen: boolean = false;
    @Output() clickHandler = new EventEmitter<Event>();

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {}

    ngAfterViewInit() {
        this.updateHtmlClass();

        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }

    ngOnChanges() {
        this.updateHtmlClass();
    }

    private updateHtmlClass() {
        const htmlElement = document.documentElement;

        if (this.isOpen) {
            const scrollTop = window.scrollY || htmlElement.scrollTop;

            this.renderer.addClass(htmlElement, 'cdk-global-scrollblock');

            this.renderer.setStyle(htmlElement, 'top', `-${scrollTop}px`);
            this.renderer.setStyle(htmlElement, 'position', 'fixed');
        } else {
            this.renderer.removeClass(htmlElement, 'cdk-global-scrollblock');

            const scrollTop = Math.abs(
                parseInt(htmlElement.style.top || '0', 10)
            );

            this.renderer.removeStyle(htmlElement, 'top');
            this.renderer.removeStyle(htmlElement, 'position');
            window.scrollTo(0, scrollTop);
        }
    }
}
