'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var require$$0$1 = require('tslib');
var require$$1 = require('react/jsx-runtime');
var require$$0 = require('react');
var index = require('./theme/dist/cjs/index.js');
var require$$1$1 = require('@linaria/react');
var spinner = require('./assets/dist/esm/spinner.js');
var styles = require('./styles.js');

var Button = require$$0.forwardRef(function (props, ref) {
    var _a = props.loadingText, loadingText = _a === void 0 ? "loading" : _a, _b = props.isActive, isActive = _b === void 0 ? false : _b, _c = props.isLoading, isLoading = _c === void 0 ? false : _c, _d = props.containerWidth, containerWidth = _d === void 0 ? false : _d, _e = props.size, size = _e === void 0 ? "md" : _e, _f = props.color, color = _f === void 0 ? "accent" : _f, _g = props.textColor, textColor = _g === void 0 ? "text.primary" : _g, _h = props.textSize, textSize = _h === void 0 ? "lg" : _h, _j = props.variant, variant = _j === void 0 ? "solid" : _j, className = props.className, htmlAttributes = require$$0$1.__rest(props, ["loadingText", "isActive", "isLoading", "containerWidth", "size", "color", "textColor", "textSize", "variant", "className"]);
    var theme = index.useTheme();
    var composedStyles = styles.MemoizedStyles({ size: size, color: color, textColor: textColor, textSize: textSize }, theme);
    var classNames = styles.MemoizedClasses(className);
    return (require$$1.jsx("div", require$$0$1.__assign({ className: styles.wrapper }, { children: require$$1.jsxs(StyledButton, require$$0$1.__assign({ style: composedStyles, ref: ref, className: classNames, disabled: isLoading || variant === "disabled" ? true : false, "data-emphasis": variant, "data-active": isActive, "aria-busy": isLoading, "data-loading": isLoading, "data-disabled": variant === "disabled" && true }, htmlAttributes, { containerWidth: containerWidth }, { children: [props.leftIcon && !isLoading && props.leftIcon, props.loadingIcon ? isLoading && props.loadingIcon : isLoading && require$$1.jsx(spinner.Spinner, {}, void 0), isLoading ? loadingText : props.children, props.rightIcon && !isLoading && props.rightIcon] }), void 0) }), void 0));
});
Button.displayName = "Button";
var StyledButton = require$$1$1.styled.button(templateObject_1 || (templateObject_1 = require$$0$1.__makeTemplateObject(["\n\t/* \n\t\tBase Styles\n\t*/\n\tposition: relative;\n\twidth: ", ";\n\tpadding: var(--padding);\n\tbackground: transparent;\n\tcursor: pointer;\n\tborder: none;\n\tborder-radius: var(--sbu-border-radius);\n\tfont-family: var(--sbu-font-family-heading);\n\tfont-size: var(--size);\n\n\t/* \n\t\tBeautifying Styles\n\t*/\n\n\tcolor: rgb(var(--text-color)); /* Inverted color using Invert function */\n\toutline: 10px solid transparent;\n\toutline-offset: -10px;\n\n\t/* \n\t\tStateful Styles\n\t*/\n\n\t&:active,\n\t&:focus {\n\t\toutline-offset: 0;\n\t\toutline-color: rgb(var(--color), 0.15);\n\t}\n"], ["\n\t/* \n\t\tBase Styles\n\t*/\n\tposition: relative;\n\twidth: ", ";\n\tpadding: var(--padding);\n\tbackground: transparent;\n\tcursor: pointer;\n\tborder: none;\n\tborder-radius: var(--sbu-border-radius);\n\tfont-family: var(--sbu-font-family-heading);\n\tfont-size: var(--size);\n\n\t/* \n\t\tBeautifying Styles\n\t*/\n\n\tcolor: rgb(var(--text-color)); /* Inverted color using Invert function */\n\toutline: 10px solid transparent;\n\toutline-offset: -10px;\n\n\t/* \n\t\tStateful Styles\n\t*/\n\n\t&:active,\n\t&:focus {\n\t\toutline-offset: 0;\n\t\toutline-color: rgb(var(--color), 0.15);\n\t}\n"])), function (props) { return (props.containerWidth ? "100%" : "auto"); });
var templateObject_1;

exports.Button = Button;
//# sourceMappingURL=button.js.map
