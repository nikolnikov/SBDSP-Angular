import type { StorybookConfig } from '@storybook/angular';
import webpack from 'webpack';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions'
    ],
    framework: {
        name: '@storybook/angular',
        options: {
            project: 'sbdsp-angular'
        }
    }
};
export default {
    ...config,
    webpackFinal: async config => {
        config.plugins?.push(
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(
                    process.env.NODE_ENV || 'development'
                )
            })
        );
        return config;
    }
};
