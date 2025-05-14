import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { QDSModalComponent } from './modal.component';
import { Component, Input } from '@angular/core';
import {
    MatDialog,
    MatDialogModule,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modal-story-trigger',
    template: `
        <button class="ds-button --primary" (click)="openModal()">
            Open modal
        </button>
    `
})
class ModalTriggerComponent {
    @Input() buttonHandler: Function = () => {};
    @Input() buttonLabel: string = '';
    @Input() content: string = '';
    @Input() ghostButtonHandler: Function = () => {};
    @Input() ghostButtonLabel: string = '';
    @Input() hideX: boolean = false;
    @Input() secondaryButtonHandler: Function = () => {};
    @Input() secondaryButtonLabel: string = '';
    @Input() title: string = '';
    @Input() type: '' | 'alert' | 'error' | 'informative' = '';

    constructor(private dialog: MatDialog) {}

    openModal() {
        this.dialog.open(QDSModalComponent, {
            autoFocus: false,
            disableClose: true,
            panelClass: ['ds-modal'],
            data: {
                title: this.title,
                content: this.content,
                buttonLabel: this.buttonLabel,
                secondaryButtonLabel: this.secondaryButtonLabel,
                ghostButtonLabel: this.ghostButtonLabel,
                hideX: this.hideX,
                buttonHandler: () => {},
                type: this.type
            }
        });
    }
}

const meta: Meta<ModalTriggerComponent> = {
    title: 'Components/Modal',
    component: ModalTriggerComponent,
    decorators: [
        moduleMetadata({
            declarations: [ModalTriggerComponent, QDSModalComponent],
            imports: [CommonModule, MatDialogModule, BrowserAnimationsModule]
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
        title: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        content: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        buttonLabel: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        secondaryButtonLabel: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        ghostButtonLabel: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string'
                }
            }
        },
        hideX: {
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
        type: {
            control: 'radio',
            options: ['informative', 'alert', 'error'],
            table: {
                type: {
                    summary: `'alert' | 'error' | 'informative'`
                }
            }
        }
    },
    tags: ['autodocs', '!dev']
};

export default meta;

type Story = StoryObj<ModalTriggerComponent>;

export const BasicModal: Story = {
    args: {
        title: 'Modal title',
        content: `<p>Nulla quam senectus id lorem vitae velit quisque varius augue turpis tincidunt sapien, consectetur faucibus ligula volutpat convallis sit et velit risus consectetur mattis vel quisque justo, mi blandit porttitor mauris faucibus diam dolor id nisi, magna sodales ornare mauris convallis dui pellentesque.</p>`,
        buttonLabel: 'Button'
    },
    parameters: {
        docs: {
            source: {
                language: 'typescript',
                type: 'code',
                code: `
openModal() {
    this.dialog.open(QDSModalComponent, {
        disableClose: true,
        panelClass: ['ds-modal'],
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

export const InformativeModal: Story = {
    args: {
        title: 'Modal title',
        content: `<p>Nulla quam senectus id lorem vitae velit quisque varius augue turpis tincidunt sapien, consectetur faucibus ligula volutpat convallis sit et velit risus consectetur mattis vel quisque justo, mi blandit porttitor mauris faucibus diam dolor id nisi, magna sodales ornare mauris convallis dui pellentesque.</p>`,
        buttonLabel: 'Button',
        type: 'informative'
    },
    parameters: {
        docs: {
            source: {
                language: 'typescript',
                type: 'code',
                code: `
openModal() {
    this.dialog.open(QDSModalComponent, {
        disableClose: true,
        panelClass: ['ds-modal'],
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

export const ErrorModal: Story = {
    args: {
        title: 'Modal title',
        content: `<p>Nulla quam senectus id lorem vitae velit quisque varius augue turpis tincidunt sapien, consectetur faucibus ligula volutpat convallis sit et velit risus consectetur mattis vel quisque justo, mi blandit porttitor mauris faucibus diam dolor id nisi, magna sodales ornare mauris convallis dui pellentesque.</p>`,
        buttonLabel: 'Button',
        type: 'error'
    },
    parameters: {
        docs: {
            source: {
                language: 'typescript',
                type: 'code',
                code: `
openModal() {
    this.dialog.open(QDSModalComponent, {
        disableClose: true,
        panelClass: ['ds-modal'],
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

export const AlertModal: Story = {
    args: {
        title: 'Modal title',
        content: `<p>Nulla quam senectus id lorem vitae velit quisque varius augue turpis tincidunt sapien, consectetur faucibus ligula volutpat convallis sit et velit risus consectetur mattis vel quisque justo, mi blandit porttitor mauris faucibus diam dolor id nisi, magna sodales ornare mauris convallis dui pellentesque.</p>`,
        buttonLabel: 'Button',
        type: 'alert'
    },
    parameters: {
        docs: {
            source: {
                language: 'typescript',
                type: 'code',
                code: `
openModal() {
    this.dialog.open(QDSModalComponent, {
        disableClose: true,
        panelClass: ['ds-modal'],
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

export const ModalWithPrimaryAndSecondaryButtons: Story = {
    args: {
        title: 'Modal title',
        content: `<p>Nulla quam senectus id lorem vitae velit quisque varius augue turpis tincidunt sapien, consectetur faucibus ligula volutpat convallis sit et velit risus consectetur mattis vel quisque justo, mi blandit porttitor mauris faucibus diam dolor id nisi, magna sodales ornare mauris convallis dui pellentesque.</p>`,
        buttonLabel: 'Button',
        secondaryButtonLabel: 'Button'
    },
    parameters: {
        docs: {
            source: {
                language: 'typescript',
                type: 'code',
                code: `
openModal() {
    this.dialog.open(QDSModalComponent, {
        disableClose: true,
        panelClass: ['ds-modal'],
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

export const ModalWithPrimaryAndGhostButtons: Story = {
    args: {
        title: 'Modal title',
        content: `<p>Nulla quam senectus id lorem vitae velit quisque varius augue turpis tincidunt sapien, consectetur faucibus ligula volutpat convallis sit et velit risus consectetur mattis vel quisque justo, mi blandit porttitor mauris faucibus diam dolor id nisi, magna sodales ornare mauris convallis dui pellentesque.</p>`,
        buttonLabel: 'Button',
        ghostButtonLabel: 'Button'
    },
    parameters: {
        docs: {
            source: {
                language: 'typescript',
                type: 'code',
                code: `
openModal() {
    this.dialog.open(QDSModalComponent, {
        disableClose: true,
        panelClass: ['ds-modal'],
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

export const ScrollableModal: Story = {
    args: {
        title: 'Modal title',
        content: `<p>Nulla quam senectus id lorem vitae velit quisque varius augue turpis tincidunt sapien, consectetur faucibus ligula volutpat convallis sit et velit risus consectetur mattis vel quisque justo, mi blandit porttitor mauris faucibus diam dolor id nisi, magna sodales ornare mauris convallis dui pellentesque.</p>
                    
<p>Nulla quam senectus id lorem vitae velit quisque varius augue turpis tincidunt sapien, consectetur faucibus ligula volutpat convallis sit et velit risus consectetur mattis vel quisque justo, mi blandit porttitor mauris faucibus diam dolor id nisi, magna sodales ornare mauris convallis dui pellentesque.</p>

<p>Nulla quam senectus id lorem vitae velit quisque varius augue turpis tincidunt sapien, consectetur faucibus ligula volutpat convallis sit et velit risus consectetur mattis vel quisque justo, mi blandit porttitor mauris faucibus diam dolor id nisi, magna sodales ornare mauris convallis dui pellentesque.</p>

<p>Nulla quam senectus id lorem vitae velit quisque varius augue turpis tincidunt sapien, consectetur faucibus ligula volutpat convallis sit et velit risus consectetur mattis vel quisque justo, mi blandit porttitor mauris faucibus diam dolor id nisi, magna sodales ornare mauris convallis dui pellentesque.</p>

<p>Nulla quam senectus id lorem vitae velit quisque varius augue turpis tincidunt sapien, consectetur faucibus ligula volutpat convallis sit et velit risus consectetur mattis vel quisque justo, mi blandit porttitor mauris faucibus diam dolor id nisi, magna sodales ornare mauris convallis dui pellentesque.</p>`,
        buttonLabel: 'Button'
    },
    parameters: {
        docs: {
            source: {
                language: 'typescript',
                type: 'code',
                code: `
openModal() {
    this.dialog.open(QDSModalComponent, {
        disableClose: true,
        panelClass: ['ds-modal'],
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
