import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'qds-progress-stepper',
    template: `
        <div
            class="ds-progress-stepper"
            [class.--vertical]="isVertical"
            [class]="customClasses"
        >
            <div
                *ngFor="let step of steps; let i = index"
                class="ds-step"
                [class.completed]="step.status === 'completed'"
                [class.error]="step.status === 'error'"
                [class.warning]="step.status === 'warning'"
                [class.cancelled]="step.status === 'cancelled'"
                [class.current]="step.status === 'current'"
                tabindex="-1"
                aria-label="step"
            >
                <span class="ds-flex --start-center">
                    <span class="--dash"></span>
                    <span class="--dot">
                        <ng-container *ngIf="!hideNumbers">
                            {{ i + 1 }}
                        </ng-container>
                    </span>
                    <span class="--dash"></span>
                </span>

                <div *ngIf="!hideLabels" class="ds-step__label">
                    <span [attr.aria-label]="step.label">
                        {{ step.label }}
                    </span>

                    <div
                        *ngIf="step.subLabel"
                        class="--sub-label"
                        [attr.aria-label]="step.subLabel"
                    >
                        {{ step.subLabel }}
                    </div>
                </div>
            </div>
        </div>
    `
})
export class QDSProgressStepperComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() hideLabels: boolean = false;
    @Input() hideNumbers: boolean = false;
    @Input() isVertical: boolean = false;
    @Input() steps: {
        label?: string;
        subLabel?: string;
        status?: string;
    }[] = [];

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
