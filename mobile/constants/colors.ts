/**
 * SmartAttend Design System — Color Tokens
 * Extracted from Stitch prototype Tailwind config (all 45 screens share this palette)
 */
export const Colors = {
  // Primary
  primary: '#0032af',
  primaryContainer: '#0645e5',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#c5ceff',
  primaryFixed: '#dde1ff',
  primaryFixedDim: '#b8c4ff',
  onPrimaryFixed: '#001355',
  onPrimaryFixedVariant: '#0036bc',
  inversePrimary: '#b8c4ff',

  // Secondary
  secondary: '#475c97',
  onSecondary: '#ffffff',
  secondaryContainer: '#a7bcfe',
  onSecondaryContainer: '#344a85',
  secondaryFixed: '#dae1ff',
  secondaryFixedDim: '#b3c5ff',
  onSecondaryFixed: '#001849',
  onSecondaryFixedVariant: '#2e447e',

  // Tertiary (purple — hero cards)
  tertiary: '#411ab9',
  onTertiary: '#ffffff',
  tertiaryContainer: '#593cd1',
  onTertiaryContainer: '#d3caff',
  tertiaryFixed: '#e5deff',
  tertiaryFixedDim: '#c9bfff',
  onTertiaryFixed: '#1b0063',
  onTertiaryFixedVariant: '#4623be',

  // Surface
  surface: '#f9f9ff',
  surfaceBright: '#f9f9ff',
  surfaceDim: '#d3daef',
  surfaceVariant: '#dce2f7',
  surfaceContainer: '#e9edff',
  surfaceContainerLow: '#f1f3ff',
  surfaceContainerHigh: '#e1e8fd',
  surfaceContainerHighest: '#dce2f7',
  surfaceContainerLowest: '#ffffff',
  surfaceTint: '#174cea',
  inverseSurface: '#293040',
  inverseOnSurface: '#edf0ff',

  // On Surface
  onSurface: '#141b2b',
  onSurfaceVariant: '#434656',
  textPrimary: '#141b2b',
  textSecondary: '#434656',
  background: '#f9f9ff',
  onBackground: '#141b2b',

  // Outline
  outline: '#747687',
  outlineVariant: '#c4c5d8',

  // Error
  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',

  // Status — Success (green)
  success: '#16a34a',
  successContainer: '#eaf8ed',
  onSuccess: '#ffffff',

  // Status — Warning (amber/orange)
  warning: '#f59e0b',
  warningContainer: '#fff7e6',
  warningContainerAlt: '#feebc8',

  // Status — Info
  info: '#0645e5',
  infoContainer: '#eef4ff',

  // Status — Danger/Alert
  danger: '#ef174f',
  dangerContainer: '#fff0f3',

  // White & transparency helpers
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof Colors;
