import { Meta } from '@storybook/angular';
import { QDSProgressStepperComponent } from './progress-stepper.component';

const meta: Meta<QDSProgressStepperComponent> = {
    title: 'Components/Progress stepper',
    component: QDSProgressStepperComponent,
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
        hideLabels: {
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
        hideNumbers: {
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
        steps: {
            control: {
                type: 'object'
            },
            table: {
                type: {
                    summary:
                        '[{ label?: string; subLabel?: string; status?: string; }]'
                }
            }
        }
    }
};

export default meta;

export const DefaultProgressStepper = {
    args: {
        steps: [
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: 'completed'
            },
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: 'current'
            },
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: ''
            },
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: ''
            }
        ]
    }
};

export const ProgressStepperWithCancelledStep = {
    args: {
        steps: [
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: 'completed'
            },
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: 'cancelled'
            },
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: ''
            },
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: ''
            }
        ]
    }
};

export const ProgressStepperWithErrorStep = {
    args: {
        steps: [
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: 'completed'
            },
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: 'completed'
            },
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: 'error'
            },
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: ''
            }
        ]
    }
};

export const ProgressStepperWithWarningStep = {
    args: {
        steps: [
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: 'completed'
            },
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: 'completed'
            },
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: 'completed'
            },
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: 'warning'
            }
        ]
    }
};

export const VerticalProgressStepper = {
    args: {
        isVertical: true,
        steps: [
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: 'completed'
            },
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: 'current'
            },
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: ''
            },
            {
                label: 'Label',
                subLabel: 'Subcategory',
                status: ''
            }
        ]
    }
};
