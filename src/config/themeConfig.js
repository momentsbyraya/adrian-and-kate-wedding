// Pastel surfaces + dark text (readable dark blue / dark pink)
export const WEDDING_LIGHT_PINK = '#F7DAE7'
export const WEDDING_LIGHT_BLUE = '#c6d7f4'
export const WEDDING_TEXT_DARK_BLUE = '#1e4566'
export const WEDDING_TEXT_DARK_PINK = '#8b4a5c'
export const WEDDING_TEXT_ACCENT_BLUE = '#234d6b'
export const WEDDING_LIGHT_PINK_ACCENT = '#F5B8CC'
export const WEDDING_LIGHT_BLUE_ACCENT = '#c6d7f4'

export const WEDDING_BLUSH = WEDDING_LIGHT_PINK
export const WEDDING_INK = WEDDING_TEXT_DARK_BLUE
export const WEDDING_BLUSH_DEEP = WEDDING_LIGHT_PINK_ACCENT
export const WEDDING_BLUE_DEEP = WEDDING_LIGHT_BLUE_ACCENT

/** @deprecated name — use WEDDING_TEXT_DARK_BLUE */
export const WEDDING_TEXT_BLUE = WEDDING_TEXT_DARK_BLUE

export const themeConfig = {
    backgrounds: {
        primary: 'bg-[#F7DAE7]',
        secondary: 'bg-[#c6d7f4]',
        tertiary: 'bg-[#F7DAE7]',
        accent: 'bg-[#c6d7f4]',
        light: 'bg-white/50',
        theme: 'bg-[#c6d7f4]',
        crumpledPaper: 'bg-[url("/assets/images/crumpled-paper.png")] bg-cover bg-center bg-no-repeat',
    },

    text: {
        primary: 'text-[#1e4566]',
        secondary: 'text-[#8b4a5c]',
        accent: 'text-[#234d6b]',
        muted: 'text-gray-500',
        dark: 'text-[#1e4566]',
        theme: 'text-[#1e4566]',
        pause: 'text-[#dcdcdc]',
        custom: 'text-[#1e4566]',
    },

    borders: {
        primary: 'border-gray-200',
        secondary: 'border-gray-300',
        accent: 'border-[#8b4a5c]/40',
        theme: 'border-[#c6d7f4]',
    },

    buttons: {
        primary: 'bg-[#F7DAE7] hover:bg-[#F5B8CC]',
        secondary: 'border border-[#c6d7f4] hover:border-[#c6d7f4]',
        text: 'text-gray-600 hover:text-gray-800',
        theme: 'bg-[#c6d7f4] hover:bg-[#c6d7f4]',
    },

    hover: {
        primary: 'hover:bg-[#F5B8CC]',
        secondary: 'hover:border-[#c6d7f4] hover:text-gray-800',
        theme: 'hover:bg-[#c6d7f4]',
    },

    container: {
        maxWidth: 'max-w-[1300px]',
        padding: 'px-4 sm:px-6 lg:px-8',
        center: 'mx-auto',
    },

    calendar: {
        weddingDate: '2026-07-03',
        highlightColor: 'bg-[#F7DAE7]',
        heartColor: 'text-[#8b4a5c]',
        textColor: 'text-gray-600',
        headerColor: 'text-gray-700',
        dayNamesColor: 'text-gray-500',
        background: 'bg-[#c6d7f4]',
    },

    paragraph: {
        background: 'bg-white',
    },

    cssVariables: {
        '--primary-bg': WEDDING_LIGHT_PINK,
        '--secondary-bg': WEDDING_LIGHT_BLUE,
        '--tertiary-bg': WEDDING_LIGHT_PINK,
        '--accent-bg': WEDDING_LIGHT_BLUE,
        '--accent-hover': WEDDING_LIGHT_BLUE_ACCENT,
        '--primary-text': WEDDING_TEXT_DARK_BLUE,
        '--secondary-text': WEDDING_TEXT_DARK_PINK,
        '--accent-text': WEDDING_TEXT_ACCENT_BLUE,
        '--muted-text': '#9ca3af',
        '--border-color': WEDDING_LIGHT_BLUE_ACCENT,
        '--custom-theme': WEDDING_LIGHT_BLUE,
        '--wedding-blush': WEDDING_LIGHT_PINK,
        '--wedding-light-blue': WEDDING_LIGHT_BLUE,
        '--wedding-ink': WEDDING_TEXT_DARK_BLUE,
    }
}

export const themePresets = {
    darkElegant: {
        backgrounds: {
            primary: 'bg-gray-900',
            secondary: 'bg-gray-800',
            accent: 'bg-[#008080]',
        },
        text: {
            primary: 'text-white',
            secondary: 'text-gray-300',
            accent: 'text-[#008080]',
        }
    },

    lightRomantic: {
        backgrounds: {
            primary: 'bg-rose-50',
            secondary: 'bg-white',
            accent: 'bg-rose-500',
        },
        text: {
            primary: 'text-gray-900',
            secondary: 'text-gray-600',
            accent: 'text-rose-600',
        }
    },

    warmAutumn: {
        backgrounds: {
            primary: 'bg-amber-50',
            secondary: 'bg-orange-100',
            accent: 'bg-orange-500',
        },
        text: {
            primary: 'text-amber-900',
            secondary: 'text-amber-700',
            accent: 'text-orange-600',
        }
    }
}

export const getThemeColor = (type, variant = 'primary') => {
    return themeConfig[type]?.[variant] || themeConfig.text.primary
}

export const applyThemePreset = (presetName) => {
    const preset = themePresets[presetName]
    if (preset) {
        Object.assign(themeConfig, preset)
    }
}
