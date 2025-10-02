import { QDSChatbotComponent } from './chatbot.component';

export default {
    title: 'Components/Chatbot',
    component: QDSChatbotComponent,
    parameters: {
        layout: 'centered',
        actions: {
            disable: true
        },
        interactions: {
            disable: true
        }
    },
    tags: ['autodocs', '!dev']
};

const demoSuggestionOptions = [
    {
        question: 'Which test is best for diabetes patients?',
        action: () => {
            console.log('Which test is best for diabetes patients?');
        }
    },
    {
        question: 'How many tests are in the Obstetric panel?',
        action: () => {
            console.log('How many tests are in the Obstetric panel?');
        }
    },
    {
        question: 'Can I test my testosterone at home?',
        action: () => {
            console.log('Can I test my testosterone at home?');
        }
    }
];

const demoResponses = [
    {
        response:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        followup:
            'Do you want me to break this down into which tests you should ask your doctor about?'
    }
];

const demoFeedbackOptions = [
    {
        label: 'Inaccurate information',
        action: () => {
            console.log('Inaccurate information');
        }
    },
    {
        label: 'Offensive content',
        action: () => {
            console.log('Offensive content');
        }
    },
    {
        label: 'Other',
        action: () => {
            console.log('Other');
        }
    }
];

export const Chatbot = {
    args: {
        title: 'Quest AI Assistant',
        introTitle: 'Hello there,',
        introMessage:
            'I can help you find the right tests based on your needs. Tell me a little about what you are looking for.',
        askInputPlaceholder: 'Ask anything',
        suggestionQuestions: demoSuggestionOptions,
        responses: demoResponses,
        feedbackOptions: demoFeedbackOptions
    },
    argTypes: {
        customClasses: { table: { disable: true } },
        askInputAttachHandler: { table: { disable: true } },
        askInputDisabled: { table: { disable: true } },
        askInputId: { table: { disable: true } },
        askInputOnChange: { table: { disable: true } },
        askInputSubmitHandler: { table: { disable: true } },
        askInputValue: { table: { disable: true } },
        askInputVoiceHandler: { table: { disable: true } },
        isRestarted: { table: { disable: true } },
        onClose: { table: { disable: true } },
        restart: { table: { disable: true } },
        thumbsDownHandler: { table: { disable: true } },
        thumbsUpHandler: { table: { disable: true } }
    }
};
