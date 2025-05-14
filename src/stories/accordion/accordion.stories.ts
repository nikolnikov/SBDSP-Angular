import { Meta } from '@storybook/angular';
import { QDSAccordionComponent } from './accordion.component';

const meta: Meta<QDSAccordionComponent> = {
    title: 'Components/Accordion',
    component: QDSAccordionComponent,
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
        accordionContent: {
            control: 'object',
            table: {
                type: {
                    summary:
                        '[{ title: string; icon: string; content: string; }]'
                },
                defaultValue: { summary: '[]' }
            }
        },
        openSingleItem: {
            control: 'boolean',
            table: {
                type: {
                    summary: 'boolean'
                },
                defaultValue: { summary: 'false' }
            }
        },
        defaultExpanded: {
            control: 'boolean',
            table: {
                type: {
                    summary: 'boolean'
                },
                defaultValue: { summary: 'false' }
            }
        }
    }
};

export default meta;

export const MultipleItemAccordion = {
    args: {
        accordionContent: [
            {
                title: 'Title 1',
                icon: 'question',
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat blandit aliquam etiam erat. Eu feugiat pretium nibh ipsum consequat nisl vel pretium. Nulla pharetra diam sit amet nisl suscipit adipiscing. Vivamus at augue eget arcu. Sit amet massa vitae tortor condimentum. Dolor magna eget est lorem ipsum dolor sit amet consectetur. Et odio pellentesque diam volutpat commodo sed egestas egestas. Nam at lectus urna duis convallis. Sagittis orci a scelerisque purus semper eget. Aenean sed adipiscing diam donec adipiscing. Elementum nibh tellus molestie nunc. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Nunc sed augue lacus viverra vitae congue.'
            },
            {
                title: 'Title 2',
                icon: 'question',
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat blandit aliquam etiam erat. Eu feugiat pretium nibh ipsum consequat nisl vel pretium. Nulla pharetra diam sit amet nisl suscipit adipiscing. Vivamus at augue eget arcu. Sit amet massa vitae tortor condimentum. Dolor magna eget est lorem ipsum dolor sit amet consectetur. Et odio pellentesque diam volutpat commodo sed egestas egestas. Nam at lectus urna duis convallis. Sagittis orci a scelerisque purus semper eget. Aenean sed adipiscing diam donec adipiscing. Elementum nibh tellus molestie nunc. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Nunc sed augue lacus viverra vitae congue.'
            }
        ]
    }
};

export const SingleItemAccordion = {
    args: {
        accordionContent: [
            {
                title: 'Title 1',
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat blandit aliquam etiam erat. Eu feugiat pretium nibh ipsum consequat nisl vel pretium. Nulla pharetra diam sit amet nisl suscipit adipiscing. Vivamus at augue eget arcu. Sit amet massa vitae tortor condimentum. Dolor magna eget est lorem ipsum dolor sit amet consectetur. Et odio pellentesque diam volutpat commodo sed egestas egestas. Nam at lectus urna duis convallis. Sagittis orci a scelerisque purus semper eget. Aenean sed adipiscing diam donec adipiscing. Elementum nibh tellus molestie nunc. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Nunc sed augue lacus viverra vitae congue.'
            },
            {
                title: 'Title 2',
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat blandit aliquam etiam erat. Eu feugiat pretium nibh ipsum consequat nisl vel pretium. Nulla pharetra diam sit amet nisl suscipit adipiscing. Vivamus at augue eget arcu. Sit amet massa vitae tortor condimentum. Dolor magna eget est lorem ipsum dolor sit amet consectetur. Et odio pellentesque diam volutpat commodo sed egestas egestas. Nam at lectus urna duis convallis. Sagittis orci a scelerisque purus semper eget. Aenean sed adipiscing diam donec adipiscing. Elementum nibh tellus molestie nunc. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Nunc sed augue lacus viverra vitae congue.'
            }
        ],
        openSingleItem: true
    }
};
