import { Meta } from '@storybook/angular';
import argsToTemplateCustom from '../argsToTemplate';
import { QDSCardComponent } from './card.component';

type StoryType = QDSCardComponent & { content?: string };

const meta: Meta<StoryType> = {
    title: 'Components/Card',
    component: QDSCardComponent,
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
        const { content, ...props } = args;
        return {
            props,
            template: `
                <qds-card ${argsToTemplateCustom(props)}>
                    ${content}
                </qds-card>
            `
        };
    },
    argTypes: {
        content: {
            control: 'text'
        },
        title: {
            control: 'text',
            table: {
                type: {
                    summary: 'string'
                }
            }
        }
    }
};

export default meta;

export const BasicCard = {
    args: {
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consectetur, eros sit amet ornare placerat, enim lectus hendrerit nisl, quis lacinia eros purus vel nunc. Donec imperdiet, leo quis fermentum luctus, nibh nibh vehicula ipsum, eget faucibus nisl enim sed felis.'
    }
};

export const CardWithTitle = {
    args: {
        ...BasicCard.args,
        title: 'Title'
    }
};
