import React, { useMemo, useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface DashedLineProps {
  dashGap?: number;
  dashLength?: number;
  dashThickness?: number;
  dashColor?: string;
  dashStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

const DashedLine = ({
  dashGap = 2,
  dashLength = 4,
  dashThickness = 2,
  dashColor = '#000',
  dashStyle,
  style,
}: DashedLineProps) => {
  const [lineLength, setLineLength] = useState(0);
  const numOfDashes = Math.ceil(lineLength / (dashGap + dashLength));

  const dashStyles = useMemo(
    () => ({
      width: dashLength,
      height: dashThickness,
      marginRight: dashGap,
      marginBottom: 0,
      backgroundColor: dashColor,
    }),
    [dashColor, dashGap, dashLength, dashThickness],
  );

  return (
    <View
      onLayout={event => {
        const { width } = event.nativeEvent.layout;
        setLineLength(width);
      }}
      style={[style, styles.row]}
    >
      {[...Array(numOfDashes)].map((_, i) => {
        return <View key={i} style={[dashStyles, dashStyle]} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default DashedLine;
