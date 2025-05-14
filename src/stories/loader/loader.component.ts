import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'qds-loader',
    template: `
        <mat-spinner
            class="ds-loading"
            [ngClass]="customClasses"
            [class.--center]="isCentered"
            [class.--fixed]="isFixed"
            [class.--small]="isSmall"
            [mode]="isDeterminate ? 'determinate' : 'indeterminate'"
            [value]="progressValue"
        ></mat-spinner>
    `
})
export class QDSLoaderComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() isCentered: boolean = false;
    @Input() isDeterminate: boolean = false;
    @Input() isFixed: boolean = false;
    @Input() isSmall: boolean = false;
    @Input() progressValue: number = 0;

    isStart = false;
    intervalId = {} as any;
    startLoading() {
        this.isStart = true;
        this.intervalId = setInterval(() => {
            if (this.progressValue < 100) {
                this.progressValue += 1;
            } else {
                clearInterval(this.intervalId);
            }
        }, 10);
    }

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
