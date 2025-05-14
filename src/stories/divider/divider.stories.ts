import { Meta } from '@storybook/angular';
import { QDSDividerComponent } from './divider.component';

const meta: Meta<QDSDividerComponent> = {
    title: 'Components/Divider',
    component: QDSDividerComponent,
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
        color: {
            control: 'text',
            table: {
                type: {
                    summary: 'string'
                }
            }
        }
    }
};

export default meta;

export const DefaultDivider = {
    args: {
        color: 'green__800'
    }
};
