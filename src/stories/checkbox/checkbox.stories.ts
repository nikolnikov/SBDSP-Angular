import { Meta } from '@storybook/angular';
import { QDSCheckboxComponent } from './checkbox.component';

const meta: Meta<QDSCheckboxComponent> = {
    title: 'Components/Checkbox',
    component: QDSCheckboxComponent,
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
        isChecked: {
            control: 'boolean',
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
            control: 'boolean',
            table: {
                type: {
                    summary: 'boolean'
                },
                defaultValue: {
                    summary: 'false'
                }
            }
        },
        isIndeterminate: {
            control: 'boolean',
            table: {
                type: {
                    summary: 'boolean'
                },
                defaultValue: {
                    summary: 'false'
                }
            }
        },
        isRequired: {
            control: 'boolean',
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

export const DefaultCheckbox = {
    args: {
        label: 'Checkbox label'
    }
};

export const RequiredCheckbox = {
    args: {
        ...DefaultCheckbox.args,
        isRequired: true
    }
};

export const DisabledCheckbox = {
    args: {
        ...DefaultCheckbox.args,
        isDisabled: true
    }
};

export const CheckedCheckbox = {
    args: {
        ...DefaultCheckbox.args,
        isChecked: true
    }
};

export const IndeterminateCheckbox = {
    args: {
        ...DefaultCheckbox.args,
        isIndeterminate: true
    }
};
