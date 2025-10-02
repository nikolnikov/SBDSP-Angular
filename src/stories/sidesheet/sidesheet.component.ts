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
import { QDSIconButtonComponent } from '../button/icon-button.component';
import { QDSOverlayComponent } from '../overlay/overlay.component';

@Component({
    selector: 'qds-sidesheet',
    standalone: true,
    imports: [CommonModule, QDSIconButtonComponent, QDSOverlayComponent],
    template: `
        <div
            class="ds-sidesheet"
            [ngClass]="{ '--opened': toggleSidesheet, '--chatbot': isChatbot }"
            (scroll)="onSidesheetScroll($event)"
        >
            <div class="ds-sidesheet__header" *ngIf="!isChatbot">
                <span *ngIf="title">{{ title }}</span>

                <qds-icon-button
                    icon="close"
                    (clickHandler)="closeSidesheet()"
                />
            </div>

            <div [ngClass]="{ 'ds-sidesheet__content': !isChatbot }">
                <ng-content></ng-content>
            </div>
        </div>

        <qds-overlay
            [isOpen]="toggleSidesheet"
            (clickHandler)="closeSidesheet()"
        />
    `
})
export class QDSSidesheetComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() isChatbot: boolean = false;
    @Input() title: string = '';
    @Input() toggleSidesheet: boolean = false;
    @Output() openSidesheet = new EventEmitter<boolean>();

    closeSidesheet() {
        this.toggleSidesheet = !this.toggleSidesheet;
        this.openSidesheet.emit(this.toggleSidesheet);
    }

    onSidesheetScroll(event: Event) {
        const container = event.currentTarget as HTMLElement | null;
        if (!container) return;

        const header: HTMLElement | null = this.el.nativeElement.querySelector(
            '.ds-sidesheet__header'
        );

        if (!header) return;

        const scrollTop = container.scrollTop;
        if (scrollTop > 0) {
            this.renderer.addClass(header, '--scrolled');
        } else {
            this.renderer.removeClass(header, '--scrolled');
        }
    }

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
