import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'qds-button',
    template: `
        <button
            [ngClass]="getButtonClasses()"
            [attr.aria-label]="label"
            (click)="onClick($event)"
            type="button"
        >
            <ng-container *ngIf="isSave; else normalButton">
                <div
                    class="step1"
                    *ngIf="
                        buttonStatus !== 'saving' && buttonStatus !== 'saved'
                    "
                >
                    <span>Save</span>
                </div>
                <div class="step2" *ngIf="buttonStatus === 'saving'">
                    <div
                        class="ds-loading --small ds-mr-4"
                        role="progressbar"
                        aria-label="Saving"
                    >
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <span>Saving</span>
                </div>
                <div class="step3" *ngIf="buttonStatus === 'saved'">
                    <div class="checkmark animate"></div>
                    <span>Saved</span>
                </div>
            </ng-container>
            <ng-template #normalButton>
                <span *ngIf="icon" class="ds-icon--{{ icon }}"></span>
                <span>{{ label }}</span>
                <span *ngIf="iconRight" class="ds-icon--{{ iconRight }}"></span>
            </ng-template>
        </button>
    `
})
export class QDSButtonComponent {
    @Input() customClasses: string = '';
    @Input() icon: string = '';
    @Input() iconRight: string = '';
    @Input() isDestructive: boolean = false;
    @Input() isDisabled: boolean = false;
    @Input() isInverse: boolean = false;
    @Input() isSave: boolean = false;
    @Input() label: string = '';
    @Input() size: 'sm' | 'lg' = 'lg';
    @Input() type: 'primary' | 'secondary' | 'ghost' = 'primary';

    @Output() clickHandler = new EventEmitter<Event>();

    buttonStatus: string = '';
    private timeoutId: any;

    ngOnInit() {
        this.updateButtonStatus();
    }

    ngOnDestroy() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    onClick(event: Event) {
        this.clickHandler.emit(event);
        this.setSave();
    }

    setSave() {
        if (this.buttonStatus === '') {
            this.buttonStatus = 'saving';
            this.updateButtonStatus();
        }
    }

    updateButtonStatus() {
        if (this.buttonStatus === 'saving') {
            this.timeoutId = setTimeout(() => {
                this.buttonStatus = 'saved';
                this.updateButtonStatus();
            }, 3000);
        } else if (this.buttonStatus === 'saved') {
            this.timeoutId = setTimeout(() => {
                this.buttonStatus = '';
            }, 1500);
        }
    }

    getButtonClasses() {
        return {
            'ds-button': true,
            [this.customClasses]: !!this.customClasses,
            [`--${this.type}`]: !!this.type,
            '--primary': this.type !== 'secondary' && this.type !== 'ghost',
            [`--${this.size}`]: !!this.size,
            '--destructive': this.isDestructive,
            '--disabled': this.isDisabled,
            '--inverse': this.isInverse,
            '--save': this.isSave,
            '--saving': this.buttonStatus === 'saving',
            '--saved': this.buttonStatus === 'saved'
        };
    }
}
