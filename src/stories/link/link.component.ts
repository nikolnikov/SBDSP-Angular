import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'qds-link',
    template: `
        <a
            class="ds-link"
            [ngClass]="customClasses"
            [class.--destructive]="isDestructive"
            [class.--inverse]="isInverse"
            [class.--icons]="iconLeft || iconRight"
            [href]="url"
            [target]="newWindow ? '_blank' : '_self'"
        >
            <span *ngIf="iconLeft" class="ds-icon--{{ iconLeft }}"></span>

            <ng-container *ngIf="iconLeft || iconRight; else noIcon">
                <span>{{ label }}</span>
            </ng-container>

            <ng-template #noIcon>
                {{ label }}
            </ng-template>

            <span *ngIf="iconRight" class="ds-icon--{{ iconRight }}"></span>
        </a>
    `
})
export class QDSLinkComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() iconLeft: string = '';
    @Input() iconRight: string = '';
    @Input() isDestructive: boolean = false;
    @Input() isInverse: boolean = false;
    @Input() label: string = '';
    @Input() newWindow: boolean = false;
    @Input() url: string = '';

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
