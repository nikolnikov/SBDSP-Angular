import { Meta, moduleMetadata } from '@storybook/angular';
import { QDSContextualMenuComponent } from '../contextual-menu/contextual-menu.component';
import { QDSIconButtonComponent } from '../button/icon-button.component';
import { QDSTableComponent } from './table.component';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../app/material.module';

const meta: Meta<QDSTableComponent> = {
    title: 'Components/Table',
    component: QDSTableComponent,
    decorators: [
        moduleMetadata({
            declarations: [QDSIconButtonComponent],
            imports: [MaterialModule, QDSContextualMenuComponent]
        })
    ],
    parameters: {
        layout: 'centered',
        actions: {
            disable: true
        },
        interactions: {
            disable: true
        }
    },
    tags: ['autodocs', '!dev'],
    argTypes: {
        columns: {
            table: {
                disable: true
            }
        },
        dataSource: {
            table: {
                disable: true
            }
        },
        isExpandable: {
            table: {
                disable: true
            }
        },
        isFlat: {
            table: {
                disable: true
            }
        },
        isSortable: {
            table: {
                disable: true
            }
        },
        isTransparent: {
            table: {
                disable: true
            }
        }
    }
};

export default meta;

const tableColumns: Array<{ slug: string; label: string; sortable?: boolean }> =
    [
        { slug: 'name', label: 'Patient name' },
        { slug: 'test', label: 'Test ordered' },
        { slug: 'labRefId', label: 'Lab ref Id' },
        { slug: 'orderedBy', label: 'Ordered by' },
        { slug: 'status', label: 'Status' }
    ];

const tableData = [
    {
        name: { value: 'Blake, Edward' },
        test: {
            value: 'Antibody Screen, RBC with Reflex to Identification, Titer, and Antigen Typing'
        },
        labRefId: { value: '123456789' },
        orderedBy: { value: 'J. Osterman' },
        status: { value: 'Pending' }
    },
    {
        name: { value: 'Kovachs, Walter' },
        test: {
            value: 'CBC (includes Differential and Platelets) with Automated Differential'
        },
        labRefId: { value: '123456789' },
        orderedBy: { value: 'J. Osterman' },
        status: { value: 'Pending' }
    },
    {
        name: { value: 'Mason, Hollis' },
        test: { value: 'Lipid Panel' },
        labRefId: { value: '123456789' },
        orderedBy: { value: 'J. Osterman' },
        status: { value: 'Pending' }
    }
];

const dataSource = new MatTableDataSource(tableData);

const sortableColumns: Array<{
    slug: string;
    label: string;
    sortable?: boolean;
}> = [
    { slug: 'name', label: 'Patient name', sortable: true },
    { slug: 'test', label: 'Test ordered', sortable: true },
    { slug: 'labRefId', label: 'Lab ref Id', sortable: true },
    { slug: 'orderedBy', label: 'Ordered by', sortable: true },
    { slug: 'status', label: 'Status', sortable: false }
];

const sortableData = [
    {
        name: { value: 'Blake, Edward' },
        test: {
            value: 'Antibody Screen, RBC with Reflex to Identification, Titer, and Antigen Typing'
        },
        labRefId: { value: '123456789' },
        orderedBy: { value: 'J. Osterman' },
        status: { value: 'Pending' }
    },
    {
        name: { value: 'Kovachs, Walter' },
        test: {
            value: 'CBC (includes Differential and Platelets) with Automated Differential'
        },
        labRefId: { value: '123456789' },
        orderedBy: { value: 'J. Osterman' },
        status: { value: 'Pending' }
    },
    {
        name: { value: 'Mason, Hollis' },
        test: { value: 'Lipid Panel' },
        labRefId: { value: '123456789' },
        orderedBy: { value: 'J. Osterman' },
        status: { value: 'Pending' }
    }
];

const sortableDataSource = new MatTableDataSource(sortableData);

const expandableColumns: Array<{
    slug: string;
    label: string;
    sortable?: boolean;
}> = [
    { slug: 'expandable', label: '', sortable: false },
    { slug: 'name', label: 'Patient name', sortable: true },
    { slug: 'test', label: 'Test ordered', sortable: true },
    { slug: 'labRefId', label: 'Lab ref Id', sortable: true },
    { slug: 'orderedBy', label: 'Ordered by', sortable: true },
    { slug: 'status', label: 'Status', sortable: false },
    { slug: 'actions', label: '', sortable: false }
];

const expandableData = [
    {
        expandable: { value: '' },
        name: { value: 'Blake, Edward', truncate: true },
        test: {
            value: 'Antibody Screen, RBC with Reflex to Identification, Titer, and Antigen Typing',
            truncate: true
        },
        labRefId: { value: '123456789' },
        orderedBy: { value: 'J. Osterman', truncate: true },
        status: { value: 'Pending' },
        actions: [
            {
                label: 'Edit',
                icon: 'edit',
                action: () => {}
            },
            {
                label: 'Delete',
                icon: 'trash',
                action: () => {}
            },
            {
                label: 'Print',
                icon: 'print',
                action: () => {}
            }
        ],
        expandedContent: {
            value: 'Content goes here.'
        }
    },
    {
        expandable: { value: '' },
        name: { value: 'Kovachs, Walter', truncate: true },
        test: {
            value: 'CBC (includes Differential and Platelets) with Automated Differential',
            truncate: true
        },
        labRefId: { value: '123456789' },
        orderedBy: { value: 'J. Osterman', truncate: true },
        status: { value: 'Pending' },
        actions: [
            {
                label: 'Edit',
                icon: 'edit',
                action: () => {}
            },
            {
                label: 'Delete',
                icon: 'trash',
                action: () => {}
            },
            {
                label: 'Print',
                icon: 'print',
                action: () => {}
            }
        ],
        expandedContent: {
            value: 'Content goes here.'
        }
    },
    {
        expandable: { value: '' },
        name: { value: 'Mason, Hollis', truncate: true },
        test: { value: 'Lipid Panel', truncate: true },
        labRefId: { value: '123456789' },
        orderedBy: { value: 'J. Osterman', truncate: true },
        status: { value: 'Pending' },
        actions: [
            {
                label: 'Edit',
                icon: 'edit',
                action: () => {}
            },
            {
                label: 'Delete',
                icon: 'trash',
                action: () => {}
            },
            {
                label: 'Print',
                icon: 'print',
                action: () => {}
            }
        ],
        expandedContent: {
            value: 'Content goes here.'
        }
    }
];

const expandableDataSource = new MatTableDataSource(expandableData);

export const BasicTable = {
    args: {
        columns: tableColumns
    },
    render: (args: Partial<QDSTableComponent>) => {
        const dataSource = new MatTableDataSource(tableData);

        return {
            props: {
                ...args,
                dataSource: dataSource
            }
        };
    },
    parameters: {
        docs: {
            source: {
                language: 'html',
                type: 'code',
                code: `
<qds-table
    [columns]="[{ slug: 'expandable', label: '', sortable: false }, { slug: 'name', label: 'Patient name', sortable: true }, { slug: 'test', label: 'Test ordered', sortable: true }, { slug: 'labRefId', label: 'Lab ref Id', sortable: true }, { slug: 'orderedBy', label: 'Ordered by', sortable: true }, { slug: 'status', label: 'Status', sortable: false }, { slug: 'actions', label: '', sortable: false }]"
    [dataSource]="[{name: {value: 'Blake, Edward'}, test: {value: 'Antibody Screen, RBC with Reflex to Identification, Titer, and Antigen Typing'}, labRefId: {value: '123456789'}, orderedBy: {value: 'J. Osterman'}, status: {value: 'Pending'}}, {name: {value: 'Kovachs, Walter'}, test: {value: 'CBC (includes Differential and Platelets) with Automated Differential'}, labRefId: {value: '123456789'}, orderedBy: {value: 'J. Osterman'}, status: {value: 'Pending'}}, {name: {value: 'Mason, Hollis'}, test: {value: 'Lipid Panel'}, labRefId: {value: '123456789'}, orderedBy: {value: 'J. Osterman'}, status: {value: 'Pending'}}]"
></qds-table>
                `
            }
        }
    }
};

export const SortableTable = {
    args: {
        columns: sortableColumns,
        defaultSortColumn: 'name',
        isSortable: true
    },
    render: (args: Partial<QDSTableComponent>) => {
        const dataSource = new MatTableDataSource(sortableData);

        return {
            props: {
                ...args,
                dataSource: dataSource
            }
        };
    },
    parameters: {
        docs: {
            source: {
                language: 'html',
                type: 'code',
                code: `
<qds-table
    [columns]="[{slug: 'name', label: 'Patient name', sortable: true}, {slug: 'test', label: 'Test ordered', sortable: true}, {slug: 'labRefId', label: 'Lab ref Id', sortable: true}, {slug: 'orderedBy', label: 'Ordered by', sortable: true}, {slug: 'status', label: 'Status', sortable: false}]"
    [dataSource]="[{name: {value: 'Blake, Edward'}, test: {value: 'Antibody Screen, RBC with Reflex to Identification, Titer, and Antigen Typing'}, labRefId: {value: '123456789'}, orderedBy: {value: 'J. Osterman'}, status: {value: 'Pending'}}, {name: {value: 'Kovachs, Walter'}, test: {value: 'CBC (includes Differential and Platelets) with Automated Differential'}, labRefId: {value: '123456789'}, orderedBy: {value: 'J. Osterman'}, status: {value: 'Pending'}}, {name: {value: 'Mason, Hollis'}, test: {value: 'Lipid Panel'}, labRefId: {value: '123456789'}, orderedBy: {value: 'J. Osterman'}, status: {value: 'Pending'}}]"
    [defaultSortColumn]="'name'"
    [isSortable]="true"
></qds-table>
                `
            }
        }
    }
};

export const ExpandableSortableTableWithTrucatedColumnsAndActions = {
    args: {
        columns: expandableColumns,
        defaultSortColumn: 'name',
        isExpandable: true,
        isSortable: true
    },
    render: (args: Partial<QDSTableComponent>) => {
        const dataSource = new MatTableDataSource(expandableData);

        return {
            props: {
                ...args,
                dataSource: dataSource
            }
        };
    },
    parameters: {
        docs: {
            source: {
                language: 'html',
                type: 'code',
                code: `
<qds-table
    [columns]="[{slug: 'name', label: 'Patient name', sortable: true}, {slug: 'test', label: 'Test ordered', sortable: true}, {slug: 'labRefId', label: 'Lab ref Id', sortable: true}, {slug: 'orderedBy', label: 'Ordered by', sortable: true}, {slug: 'status', label: 'Status', sortable: false}]"
    [dataSource]="[{expandable: {value: ""}, name: {value: "Blake, Edward", truncate: true}, test: {value: "Antibody Screen, RBC with Reflex to Identification, Titer, and Antigen Typing", truncate: true}, labRefId: {value: "123456789"}, orderedBy: {value: "J. Osterman", truncate: true}, status: {value: "Pending"}, actions:[{label: "Edit", icon: "edit", action: ()=>{}}, {label: "Delete", icon: "trash", action: ()=>{}}, {label: "Print", icon: "print", action: ()=>{}}], expandedContent: {value: "Content goes here."}}, {expandable: {value: ""}, name: {value: "Kovachs, Walter", truncate: true}, test: {value: "CBC (includes Differential and Platelets) with Automated Differential", truncate: true}, labRefId: {value: "123456789"}, orderedBy: {value: "J. Osterman", truncate: true}, status: {value: "Pending"}, actions:[{label: "Edit", icon: "edit", action: ()=>{}}, {label: "Delete", icon: "trash", action: ()=>{}}, {label: "Print", icon: "print", action: ()=>{}}], expandedContent: {value: "Content goes here."}}, {expandable: {value: ""}, name: {value: "Mason, Hollis", truncate: true}, test: {value: "Lipid Panel", truncate: true}, labRefId: {value: "123456789"}, orderedBy: {value: "J. Osterman", truncate: true}, status: {value: "Pending"}, actions:[{label: "Edit", icon: "edit", action: ()=>{}}, {label: "Delete", icon: "trash", action: ()=>{}}, {label: "Print", icon: "print", action: ()=>{}}], expandedContent: {value: "Content goes here."}}]"
    [defaultSortColumn]="'name'"
    [isExpandable]="true"
    [isSortable]="true"
></qds-table>
                `
            }
        }
    }
};

export const FlatTransparentTable = {
    args: {
        columns: tableColumns,
        isFlat: true,
        isTransparent: true
    },
    render: (args: Partial<QDSTableComponent>) => {
        const dataSource = new MatTableDataSource(tableData);

        return {
            props: {
                ...args,
                dataSource: dataSource
            }
        };
    },
    parameters: {
        docs: {
            source: {
                language: 'html',
                type: 'code',
                code: `
<qds-table
    [columns]="[{ slug: 'expandable', label: '', sortable: false }, { slug: 'name', label: 'Patient name', sortable: true }, { slug: 'test', label: 'Test ordered', sortable: true }, { slug: 'labRefId', label: 'Lab ref Id', sortable: true }, { slug: 'orderedBy', label: 'Ordered by', sortable: true }, { slug: 'status', label: 'Status', sortable: false }, { slug: 'actions', label: '', sortable: false }]"
    [dataSource]="[{name: {value: 'Blake, Edward'}, test: {value: 'Antibody Screen, RBC with Reflex to Identification, Titer, and Antigen Typing'}, labRefId: {value: '123456789'}, orderedBy: {value: 'J. Osterman'}, status: {value: 'Pending'}}, {name: {value: 'Kovachs, Walter'}, test: {value: 'CBC (includes Differential and Platelets) with Automated Differential'}, labRefId: {value: '123456789'}, orderedBy: {value: 'J. Osterman'}, status: {value: 'Pending'}}, {name: {value: 'Mason, Hollis'}, test: {value: 'Lipid Panel'}, labRefId: {value: '123456789'}, orderedBy: {value: 'J. Osterman'}, status: {value: 'Pending'}}]"
    [isFlat]="true"
    [isTransparent]="true"
></qds-table>
                `
            }
        }
    }
};
