import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    Renderer2,
    ViewChild
} from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'qds-table',
    template: `
        <table
            mat-table
            class="ds-table"
            [class]="customClasses"
            [class.--expandable]="isExpandable"
            [class.--flat]="isFlat"
            [class.--transparent]="isTransparent"
            [class.--sortable]="isSortable"
            [dataSource]="dataSource"
            [multiTemplateDataRows]="isExpandable"
            matSort
            (matSortChange)="announceSortChange($event)"
        >
            <ng-container
                *ngFor="let column of columns"
                [matColumnDef]="column.slug"
            >
                <th
                    class="ds-table__head-th"
                    [class.--actions]="column.slug === 'actions'"
                    [class.--no-sort]="!column.sortable"
                    mat-header-cell
                    *matHeaderCellDef
                    mat-sort-header
                >
                    {{ column.label }}
                </th>
                <td
                    class="ds-table__row-td"
                    [class.--actions]="column.slug === 'actions'"
                    mat-cell
                    *matCellDef="let row"
                >
                    <ng-container
                        *ngIf="
                            column.slug !== 'expandable';
                            else expandableTemplate
                        "
                    >
                        <ng-container
                            *ngIf="
                                column.slug !== 'actions';
                                else actionsTemplate
                            "
                        >
                            <div
                                *ngIf="
                                    row[column.slug]?.truncate;
                                    else noTruncate
                                "
                                class="ds-truncate"
                            >
                                <span
                                    #textElement
                                    [matTooltip]="
                                        isTextOverflow(textElement)
                                            ? row[column.slug]?.value
                                            : ''
                                    "
                                    [matTooltipPosition]="'above'"
                                >
                                    <span
                                        [innerHTML]="row[column.slug]?.value"
                                    ></span>
                                </span>
                            </div>
                            <ng-template #noTruncate>
                                <span
                                    [innerHTML]="row[column.slug]?.value"
                                ></span>
                            </ng-template>
                        </ng-container>

                        <ng-template #actionsTemplate>
                            <qds-icon-button
                                icon="legacy--overflow"
                                [matMenuTriggerFor]="actionsMenu.menu"
                            />

                            <qds-contextual-menu
                                [menuItems]="row[column.slug]"
                                [menuRight]="true"
                                #actionsMenu
                            />
                        </ng-template>
                    </ng-container>
                    <ng-template #expandableTemplate>
                        <qds-icon-button
                            icon="expand"
                            [customClasses]="getExpandableClasses(row)"
                            (click)="toggleRowExpansion(row)"
                        />
                    </ng-template>
                </td>
            </ng-container>

            <ng-container matColumnDef="expandedDetail">
                <td
                    mat-cell
                    *matCellDef="let element"
                    [attr.colspan]="getColumnSlugs().length"
                >
                    <div
                        class="ds-table__expansion-panel"
                        [class.--expanded]="element.isExpanded"
                    >
                        <div class="ds-table__expansion-content">
                            <span
                                [innerHTML]="element.expandedContent?.value"
                            ></span>
                        </div>
                    </div>
                </td>
            </ng-container>

            <!-- Header row -->
            <tr
                mat-header-row
                class="ds-table__head"
                *matHeaderRowDef="getColumnSlugs()"
            ></tr>

            <!-- Data rows -->
            <tr
                mat-row
                class="ds-table__row"
                *matRowDef="
                    let row;
                    columns: getColumnSlugs();
                    when: isDefaultRow
                "
            ></tr>

            <!-- Expanded row -->
            <tr
                mat-row
                class="ds-table__row --expandable"
                *matRowDef="
                    let row;
                    columns: ['expandedDetail'];
                    when: isExpandableRow
                "
            ></tr>
        </table>
    `
})
export class QDSTableComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() isExpandable: boolean = false;
    @Input() isFlat: boolean = false;
    @Input() isTransparent: boolean = false;
    @Input() isSortable: boolean = false;
    @Input() columns: Array<{
        slug: string;
        label: string;
        sortable?: boolean;
    }> = [];
    @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(
        []
    );
    @Input() defaultSortColumn: string = '';
    @Input() defaultSortDirection: 'asc' | 'desc' = 'asc';

    @ViewChild(MatSort) sort!: MatSort;

    getColumnSlugs(): string[] {
        return this.columns?.map(c => c.slug) || [];
    }

    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    isTextOverflow(element: HTMLSpanElement): boolean {
        return element.scrollWidth > element.clientWidth;
    }

    toggleRowExpansion(row: any): void {
        row.isExpanded = !row.isExpanded;

        this.dataSource.data = [...this.dataSource.data];
    }

    isDefaultRow = (index: number, row: any): boolean => {
        return true;
    };

    isExpandableRow = (index: number, row: any): boolean => {
        return !!row.expandedContent?.value;
    };

    getExpandableClasses(row: any): string {
        return row.isExpanded ? '--expanded' : '';
    }

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private cdr: ChangeDetectorRef,
        private el: ElementRef,
        private renderer: Renderer2
    ) {}

    ngAfterViewInit() {
        if (this.isSortable && this.sort) {
            this.dataSource.sort = this.sort;

            this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
                const columnValue = data[sortHeaderId]?.value;
                return columnValue !== undefined && columnValue !== null
                    ? typeof columnValue === 'string'
                        ? columnValue
                        : columnValue.toString()
                    : '';
            };

            if (this.defaultSortColumn) {
                this.sort.active = this.defaultSortColumn;
            }

            if (this.defaultSortDirection) {
                this.sort.direction = this.defaultSortDirection;
            }
        }
        this.cdr.detectChanges();
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}
