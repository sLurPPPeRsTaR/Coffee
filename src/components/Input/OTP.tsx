import React, { useState, useEffect } from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import OTPInputView, { InputProps } from '@twotalltotems/react-native-otp-input';

interface OTPProps extends InputProps {
  pinCount: number;
  style: ViewStyle;
  codeInputFieldStyle: TextStyle;
  onCodeFilled: (value: string) => void;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const OTP = ({
  pinCount,
  style,
  code,
  setCode,
  codeInputFieldStyle,
  onCodeFilled,
}: OTPProps): JSX.Element => {
  const [clearInput, setClearInput] = useState<boolean>(false);

  function handleCodeFilled(value: string) {
    onCodeFilled(value);
    setClearInput(true);
    setCode('');
  }

  useEffect(() => {
    if (clearInput) {
      setTimeout(() => {
        setClearInput(false);
      }, 500);
    }
  }, [clearInput]);

  return (
    <OTPInputView
      pinCount={pinCount}
      clearInputs={clearInput}
      style={style}
      code={code}
      codeInputFieldStyle={codeInputFieldStyle}
      onCodeChanged={value => {
        setCode(value);
      }}
      onCodeFilled={value => {
        handleCodeFilled(value);
      }}
    />
  );
};

export { OTP };
