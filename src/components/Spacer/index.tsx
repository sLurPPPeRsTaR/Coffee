import React from 'react';
import { View, ViewProps } from 'react-native';

interface SpacerProps extends ViewProps {
  height?: number;
  width?: number;
  color?: string;
}

const Spacer: React.FC<SpacerProps> = ({
  height,
  width,
  style,
  color: backgroundColor,
  ...otherProps
}) => <View style={[{ height, width, backgroundColor }, style]} {...otherProps} />;

export default Spacer;
