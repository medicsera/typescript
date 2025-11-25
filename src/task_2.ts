type RGBColor = [number, number, number]

enum ColorName{
    Red = "red",
    Green = "green",
    Blue = "blue"
}

function rgbToHex(rgb: RGBColor): string{
    const compToHex = (c: number): string => c.toString(16).padStart(2,'0')
    return `#${compToHex(rgb[0])}${compToHex(rgb[1])}${compToHex(rgb[2])}}`
}


function getColorInfo(color: ColorName): [RGBColor, string] {
    let rgb: RGBColor

    switch (color) {
        case ColorName.Red:
            rgb = [255,0,0]
            break;
        case ColorName.Green:
            rgb = [0,255,0]
            break;
        case ColorName.Blue:
            rgb = [0,0,255]
            break;
    }
    return [rgb, rgbToHex(rgb)]
}


console.log(getColorInfo(ColorName.Red))
console.log(getColorInfo(ColorName.Green))
console.log(getColorInfo(ColorName.Blue))
