import { useEffect, useState } from "react";

export const useOtpVerification = () => {
  const [otp, setOTP] = useState("");
  const [isOTPValid, setIsOTPValid] = useState(true);
  const [timer, setTimer] = useState(30);
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const handleOTPChange = (e) => {
    const enteredOTP = e.target.value;
    if (/^\d{0,6}$/.test(enteredOTP)) {
      setOTP(enteredOTP);
    }
    setIsOTPValid(true);
  };

  const handleVerifyOTP = () => {
    if (otp === generatedOTP) {
      setIsOTPValid(true);
      setIsSuccess(true);
      setTimer(0);
      console.log("OTP verification successful");
    } else {
      setIsOTPValid(false);
      console.log("OTP verification failed");
    }
  };

  const handleResendOTP = () => {
    const randomOTP = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOTP(randomOTP.toString());
    setTimer(30);
    setIsOTPValid(true);
  };
  useEffect(() => {
    const randomOTP = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOTP(randomOTP.toString());
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else if (!isSuccess) {
        setGeneratedOTP("");
        console.log("OTP Expired");
      }
    }, 1000);

    return () => clearTimeout(interval);
  }, [timer]);
  return {
    otp,
    timer,
    generatedOTP,
    isOTPValid,
    isSuccess,
    handleOTPChange,
    handleResendOTP,
    handleVerifyOTP,
  };
};
