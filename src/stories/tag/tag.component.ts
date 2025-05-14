import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'qds-tag',
    template: `
        <button
            class="ds-tag"
            [class]="customClasses"
            [class.--secondary]="isSecondary"
            [class.--disabled]="isDisabled"
            [class.--selected]="isSelected"
            (click)="onTagClick()"
            [attr.aria-label]="label"
        >
            {{ label }}

            <span *ngIf="showClose" class="ds-icon--close"></span>
        </button>
    `
})
export class QDSTagComponent implements AfterViewInit {
    @Input() clickHandler: () => void = () => {};
    @Input() customClasses: string = '';
    @Input() isDisabled: boolean = false;
    @Input() isSecondary: boolean = false;
    @Input() label: string = '';
    @Input() showClose: boolean = false;

    isSelected: boolean = false;

    onTagClick() {
        if (this.isDisabled) {
            return;
        }

        this.isSelected = !this.isSelected;
        this.clickHandler();
    }

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
