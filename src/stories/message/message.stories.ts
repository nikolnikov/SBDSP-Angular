import { Meta } from '@storybook/angular';
import { QDSMessageComponent } from './message.component';

const meta: Meta<QDSMessageComponent> = {
    title: 'Components/Message',
    component: QDSMessageComponent,
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
        actions: {
            control: {
                type: 'object'
            },
            table: {
                type: {
                    summary: '[{ title: string; action: string; }]'
                }
            }
        },
        hideX: {
            control: 'boolean',
            table: {
                type: {
                    summary: 'boolean'
                },
                defaultValue: { summary: 'false' }
            }
        },
        message: {
            control: 'text',
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        noIcon: {
            control: 'boolean',
            table: {
                type: {
                    summary: 'boolean'
                },
                defaultValue: { summary: 'false' }
            }
        },
        title: {
            control: 'text',
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        type: {
            control: 'radio',
            options: ['informative', 'success', 'warning', 'error'],
            table: {
                type: {
                    summary: 'informative | success | warning | error'
                },
                defaultValue: { summary: 'informative' }
            }
        }
    }
};

export default meta;

export const InformativeMessage = {
    args: {
        actions: [
            { title: 'Yes', action: null },
            { title: 'No', action: null }
        ],
        message:
            "We've sent you an email detailing your recent account changes. Didn't receive an email? Click below.",
        title: 'Heading',
        type: 'informative'
    }
};

export const SuccessMessage = {
    args: {
        ...InformativeMessage.args,
        type: 'success'
    }
};

export const ErrorMessage = {
    args: {
        ...InformativeMessage.args,
        type: 'error'
    }
};

export const WarningMessage = {
    args: {
        ...InformativeMessage.args,
        type: 'warning'
    }
};
