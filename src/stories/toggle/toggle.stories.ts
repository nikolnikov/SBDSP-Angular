import { Meta, moduleMetadata } from '@storybook/angular';
import { QDSToggleComponent } from './toggle.component';
import { MaterialModule } from '../../app/material.module';

const meta: Meta<QDSToggleComponent> = {
    title: 'Components/Toggle',
    component: QDSToggleComponent,
    decorators: [
        moduleMetadata({
            imports: [MaterialModule]
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
        isChecked: {
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
        },
        isDisabled: {
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
        },
        label: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        labelPosition: {
            control: 'radio',
            options: ['before', 'after'],
            table: {
                type: {
                    summary: `'before' | 'after'`
                },
                defaultValue: { summary: 'after' }
            }
        }
    }
};

export default meta;

export const BasicToggle = {
    args: {
        inputId: 'toggle-1',
        label: 'Label',
        labelPosition: 'after'
    },
    argTypes: {
        inputId: { table: { disable: true } }
    }
};

export const DisabledToggle = {
    args: {
        ...BasicToggle.args,
        inputId: 'toggle-2',
        isDisabled: true
    },
    ...BasicToggle.argTypes
};

export const CheckedToggle = {
    args: {
        ...BasicToggle.args,
        inputId: 'toggle-3',
        isChecked: true
    },
    ...BasicToggle.argTypes
};
