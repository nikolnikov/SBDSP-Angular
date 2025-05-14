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
        formControlId: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        inputId: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        options: {
            control: {
                type: 'object'
            },
            table: {
                type: {
                    summary: '[]'
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
                defaultValue: { summary: 'false' }
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
        maxWidth: {
            control: {
                type: 'number'
            },
            table: {
                type: {
                    summary: 'number'
                }
            }
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
