import { Meta, moduleMetadata } from '@storybook/angular';
import { QDSInputComponent } from './input.component';
import { QDSLoaderComponent } from '../loader/loader.component';
import { MaterialModule } from '../../app/material.module';

const meta: Meta<QDSInputComponent> = {
    title: 'Components/Text input',
    component: QDSInputComponent,
    decorators: [
        moduleMetadata({
            declarations: [QDSLoaderComponent],
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
        iconLeft: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        iconRight: {
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
        isLoading: {
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

export const BasicTextInput = {
    args: {
        inputId: 'input-1',
        label: 'Input label'
    }
};

export const RequiredTextInput = {
    args: {
        ...BasicTextInput.args,
        inputId: 'input-2',
        isRequired: true
    }
};

export const DisabledTextInput = {
    args: {
        ...BasicTextInput.args,
        inputId: 'input-3',
        isDisabled: true
    }
};

export const TextInputWithLeftIcon = {
    args: {
        ...BasicTextInput.args,
        inputId: 'input-4',
        iconLeft: 'search'
    }
};

export const TextInputWithRightIcon = {
    args: {
        ...BasicTextInput.args,
        inputId: 'input-5',
        iconRight: 'location'
    }
};

export const TextInputWithBothIcons = {
    args: {
        ...BasicTextInput.args,
        inputId: 'input-6',
        iconLeft: 'search',
        iconRight: 'location'
    }
};

export const TextInputWithError = {
    args: {
        ...BasicTextInput.args,
        errorMessage: 'Error message goes here.',
        hasError: true,
        inputId: 'input-7'
    }
};

export const TextInputWithHintText = {
    args: {
        ...BasicTextInput.args,
        hintMessage: 'Hint message goes here.',
        inputId: 'input-8'
    }
};

export const TextInputWithLoader = {
    args: {
        ...BasicTextInput.args,
        inputId: 'input-9',
        isLoading: true
    }
};

export const TextInputWithTooltip = {
    args: {
        ...BasicTextInput.args,
        inputId: 'input-10',
        tooltip: 'Tooltip message goes here.'
    }
};
