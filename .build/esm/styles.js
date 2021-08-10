import { __makeTemplateObject } from 'tslib';
import { useMemo } from 'react';
import { Colors } from './core/dist/cjs/index.js';
import './utils/dist/cjs/index.js';
import { css } from '@linaria/core';
import { __exports as cjs } from './_virtual/index3.js_commonjs-exports';

var MemoizedClasses = function (className) {
    var val = useMemo(function () { return cjs.classnames(variants, transitions, className || ""); }, [className]);
    return val;
};
var MemoizedStyles = function (props, theme) {
    var val = useMemo(function () {
        var btnSize = sizes[props.size];
        if (!btnSize)
            throw new Error("Couldn't parse button size. Value: " + btnSize);
        var btnColor = cjs.ResolveColor(props.color, theme);
        if (btnColor.err)
            throw cjs.ThrowError(btnColor.err, "Button color is undefined");
        var textColor = cjs.ResolveColor(props.textColor, theme);
        if (textColor.err)
            throw cjs.ThrowError(textColor.err, "Button text color is undefined");
        var fontSize = theme.typography.fontSize[props.textSize];
        return {
            "--padding": btnSize,
            "--color": btnColor.color,
            "--text-color": textColor.color,
            "--size": fontSize,
            "--disabled": Colors.gray[600],
        };
    }, [props, theme]);
    return val;
};
var sizes = {
    xs: "0.25rem 0.5rem",
    sm: "0.5rem 1rem",
    md: "1.5rem 3rem",
    lg: "2rem 4rem",
    xl: "3rem 6rem",
};
/*
    Button Wrapper Styles
*/
var wrapper = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tdisplay: flex;\n\talign-content: center;\n\tjustify-content: center;\n"], ["\n\tdisplay: flex;\n\talign-content: center;\n\tjustify-content: center;\n"])));
var transitions = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\t/* \n\t\tBase Transitions\n\t*/\n\ttransition: background 0.25s ease-in-out, color 0.25s ease-in, outline-offset 0.25s ease-in-out,\n\t\toutline 0.25s ease-in-out;\n"], ["\n\t/* \n\t\tBase Transitions\n\t*/\n\ttransition: background 0.25s ease-in-out, color 0.25s ease-in, outline-offset 0.25s ease-in-out,\n\t\toutline 0.25s ease-in-out;\n"
    /*
        Variant Styles
    */
])));
/*
    Variant Styles
*/
var variants = css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\t/* Solid */\n\t&[data-emphasis^=\"solid\"] {\n\t\tbackground: rgb(var(--color));\n\t\t@media (hover: hover) {\n\t\t\t&:hover {\n\t\t\t\tbackground: rgba(var(--color), 0.95);\n\t\t\t}\n\t\t}\n\t\t&:active,\n\t\t&:focus {\n\t\t\tbackground: rgba(var(--color), 0.75);\n\t\t}\n\t}\n\n\t/* Outline */\n\t&[data-emphasis^=\"outline\"] {\n\t\tborder: 2px solid rgb(var(--color));\n\t}\n\n\t/* Ghost */\n\t&[data-emphasis^=\"ghost\"] {\n\t\tbackground: transparent;\n\t\toutline: none;\n\t\t@media (hover: hover) {\n\t\t\t&:hover,\n\t\t\t&:active,\n\t\t\t&:focus {\n\t\t\t\tbackground-color: rgba(var(--color), 0.35);\n\t\t\t}\n\t\t}\n\t}\n\n\t/* Link */\n\t&[data-emphasis^=\"link\"] {\n\t\tbackground: transparent;\n\t\tcolor: rgb(var(--sbu-accent));\n\t\ttext-decoration: underline;\n\t\toutline: none;\n\n\t\t//TODO:\n\t\t/* &:active,\n\t\t&:focus {\n\t\t\tcolor: ;\n\t\t} */\n\t}\n\n\t/* Disabled */\n\t&[data-loading^=\"true\"],\n\t&[data-disabled^=\"true\"] {\n\t\tbackground: rgb(var(--disabled));\n\t\toutline: none;\n\t}\n\n\t&[data-emphasis^=\"disabled\"] {\n\t\tbackground: rgb(var(--color), 0.5);\n\t\tfilter: brightness(80%);\n\t\tcursor: not-allowed;\n\t}\n"], ["\n\t/* Solid */\n\t&[data-emphasis^=\"solid\"] {\n\t\tbackground: rgb(var(--color));\n\t\t@media (hover: hover) {\n\t\t\t&:hover {\n\t\t\t\tbackground: rgba(var(--color), 0.95);\n\t\t\t}\n\t\t}\n\t\t&:active,\n\t\t&:focus {\n\t\t\tbackground: rgba(var(--color), 0.75);\n\t\t}\n\t}\n\n\t/* Outline */\n\t&[data-emphasis^=\"outline\"] {\n\t\tborder: 2px solid rgb(var(--color));\n\t}\n\n\t/* Ghost */\n\t&[data-emphasis^=\"ghost\"] {\n\t\tbackground: transparent;\n\t\toutline: none;\n\t\t@media (hover: hover) {\n\t\t\t&:hover,\n\t\t\t&:active,\n\t\t\t&:focus {\n\t\t\t\tbackground-color: rgba(var(--color), 0.35);\n\t\t\t}\n\t\t}\n\t}\n\n\t/* Link */\n\t&[data-emphasis^=\"link\"] {\n\t\tbackground: transparent;\n\t\tcolor: rgb(var(--sbu-accent));\n\t\ttext-decoration: underline;\n\t\toutline: none;\n\n\t\t//TODO:\n\t\t/* &:active,\n\t\t&:focus {\n\t\t\tcolor: ;\n\t\t} */\n\t}\n\n\t/* Disabled */\n\t&[data-loading^=\"true\"],\n\t&[data-disabled^=\"true\"] {\n\t\tbackground: rgb(var(--disabled));\n\t\toutline: none;\n\t}\n\n\t&[data-emphasis^=\"disabled\"] {\n\t\tbackground: rgb(var(--color), 0.5);\n\t\tfilter: brightness(80%);\n\t\tcursor: not-allowed;\n\t}\n"])));
var templateObject_1, templateObject_2, templateObject_3;

export { MemoizedClasses, MemoizedStyles, wrapper };
//# sourceMappingURL=styles.js.map
