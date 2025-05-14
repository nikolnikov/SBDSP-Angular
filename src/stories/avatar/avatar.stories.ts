import { Meta } from '@storybook/angular';
import { QDSAvatarComponent } from './avatar.component';

const meta: Meta<QDSAvatarComponent> = {
    title: 'Components/Avatar',
    component: QDSAvatarComponent,
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
        initial: {
            control: 'text',
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg', 'xl'],
            table: {
                type: {
                    summary: `'sm' | 'md' | 'lg' | 'xl'`
                },
                defaultValue: { summary: 'lg' }
            }
        },
        isButton: {
            control: {
                type: 'boolean'
            },
            table: {
                type: {
                    summary: 'boolean'
                },
                defaultValue: { summary: 'false' }
            }
        },
        isDisabled: {
            control: {
                type: 'boolean'
            },
            table: {
                type: {
                    summary: 'boolean'
                },
                defaultValue: { summary: 'false' }
            }
        },
        isOutlined: {
            control: {
                type: 'boolean'
            },
            table: {
                type: {
                    summary: 'boolean'
                },
                defaultValue: { summary: 'false' }
            }
        },
        hasNotification: {
            control: {
                type: 'boolean'
            },
            table: {
                type: {
                    summary: 'boolean'
                },
                defaultValue: { summary: 'false' }
            }
        }
    }
};

export default meta;

export const SolidAvatar = {
    args: {
        initial: 'A',
        size: 'lg'
    }
};

export const OutlinedAvatar = {
    args: {
        ...SolidAvatar.args,
        isOutlined: true
    }
};
