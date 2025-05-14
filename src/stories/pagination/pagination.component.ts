import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'qds-pagination',
    template: `
        <mat-paginator
            class="ds-pagination"
            [class]="customClasses"
            [length]="length"
            [pageSize]="pageSize"
            [pageSizeOptions]="pageSizeOptions"
        >
        </mat-paginator>
    `
})
export class QDSPaginationComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() length: string = '100';
    @Input() pageSize: string = '10';
    @Input() pageSizeOptions: any[] = [];

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
