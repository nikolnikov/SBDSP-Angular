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

@Component({
    selector: 'qds-button',
    standalone: true,
    imports: [CommonModule, MatMenuModule, QDSIconComponent],
    template: `
        <button
            [ngClass]="getButtonClasses()"
            [attr.aria-label]="label"
            (click)="onClick($event)"
            [matMenuTriggerFor]="matMenuTriggerFor"
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
                <qds-icon *ngIf="icon" name="{{ icon }}" />
                <span>{{ label }}</span>
                <qds-icon *ngIf="iconRight" name="{{ iconRight }}" />
            </ng-template>
        </button>
    `
})
export class QDSButtonComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() icon: string = '';
    @Input() iconRight: string = '';
    @Input() isCondensed: boolean = false;
    @Input() isDestructive: boolean = false;
    @Input() isDisabled: boolean = false;
    @Input() isInverse: boolean = false;
    @Input() isSave: boolean = false;
    @Input() label: string = '';
    @Input() matMenuTriggerFor: any = null;
    @Input() size: 'sm' | 'lg' = 'lg';
    @Input() type: 'primary' | 'secondary' | 'ghost' | 'option' = 'primary';

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
        if (this.isSave) {
            this.setSave();
        }
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
            '--primary':
                this.type !== 'secondary' &&
                this.type !== 'ghost' &&
                this.type !== 'option',
            [`--${this.size}`]: this.type !== 'option' && !!this.size,
            '--condensed': this.isCondensed,
            '--destructive': this.isDestructive,
            '--disabled': this.isDisabled,
            '--inverse': this.isInverse,
            '--save': this.isSave,
            '--saving': this.buttonStatus === 'saving',
            '--saved': this.buttonStatus === 'saved'
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
