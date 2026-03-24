/**
 * Light Tactile Theme – Matching Stitch "Tactile IDE" design
 * Warm white surfaces, Manrope headlines, soft neomorphic depth.
 */
export const colors = {
  // Surfaces (warm white hierarchy)
  background: '#FFFCF7',
  surface: '#FFFCF7',
  surfaceContainer: '#F6F4EC',
  surfaceContainerLow: '#FCF9F3',
  surfaceContainerHigh: '#F0EEE5',
  surfaceContainerHighest: '#EAE9DD',
  surfaceContainerLowest: '#FFFFFF',
  surfaceBright: '#FFFCF7',
  surfaceVariant: '#EAE9DD',
  surfaceDim: '#E4E3D6',

  // Text
  textPrimary: '#373831',
  textSecondary: '#64655C',
  textMuted: '#818178',

  // Accents
  primary: '#5D4BE1',
  primaryDim: '#503DD4',
  primaryContainer: '#C0B9FF',
  primaryFixed: '#C0B9FF',
  primaryFixedDim: '#B1AAFF',
  inversePrimary: '#8B80FF',

  secondary: '#355CCC',
  secondaryDim: '#254FBF',
  secondaryContainer: '#DCE1FF',

  tertiary: '#007070',
  tertiaryDim: '#006363',
  tertiaryContainer: '#74F0EF',
  tertiaryFixedDim: '#64E1E1',

  // On-colors
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  onTertiary: '#FFFFFF',
  onSurface: '#373831',
  onSurfaceVariant: '#64655C',
  onPrimaryContainer: '#3310B9',
  onSecondaryContainer: '#1B48B8',

  // Semantic
  success: '#007070',
  warning: '#F59E0B',
  error: '#B3374E',
  errorContainer: '#F76A80',
  errorDim: '#770326',

  // Outline
  outline: '#818178',
  outlineVariant: '#BABAAF',

  // Grid (A*)
  gridStart: '#007070',
  gridEnd: '#355CCC',
  gridObstacle: '#64655C',
  gridOpen: '#C0B9FF',
  gridClosed: '#EAE9DD',
  gridCurrent: '#5D4BE1',
  gridPath: '#5D4BE1',
  gridEmpty: '#FFFFFF',

  // Alpha-Beta Tree
  treeMax: '#5D4BE1',
  treeMin: '#355CCC',
  treePruned: '#BABAAF',
  treeActive: '#5D4BE1',
};

export const gradients = {
  screen: ['#FFFCF7', '#FFFCF7', '#F6F4EC'] as const,
  primary: ['#5D4BE1', '#355CCC'] as const,
  card: ['rgba(255,255,255,0.7)', 'rgba(246,244,236,0.5)'] as const,
};
