import { Meta } from '@storybook/angular';
import { QDSBadgeComponent } from './badge.component';

const meta: Meta<QDSBadgeComponent> = {
    title: 'Components/Badge',
    component: QDSBadgeComponent,
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
        label: {
            control: 'text',
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        status: {
            control: 'select',
            options: [
                'neutral',
                'informative',
                'success',
                'warning',
                'error',
                'new'
            ],
            table: {
                type: {
                    summary: `'neutral' | 'informative' | 'success' | 'warning' | 'error' | 'new'`
                },
                defaultValue: { summary: 'neutral' }
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
        },
        isCircle: {
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
        secondary: {
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

export const SolidBadge = {
    args: {
        label: 'Status',
        status: 'neutral'
    }
};

export const SolidCircleBadge = {
    args: {
        isCircle: true,
        label: '#',
        status: 'informative'
    }
};

export const SecondaryBadge = {
    args: {
        label: 'Status',
        secondary: true,
        status: 'success'
    }
};

export const SecondaryCircleBadge = {
    args: {
        isCircle: true,
        label: '#',
        secondary: true,
        status: 'warning'
    }
};

export const NotificationBadge = {
    args: {
        hasNotification: true,
        status: 'error'
    }
};
