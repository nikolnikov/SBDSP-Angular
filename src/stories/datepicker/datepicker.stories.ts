import { Meta, moduleMetadata } from '@storybook/angular';
import { QDSDatepickerComponent } from './datepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

const meta: Meta<QDSDatepickerComponent> = {
    title: 'Components/Datepicker',
    component: QDSDatepickerComponent,
    decorators: [
        moduleMetadata({
            declarations: [QDSDatepickerComponent],
            imports: [
                MatDatepickerModule,
                MatFormFieldModule,
                MatInputModule,
                MatNativeDateModule
            ]
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
        isRange: {
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
        isSimple: {
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

export const BasicDatepicker = {
    args: {
        label: 'Select a date',
        hintMessage: 'mm/dd/yyyy',
        inputId: 'datepicker-1',
        placeholder: 'mm/dd/yyyy'
    },
    argTypes: {
        inputId: {
            table: {
                disable: true
            }
        }
    }
};

export const SimpleDatepicker = {
    args: {
        ...BasicDatepicker.args,
        inputId: 'datepicker-2',
        isSimple: true
    },
    argTypes: {
        ...BasicDatepicker.argTypes
    }
};

export const DateRangePicker = {
    args: {
        label: 'Custom range',
        hintMessage: 'mm/dd/yyyy - mm/dd/yyyy',
        inputId: 'datepicker-3',
        isRange: true,
        placeholder: 'mm/dd/yyyy'
    },
    argTypes: {
        ...BasicDatepicker.argTypes
    }
};
