/**
 * SmartAttend — Logo SVG Component
 * Reconstructed from smartattend_logo/code.html
 * 80×80 viewBox, primary color #0645E5
 */
import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

interface Props {
  size?: number;
}

export function SmartAttendLogo({ size = 64 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <Rect width="80" height="80" rx="20" fill="#EEF4FF" />
      {/* Mortarboard top */}
      <Path d="M40 18L18 29L40 40L62 29L40 18Z" fill="#0645E5" />
      {/* Gown arc */}
      <Path
        d="M26 34.5V47.5C26 53.5 32 58 40 58C48 58 54 53.5 54 47.5V34.5"
        stroke="#0645E5"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tassel cord */}
      <Path
        d="M62 29V46"
        stroke="#0645E5"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Tassel dot */}
      <Circle cx="62" cy="48" r="3" fill="#0645E5" />
      {/* Check mark */}
      <Path
        d="M34 46L38 50L48 40"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
