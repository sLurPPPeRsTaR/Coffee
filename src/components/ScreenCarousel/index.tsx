import React, { useRef, useCallback, useState } from 'react';
import { StyleProp, ViewStyle, ScrollView, Dimensions, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

interface ScreenCarouselProps {
  children: React.ReactNode;
  goBack: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const INTERVALS = 2;
const { width: WIDTH } = Dimensions.get('window');

const ScreenCarousel: React.FC<ScreenCarouselProps> = ({ children, goBack, containerStyle }) => {
  const scrollViewRef = useRef<null | ScrollView>(null);
  const [pageIndex, setPageIndex] = useState<number>(0);

  const toNextPage = () => {
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: WIDTH * (pageIndex + 1),
        animated: true,
      });
      setPageIndex(index => index + 1);
    }
  };

  const toPrevPage = useCallback(() => {
    if (scrollViewRef.current !== null) {
      if (pageIndex === 0) {
        goBack();
      } else {
        scrollViewRef.current.scrollTo({
          x: WIDTH * (pageIndex - 1),
          animated: true,
        });
        setPageIndex(index => index - 1);
      }
    }
    return true;
  }, [goBack, pageIndex]);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', toPrevPage);
      return () => BackHandler.removeEventListener('hardwareBackPress', toPrevPage);
    }, [toPrevPage]),
  );
  return (
    <ScrollView
      horizontal
      pagingEnabled
      ref={scrollViewRef}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={200}
      contentContainerStyle={[{ width: `${100 * INTERVALS}%` }, containerStyle]}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { toNextPage, toPrevPage });
        }
      })}
    </ScrollView>
  );
};

export default ScreenCarousel;
