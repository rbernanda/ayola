import React from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import type {RootStackParamList} from '~/types';
import {Typography, Sizing, Colors} from '~/styles';
import OTPInput from '~/components/OTPInput';
import {useOtpVerification} from '~/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'OTP'>;

const OtpScreen = ({navigation}: Props) => {
  const {
    onChangeCode,
    otpCode,
    resendOTP,
    invalidOTPCode,
    expectedOTP,
    count,
    timeout,
  } = useOtpVerification({
    onSuccess: () => navigation.replace('Login'),
  });

  return (
    <SafeAreaView>
      <Pressable style={style.baseContainer} onPress={Keyboard.dismiss}>
        <Text style={style.headerText}>Enter Authentication Code</Text>
        <Text style={style.subHeaderText}>
          Enter the 6-digit that we have sent via the phone number to{' '}
          <Text style={Typography.fontWeight.bold}>+62 882 - 25629 - 000 </Text>
        </Text>

        {expectedOTP === null ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={style.otpInputContainer}>
            <OTPInput
              code={otpCode}
              maximumLength={expectedOTP.length}
              setCode={onChangeCode}
              disabled={timeout}
            />
          </View>
        )}

        {invalidOTPCode ? (
          <Text style={style.errorLabel}>Invalid OTP Code</Text>
        ) : null}
        <View style={style.otpButtonContainer}>
          <Text>{`(00: ${count < 10 ? `0${count}` : count})`}</Text>
          <TouchableOpacity
            onPress={resendOTP}
            style={{...style.button, opacity: timeout ? 1 : 0.5}}
            disabled={!timeout}>
            <Text style={style.buttonText}>Resend Code</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  baseContainer: {paddingHorizontal: Sizing.x10, paddingVertical: Sizing.x10},
  headerText: {
    ...Typography.header.x50,
    marginBottom: Sizing.x10,
    textAlign: 'center',
  },
  subHeaderText: {
    ...Typography.body.x30,
    marginBottom: Sizing.x30,
    textAlign: 'center',
  },
  otpInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: Sizing.x5,
    marginTop: Sizing.x20,
  },
  button: {
    marginBottom: Sizing.x10,
  },
  buttonText: {
    color: Colors.primary.brand,
    ...Typography.fontWeight.bold,
    ...Typography.fontSize.x30,
  },
  errorLabel: {
    color: Colors.danger.s400,
    fontSize: Sizing.x15,
    textAlign: 'center',
    marginTop: Sizing.x20,
  },
});

export default OtpScreen;
