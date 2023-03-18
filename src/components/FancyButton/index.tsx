import React, { useEffect } from 'react';
import { ActivityIndicator, StyleProp, ViewStyle, ColorValue } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Observable, Subscription } from 'rxjs';
import { useToggle } from '@hooks';

import styles from './styles';

interface FancyButtonProps {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  onPress: () => Promise<void>;
  loadingColor?: ColorValue;
  disabled?: boolean;
}

const FancyButton: React.FC<FancyButtonProps> = ({
  children,
  containerStyle,
  onPress,
  loadingColor,
  disabled,
}) => {
  let subscription: Subscription | null = null;
  const [isLoading, toggleLoading] = useToggle(false);

  function handlePress() {
    toggleLoading();
    const observable = new Observable<boolean>(subscriber => {
      onPress()
        .then(() => {
          subscriber.next(true);
          subscriber.complete();
        })
        .catch((err: unknown) => {
          subscriber.error(err);
        });
    });
    subscription = observable.subscribe({
      next: (value: boolean) => {
        if (value) {
          toggleLoading();
        }
      },
      error: err => {
        if (err instanceof Error) {
          console.log(`Error at fancy button observable ${err.message}`);
        }
      },
    });
  }

  useEffect(() => {
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [subscription]);

  return (
    <TouchableOpacity
      disabled={isLoading || disabled}
      style={[styles.row, containerStyle]}
      onPress={() => handlePress()}
    >
      {isLoading ? (
        <ActivityIndicator color={loadingColor || '#FFFFFF'} />
      ) : (
        React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child);
          }
        })
      )}
    </TouchableOpacity>
  );
};

export default FancyButton;
