// Pastel surfaces + dark text (readable dark blue / dark pink)
export const WEDDING_LIGHT_PINK = '#F4E8E9'
export const WEDDING_LIGHT_BLUE = '#E2EAFC'
export const WEDDING_TEXT_DARK_BLUE = '#2F3E46'
export const WEDDING_TEXT_DARK_PINK = '#6D5959'
export const WEDDING_TEXT_ACCENT_BLUE = '#6D5959'
export const WEDDING_LIGHT_PINK_ACCENT = '#F5B8CC'
export const WEDDING_LIGHT_BLUE_ACCENT = '#E2EAFC'

export const WEDDING_BLUSH = WEDDING_LIGHT_PINK
export const WEDDING_INK = WEDDING_TEXT_DARK_BLUE
export const WEDDING_BLUSH_DEEP = WEDDING_LIGHT_PINK_ACCENT
export const WEDDING_BLUE_DEEP = WEDDING_LIGHT_BLUE_ACCENT

/** @deprecated name — use WEDDING_TEXT_DARK_BLUE */
export const WEDDING_TEXT_BLUE = WEDDING_TEXT_DARK_BLUE

export const themeConfig = {
    backgrounds: {
        primary: 'bg-[#F4E8E9]',
        secondary: 'bg-[#E2EAFC]',
        tertiary: 'bg-[#F4E8E9]',
        accent: 'bg-[#E2EAFC]',
        light: 'bg-white/50',
        theme: 'bg-[#E2EAFC]',
        crumpledPaper: 'bg-[url("/assets/images/crumpled-paper.png")] bg-cover bg-center bg-no-repeat',
    },

    text: {
        primary: 'text-[#2F3E46]',
        secondary: 'text-[#6D5959]',
        accent: 'text-[#6D5959]',
        muted: 'text-gray-500',
        dark: 'text-[#2F3E46]',
        theme: 'text-[#2F3E46]',
        pause: 'text-[#dcdcdc]',
        custom: 'text-[#2F3E46]',
    },

    borders: {
        primary: 'border-gray-200',
        secondary: 'border-gray-300',
        accent: 'border-[#6D5959]/40',
        theme: 'border-[#E2EAFC]',
    },

    buttons: {
        primary: 'bg-[#F4E8E9] hover:bg-[#F5B8CC]',
        secondary: 'border border-[#E2EAFC] hover:border-[#E2EAFC]',
        text: 'text-gray-600 hover:text-gray-800',
        theme: 'bg-[#E2EAFC] hover:bg-[#E2EAFC]',
    },

    hover: {
        primary: 'hover:bg-[#F5B8CC]',
        secondary: 'hover:border-[#E2EAFC] hover:text-gray-800',
        theme: 'hover:bg-[#E2EAFC]',
    },

    container: {
        maxWidth: 'max-w-[1300px]',
        padding: 'px-4 sm:px-6 lg:px-8',
        center: 'mx-auto',
    },

    calendar: {
        weddingDate: '2026-09-05',
        highlightColor: 'bg-[#F4E8E9]',
        heartColor: 'text-[#6D5959]',
        textColor: 'text-gray-600',
        headerColor: 'text-gray-700',
        dayNamesColor: 'text-gray-500',
        background: 'bg-[#E2EAFC]',
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
