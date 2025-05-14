import { Meta } from '@storybook/angular';
import { QDSLinkComponent } from './link.component';

const meta: Meta<QDSLinkComponent> = {
    title: 'Components/Link',
    component: QDSLinkComponent,
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
            control: 'text',
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        iconLeft: {
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
                defaultValue: {
                    summary: 'false'
                }
            }
        },
        isInverse: {
            control: 'boolean',
            table: {
                type: {
                    summary: 'boolean'
                },
                defaultValue: {
                    summary: 'false'
                }
            }
        }
    }
};

export default meta;

export const DefaultLink = {
    args: {
        label: 'Link example',
        url: null
    },
    argTypes: {
        customClasses: { table: { disable: true } },
        url: { table: { disable: true } },
        newWindow: { table: { disable: true } }
    }
};

export const InverseLink = {
    args: {
        ...DefaultLink.args,
        isInverse: true
    },
    argTypes: {
        ...DefaultLink.argTypes
    }
};

export const DestructiveLink = {
    args: {
        ...DefaultLink.args,
        isDestructive: true
    },
    argTypes: {
        ...DefaultLink.argTypes
    }
};

export const LinkWithLeftIcon = {
    args: {
        ...DefaultLink.args,
        iconLeft: 'info'
    },
    argTypes: {
        ...DefaultLink.argTypes
    }
};

export const LinkWithRightIcon = {
    args: {
        ...DefaultLink.args,
        iconRight: 'info'
    },
    argTypes: {
        ...DefaultLink.argTypes
    }
};
