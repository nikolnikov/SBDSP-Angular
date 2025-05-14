import {
    AfterViewInit,
    Component,
    HostListener,
    Inject,
    Input,
    Renderer2
} from '@angular/core';
import {
    MAT_SNACK_BAR_DATA,
    MatSnackBarRef
} from '@angular/material/snack-bar';

@Component({
    selector: 'qds-toast',
    template: `
        <div
            class="ds-toast__content"
            [class.--text-close]="textLinkLabel"
            [class.--hide-icon]="hideIcon"
        >
            <span matSnackBarLabel>
                {{ message }}
            </span>

            <span *ngIf="!hideDismiss" matSnackBarActions>
                <a *ngIf="textLinkLabel" class="ds-link" (click)="onClose()">
                    {{ textLinkLabel }}
                </a>

                <button
                    class="ds-button --icon --md"
                    *ngIf="!textLinkLabel"
                    (click)="onClose()"
                >
                    <span class="ds-icon--close"></span>
                </button>
            </span>
        </div>
    `
})
export class QDSToastComponent implements AfterViewInit {
    @Input() hideDismiss: boolean = false;
    @Input() hideIcon: boolean = false;
    @Input() message: string = '';
    @Input() positionYOffset: number = 0;
    @Input() positionYOffsetMobile: number = 0;
    @Input() textLinkLabel: string = '';

    hasDuration: boolean = false;

    onClose() {
        this.toastRef.dismissWithAction();
    }

    constructor(
        public toastRef: MatSnackBarRef<QDSToastComponent>,
        private renderer: Renderer2,
        @Inject(MAT_SNACK_BAR_DATA) public data: any
    ) {
        this.hideDismiss = data.hideDismiss;
        this.hideIcon = data.hideIcon;
        this.message = data.message;
        this.positionYOffset = data.positionYOffset;
        this.positionYOffsetMobile = data.positionYOffsetMobile;
        this.textLinkLabel = data.textLinkLabel;
    }

    ngAfterViewInit(): void {
        this.updateOffset();
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.updateOffset();
    }

    private updateOffset(): void {
        const snackBarContainer = document.querySelector(
            '.mat-mdc-snack-bar-container'
        );
        if (snackBarContainer) {
            let offset: string;

            if (window.innerWidth < 900) {
                offset = this.positionYOffsetMobile
                    ? `${this.positionYOffsetMobile}px`
                    : '40px';
            } else {
                offset = this.positionYOffset
                    ? `${this.positionYOffset}px`
                    : '64px';
            }

            if (
                this.toastRef.containerInstance.snackBarConfig
                    .verticalPosition === 'bottom'
            ) {
                this.renderer.removeStyle(snackBarContainer, 'margin-top');
                this.renderer.setStyle(
                    snackBarContainer,
                    'margin-bottom',
                    offset
                );
            } else {
                this.renderer.removeStyle(snackBarContainer, 'margin-bottom');
                this.renderer.setStyle(snackBarContainer, 'margin-top', offset);
            }
        }
    }
}
