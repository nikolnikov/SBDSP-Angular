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
    selector: 'qds-avatar',
    template: `
        <ng-container *ngIf="isButton; else divTemplate">
            <button
                class="ds-avatar"
                [ngClass]="getSize()"
                [class]="customClasses"
                [class.--disabled]="isDisabled"
                [class.--notification]="hasNotification"
                [class.--solid]="!isOutlined"
                [class.--outlined]="isOutlined"
                (click)="onClick($event)"
            >
                {{ initial }}
            </button>
        </ng-container>
        <ng-template #divTemplate>
            <div
                class="ds-avatar"
                [ngClass]="getSize()"
                [class]="customClasses"
                [class.--disabled]="isDisabled"
                [class.--notification]="hasNotification"
                [class.--solid]="!isOutlined"
                [class.--outlined]="isOutlined"
            >
                {{ initial }}
            </div>
        </ng-template>
    `
})
export class QDSAvatarComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() isButton: boolean = false;
    @Input() isDisabled: boolean = false;
    @Input() isOutlined: boolean = false;
    @Input() hasNotification: boolean = false;
    @Input() initial: string = '';
    @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'lg';

    @Output() clickHandler = new EventEmitter<Event>();

    onClick(event: Event) {
        this.clickHandler.emit(event);
    }

    getSize() {
        return `--${this.size}`;
    }

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
