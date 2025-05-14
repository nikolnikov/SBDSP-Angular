import { Meta, moduleMetadata } from '@storybook/angular';
import { QDSLoaderComponent } from './loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const meta: Meta<QDSLoaderComponent> = {
    title: 'Components/Loader',
    component: QDSLoaderComponent,
    decorators: [
        moduleMetadata({
            imports: [MatProgressSpinnerModule]
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
        isDeterminate: {
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
        isSmall: {
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
        progressValue: {
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

export const DefaultLoader = {
    args: {}
};

export const SmallLoader = {
    args: {
        isSmall: true
    }
};

export const DeterminateLoader = {
    args: {
        isDeterminate: true,
        progressValue: 50
    }
};
