import {useEffect, useState} from 'react';
import {useAuthStore} from '~/store';
import {useInterval} from '.';

type UseOtpVerificationProps = {
  onSuccess: () => void;
};

const useOtpVerification = ({onSuccess}: UseOtpVerificationProps) => {
  const {
    otp: expectedOTP,
    sendOTP,
    register,
    currentRegisteringUser,
    resetCurrentRegisteringUser,
  } = useAuthStore();

  const [otpCode, setOtpCode] = useState('');
  const [invalidOTPCode, setInvalidOTPCode] = useState(false);

  // The counter
  const [count, setCount] = useState(30);
  // ON/OFF
  const [isPlaying, setPlaying] = useState(true);

  const onChangeCode = (text: string) => {
    setInvalidOTPCode(false);
    setOtpCode(text);
  };

  const resendOTP = () => {
    setOtpCode('');
    sendOTP();
    setPlaying(true);
    setCount(30);
  };

  useInterval(
    () => {
      // Your custom logic here
      if (count === 0) {
        setPlaying(false);
      } else {
        setCount(prev => prev - 1);
      }
    },
    // Delay in milliseconds or null to stop it
    isPlaying ? 1000 : null,
  );

  useEffect(() => {
    if (
      !expectedOTP ||
      !currentRegisteringUser ||
      otpCode.length !== expectedOTP.length
    ) {
      return;
    }

    const isValidOTP = otpCode === expectedOTP;

    if (isValidOTP) {
      register(currentRegisteringUser);
      resetCurrentRegisteringUser();
      onSuccess();
    } else {
      setInvalidOTPCode(true);
    }
  }, [
    expectedOTP,
    otpCode,
    currentRegisteringUser,
    register,
    resetCurrentRegisteringUser,
    onSuccess,
  ]);

  return {
    otpCode,
    onChangeCode,
    invalidOTPCode,
    resendOTP,
    expectedOTP,
    count,
    timeout: !isPlaying,
  };
};

export default useOtpVerification;
