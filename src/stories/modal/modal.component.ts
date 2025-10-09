import { AfterViewInit, Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialogModule
} from '@angular/material/dialog';

@Component({
    selector: 'qds-modal',
    standalone: true,
    imports: [CommonModule, MatDialogModule],
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

                <button
                    class="ds-button --icon --md"
                    *ngIf="!hideX"
                    (click)="onClose()"
                >
                    <span class="ds-icon--close" aria-label="Close"></span>
                </button>
            </div>

            <div mat-dialog-content class="ds-modal__content">
                <div [innerHTML]="content"></div>
            </div>

            <div mat-dialog-actions class="ds-modal__actions">
                <button
                    class="ds-button --ghost"
                    *ngIf="ghostButtonLabel"
                    (click)="onGhostButtonClick()"
                >
                    {{ ghostButtonLabel }}
                </button>

                <div class="ds-modal__actions-right">
                    <button
                        class="ds-button --secondary"
                        *ngIf="secondaryButtonLabel"
                        (click)="onSecondaryButtonClick()"
                    >
                        {{ secondaryButtonLabel }}
                    </button>

                    <button
                        class="ds-button --primary"
                        *ngIf="buttonLabel"
                        (click)="onPrimaryButtonClick()"
                    >
                        {{ buttonLabel }}
                    </button>
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
        this.dialogRef.close();
    }

    onSecondaryButtonClick() {
        this.dialogRef.close();
    }

    onGhostButtonClick() {
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
