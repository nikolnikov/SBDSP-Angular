import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output,
    Renderer2,
    TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { QDSIconComponent } from '../icon/icon.component';
import { QDSIconButtonComponent } from '../button/icon-button.component';
import { QDSButtonComponent } from '../button/button.component';

@Component({
    selector: 'qds-header',
    standalone: true,
    imports: [
        CommonModule,
        QDSIconComponent,
        QDSIconButtonComponent,
        QDSButtonComponent
    ],
    template: `
        <header class="ds-header" [class]="customClasses">
            <div
                class="ds-grid"
                [class.--margins]="!noMargins"
                [class.--max-width]="!noMaxWidth"
            >
                <a class="ds-brand-wrapper --{{ logoSize }}" href="/">
                    <img src="{{ logo }}" alt="logo" />
                </a>

                <nav class="ds-header__nav">
                    <div class="ds-header__nav-item-wrapper">
                        <ng-container *ngIf="navData && navData.length > 0">
                            <div
                                *ngFor="let navItem of navData; let idx = index"
                                class="ds-header__nav-item"
                                [ngClass]="{ '--active': menuOpen === idx }"
                            >
                                <button
                                    (click)="
                                        navItem.route
                                            ? navigateTo(navItem.route)
                                            : toggleMenu(idx)
                                    "
                                >
                                    <qds-icon
                                        *ngIf="navItem.icon"
                                        [name]="navItem.icon"
                                    />
                                    {{ navItem.label }}

                                    <qds-icon
                                        *ngIf="navItem.subNav"
                                        name="caret-down"
                                    />
                                </button>

                                <div
                                    *ngIf="menuOpen === idx && navItem.subNav"
                                    class="ds-header__dropdown"
                                >
                                    <button
                                        *ngFor="
                                            let subNavItem of navItem.subNav;
                                            let subIdx = index
                                        "
                                        class="ds-header__dropdown-item"
                                        (click)="
                                            subNavItem.route
                                                ? navigateTo(subNavItem.route)
                                                : (menuOpen = null)
                                        "
                                    >
                                        <qds-icon
                                            *ngIf="subNavItem.icon"
                                            [name]="subNavItem.icon"
                                        />
                                        {{ subNavItem.label }}
                                    </button>
                                </div>
                            </div>
                        </ng-container>

                        <div
                            *ngIf="
                                userNotifications &&
                                userNotifications.length > 0
                            "
                            class="ds-header__nav-item"
                            [ngClass]="{ '--active': notificationsOpen }"
                        >
                            <button (click)="toggleNotifications()">
                                <qds-icon name="bell" />
                                Notifications
                                <qds-icon name="caret-down" />
                            </button>

                            <div
                                *ngIf="notificationsOpen"
                                class="ds-header__dropdown --notifications"
                            >
                                <h4 *ngIf="notificationsTitle">
                                    {{ notificationsTitle }}
                                </h4>

                                <div
                                    *ngFor="
                                        let notification of userNotifications;
                                        let idx = index
                                    "
                                    class="ds-header__dropdown-item"
                                >
                                    <qds-icon name="bell" />

                                    <div
                                        class="ds-header__notification-content"
                                    >
                                        <b>{{ notification.title }}</b>
                                        <p>
                                            {{ notification.message }}
                                        </p>
                                    </div>

                                    <qds-icon-button
                                        icon="close"
                                        (click)="
                                            onRemoveNotification(idx, $event)
                                        "
                                        size="sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <qds-button
                        *ngIf="button"
                        [label]="button.label"
                        [icon]="button.icon || ''"
                        [iconRight]="button.iconRight || ''"
                        [isDisabled]="button.isDisabled === true ? true : false"
                        size="sm"
                        (click)="button.clickHandler && button.clickHandler()"
                    />

                    <div
                        *ngIf="userInitial"
                        class="ds-header__account"
                        [ngClass]="{ '--opened': userMenuOpen }"
                    >
                        <button
                            class="ds-header__account-trigger"
                            aria-label="account menu"
                            (click)="toggleUserMenu()"
                        >
                            <div class="ds-avatar --solid --medium">
                                {{ userInitial }}
                            </div>

                            <div
                                *ngIf="userName"
                                class="ds-header__account-name"
                            >
                                {{ userName }}
                            </div>

                            <qds-icon name="caret-down" />
                        </button>

                        <div
                            *ngIf="userMenuOpen && userMenuContent"
                            class="ds-header__dropdown"
                        >
                            <ng-container
                                *ngTemplateOutlet="userMenuContent"
                            ></ng-container>
                        </div>
                    </div>
                </nav>
            </div>

            <nav
                *ngIf="subNavData && subNavData.length > 0"
                class="ds-header__subnav"
            >
                <div
                    class="ds-grid"
                    [class.--margins]="!noMargins"
                    [class.--max-width]="!noMaxWidth"
                >
                    <div
                        *ngFor="let subNavItem of subNavData; let idx = index"
                        class="ds-header__subnav-item"
                        [ngClass]="{ '--active': subMenuOpen === idx }"
                    >
                        <button
                            (click)="
                                subNavItem.route
                                    ? navigateTo(subNavItem.route)
                                    : toggleSubMenu(idx)
                            "
                        >
                            <qds-icon
                                *ngIf="subNavItem.icon"
                                [name]="subNavItem.icon"
                            />
                            {{ subNavItem.label }}
                            <qds-icon
                                *ngIf="subNavItem.subNav"
                                name="caret-down"
                            />
                        </button>

                        <div
                            *ngIf="subMenuOpen === idx && subNavItem.subNav"
                            class="ds-header__dropdown"
                        >
                            <button
                                *ngFor="let subSubNavItem of subNavItem.subNav"
                                class="ds-header__dropdown-item"
                                (click)="navigateTo(subSubNavItem.route)"
                            >
                                <qds-icon
                                    *ngIf="subSubNavItem.icon"
                                    [name]="subSubNavItem.icon"
                                />
                                {{ subSubNavItem.label }}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    `
})
export class QDSHeaderComponent implements AfterViewInit {
    @Input() button?: {
        label: string;
        icon?: string;
        iconRight?: string;
        isDisabled?: boolean;
        clickHandler?: () => void;
    };
    @Input() customClasses: string = '';
    @Input() logo: string = '';
    @Input() logoSize: string = '';
    @Input() navData: Array<{
        label: string;
        route?: string;
        icon?: string;
        subNav?: Array<{ label: string; route: string; icon?: string }>;
    }> = [];
    @Input() noMargins: boolean = false;
    @Input() noMaxWidth: boolean = false;
    @Input() notificationsTitle: string = '';
    @Input() subNavData: Array<{
        label: string;
        route?: string;
        icon?: string;
        subNav?: Array<{ label: string; route: string; icon?: string }>;
    }> = [];
    @Input() userInitial: string = '';
    @Input() userMenuContent: TemplateRef<any> | null = null;
    @Input() userName: string = '';
    @Input() userNotifications: Array<{ title: string; message: string }> = [];

    @Output() removeNotification = new EventEmitter<number>();

    menuOpen: number | null = null;
    subMenuOpen: number | null = null;
    notificationsOpen: boolean = false;
    userMenuOpen: boolean = false;

    toggleMenu(idx: number): void {
        this.notificationsOpen = false;
        this.subMenuOpen = null;
        this.userMenuOpen = false;
        this.menuOpen = this.menuOpen === idx ? null : idx;
    }

    toggleSubMenu(idx: number): void {
        this.notificationsOpen = false;
        this.userMenuOpen = false;
        this.menuOpen = null;
        this.subMenuOpen = this.subMenuOpen === idx ? null : idx;
    }

    toggleNotifications(): void {
        this.menuOpen = null;
        this.subMenuOpen = null;
        this.userMenuOpen = false;
        this.notificationsOpen = !this.notificationsOpen;
    }

    toggleUserMenu(): void {
        this.menuOpen = null;
        this.notificationsOpen = false;
        this.subMenuOpen = null;
        this.userMenuOpen = !this.userMenuOpen;
    }

    onRemoveNotification(index: number, event: Event): void {
        event.stopPropagation();
        this.removeNotification.emit(index);
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
        const target = event.target as HTMLElement;
        if (
            !target.closest('.ds-header__nav-item') &&
            !target.closest('.ds-header__subnav-item') &&
            !target.closest('.ds-header__dropdown.--notifications') &&
            !target.closest('.ds-header__account')
        ) {
            this.menuOpen = null;
            this.notificationsOpen = false;
            this.subMenuOpen = null;
            this.userMenuOpen = false;
        }
    }

    navigateTo(route: string): void {
        window.location.href = route;
    }

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
