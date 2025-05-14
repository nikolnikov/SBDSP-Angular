import { Meta } from '@storybook/angular';
import { QDSNavRailComponent } from './rail.component';

const meta: Meta<QDSNavRailComponent> = {
    title: 'Components/Navigation/Rail',
    component: QDSNavRailComponent,
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
        navItems: {
            control: {
                type: 'object'
            },
            table: {
                type: { summary: 'Array' },
                defaultValue: { summary: '[]' }
            }
        },
        noHeader: {
            control: {
                type: 'boolean'
            },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        }
    }
};

export default meta;

const navItems = [
    {
        label: 'Home',
        icon: 'house',
        route: '#'
    },
    {
        label: 'Tests',
        icon: 'test-tube-label',
        hasNotification: true,
        notificationCount: '#',
        route: '',
        subNav: [
            {
                label: 'Tests sub menu label',
                route: '',
                expandedsubNav: [
                    {
                        label: 'Sub menu label'
                    },
                    {
                        label: 'Sub menu label'
                    }
                ]
            },
            {
                label: 'Tests sub menu label',
                route: ''
            }
        ]
    },
    {
        label: 'Results',
        icon: 'notepad',
        hasNotification: true,
        notificationCount: '',
        route: '',
        subNav: [
            {
                label: 'Results sub menu label',
                route: '',
                expandedsubNav: [
                    {
                        label: 'Sub menu label'
                    },
                    {
                        label: 'Sub menu label'
                    }
                ]
            },
            {
                label: 'Results sub menu label',
                route: ''
            }
        ]
    }
];

export const BasicRail = {
    args: {
        navItems: navItems,
        noHeader: false
    },
    argTypes: {}
};

export const RailWithNoHeader = {
    args: {
        navItems: navItems,
        noHeader: true
    },
    argTypes: {}
};
