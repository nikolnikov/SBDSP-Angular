import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
    selector: 'qds-accordion',
    standalone: true,
    imports: [CommonModule, MatExpansionModule],
    template: `
        <mat-accordion
            [class]="customClasses"
            [multi]="!openSingleItem"
            class="ds-accordion__wrapper"
        >
            <mat-expansion-panel
                *ngFor="let item of accordionContent"
                [expanded]="defaultExpanded"
                class="ds-accordion"
            >
                <mat-expansion-panel-header class="ds-accordion__title">
                    <div class="ds-accordion__title-wrapper">
                        <span
                            *ngIf="item.icon"
                            class="ds-icon--{{ item.icon }}"
                        ></span>
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
export class QDSAccordionComponent {
    @Input() customClasses: string = '';
    @Input() openSingleItem: boolean = false;
    @Input() defaultExpanded: boolean = false;
    @Input() accordionContent: {
        title: string;
        content: string;
        icon: string;
    }[] = [];
}
