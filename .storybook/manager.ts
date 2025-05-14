import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';
import '../src/assets/css/overrides.css';

addons.setConfig({
    theme: create({
        base: 'dark',
        brandTitle: 'Quest Storybook',
        brandUrl: 'https://designsystem.questdiagnostics.com',
        brandImage:
            'https://ds.cdn.questdiagnostics.com/assets/img/qd-brand--horizontal--white.svg'
    }),
    title: 'DSP Angular Storybook'
});
