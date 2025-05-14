import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'qds-tabs',
    template: `
        <div class="ds-tab-wrapper">
            <div class="ds-tab-set">
                <button
                    *ngFor="let tab of tabs; let i = index"
                    class="ds-tab"
                    [class.--disabled]="tab.isDisabled"
                    [class.--selected]="tab.isSelected"
                    [attr.aria-label]="tab.label"
                    [attr.aria-controls]="'tab-' + i"
                    [attr.tabindex]="tab.isDisabled ? -1 : 0"
                    [attr.id]="'tab-' + i"
                    role="tab"
                    (click)="!tab.isDisabled && selectTab(i)"
                >
                    <span>{{ tab.label }}</span>
                </button>
            </div>

            <ng-container *ngFor="let tab of tabs; let i = index">
                <div
                    *ngIf="tab.isSelected"
                    [class]="contentClasses"
                    [attr.id]="'tabcontent-' + i"
                    class="ds-tab__content"
                    role="tabpanel"
                    [innerHTML]="tab.content"
                ></div>
            </ng-container>
        </div>
    `
})
export class QDSTabsComponent implements AfterViewInit {
    @Input() contentClasses: string = '';
    @Input() tabs: Array<{
        content?: string;
        isDisabled?: boolean;
        isSelected?: boolean;
        label: string;
    }> = [];

    ngOnInit() {
        const selectedTab = this.tabs.find(tab => tab.isSelected);
        if (!selectedTab && this.tabs.length > 0) {
            this.tabs[0].isSelected = true;
        }
    }

    selectTab(index: number) {
        this.tabs.forEach((tab, i) => {
            tab.isSelected = i === index;
        });
    }

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
