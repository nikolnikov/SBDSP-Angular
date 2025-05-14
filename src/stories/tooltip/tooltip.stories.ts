import { Meta, moduleMetadata } from '@storybook/angular';
import { QDSTooltipComponent } from './tooltip.component';
import { MaterialModule } from '../../app/material.module';
import argsToTemplateCustom from '../argsToTemplate';

const meta: Meta<QDSTooltipComponent> = {
    title: 'Components/Tooltip',
    component: QDSTooltipComponent,
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
    render: args => {
        const { ...props } = args;
        return {
            props,
            template: `
                <qds-tooltip ${argsToTemplateCustom(props)}>
                    <span>Show tooltip</span>
                </qds-tooltip>
            `
        };
    },
    argTypes: {
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
        position: {
            control: 'radio',
            options: ['above', 'below', 'left', 'right'],
            table: {
                type: {
                    summary: `'above' | 'below' | 'left' | 'right'`
                },
                defaultValue: {
                    summary: 'above'
                }
            }
        }
    }
};

export default meta;

export const BasicTooltip = {
    args: {
        message: 'Tooltip goes here',
        position: 'above'
    }
};
