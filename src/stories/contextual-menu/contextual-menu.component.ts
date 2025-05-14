import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2,
    ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenu } from '@angular/material/menu';

@Component({
    selector: 'qds-contextual-menu',
    standalone: true,
    imports: [CommonModule, MatMenu],
    template: `
        <mat-menu
            class="ds-menu"
            [class]="menuClass"
            #menu="matMenu"
            [xPosition]="menuRight ? 'before' : 'after'"
        >
            <button
                mat-menu-item
                class="ds-menu__item"
                (click)="handleItemClick(item)"
                *ngFor="let item of menuItems"
            >
                <span *ngIf="item.icon" class="ds-icon--{{ item.icon }}"></span>
                {{ item.label }}
            </button>
        </mat-menu>
    `
})
export class QDSContextualMenuComponent implements AfterViewInit {
    @Input() menuItems: any[] = [];
    @Input() menuRight: boolean = false;
    @Input() menuClass: string = '';

    @ViewChild('menu', { static: true }) menu!: MatMenu;

    getMenu() {
        return this.menu;
    }

    handleItemClick(item: any): void {
        if (item.action) {
            item.action(() => {});
        }
    }

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
