module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: [
      "src/**/*.js"
    ]
  },
  theme: {
    extend: {
      lineHeight: {
        '11': '2.75rem',
        '12': '3rem',
      },
      rotate: {
        360: "360deg"
      },
      borderWidth: {
        6: "6px"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
        112: "28rem",
      }
    },
    screens: {
      "xs": "480px",
      "sm": "639px",
      "md": "767px",
      "lg": "1023px",
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      gray: {
        100: "#f7fafc",
        200: "#edf2f7",
        300: "#e2e8f0",
        400: "#cbd5e0",
        500: "#a0aec0",
        600: "#718096",
        700: "#4a5568",
        800: "#2d3748",
        900: "#1a202c",
      },
      red: {
        50: "#FDF5F5",
        100: "#FBEBEA",
        200: "#F6CCCC",
        300: "#F0AEAD",
        400: "#E4716F",
        500: "#D93431",
        600: "#C32F2C",
        700: "#821F1D",
        800: "#621716",
        900: "#41100F",
      },
      blue: {
        50: "#f6fbfc",
        100: "#eaf3fa",
        200: "#daeaf6",
        300: "#acd7ea",
        400: "#83cbea",
        500: "#00AFFA",
        600: "#0097d3",
        700: "#006996",
        800: "#004F71",
        900: "#00354B",
      },
      orange: {
        50: "#FFFBF3",
        100: "#FEF6E7",
        200: "#FDEAC3",
        300: "#FBDD9E",
        400: "#F9C356",
        500: "#f6a90d",
        600: "#d19006",
        700: "#976a00",
        800: "#644700",
        900: "#453300",
      },
    }
  },
  variants: {
    animation: ["hover", "group-hover"],
    rotate: ["hover", "group-hover"],
    borderWidth: ["hover", "responsive"]
  },
  plugins: [],
};
