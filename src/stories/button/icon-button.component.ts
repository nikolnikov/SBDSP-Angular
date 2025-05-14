import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'qds-icon-button',
    template: `
        <ng-container *ngIf="tooltip; else noTooltip">
            <span
                matTooltip="{{ tooltip }}"
                matTooltipPosition="{{ tooltipPlacement }}"
            >
                <button
                    [ngClass]="getButtonClasses()"
                    [attr.aria-label]="icon"
                    (click)="onClick($event)"
                    [disabled]="isDisabled"
                >
                    <span class="ds-icon--{{ icon }}"></span>
                </button>
            </span>
        </ng-container>
        <ng-template #noTooltip>
            <button
                [ngClass]="getButtonClasses()"
                [attr.aria-label]="icon"
                (click)="onClick($event)"
                [disabled]="isDisabled"
            >
                <span class="ds-icon--{{ icon }}"></span>
            </button>
        </ng-template>
    `
})
export class QDSIconButtonComponent {
    @Input() customClasses: string = '';
    @Input() icon: string = '';
    @Input() isDestructive: boolean = false;
    @Input() isDisabled: boolean = false;
    @Input() isInverse: boolean = false;
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
}
