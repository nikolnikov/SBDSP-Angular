import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'qds-sidesheet',
    template: `
        <div
            class="ds-sidesheet"
            [ngClass]="{ '--opened': toggleSidesheet }"
            (scroll)="onSidesheetScroll($event)"
        >
            <div class="ds-sidesheet__header">
                <span *ngIf="title">{{ title }}</span>

                <button
                    class="ds-button --icon"
                    aria-label="close"
                    (click)="closeSidesheet()"
                >
                    <span class="ds-icon--close"></span>
                </button>
            </div>

            <div class="ds-sidesheet__content">
                <ng-content></ng-content>
            </div>
        </div>

        <div
            class="ds-overlay"
            [class]="customClasses"
            [ngClass]="{ '--opened': toggleSidesheet }"
            (click)="closeSidesheet()"
        ></div>
    `
})
export class QDSSidesheetComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() title: string = '';
    @Input() toggleSidesheet: boolean = false;
    @Output() openSidesheet = new EventEmitter<boolean>();

    openSidehseet: boolean = false;

    closeSidesheet() {
        this.toggleSidesheet = !this.toggleSidesheet;
        this.openSidesheet.emit(this.toggleSidesheet);
    }

    onSidesheetScroll(event: Event) {
        const elem = event.currentTarget as HTMLElement;

        if (!elem) {
            return;
        }

        const dsSidesheet = document.querySelector('.ds-sidesheet');
        const dsSidesheetHeader = document.querySelector(
            '.ds-sidesheet__header'
        );

        if (dsSidesheet) {
            dsSidesheet.addEventListener('scroll', function () {
                const sidesheetScrollTop = elem.scrollTop;

                if (sidesheetScrollTop > 0) {
                    dsSidesheetHeader?.classList.add('--scrolled');
                } else {
                    dsSidesheetHeader?.classList.remove('--scrolled');
                }
            });
        }
    }

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
