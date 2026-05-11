export type ThemeMode = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

export interface ThemeOption {
  readonly value: ThemeMode;
  readonly label: string;
  readonly aria: string;
}
