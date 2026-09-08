/**
 * SmartAttend Design System — Typography Scale
 * Font: Inter (400/500/600/700)
 * Extracted from Stitch prototype fontSize config
 */
import { TextStyle } from 'react-native';

export const Typography = {
  headlineXl: {
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.6,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  } as TextStyle,

  headlineLg: {
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.36,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  } as TextStyle,

  headlineMd: {
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.2,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  } as TextStyle,

  titleSm: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.08,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  } as TextStyle,

  labelLg: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.14,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  } as TextStyle,

  labelMd: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.18,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
  } as TextStyle,

  labelXs: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.4,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  } as TextStyle,

  bodyMd: {
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0,
    fontWeight: '400',
    fontFamily: 'Inter_400Regular',
  } as TextStyle,

  bodySm: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.065,
    fontWeight: '400',
    fontFamily: 'Inter_400Regular',
  } as TextStyle,
} as const;
