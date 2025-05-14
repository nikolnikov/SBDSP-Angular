// This is a slightly modified copy of an internal function, that isn't exported.

import { ArgsToTemplateOptions } from '@storybook/angular/dist/client/argsToTemplate';

// Source: https://github.com/storybookjs/storybook/blob/4931b385bdcb5ba6fb9b9e2d87e0f78893fe9c42/code/frameworks/angular/src/client/angular-beta/ComputesTemplateFromComponent.ts#L67
const createAngularInputProperty = ({
    propertyName,
    value
}: {
    propertyName: string;
    value: any;
}) => {
    let templateValue;
    switch (typeof value) {
        case 'string':
            templateValue = `'${value}'`;
            break;
        case 'object':
            // NOTE: This has a side-effect of breaking input objects that
            //   can't be stringified then parsed and still work. It also
            //   will error for objects that contain a circular reference,
            //   which is a known issue.
            templateValue = JSON.stringify(value)
                .replace(/'/g, '\u2019')
                .replace(/\\"/g, '\u201D')
                .replace(/"([^-"]+)":/g, '$1: ')
                .replace(/"/g, "'")
                .replace(/\u2019/g, "\\'")
                .replace(/\u201D/g, "\\'")
                .split(',')
                .join(', ');
            break;
        default:
            templateValue = value;
    }

    return `[${propertyName}]="${templateValue}"`;
};

// Slightly modified version of `argsToTemplate`.
// Source: https://github.com/storybookjs/storybook/blob/4931b385bdcb5ba6fb9b9e2d87e0f78893fe9c42/code/frameworks/angular/src/client/argsToTemplate.ts#L56
function argsToTemplateCustom<A extends Record<string, any>>(
    args: A,
    options: ArgsToTemplateOptions<keyof A> = {}
) {
    const includeSet = options.include ? new Set(options.include) : null;
    const excludeSet = options.exclude ? new Set(options.exclude) : null;

    return Object.entries(args)
        .filter(([key]) => args[key] !== undefined)
        .filter(([key]) => {
            if (includeSet) return includeSet.has(key);
            if (excludeSet) return !excludeSet.has(key);
            return true;
        })
        .map(([key, value]) =>
            typeof value === 'function'
                ? `(${key})="${key}($event)"`
                : createAngularInputProperty({
                      propertyName: key,
                      value: args[key]
                  })
        )
        .join(' ');
}

export default argsToTemplateCustom;
