import { AfterViewInit, Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialogModule
} from '@angular/material/dialog';
import { QDSIconButtonComponent } from '../button/icon-button.component';
import { QDSButtonComponent } from '../button/button.component';

@Component({
    selector: 'qds-modal',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        QDSIconButtonComponent,
        QDSButtonComponent
    ],
    template: `
        <div
            [class.--alert]="type === 'alert'"
            [class.--error]="type === 'error'"
            [class.--informative]="type === 'informative'"
            [class.--all-btns]="
                buttonLabel && secondaryButtonLabel && ghostButtonLabel
            "
        >
            <div mat-dialog-header class="ds-modal__header">
                <h1 *ngIf="title">{{ title }}</h1>

                <qds-icon-button
                    *ngIf="!hideX"
                    icon="close"
                    (clickHandler)="onClose()"
                    size="md"
                />
            </div>

            <div mat-dialog-content class="ds-modal__content">
                <div [innerHTML]="content"></div>
            </div>

            <div mat-dialog-actions class="ds-modal__actions">
                <qds-button
                    *ngIf="ghostButtonLabel"
                    label="{{ ghostButtonLabel }}"
                    (clickHandler)="onGhostButtonClick()"
                    type="ghost"
                />

                <div class="ds-modal__actions-right">
                    <qds-button
                        *ngIf="secondaryButtonLabel"
                        label="{{ secondaryButtonLabel }}"
                        (clickHandler)="onSecondaryButtonClick()"
                        type="secondary"
                    />

                    <qds-button
                        *ngIf="buttonLabel"
                        label="{{ buttonLabel }}"
                        (clickHandler)="onPrimaryButtonClick()"
                        type="primary"
                    />
                </div>
            </div>
        </div>
    `
})
export class QDSModalComponent implements AfterViewInit {
    @Input() buttonHandler: Function = () => {};
    @Input() buttonLabel: string = '';
    @Input() content: string = '';
    @Input() ghostButtonHandler: Function = () => {};
    @Input() ghostButtonLabel: string = '';
    @Input() hideX: boolean = false;
    @Input() secondaryButtonHandler: Function = () => {};
    @Input() secondaryButtonLabel: string = '';
    @Input() title: string = '';
    @Input() type: 'alert' | 'error' | 'informative' = 'informative';

    onClose() {
        this.dialogRef.close();
    }

    onPrimaryButtonClick() {
        this.buttonHandler();
        this.dialogRef.close();
    }

    onSecondaryButtonClick() {
        this.secondaryButtonHandler();
        this.dialogRef.close();
    }

    onGhostButtonClick() {
        this.ghostButtonHandler();
        this.dialogRef.close();
    }

    constructor(
        public dialogRef: MatDialogRef<QDSModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.content = data.content;
        this.title = data.title;
        this.buttonLabel = data.buttonLabel;
        this.buttonHandler = data.buttonHandler;
        this.secondaryButtonLabel = data.secondaryButtonLabel;
        this.secondaryButtonHandler = data.secondaryButtonHandler;
        this.ghostButtonLabel = data.ghostButtonLabel;
        this.ghostButtonHandler = data.ghostButtonHandler;
        this.hideX = data.hideX;
        this.type = data.type;
    }

    ngAfterViewInit() {}
}
