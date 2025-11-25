"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColorName;
(function (ColorName) {
    ColorName["Red"] = "red";
    ColorName["Green"] = "green";
    ColorName["Blue"] = "blue";
})(ColorName || (ColorName = {}));
function rgbToHex(rgb) {
    const compToHex = (c) => c.toString(16).padStart(2, '0');
    return `#${compToHex(rgb[0])}${compToHex(rgb[1])}${compToHex(rgb[2])}}`;
}
function getColorInfo(color) {
    let rgb;
    switch (color) {
        case ColorName.Red:
            rgb = [255, 0, 0];
            break;
        case ColorName.Green:
            rgb = [0, 255, 0];
            break;
        case ColorName.Blue:
            rgb = [0, 0, 255];
            break;
    }
    return [rgb, rgbToHex(rgb)];
}
console.log(getColorInfo(ColorName.Red));
console.log(getColorInfo(ColorName.Green));
console.log(getColorInfo(ColorName.Blue));
//# sourceMappingURL=task_2.js.map