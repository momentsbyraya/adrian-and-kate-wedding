// Theme Configuration — single brand brown #6F4827 everywhere brown is used
export const themeConfig = {
    // Background Colors
    backgrounds: {
        primary: 'bg-[#6F4827]',
        secondary: 'bg-[#6F4827]',
        tertiary: 'bg-[#6F4827]',
        accent: 'bg-[#D4A5A5]',      // Accent background (Dusty Pink)
        light: 'bg-white/50',          // Light overlay backgrounds
        theme: 'bg-[#dee5ed]',        // Custom theme color
        crumpledPaper: 'bg-[url("/assets/images/crumpled-paper.png")] bg-cover bg-center bg-no-repeat', // Crumpled paper background
    },

    // Text Colors
    text: {
        primary: 'text-[#6F4827]',     // Brand brown text
        secondary: 'text-[#D4A5A5]',    // Subheading and body text color (Dusty Pink)
        accent: 'text-[#D4A5A5]',    // Accent text color (Dusty Pink)
        muted: 'text-gray-400',        // Muted text color (icons, small text)
        dark: 'text-[#6F4827]',      // Brand brown
        theme: 'text-[#6F4827]',      // Custom theme text
        pause: 'text-[#dcdcdc]',      // Pause button text color
        custom: 'text-[#44484d]',     // Custom text color
    },

    // Border Colors
    borders: {
        primary: 'border-gray-700',    // Main border color
        secondary: 'border-gray-600',  // Secondary border color
        accent: 'border-[#6F4827]',  // Brand brown border
        theme: 'border-[#6F4827]',    // Custom theme border
    },

    // Button Colors
    buttons: {
        primary: 'bg-[#D4A5A5] hover:bg-[#B89090]',  // Primary button (Dusty Pink)
        secondary: 'border border-[#87AE73] hover:border-[#6B8E5A]', // Secondary button (Sage Green)
        text: 'text-gray-300 hover:text-white', // Button text color
        theme: 'bg-[#6F4827] hover:bg-[#6F4827]/80', // Custom theme button
    },

    // Hover Effects
    hover: {
        primary: 'hover:bg-[#B89090]',     // Primary button hover (Darker Dusty Pink)
        secondary: 'hover:border-[#6B8E5A] hover:text-white', // Secondary button hover (Darker Sage Green)
        theme: 'hover:bg-[#6F4827]/80',     // Custom theme hover
    },

    // Container Configuration
    container: {
        maxWidth: 'max-w-[1300px]',
        padding: 'px-4 sm:px-6 lg:px-8',
        center: 'mx-auto',
    },

    // Calendar Configuration
    calendar: {
        weddingDate: '2026-10-09',          // Wedding date (YYYY-MM-DD format)
        highlightColor: 'bg-[#6F4827]',     // Brand brown highlight
        heartColor: 'text-[#6F4827]',       // Heart icon
        textColor: 'text-gray-700',         // Calendar text color
        headerColor: 'text-gray-800',       // Month header color
        dayNamesColor: 'text-gray-600',     // Day names color
        background: 'bg-[#6F4827]',         // Calendar background
    },

    // Paragraph Configuration
    paragraph: {
        background: 'bg-white',         // Neutral surface (RSVP modal, etc.)
    },

    // Custom CSS Variables (for advanced customization)
    cssVariables: {
        '--primary-bg': '#6F4827',
        '--secondary-bg': '#6F4827',
        '--tertiary-bg': '#6F4827',
        '--accent-bg': '#D4A5A5',           // #D4A5A5 (Dusty Pink)
        '--accent-hover': '#B89090',        // #B89090 (Darker Dusty Pink Hover)
        '--primary-text': '#6F4827',        // Brand brown
        '--secondary-text': '#D4A5A5',      // #D4A5A5 (Dusty Pink)
        '--accent-text': '#D4A5A5',         // #D4A5A5 (Dusty Pink)
        '--muted-text': '#9ca3af',          // #9ca3af (gray-400)
        '--border-color': '#C0C0C0',        // #C0C0C0 (Silver)
        '--custom-theme': '#6F4827',        // Brand brown
        '--old-rose': '#C08081',            // #C08081 (Old Rose)
        '--light-pink': '#F5C2C2',          // #F5C2C2 (Light Pink)
        '--gold': '#D4AF37',                // #D4AF37 (Gold)
        '--dusty-pink': '#D4A5A5',          // #D4A5A5 (Dusty Pink)
        '--sage-green': '#87AE73'           // #87AE73 (Sage Green)
    }
}

// Quick color presets for different themes
export const themePresets = {
    // Dark Elegant (Current)
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

    // Light Romantic
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

    // Warm Autumn
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

// Helper function to get theme colors
export const getThemeColor = (type, variant = 'primary') => {
    return themeConfig[type]?.[variant] || themeConfig.text.primary
}

// Helper function to apply theme preset
export const applyThemePreset = (presetName) => {
    const preset = themePresets[presetName]
    if (preset) {
        Object.assign(themeConfig, preset)
    }
}
