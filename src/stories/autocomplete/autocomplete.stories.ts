import { Meta } from '@storybook/angular';
import { QDSAutocompleteComponent } from './autocomplete.component';

const meta: Meta<QDSAutocompleteComponent> = {
    title: 'Components/Autocomplete',
    component: QDSAutocompleteComponent,
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
                defaultValue: { summary: 'false' }
            }
        },
        hasIcon: {
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
        formControlId: {
            control: {
                type: 'text'
            },
            table: { disable: true }
        },
        inputId: {
            control: {
                type: 'text'
            },
            table: { disable: true }
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
        isRequired: {
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
        options: {
            control: {
                type: 'object'
            },
            table: { disable: true }
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
        maxWidth: {
            control: {
                type: 'number'
            },
            table: { disable: true }
        }
    }
};

export default meta;

export const BasicAutocomplete = {
    args: {
        label: 'Input label',
        options: [
            'Adrian Veidt',
            'Dan Dreiberg',
            'Edward Blake',
            'Hollis Mason',
            'Jon Osterman',
            'Laurie Juspeczyk',
            'Sally Jupiter',
            'Walter Kovacs'
        ],
        inputId: 'basic-autocomplete'
    }
};

export const AutocompleteWithIcon = {
    args: {
        ...BasicAutocomplete.args,
        hasIcon: true,
        inputId: 'icon-autocomplete'
    }
};
