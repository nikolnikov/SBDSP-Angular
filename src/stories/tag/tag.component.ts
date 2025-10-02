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
    selector: 'qds-tag',
    standalone: true,
    imports: [CommonModule],
    template: `
        <button
            class="ds-tag"
            [class]="customClasses"
            [class.--secondary]="isSecondary"
            [class.--disabled]="isDisabled"
            [class.--selected]="isSelected"
            (click)="handleClick($event)"
            [attr.aria-label]="label"
        >
            {{ label }}

            <span
                *ngIf="showClose"
                class="ds-icon--close"
                role="button"
                aria-label="Dismiss"
                (click)="handleHide($event)"
            ></span>
        </button>
    `
})
export class QDSTagComponent implements AfterViewInit {
    @Input() customClasses: string = '';

    @Input() isDisabled: boolean = false;
    @Input() isSecondary: boolean = false;
    @Input() label: string = '';
    @Input() showClose: boolean = false;

    @Output() clickHandler = new EventEmitter<MouseEvent>();
    @Output() hideHandler = new EventEmitter<MouseEvent>();

    handleClick(event: MouseEvent): void {
        if (!this.isDisabled) {
            this.isSelected = !this.isSelected;
            this.clickHandler.emit(event);
        }
    }

    handleHide(event: MouseEvent): void {
        event.stopPropagation();
        if (!this.isDisabled) {
            this.isSelected = !this.isSelected;
            this.hideHandler.emit(event);
        }
    }

    isSelected: boolean = false;

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
