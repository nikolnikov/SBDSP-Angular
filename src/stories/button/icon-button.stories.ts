import type { Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QDSIconButtonComponent } from './icon-button.component';

const meta: Meta<QDSIconButtonComponent> = {
    title: 'Components/Button/Icon',
    component: QDSIconButtonComponent,
    decorators: [
        moduleMetadata({
            imports: [MatTooltipModule]
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
        icon: {
            control: 'text',
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            table: {
                type: {
                    summary: `'sm' | 'md' | 'lg'`
                },
                defaultValue: { summary: 'lg' }
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
        tooltip: {
            control: 'text',
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        tooltipPlacement: {
            control: 'radio',
            options: ['above', 'below', 'left', 'right'],
            table: {
                type: {
                    summary: `'above' | 'below' | 'left' | 'right'`
                },
                defaultValue: { summary: 'above' }
            }
        }
    }
};

export default meta;

export const PrimaryIconButton = {
    args: {
        icon: 'gear',
        size: 'lg'
    }
};

export const DisabledPrimaryIconButton = {
    args: {
        ...PrimaryIconButton.args,
        isDisabled: true
    }
};

export const DestructivePrimaryIconButton = {
    args: {
        ...PrimaryIconButton.args,
        isDestructive: true
    }
};

export const InverseIconButton = {
    args: {
        ...PrimaryIconButton.args,
        isInverse: true
    }
};

export const IconButtonWithTooltip = {
    args: {
        ...PrimaryIconButton.args,
        tooltip: 'Settings'
    }
};
