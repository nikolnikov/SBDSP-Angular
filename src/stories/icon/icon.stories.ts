import { Meta } from '@storybook/angular';
import { QDSIconComponent } from './icon.component';

const meta: Meta<QDSIconComponent> = {
    title: 'Components/Icon',
    component: QDSIconComponent,
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
        },
        name: {
            control: 'text',
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        size: {
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

export const DefaultIcon = {
    args: {
        color: 'green__500',
        name: 'info',
        size: '24'
    }
};
