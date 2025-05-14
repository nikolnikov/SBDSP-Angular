import type { Meta } from '@storybook/angular';
import { QDSButtonComponent } from './button.component';

const meta: Meta<QDSButtonComponent> = {
    title: 'Components/Button/Standard',
    component: QDSButtonComponent,
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
        label: { control: 'text' },
        type: {
            control: 'radio',
            options: ['primary', 'secondary', 'ghost'],
            table: {
                type: {
                    summary: `'primary' | 'secondary' | 'ghost'`
                },
                defaultValue: { summary: 'primary' }
            }
        },
        size: {
            control: 'radio',
            options: ['sm', 'lg'],
            table: {
                type: {
                    summary: `'sm' | 'lg'`
                },
                defaultValue: { summary: 'lg' }
            }
        },
        icon: {
            control: 'text',
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        iconRight: {
            control: 'text',
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        isDestructive: {
            control: 'boolean',
            table: {
                type: {
                    summary: 'boolean'
                },
                defaultValue: { summary: 'false' }
            }
        },
        isDisabled: {
            control: 'boolean',
            table: {
                type: {
                    summary: 'boolean'
                },
                defaultValue: { summary: 'false' }
            }
        },
        isInverse: {
            control: 'boolean',
            table: {
                type: {
                    summary: 'boolean'
                },
                defaultValue: { summary: 'false' }
            }
        },
        isSave: {
            control: 'boolean',
            table: {
                type: {
                    summary: 'boolean'
                },
                defaultValue: { summary: 'false' }
            }
        }
    }
};

export default meta;

export const PrimaryButton = {
    args: {
        label: 'Button label',
        size: 'lg',
        type: 'primary'
    }
};

export const DisabledPrimaryButton = {
    args: {
        ...PrimaryButton.args,
        isDisabled: true
    }
};

export const PrimaryButtonWithLeftIcon = {
    args: {
        ...PrimaryButton.args,
        icon: 'plus-circle'
    }
};

export const PrimaryButtonWithRightIcon = {
    args: {
        ...PrimaryButton.args,
        iconRight: 'plus-circle'
    }
};

export const PrimaryButtonWithBothIcons = {
    args: {
        ...PrimaryButton.args,
        icon: 'info',
        iconRight: 'caret-right'
    }
};

export const InversePrimaryButton = {
    args: {
        ...PrimaryButton.args,
        isInverse: true
    }
};

export const SecondaryButton = {
    args: {
        ...PrimaryButton.args,
        type: 'secondary'
    }
};

export const DisabledSecondaryButton = {
    args: {
        ...PrimaryButton.args,
        isDisabled: true,
        type: 'secondary'
    }
};

export const InverseSecondaryButton = {
    args: {
        ...PrimaryButton.args,
        isInverse: true,
        type: 'secondary'
    }
};

export const DestructiveButton = {
    args: {
        ...PrimaryButton.args,
        isDestructive: true
    }
};

export const GhostButton = {
    args: {
        ...PrimaryButton.args,
        type: 'ghost'
    }
};

export const DisabledGhostButton = {
    args: {
        ...PrimaryButton.args,
        isDisabled: true,
        type: 'ghost'
    }
};

export const DestructiveGhostButton = {
    args: {
        ...PrimaryButton.args,
        isDestructive: true,
        type: 'ghost'
    }
};
