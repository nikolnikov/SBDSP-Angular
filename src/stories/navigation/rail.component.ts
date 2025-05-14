import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'qds-nav-rail',
    template: `
        <header class="ds-header" *ngIf="!noHeader">
            <div class="ds-grid --margins">
                <a class="ds-brand-wrapper --md" href="/">
                    <img
                        src="https://ds.cdn.questdiagnostics.com/assets/img/qd-brand--horizontal--green.svg"
                        alt="logo"
                    />
                </a>
            </div>
        </header>

        <div class="ds-navrail" [class.--no-header]="noHeader">
            <div class="ds-navrail__rail">
                <ng-container *ngFor="let item of navItems; index as i">
                    <button
                        class="ds-navrail__item"
                        [class]="item.active"
                        (click)="selectNavItem(i)"
                    >
                        <div
                            *ngIf="item.hasNotification"
                            class="ds-badge"
                            [class.--dot]="!item.notificationCount"
                            [class.--circle]="item.notificationCount"
                        >
                            <ng-container *ngIf="item.notificationCount">
                                {{ item.notificationCount }}
                            </ng-container>
                        </div>

                        <span
                            *ngIf="item.icon"
                            class="ds-icon--{{ item.icon }}"
                        ></span>

                        <span class="ds-navrail__label">
                            {{ item.label }}
                        </span>
                    </button>
                </ng-container>
            </div>

            <div
                class="ds-navrail__drawer"
                [class.--opened]="showDrawer !== -1"
            >
                <ng-container *ngFor="let item of drawerContents; index as i">
                    <ng-container *ngIf="!item.expandable; else noSubNav">
                        <button
                            class="ds-navrail__sub-item"
                            (click)="navigateTo(item.route)"
                        >
                            <span class="ds-navrail__label">
                                {{ item.label }}
                            </span>
                        </button>
                    </ng-container>
                    <ng-template #noSubNav>
                        <button
                            class="ds-navrail__sub-item --expandable"
                            [class.--opened]="showExpandedNav === item"
                            (click)="expandSubNav(item)"
                        >
                            <span class="ds-navrail__label">
                                {{ item.label }}
                            </span>
                        </button>

                        <div
                            class="ds-navrail__sub-drawer"
                            [class.--opened]="showExpandedNav === item"
                        >
                            <ng-container
                                *ngFor="
                                    let subitem of item.expandedSubNav;
                                    index as i
                                "
                            >
                                <button
                                    class="ds-navrail__sub-item"
                                    (click)="navigateTo(subitem.route)"
                                >
                                    <span class="ds-navrail__label">
                                        {{ subitem.label }}
                                    </span>
                                </button>
                            </ng-container>
                        </div>
                    </ng-template>
                </ng-container>
            </div>

            <div
                class="ds-navrail__overlay"
                [class.--opened]="showDrawer !== -1"
                (click)="closeDrawer()"
            ></div>
        </div>
    `
})
export class QDSNavRailComponent implements AfterViewInit {
    @Input() navItems: any[] = [];
    @Input() noHeader: boolean = false;

    showDrawer = -1;
    drawerContents: any[] = [];
    showExpandedNav = false;

    closeDrawer() {
        this.showDrawer = -1;
        this.drawerContents = [];
        this.showExpandedNav = false;
        this.navItems = this.navItems.map(item => {
            item.active = '';
            return item;
        });
    }

    selectNavItem(index: number): void {
        const navItem = this.navItems[index];

        if (navItem?.route) {
            this.navigateTo(navItem.route);
            this.closeDrawer();
            return;
        }

        if (this.showDrawer === index) {
            this.closeDrawer();
        } else {
            this.showDrawer = index;
            this.drawerContents = navItem?.subNav ?? [];
            this.navItems = this.navItems.map((item, itemIndex) => {
                item.active = index === itemIndex ? '--opened' : '';
                return item;
            });
        }
    }

    expandSubNav(item: any): void {
        if (item?.route) {
            this.navigateTo(item.route);
            return;
        }

        if (this.showExpandedNav === item) {
            this.showExpandedNav = false;
        } else {
            this.showExpandedNav = item;
        }
    }

    navigateTo(route: string): void {
        window.location.href = route;
    }

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
