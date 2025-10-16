import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2,
    ViewChildren,
    QueryList,
    OnDestroy,
    HostListener,
    ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QDSIconButtonComponent } from '../button/icon-button.component';

@Component({
    selector: 'qds-breadcrumb',
    standalone: true,
    imports: [
        CommonModule,
        MatMenuModule,
        MatTooltipModule,
        QDSIconButtonComponent
    ],
    template: `
        <div class="ds-breadcrumbs" [ngClass]="customClasses">
            <ng-container *ngIf="breadcrumbs.length <= 3; else expandedView">
                <div
                    *ngFor="let breadcrumb of breadcrumbs; let i = index"
                    class="ds-breadcrumbs__item"
                >
                    <ng-container
                        [ngTemplateOutlet]="breadcrumbContent"
                        [ngTemplateOutletContext]="{
                            breadcrumb: breadcrumb,
                            index: i,
                            isInMenu: false
                        }"
                    >
                    </ng-container>
                </div>
            </ng-container>

            <ng-template #expandedView>
                <div class="ds-breadcrumbs__item">
                    <ng-container
                        [ngTemplateOutlet]="breadcrumbContent"
                        [ngTemplateOutletContext]="{
                            breadcrumb: breadcrumbs[0],
                            index: 0,
                            isInMenu: false
                        }"
                    >
                    </ng-container>
                </div>

                <div class="ds-breadcrumbs__item">
                    <qds-icon-button
                        icon="dots-three"
                        [matMenuTriggerFor]="breadcrumbMenu"
                        size="md"
                        tooltip="View more"
                        #menuTrigger="matMenuTrigger"
                        (click)="onMenuButtonClicked()"
                    >
                    </qds-icon-button>

                    <mat-menu
                        #breadcrumbMenu="matMenu"
                        class="ds-menu ds-breadcrumbs__menu"
                        (opened)="onMenuOpened()"
                    >
                        <button
                            *ngFor="
                                let breadcrumb of getMiddleBreadcrumbs();
                                let i = index
                            "
                            mat-menu-item
                            class="ds-menu__item"
                            (click)="handleMenuItemClick(breadcrumb)"
                        >
                            <span
                                #menuTextRef
                                [attr.data-index]="i"
                                [matTooltip]="
                                    isTruncated(i, true) ? breadcrumb.label : ''
                                "
                                [matTooltipDisabled]="!isTruncated(i, true)"
                                matTooltipPosition="after"
                            >
                                {{ breadcrumb.label }}
                            </span>
                        </button>
                    </mat-menu>
                </div>

                <div class="ds-breadcrumbs__item">
                    <ng-container
                        [ngTemplateOutlet]="breadcrumbContent"
                        [ngTemplateOutletContext]="{
                            breadcrumb: getLastBreadcrumb(),
                            index: breadcrumbs.length - 1,
                            isInMenu: false
                        }"
                    >
                    </ng-container>
                </div>
            </ng-template>
        </div>

        <!-- Template for breadcrumb content -->
        <ng-template
            #breadcrumbContent
            let-breadcrumb="breadcrumb"
            let-index="index"
            let-isInMenu="isInMenu"
        >
            <ng-container *ngIf="breadcrumb.href; else spanContent">
                <a
                    [href]="breadcrumb.href"
                    #textRef
                    [attr.data-index]="index"
                    [attr.data-is-menu]="isInMenu"
                    [matTooltip]="
                        isTruncated(index, isInMenu) ? breadcrumb.label : ''
                    "
                    matTooltipPosition="above"
                    [matTooltipDisabled]="!isTruncated(index, isInMenu)"
                >
                    {{ breadcrumb.label }}
                </a>
            </ng-container>

            <ng-template #spanContent>
                <span
                    #textRef
                    [attr.data-index]="index"
                    [attr.data-is-menu]="isInMenu"
                    [matTooltip]="
                        isTruncated(index, isInMenu) ? breadcrumb.label : ''
                    "
                    matTooltipPosition="above"
                    [matTooltipDisabled]="!isTruncated(index, isInMenu)"
                >
                    {{ breadcrumb.label }}
                </span>
            </ng-template>
        </ng-template>
    `
})
export class QDSBreadcrumbComponent implements AfterViewInit, OnDestroy {
    @Input() breadcrumbs: {
        label: string;
        href?: string;
    }[] = [];
    @Input() customClasses: string = '';

    @ViewChildren('textRef') textRefs!: QueryList<ElementRef>;
    @ViewChildren('menuTextRef') menuTextRefs!: QueryList<ElementRef>;

    truncatedItems: number[] = [];
    truncatedMenuItems: number[] = [];
    private subscriptions: Subscription[] = [];

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef
    ) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );

        setTimeout(() => {
            this.checkTruncation();
        }, 100);

        this.subscriptions.push(
            this.textRefs.changes.subscribe(() => {
                setTimeout(() => {
                    this.checkTruncation();
                }, 100);
            })
        );

        this.subscriptions.push(
            this.menuTextRefs.changes.subscribe(() => {
                setTimeout(() => {
                    this.checkMenuTruncation();
                }, 100);
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    @HostListener('window:resize')
    onWindowResize() {
        setTimeout(() => {
            this.checkTruncation();
            this.checkMenuTruncation();
        }, 100);
    }

    getMiddleBreadcrumbs() {
        return this.breadcrumbs.slice(1, -1);
    }

    getLastBreadcrumb() {
        return this.breadcrumbs[this.breadcrumbs.length - 1];
    }

    handleMenuItemClick(breadcrumb: { label: string; href?: string }) {
        if (breadcrumb.href) {
            window.location.href = breadcrumb.href;
        }
    }

    onMenuOpened() {
        console.log('🚀 onMenuOpened called');
        setTimeout(() => {
            console.log('⏰ About to call checkMenuTruncation');
            this.checkMenuTruncation();
        }, 150);
    }

    onMenuButtonClicked() {
        setTimeout(() => {
            this.checkMenuTruncation();
        }, 200);
    }

    private checkTruncation() {
        const truncated: number[] = [];

        this.textRefs.forEach(ref => {
            const element = ref.nativeElement;
            if (element && element.scrollWidth > element.clientWidth) {
                const index = parseInt(
                    element.getAttribute('data-index') || '0',
                    10
                );
                const isInMenu =
                    element.getAttribute('data-is-menu') === 'true';

                if (!isInMenu) {
                    truncated.push(index);
                }
            }
        });

        this.truncatedItems = truncated;
        this.cdr.detectChanges();
    }

    private checkMenuTruncation() {
        const truncated: number[] = [];

        this.menuTextRefs.forEach((ref, refIndex) => {
            const element = ref.nativeElement;
            const dataIndex = element?.getAttribute('data-index');

            if (element && element.scrollWidth > element.clientWidth) {
                const index = parseInt(dataIndex || '0', 10);
                truncated.push(index);
            }
        });

        this.truncatedMenuItems = truncated;

        setTimeout(() => {
            this.menuTextRefs.forEach((ref, refIndex) => {
                const element = ref.nativeElement;
                const dataIndex = parseInt(
                    element?.getAttribute('data-index') || '0',
                    10
                );
                const breadcrumb = this.getMiddleBreadcrumbs()[refIndex];
            });
        }, 10);
    }

    isTruncated(index: number, isInMenu: boolean = false): boolean {
        const truncatedList = isInMenu
            ? this.truncatedMenuItems
            : this.truncatedItems;
        return truncatedList.includes(index);
    }
}
