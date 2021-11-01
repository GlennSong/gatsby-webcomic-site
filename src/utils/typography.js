import Typography from 'typography'
import fairyGatesTheme from 'typography-theme-fairy-gates'

const typography = new Typography({
    ...fairyGatesTheme, 
    headerColor: "#ffe1ad",
    bodyColor: "rgba(255, 255, 255, 1.0)",
    overrideStyles: () => ({
        p: {
            color: "white"
        },
        li: {
            color: "white"
        }
    }),
    overrideThemeStyles: () => ({
        a: {
            textShadow: null
        }
    }),
})

export default typography;