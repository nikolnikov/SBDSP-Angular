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
import { MatMenuModule } from '@angular/material/menu';
import { QDSIconComponent } from '../icon/icon.component';
import { QDSTooltipComponent } from '../tooltip/tooltip.component';

@Component({
    selector: 'qds-icon-button',
    standalone: true,
    imports: [
        CommonModule,
        MatMenuModule,
        QDSIconComponent,
        QDSTooltipComponent
    ],
    template: `
        <ng-container *ngIf="tooltip; else noTooltip">
            <qds-tooltip [message]="tooltip" [position]="tooltipPlacement">
                <button
                    [ngClass]="getButtonClasses()"
                    [attr.aria-label]="icon"
                    (click)="onClick($event)"
                    [disabled]="isDisabled"
                    [matMenuTriggerFor]="matMenuTriggerFor"
                >
                    <qds-icon name="{{ icon }}" />
                </button>
            </qds-tooltip>
        </ng-container>
        <ng-template #noTooltip>
            <button
                [ngClass]="getButtonClasses()"
                [attr.aria-label]="icon"
                (click)="onClick($event)"
                [disabled]="isDisabled"
                [matMenuTriggerFor]="matMenuTriggerFor"
            >
                <qds-icon name="{{ icon }}" />
            </button>
        </ng-template>
    `
})
export class QDSIconButtonComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() icon: string = '';
    @Input() isDestructive: boolean = false;
    @Input() isDisabled: boolean = false;
    @Input() isInverse: boolean = false;
    @Input() matMenuTriggerFor: any = null;
    @Input() size: 'sm' | 'md' | 'lg' = 'lg';
    @Input() tooltip: string = '';
    @Input() tooltipPlacement: 'above' | 'below' | 'left' | 'right' = 'above';

    @Output() clickHandler = new EventEmitter<Event>();

    onClick(event: Event) {
        this.clickHandler.emit(event);
    }

    getButtonClasses() {
        return {
            'ds-button': true,
            '--icon': true,
            [this.customClasses]: !!this.customClasses,
            [`--${this.size}`]: !!this.size,
            '--destructive': this.isDestructive,
            '--disabled': this.isDisabled,
            '--inverse': this.isInverse
        };
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
