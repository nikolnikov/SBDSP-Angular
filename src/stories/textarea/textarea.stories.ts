import { Meta, moduleMetadata } from '@storybook/angular';
import { QDSTextareaComponent } from './textarea.component';
import { MaterialModule } from '../../app/material.module';

const meta: Meta<QDSTextareaComponent> = {
    title: 'Components/Inputs/Text area',
    component: QDSTextareaComponent,
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
        errorMessage: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        hasError: {
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
        hintMessage: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string'
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
        isRequired: {
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
        placeholder: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string'
                }
            }
        }
    }
};

export default meta;

export const BasicTextArea = {
    args: {
        inputId: 'textarea',
        label: 'Textarea label'
    }
};

export const RequiredTextArea = {
    args: {
        ...BasicTextArea.args,
        inputId: 'textarea-2',
        isRequired: true
    }
};

export const DisabledTextArea = {
    args: {
        ...BasicTextArea.args,
        inputId: 'textarea-3',
        isDisabled: true
    }
};

export const TextAreaWithError = {
    args: {
        ...BasicTextArea.args,
        errorMessage: 'Error message goes here.',
        hasError: true,
        inputId: 'textarea-4'
    }
};

export const TextAreaWithHint = {
    args: {
        ...BasicTextArea.args,
        hintMessage: 'Hint message goes here.',
        inputId: 'textarea-5'
    }
};
