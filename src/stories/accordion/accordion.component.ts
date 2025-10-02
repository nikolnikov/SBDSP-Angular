import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { QDSIconComponent } from '../icon/icon.component';

@Component({
    selector: 'qds-accordion',
    standalone: true,
    imports: [CommonModule, MatExpansionModule, QDSIconComponent],
    template: `
        <mat-accordion
            [class]="customClasses"
            [multi]="!openSingleItem"
            class="ds-accordion__wrapper"
        >
            <mat-expansion-panel
                *ngFor="let item of accordionContent; let i = index"
                [expanded]="getExpandedState(i)"
                class="ds-accordion"
            >
                <mat-expansion-panel-header class="ds-accordion__title">
                    <div class="ds-accordion__title-wrapper">
                        <qds-icon *ngIf="item.icon" name="{{ item.icon }}" />
                        {{ item.title }}
                    </div>
                </mat-expansion-panel-header>
                <div class="ds-accordion__content">
                    {{ item.content }}
                </div>
            </mat-expansion-panel>
        </mat-accordion>
    `
})
export class QDSAccordionComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() openSingleItem: boolean = false;
    @Input() defaultExpanded: boolean = false;
    @Input() accordionContent: {
        title: string;
        content: string;
        icon: string;
    }[] = [];

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {}

    getExpandedState(index: number): boolean {
        if (this.openSingleItem) {
            return this.defaultExpanded && index === 0;
        } else {
            return this.defaultExpanded;
        }
    }

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
