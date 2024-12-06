/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // General text color
            color: theme("colors.foreground"),
            // Headings
            h1: {
              color: theme("colors.foreground"),
              fontWeight: theme("fontWeight.bold"),
            },
            h2: {
              color: theme("colors.foreground"),
              fontWeight: theme("fontWeight.semibold"),
            },
            h3: {
              color: theme("colors.foreground"),
              fontWeight: theme("fontWeight.medium"),
            },
            // Links
            a: {
              color: theme("colors.blue.500"),
              textDecoration: "underline",
              "&:hover": {
                color: theme("colors.blue.700"),
              },
            },
            strong: {
              color: theme("colors.foreground"), // Matches the text color
              fontWeight: theme("fontWeight.bold"), // Ensures boldness
            },
            // Blockquote
            blockquote: {
              color: theme("colors.foreground"),
              borderLeftColor: theme("colors.gray.300"),
              fontStyle: "italic",
            },
            // Code (inline)
            "code::before": { content: '""' }, // Prevent extra quotes
            "code::after": { content: '""' }, // Prevent extra quotes
            code: {
              color: theme("colors.red.500"),
              backgroundColor: theme("colors.gray.100"),
              padding: "0.2em 0.4em",
              borderRadius: theme("borderRadius.sm"),
            },
            // Code blocks
            pre: {
              backgroundColor: theme("colors.gray.900"),
              color: theme("colors.gray.100"),
              padding: theme("spacing.4"),
              borderRadius: theme("borderRadius.lg"),
              overflowX: "auto",
            },
            // Lists
            ul: {
              color: theme("colors.foreground"),
              listStyleType: "disc",
              paddingLeft: theme("spacing.5"),
            },
            ol: {
              color: theme("colors.foreground"),
              listStyleType: "decimal",
              paddingLeft: theme("spacing.5"),
            },
            li: {
              "&::marker": {
                color: theme("colors.gray.500"),
              },
            },
            // Images
            img: {
              borderRadius: theme("borderRadius.md"),
            },
            // Tables
            table: {
              width: "100%",
              borderCollapse: "collapse",
            },
            th: {
              borderBottomWidth: "2px",
              borderBottomColor: theme("colors.gray.300"),
              color: theme("colors.foreground"),
              fontWeight: theme("fontWeight.bold"),
              textAlign: "left",
            },
            td: {
              borderBottomWidth: "1px",
              borderBottomColor: theme("colors.gray.200"),
              padding: theme("spacing.2"),
            },
            // Math-specific styling
            ".katex": {
              color: theme("colors.gray.800"),
              fontSize: theme("fontSize.sm"),
            },
            ".katex-display": {
              margin: theme("spacing.4"),
            },
          },
        },
      }),
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
