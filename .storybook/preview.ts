import { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_SELECT_CONFIG } from '@angular/material/select';
import '!style-loader!css-loader!sass-loader!/src/assets/css/overrides.css';
import '!style-loader!css-loader!sass-loader!/src/assets/css/dsp.scss';

const preview: Preview = {
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(),
                {
                    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
                    useValue: { floatLabel: 'always' }
                },
                {
                    provide: MAT_SELECT_CONFIG,
                    useValue: { overlayPanelClass: 'ds-overlay-panel' }
                }
            ]
        })
    ],
    parameters: {
        options: {
            storySort: {
                method: 'alphabetical'
            }
        }
    }
};

export default preview;
