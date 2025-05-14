import { Meta, moduleMetadata } from '@storybook/angular';
import { QDSIconButtonComponent } from '../button/icon-button.component';
import { QDSContextualMenuComponent } from './contextual-menu.component';
import { MatMenuTrigger } from '@angular/material/menu';
import argsToTemplateCustom from '../argsToTemplate';

const meta: Meta<QDSContextualMenuComponent> = {
    title: 'Components/Contextual menu',
    component: QDSContextualMenuComponent,
    decorators: [
        moduleMetadata({
            declarations: [QDSIconButtonComponent],
            imports: [MatMenuTrigger]
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
    render: args => {
        const { ...props } = args;
        return {
            props,
            template: `
                <qds-icon-button
                    icon="gear"
                    [matMenuTriggerFor]="actionMenu.menu"
                />

                <qds-contextual-menu ${argsToTemplateCustom(
                    props
                )} #actionMenu />
            `
        };
    },
    argTypes: {
        menuItems: {
            control: {
                type: 'object'
            },
            table: {
                type: {
                    summary:
                        '[{ icon: string, label: string, action: function }]'
                }
            }
        },
        menuRight: {
            control: {
                type: 'boolean'
            },
            table: {
                type: {
                    summary: 'boolean'
                },
                defaultValue: {
                    summary: 'false'
                }
            }
        }
    }
};

export default meta;

export const DefaultContextualMenu = {
    args: {
        menuItems: [
            {
                icon: 'edit',
                label: 'Edit',
                action: () => console.log('Edit clicked!')
            },
            {
                icon: 'trash',
                label: 'Delete',
                action: () => console.log('Delete clicked!')
            },
            {
                icon: 'print',
                label: 'Print',
                action: () => console.log('Print clicked!')
            }
        ]
    }
};

export const RightAlignedContextualMenu = {
    args: {
        ...DefaultContextualMenu.args,
        menuRight: true
    }
};
