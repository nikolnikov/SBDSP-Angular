import { Meta } from '@storybook/angular';
import { MaterialModule } from '../../app/material.module';
import { QDSHeaderComponent } from './header.component';

const meta: Meta<QDSHeaderComponent> = {
    title: 'Components/Navigation/Header',
    component: QDSHeaderComponent,
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
        logo: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        logoSize: {
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

const headerButton = {
    label: 'Sign on',
    icon: 'plus-circle',
    iconRight: 'caret-right'
};

const userNotifications = [
    {
        title: 'Lab result available',
        message:
            'Your CBC w/Differential results are ready. You can view your results by clicking here on this notification.'
    },
    {
        title: 'Lab result available',
        message:
            'Your Glucose and AC1 results are ready. You can view your results by clicking here on this notification.'
    },
    {
        title: 'J. Osterman has updated their profile',
        message: 'Address and phone number have been updated.'
    }
];

export const HeaderWithNavigationAndSubnav = {
    args: {
        logo: 'https://ds.cdn.questdiagnostics.com/assets/img/qd-brand--horizontal--green.svg',
        logoSize: 'md',
        navData: [
            {
                label: 'Text button',
                icon: 'user-circle',
                route: '/'
            },
            {
                label: 'Text button',
                icon: 'user-circle',
                route: '/'
            },
            {
                label: 'Text button',
                icon: 'user-circle',
                subNav: [
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    },
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    },
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    },
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    },
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    }
                ]
            }
        ],
        subNavData: [
            {
                label: 'Text button',
                route: '/'
            },
            {
                label: 'Text button',
                subNav: [
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    },
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    },
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    }
                ]
            }
        ]
    }
};

export const HeaderWithNavigationAndButton = {
    args: {
        logo: 'https://ds.cdn.questdiagnostics.com/assets/img/qd-brand--horizontal--green.svg',
        logoSize: 'md',
        navData: [
            {
                label: 'Text button',
                icon: 'user-circle',
                route: '/'
            },
            {
                label: 'Text button',
                icon: 'user-circle',
                route: '/'
            },
            {
                label: 'Text button',
                icon: 'user-circle',
                subNav: [
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    },
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    },
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    },
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    },
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    }
                ]
            }
        ],
        button: headerButton
    }
};

export const HeaderWithNavigationAndNotifications = {
    args: {
        logo: 'https://ds.cdn.questdiagnostics.com/assets/img/qd-brand--horizontal--green.svg',
        logoSize: 'md',
        navData: [
            {
                label: 'Text button',
                icon: 'user-circle',
                route: '/'
            },
            {
                label: 'Text button',
                icon: 'user-circle',
                route: '/'
            },
            {
                label: 'Text button',
                icon: 'user-circle',
                subNav: [
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    },
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    },
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    },
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    },
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    }
                ]
            }
        ],
        userNotifications: userNotifications
    }
};

export const HeaderWithNavigation = {
    args: {
        logo: 'https://ds.cdn.questdiagnostics.com/assets/img/qd-brand--horizontal--green.svg',
        logoSize: 'md',
        navData: [
            {
                label: 'Text button',
                icon: 'user-circle',
                route: '/'
            },
            {
                label: 'Text button',
                icon: 'user-circle',
                route: '/'
            },
            {
                label: 'Text button',
                icon: 'user-circle',
                subNav: [
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    },
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    },
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    },
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    },
                    {
                        icon: 'user-circle',
                        label: 'Text button',
                        route: '/'
                    }
                ]
            }
        ]
    }
};

export const HeaderWithButton = {
    args: {
        logo: 'https://ds.cdn.questdiagnostics.com/assets/img/qd-brand--horizontal--green.svg',
        logoSize: 'md',
        button: headerButton
    }
};

export const HeaderWithAvatarAndUserMenu = {
    render: (args: QDSHeaderComponent) => ({
        props: {
            ...args,
            userMenuClickHandler: () => console.log('User menu item clicked')
        },
        moduleMetadata: {
            imports: [MaterialModule]
        },
        template: `
            <qds-header
                [logo]="logo"
                [logoSize]="logoSize"
                [userInitial]="userInitial"
                [userMenuContent]="userMenuTemplate"
            />

            <ng-template #userMenuTemplate>
                <div class="ds-flex --column">
                    <qds-button
                        (clickHandler)="userMenuClickHandler()"
                        customClasses="ds-header__dropdown-item"
                        icon="user-circle"
                        label="Edit profile"
                    />

                    <qds-button
                        (clickHandler)="userMenuClickHandler()"
                        customClasses="ds-header__dropdown-item"
                        icon="lock-simple-open"
                        label="Settings and privacy"
                    />

                    <qds-button
                        (clickHandler)="userMenuClickHandler()"
                        customClasses="ds-header__dropdown-item"
                        icon="arrow-square-up-right"
                        label="Logout"
                    />
                </div>
            </ng-template>
        `
    }),
    args: {
        logo: 'https://ds.cdn.questdiagnostics.com/assets/img/qd-brand--horizontal--green.svg',
        logoSize: 'md',
        userInitial: 'E'
    }
};

export const BasicHeader = {
    args: {
        logo: 'https://ds.cdn.questdiagnostics.com/assets/img/qd-brand--horizontal--green.svg',
        logoSize: 'md'
    }
};
