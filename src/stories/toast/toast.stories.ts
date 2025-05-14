import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { QDSToastComponent } from './toast.component';
import { Component, Input } from '@angular/core';
import {
    MAT_SNACK_BAR_DATA,
    MatSnackBar,
    MatSnackBarModule,
    MatSnackBarRef
} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-toast-story-trigger',
    template: `
        <button class="ds-button --primary" (click)="showToast()">
            Basic Toast
        </button>
    `
})
class ToastTriggerComponent {
    @Input() duration: number = 0;
    @Input() hideDismiss: boolean = false;
    @Input() hideIcon: boolean = false;
    @Input() message: string = '';
    @Input() positionYOffset: number = 0;
    @Input() positionYOffsetMobile: number = 0;
    @Input() textLinkLabel: string = '';
    @Input() type: '' | 'alert' | 'error' | 'informative' | 'success' = '';

    constructor(private toast: MatSnackBar) {}

    showToast() {
        this.toast.openFromComponent(QDSToastComponent, {
            duration: this.duration,
            panelClass: ['ds-toast', '--' + this.type],
            verticalPosition: 'top',
            data: {
                message: this.message,
                hideDismiss: this.hideDismiss,
                hideIcon: this.hideIcon,
                positionYOffset: this.positionYOffset,
                positionYOffsetMobile: this.positionYOffsetMobile,
                textLinkLabel: this.textLinkLabel
            }
        });
    }
}

const meta: Meta<ToastTriggerComponent> = {
    title: 'Components/Toast',
    component: ToastTriggerComponent,
    decorators: [
        moduleMetadata({
            declarations: [ToastTriggerComponent, QDSToastComponent],
            imports: [CommonModule, MatSnackBarModule, BrowserAnimationsModule]
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
    argTypes: {
        duration: {
            control: {
                type: 'number'
            },
            table: {
                type: {
                    summary: 'number'
                }
            }
        },
        hideDismiss: {
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
        hideIcon: {
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
        message: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        positionYOffset: {
            control: {
                type: 'number'
            },
            table: {
                type: {
                    summary: 'number'
                }
            }
        },
        positionYOffsetMobile: {
            control: {
                type: 'number'
            },
            table: {
                type: {
                    summary: 'number'
                }
            }
        },
        textLinkLabel: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        type: {
            control: 'radio',
            options: ['alert', 'error', 'informative', 'success'],
            table: {
                type: {
                    summary: `'alert' | 'error' | 'informative' | 'success'`
                }
            }
        }
    },
    tags: ['autodocs', '!dev']
};

export default meta;

type Story = StoryObj<ToastTriggerComponent>;

export const DefaultToast: Story = {
    args: {
        duration: 5000,
        message: 'New results are available.'
    },
    parameters: {
        docs: {
            source: {
                language: 'typescript',
                type: 'code',
                code: `
showToast() {
    this.toast.openFromComponent(QDSToastComponent, {
        duration: 5000,
        panelClass: ['ds-toast'],
        verticalPosition: 'top',
        data: { 
            Data Inputs go here
        }
    });
}
                `.trim()
            }
        }
    }
};

export const InformativeToast: Story = {
    args: {
        duration: 5000,
        type: 'informative',
        message: 'New results are available.'
    },
    parameters: {
        docs: {
            source: {
                language: 'typescript',
                type: 'code',
                code: `
showToast() {
    this.toast.openFromComponent(QDSToastComponent, {
        duration: 5000,
        panelClass: ['ds-toast', '--informative'],
        verticalPosition: 'top',
        data: { 
            Data Inputs go here
        }
    });
}
                `.trim()
            }
        }
    }
};

export const SuccessToast: Story = {
    args: {
        duration: 5000,
        type: 'success',
        message: 'New results are available.'
    },
    parameters: {
        docs: {
            source: {
                language: 'typescript',
                type: 'code',
                code: `
showToast() {
    this.toast.openFromComponent(QDSToastComponent, {
        duration: 5000,
        panelClass: ['ds-toast', '--success'],
        verticalPosition: 'top',
        data: { 
            Data Inputs go here
        }
    });
}
                `.trim()
            }
        }
    }
};

export const AlertToast: Story = {
    args: {
        duration: 5000,
        type: 'alert',
        message: 'New results are available.'
    },
    parameters: {
        docs: {
            source: {
                language: 'typescript',
                type: 'code',
                code: `
showToast() {
    this.toast.openFromComponent(QDSToastComponent, {
        duration: 5000,
        panelClass: ['ds-toast', '--alert'],
        verticalPosition: 'top',
        data: { 
            Data Inputs go here
        }
    });
}
                `.trim()
            }
        }
    }
};

export const ErrorToast: Story = {
    args: {
        duration: 5000,
        type: 'error',
        message: 'New results are available.'
    },
    parameters: {
        docs: {
            source: {
                language: 'typescript',
                type: 'code',
                code: `
showToast() {
    this.toast.openFromComponent(QDSToastComponent, {
        duration: 5000,
        panelClass: ['ds-toast', '--error'],
        verticalPosition: 'top',
        data: { 
            Data Inputs go here
        }
    });
}
                `.trim()
            }
        }
    }
};

export const ToastWithTextLink: Story = {
    args: {
        duration: 5000,
        message: 'New results are available.',
        textLinkLabel: 'Undo'
    },
    parameters: {
        docs: {
            source: {
                language: 'typescript',
                type: 'code',
                code: `
showToast() {
    this.toast.openFromComponent(QDSToastComponent, {
        duration: 5000,
        panelClass: ['ds-toast'],
        verticalPosition: 'top',
        data: { 
            Data Inputs go here
        }
    });
}
                `.trim()
            }
        }
    }
};
