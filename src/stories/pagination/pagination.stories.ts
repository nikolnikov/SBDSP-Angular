import { Meta, moduleMetadata } from '@storybook/angular';
import { QDSPaginationComponent } from './pagination.component';
import { MaterialModule } from '../../app/material.module';

const meta: Meta<QDSPaginationComponent> = {
    title: 'Components/Pagination',
    component: QDSPaginationComponent,
    decorators: [
        moduleMetadata({
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
        length: {
            control: {
                type: 'number'
            },
            table: {
                type: {
                    summary: 'number'
                },
                defaultValue: {
                    summary: '100'
                }
            }
        },
        pageSize: {
            control: {
                type: 'number'
            },
            table: {
                type: {
                    summary: 'number'
                },
                defaultValue: {
                    summary: '10'
                }
            }
        },
        pageSizeOptions: {
            control: {
                type: 'object'
            },
            table: {
                type: {
                    summary: 'array'
                },
                defaultValue: {
                    summary: '[10, 25, 50, 75, 100]'
                }
            }
        }
    }
};

export default meta;

export const DefaultPagination = {
    args: {
        length: 100,
        pageSize: 10,
        pageSizeOptions: [10, 25, 50, 75, 100]
    }
};
