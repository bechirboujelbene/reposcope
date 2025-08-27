export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Tailwind doesn't require a runtime provider, but we keep this for future theming toggles.
  return children as any;
}
