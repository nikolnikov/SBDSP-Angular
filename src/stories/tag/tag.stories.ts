import { Meta } from '@storybook/angular';
import { QDSTagComponent } from './tag.component';

const meta: Meta<QDSTagComponent> = {
    title: 'Components/Tag',
    component: QDSTagComponent,
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
        isSecondary: {
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
        showClose: {
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

export const PrimaryTag = {
    args: {
        label: 'Label'
    }
};

export const DisabledPrimaryTag = {
    args: {
        isDisabled: true,
        label: 'Label'
    }
};

export const SecondaryTag = {
    args: {
        isSecondary: true,
        label: 'Label'
    }
};
