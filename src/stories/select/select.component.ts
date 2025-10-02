import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QDSIconComponent } from '../icon/icon.component';

@Component({
    selector: 'qds-input-select',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTooltipModule,
        QDSIconComponent
    ],
    template: `
        <div class="ds-input__wrapper">
            <ng-container *ngIf="isMultiple; else singleSelect">
                <mat-form-field
                    class="ds-input"
                    [class]="customClasses"
                    [class.--error]="hasError"
                    [class.mat-form-field-disabled]="isDisabled"
                    [class.--required]="isRequired"
                >
                    <mat-label *ngIf="label" class="ds-input__label">
                        <span>{{ label }}</span>

                        <button
                            *ngIf="tooltip"
                            class="ds-tooltip ds-button --icon --sm"
                            aria-label="button text"
                            matTooltip="{{ tooltip }}"
                            matTooltipPosition="above"
                        >
                            <qds-icon name="info" />
                        </button>
                    </mat-label>

                    <mat-select
                        placeholder="{{ placeholder }}"
                        disableOptionCentering
                        [panelClass]="'ds-dropdown ' + panelClasses"
                        [formControl]="formControlId"
                        [id]="inputId"
                        [required]="isRequired"
                        (selectionChange)="onChange($event)"
                        multiple
                    >
                        <mat-select-trigger class="ds-dropdown__trigger">
                            <div class="ds-dropdown__selected-container">
                                <span
                                    class="ds-dropdown__selected"
                                    *ngFor="
                                        let item of formControlId.value
                                            | slice: 0 : 2
                                    "
                                >
                                    {{ item }}
                                </span>
                            </div>

                            <span
                                class="ds-dropdown__selected-plus"
                                *ngIf="(formControlId.value?.length || 0) > 2"
                            >
                                +{{ (formControlId.value?.length || 0) - 2 }}
                            </span>
                        </mat-select-trigger>

                        <mat-option
                            class="ds-dropdown__item"
                            *ngFor="let item of selectOptions"
                            [value]="item"
                        >
                            {{ item }}
                        </mat-option>
                    </mat-select>
                </mat-form-field>
            </ng-container>
            <ng-template #singleSelect>
                <mat-form-field
                    class="ds-input"
                    [class]="customClasses"
                    [class.--error]="hasError"
                    [class.mat-form-field-disabled]="isDisabled"
                    [class.--required]="isRequired"
                >
                    <mat-label *ngIf="label" class="ds-input__label">
                        <span>{{ label }}</span>

                        <button
                            *ngIf="tooltip"
                            class="ds-tooltip ds-button --icon --sm"
                            aria-label="button text"
                            matTooltip="{{ tooltip }}"
                            matTooltipPosition="above"
                        >
                            <qds-icon name="info" />
                        </button>
                    </mat-label>

                    <mat-select
                        [panelClass]="'ds-dropdown ' + panelClasses"
                        [disableOptionCentering]="true"
                        placeholder="{{ placeholder }}"
                        [formControl]="formControlId"
                        [id]="inputId"
                        [required]="isRequired"
                        (selectionChange)="onChange($event)"
                    >
                        <mat-option
                            class="ds-dropdown__item"
                            *ngFor="let item of selectOptions"
                            [value]="item"
                        >
                            {{ item }}
                        </mat-option>
                    </mat-select>
                </mat-form-field>
            </ng-template>

            <div *ngIf="hintMessage" class="ds-input__hint">
                {{ hintMessage }}
            </div>

            <div
                *ngIf="
                    formControlId &&
                    formControlId.invalid &&
                    formControlId.touched
                "
                class="ds-input__error"
            >
                {{ errorMessage }}
            </div>
        </div>
    `
})
export class QDSInputSelectComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() errorMessage: string = '';
    @Input() formControlId: FormControl = new FormControl();
    @Input() isDisabled: boolean = false;
    @Input() hasError: boolean = false;
    @Input() hintMessage: string = '';
    @Input() inputId: string = '';
    @Input() isMultiple: boolean = false;
    @Input() isRequired: boolean = false;
    @Input() label: string = '';
    @Input() onChange: Function = () => {};
    @Input() panelClasses: string = '';
    @Input() placeholder: string = '';
    @Input() selectOptions: any[] = [];
    @Input() tooltip: string = '';

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
