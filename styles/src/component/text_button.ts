import { interactive, toggleable } from "../element"
import {
    TextProperties,
    background,
    foreground,
    text,
} from "../style_tree/components"
import { useTheme, Theme } from "../theme"
import { Margin } from "./icon_button"

interface TextButtonOptions {
    layer?: Theme["lowest"] | Theme["middle"] | Theme["highest"]
    color?: keyof Theme["lowest"]
    margin?: Partial<Margin>
    text_properties?: TextProperties
}

type ToggleableTextButtonOptions = TextButtonOptions & {
    active_color?: keyof Theme["lowest"]
}

export function text_button({
    color,
    layer,
    margin,
    text_properties,
}: TextButtonOptions) {
    const theme = useTheme()
    if (!color) color = "base"

    const text_options: TextProperties = {
        size: "xs",
        weight: "normal",
        ...text_properties,
    }

    const m = {
        top: margin?.top ?? 0,
        bottom: margin?.bottom ?? 0,
        left: margin?.left ?? 0,
        right: margin?.right ?? 0,
    }

    return interactive({
        base: {
            corner_radius: 6,
            padding: {
                top: 1,
                bottom: 1,
                left: 6,
                right: 6,
            },
            margin: m,
            button_height: 22,
            ...text(layer ?? theme.lowest, "sans", color, text_options),
        },
        state: {
            default: {
                background: background(layer ?? theme.lowest, color),
                color: foreground(layer ?? theme.lowest, color),
            },
            hovered: {
                background: background(layer ?? theme.lowest, color, "hovered"),
                color: foreground(layer ?? theme.lowest, color, "hovered"),
            },
            clicked: {
                background: background(layer ?? theme.lowest, color, "pressed"),
                color: foreground(layer ?? theme.lowest, color, "pressed"),
            },
        },
    })
}

export function toggleable_text_button(
    theme: Theme,
    { color, active_color, margin }: ToggleableTextButtonOptions
) {
    if (!color) color = "base"

    return toggleable({
        state: {
            inactive: text_button({ color, margin }),
            active: text_button({
                color: active_color ? active_color : color,
                margin,
                layer: theme.middle,
            }),
        },
    })
}
