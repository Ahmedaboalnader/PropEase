import React from 'react'
import AuthFormLayout from '../AuthComponents/AuthFormLayout';
import { Button, Group, Image, Text } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { OTPSchema } from '../ValidationSchema';
import { useNavigate } from 'react-router-dom';
import OTPInput from '../Forms/OTPInput';
import logo from '../../assets/otp.png';
import { useLocation } from 'react-router-dom';
import { useResendOTPForgotMutation, useVerifyMutation, useVerifyResetMutation } from '../../Store/Auth/authApi';
import { useDispatch } from 'react-redux';
import { setVerifiedCredentials } from '../../Store/Auth/authSlice';
import { showNotification } from '../../utils/notification';
import { useState, useEffect } from 'react';
import { useResendOTPRegisterMutation } from '../../Store/Auth/authApi';

const Verfication = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [countdown, setCountdown] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const email = location.state?.email;
    const fromForgotPassword = location.state?.fromForgotPassword;
    const [verify, { isLoading }] = useVerifyMutation();
    const [verifyForgotPassword, { isLoading: isLoadingForgotPassword }] = useVerifyResetMutation();
    const [resendOTP, { isLoading: isLoadingResend }] = useResendOTPRegisterMutation();
    const [resendForgotOTP, { isLoading: isLoadingForgotResend }] = useResendOTPForgotMutation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid },
    } = useForm({
        resolver: yupResolver(OTPSchema),
        defaultValues: {
            otp: '',
        },
    });

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    const handleResendOTP = async () => {
        try {
            if (fromForgotPassword) {
                const response = await resendForgotOTP({ email }).unwrap();
                showNotification.success(response?.message || 'OTP resent successfully');
            } else {
                const response = await resendOTP({ email }).unwrap();
                showNotification.success(response?.message || 'OTP resent successfully');
            }
            setCountdown(30);
            setCanResend(false);
        } catch (error) {
            showNotification.error(error.data?.message || 'Failed to resend OTP');
        }
    };

    const onSubmit = async (data) => {
        try {
            if (fromForgotPassword) {
                const response = await verifyForgotPassword({
                    email: email,
                    otp: data?.otp
                }).unwrap();
                
                navigate('/reset-password', { 
                    state: { 
                        email,
                        otp: data?.otp
                    } 
                });
                showNotification.success(response?.message || 'OTP verified successfully');
            } else {
                const response = await verify({
                    email: email,
                    otp: data?.otp
                }).unwrap();
                
                dispatch(setVerifiedCredentials());
                showNotification.success(response?.message || 'Verification successful');
                navigate('/');
            }
            reset();
        } catch (error) {
            console.log("Error", error);
            showNotification.error(error.data?.message || 'Verification failed');
        }
    };

    return (
        <AuthFormLayout>
            <Group className="!px-0 !max-w-[48%] flex flex-col justify-center items-center">
                <Group className="!mb-3 !w-full !flex !flex-col !items-center !justify-center">
                    <Text className="!text-3xl !font-bold ">OTP Verification</Text>
                    <Text className="!text-base !text-gray-600">We've sent a verification code to {email}</Text>
                    <Image 
                        src={logo}
                        className='!w-52 !h-52'
                    />
                </Group>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-full justify-start">
                    <OTPInput
                        control={control}
                        name="otp"
                    />

                    <Button
                        type="submit"
                        className={`!text-white !font-bold !p-2 !w-full !bg-gradient-to-r !from-text !to-main !mt-4
                            ${((isLoading || isLoadingForgotPassword) || !isValid) ? '!opacity-50 !cursor-not-allowed' : ''}`}
                        loading={isLoading || isLoadingForgotPassword}
                        disabled={isLoading || isLoadingForgotPassword || !isValid}
                        loaderProps={{ color: 'white', size: 'sm', type: 'dots' }}
                    >
                        Verify
                    </Button>

                    <Group position="center" className="!mt-4 !flex !gap-0 !justify-center !items-center">
                        <Text className="!cursor-pointer !text-base !font-semibold">Didn't receive the OTP?</Text>
                        <Button 
                            variant="transparent" 
                            className="!text-text !text-sm !font-bold !p-0 !bg-white"
                            onClick={handleResendOTP}
                            disabled={!canResend || isLoadingResend || isLoadingForgotResend}
                            loading={isLoadingResend || isLoadingForgotResend}
                            loaderProps={{ color: '#1F4B43', size: 'sm', type: 'dots' }}
                        >
                            {canResend ? 'Resend OTP' : `Resend OTP (${countdown}s)`}
                        </Button>
                    </Group>
                </form>
            </Group>
        </AuthFormLayout>
    );
};

export default Verfication
