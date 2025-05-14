import { Meta } from '@storybook/angular';
import { QDSFooterComponent } from './footer.component';

const meta: Meta<QDSFooterComponent> = {
    title: 'Components/Navigation/Footer',
    component: QDSFooterComponent,
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
        hideLogo: {
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
        hideNav: {
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
        noMargins: {
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
        noMaxWidth: {
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
        }
    }
};

export default meta;

export const CorportateFooter = {
    args: {}
};

export const CorportateFooterWithNoLogo = {
    args: {
        hideLogo: true
    }
};

export const LightCorportateFooter = {
    args: {
        hideNav: true
    }
};

export const LightCorportateFooterWithNoLogo = {
    args: {
        hideLogo: true,
        hideNav: true
    }
};
