import React, {useRef, useState, useEffect} from 'react';
import {Pressable, StyleSheet, View, Text, TextInput} from 'react-native';

import {Sizing, Colors} from '~/styles';

type OTPInputProps = {
  code: string;
  setCode: (text: string) => void;
  maximumLength: number;
  disabled: boolean;
};

const OTPInput: React.FC<OTPInputProps> = props => {
  const inputRef = useRef<any>();

  const circularArray = new Array(props.maximumLength).fill(0);

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(true);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  const circularDigit = (_: number, index: number) => {
    const emptyInput = '';
    const digit = props.code[index] || emptyInput;

    const isCurrentValue = index === props.code.length;
    const isLastValue = index === props.maximumLength - 1;
    const isCodeComplete = props.code.length === props.maximumLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    return (
      <View
        key={index}
        style={{
          ...style.otpCircular,
          ...(isValueFocused && isInputBoxFocused
            ? {borderColor: Colors.primary.brand}
            : {}),
          backgroundColor: props.disabled
            ? Colors.neutral.s100
            : Colors.neutral.white,
        }}>
        <Text style={style.otpCircularText}>{digit}</Text>
      </View>
    );
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <View>
      <Pressable style={style.otpContainer} onPress={handleOnPress}>
        {circularArray.map(circularDigit)}
      </Pressable>
      <TextInput
        keyboardType="decimal-pad"
        style={style.inputHidden}
        value={props.code}
        onChangeText={props.setCode}
        maxLength={props.maximumLength}
        ref={inputRef}
        onBlur={handleOnBlur}
        editable={!props.disabled}
      />
    </View>
  );
};

const style = StyleSheet.create({
  otpContainer: {
    width: Sizing.screen.width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  otpCircular: {
    minHeight: Sizing.x60,
    minWidth: Sizing.x60,
    borderRadius: Sizing.x30,
    borderColor: '#e5e5e5',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpCircularText: {
    fontWeight: 'bold',
  },
  inputHidden: {
    position: 'absolute',
    opacity: 0,
  },
});

export default OTPInput;
