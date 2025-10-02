import { Meta } from '@storybook/angular';
import { QDSBreadcrumbComponent } from './breadcrumb.component';

type StoryType = QDSBreadcrumbComponent & { content?: string };

const meta: Meta<StoryType> = {
    title: 'Components/Breadcrumb',
    component: QDSBreadcrumbComponent,
    parameters: {
        layout: 'centered',
        actions: {
            disable: true
        },
        interactions: {
            disable: true
        }
    },
    tags: ['autodocs', '!dev']
};

export default meta;

const items = [
    {
        label: 'Back to results',
        href: '/'
    },
    {
        label: 'Sally Jupiter lab results',
        href: '/sally-jupiter-lab-results'
    },
    {
        label: 'CBC with differential test results',
        href: null
    }
];

const itemsExt = [
    {
        label: 'Back to results',
        href: '/'
    },
    {
        label: 'Sally Jupiter lab results',
        href: '/sally-jupiter-lab-results'
    },
    {
        label: 'CBC with differential test results',
        href: '/cbc-with-differential-test-results'
    },
    {
        label: 'CBC extended',
        href: null
    }
];

export const BasicBreadcrumb = {
    args: {
        breadcrumbs: items
    },
    argTypes: {
        customClasses: { table: { disable: true } }
    }
};

export const BreadcrumbWithDropdown = {
    args: {
        breadcrumbs: itemsExt
    },
    argTypes: {
        ...BasicBreadcrumb.argTypes
    }
};
