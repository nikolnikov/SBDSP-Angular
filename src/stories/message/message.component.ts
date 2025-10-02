import {
    Component,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    Renderer2,
    AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { QDSIconComponent } from '../icon/icon.component';
import { QDSLinkComponent } from '../link/link.component';
import { QDSIconButtonComponent } from '../button/icon-button.component';

@Component({
    selector: 'qds-message',
    standalone: true,
    imports: [
        CommonModule,
        QDSIconComponent,
        QDSLinkComponent,
        QDSIconButtonComponent
    ],
    template: `
        <div
            [ngClass]="['ds-message', '--' + type, customClasses]"
            role="alert"
        >
            <div *ngIf="!noIcon" class="ds-message__icon">
                <qds-icon [name]="getIconName()" />
            </div>

            <div class="ds-message__content">
                <h3 *ngIf="title">{{ title }}</h3>

                {{ message }}

                <div *ngIf="actions.length > 0" class="ds-message__actions">
                    <qds-link
                        *ngFor="let action of actions; let i = index"
                        [url]="action.action"
                        [label]="action.label"
                    />
                </div>
            </div>

            <div *ngIf="!hideX" class="ds-message__close">
                <qds-icon-button
                    icon="close"
                    (clickHandler)="onClose()"
                    size="md"
                ></qds-icon-button>
            </div>
        </div>
    `
})
export class QDSMessageComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() actions: any[] = [];
    @Input() hideX: boolean = false;
    @Input() message: string = '';
    @Input() noIcon: boolean = false;
    @Input() title: string = '';
    @Input() type: 'informative' | 'success' | 'warning' | 'error' =
        'informative';

    @Output() closeHandler = new EventEmitter<void>();

    onClose() {
        this.closeHandler.emit();
    }

    getIconName(): string {
        const iconType = {
            informative: 'info',
            success: 'check-circle',
            warning: 'warning',
            error: 'warning-octagon'
        };

        return iconType[this.type] || 'info';
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
