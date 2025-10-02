import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
    selector: 'qds-radio-group',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatRadioModule],
    template: `
        <mat-radio-group
            class="ds-input__radio-group"
            [class]="customClasses"
            [class.--vertical]="isVertical"
            [formControl]="formControlId"
            [attr.aria-label]="groupLabel"
            [name]="groupName"
        >
            <label *ngIf="groupLabel">
                <span>{{ groupLabel }}</span>
            </label>

            <mat-radio-button
                class="ds-input__radio"
                [class.--disabled]="option.isDisabled"
                *ngFor="let option of radioOptions"
                [disabled]="option.isDisabled"
                [value]="option.value"
                [attr.aria-label]="option.label"
            >
                {{ option.label }}
            </mat-radio-button>
        </mat-radio-group>
    `
})
export class QDSRadioGroupComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() formControlId: FormControl = new FormControl();
    @Input() groupLabel: string = '';
    @Input() groupName: string = '';
    @Input() isVertical: boolean = false;
    @Input() radioOptions: {
        label: string;
        isDisabled?: boolean;
        value: string;
    }[] = [];

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
