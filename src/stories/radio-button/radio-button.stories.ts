import { Meta, moduleMetadata } from '@storybook/angular';
import { QDSRadioGroupComponent } from './radio-button.component';
import { MaterialModule } from '../../app/material.module';

const meta: Meta<QDSRadioGroupComponent> = {
    title: 'Components/Radio button',
    component: QDSRadioGroupComponent,
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
        groupLabel: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        groupName: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        isVertical: {
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
        radioOptions: {
            control: {
                type: 'object'
            },
            table: {
                type: {
                    summary: 'array'
                },
                defaultValue: {
                    summary:
                        '[{ label: "Option 1", value: "option1" }, { label: "Option 2", value: "option2" }, { label: "Option 3", value: "option3", isDisabled: true }]'
                }
            }
        }
    }
};

export default meta;

export const HorizontalRadioGroup = {
    args: {
        groupLabel: 'Horizontal group',
        groupName: 'horizontal-group',
        radioOptions: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3', isDisabled: true }
        ]
    }
};

export const VeritcalRadioGroup = {
    args: {
        groupLabel: 'Vertical group',
        groupName: 'vertical-group',
        isVertical: true,
        radioOptions: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3', isDisabled: true }
        ]
    }
};
