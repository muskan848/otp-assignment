import React from 'react'
import { useOtpVerification } from './hooks';
import "./styles.css"

const OtpVerification = () => {
    const { otp, timer,generatedOTP, isOTPValid,isSuccess , handleOTPChange, handleResendOTP, handleVerifyOTP } = useOtpVerification();

    return (
        <div className='otp-container'>
            <div className='otp-heading'>OTP Verification</div>
            {generatedOTP&&<div className='otp-val'>Your six digit otp is {generatedOTP}</div>}
            <div className='otp-val otp-info '>Enter the 6-digit OTP sent to your email/phone:</div>
            <div className="form-container">
            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOTPChange}
                maxLength={6}
                className='form-input'
            />
            <div className='form-button-container'>
            <button className='form-button' disabled={!otp||otp.length<6||isSuccess||timer===0} onClick={handleVerifyOTP}>Submit</button>
            {
                !isSuccess && (
                    <> <button
                    className='form-button'
                    onClick={handleResendOTP} disabled={timer > 0||isSuccess}>
                    Resend OTP {timer > 0 ? `(${timer}s)` : ''}
                </button>
                </>
                )
            }
            </div>
            {isSuccess && <p className="success">OTP verification successful!</p>}
            </div>
            {!isSuccess&&!isOTPValid &&timer!==0&& <p className="error">Invalid OTP. Please try again.</p>}
            {timer === 0 &&!isSuccess && (
                    <p className="error">OTP has expired. Click "Resend OTP" to get a new one.</p>
                )}
        </div>
    )
}

export default OtpVerification;