import { Meta, moduleMetadata } from '@storybook/angular';
import { QDSInputSelectComponent } from './select.component';
import { MaterialModule } from '../../app/material.module';

const meta: Meta<QDSInputSelectComponent> = {
    title: 'Components/Select/Multi',
    component: QDSInputSelectComponent,
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
        placeholder: {
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
        selectOptions: {
            control: {
                type: 'object'
            },
            table: {
                type: {
                    summary: '[ label: string ]'
                }
            }
        },
        tooltip: {
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

export const BasicSelect = {
    args: {
        inputId: 'input-1',
        isMultiple: true,
        label: 'Input label',
        selectOptions: [
            'Blake, Edward',
            'Jupiter, Sally',
            'Kovachs, Walter',
            'Mason, Hollis',
            'Osterman, Jon'
        ],
        placeholder: 'Select options'
    },
    argTypes: {
        inputId: { table: { disable: true } },
        isMultiple: { table: { disable: true } }
    }
};

export const RequiredSelect = {
    args: {
        ...BasicSelect.args,
        inputId: 'input-2',
        isRequired: true
    },
    argTypes: {
        ...BasicSelect.argTypes
    }
};

export const DisabledSelect = {
    args: {
        ...BasicSelect.args,
        inputId: 'input-3',
        isDisabled: true
    },
    argTypes: {
        ...BasicSelect.argTypes
    }
};

export const SelectWithError = {
    args: {
        ...BasicSelect.args,
        inputId: 'input-4',
        hasError: true,
        errorMessage: 'Error message goes here.'
    },
    argTypes: {
        ...BasicSelect.argTypes
    }
};

export const SelectWithHintText = {
    args: {
        ...BasicSelect.args,
        inputId: 'input-5',
        hintMessage: 'Hint message goes here.'
    },
    argTypes: {
        ...BasicSelect.argTypes
    }
};

export const SelectWithTooltip = {
    args: {
        ...BasicSelect.args,
        inputId: 'input-6',
        tooltip: 'Tooltip goes here.'
    },
    argTypes: {
        ...BasicSelect.argTypes
    }
};
