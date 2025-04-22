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
import { useVerifyMutation } from '../../Store/Auth/authApi';
import { useDispatch } from 'react-redux';
import { setVerifiedCredentials } from '../../Store/Auth/authSlice';
import { showNotification } from '../../utils/notification';

const Verfication = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const email = location.state?.email;
    const fromForgotPassword = location.state?.fromForgotPassword;
    const [verify, { isLoading }] = useVerifyMutation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(OTPSchema),
        defaultValues: {
            otp: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await verify({
                email: email,
                otp: data?.otp
            }).unwrap();

            if (fromForgotPassword) {
                navigate('/reset-password', { 
                    state: { 
                        email,
                        otp: data?.otp
                    } 
                });
            } else {
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
                        // error={errors.otp?.message}
                    />

                    <Button
                        type="submit"
                        className={`!text-white !font-bold !p-2 !w-full !bg-gradient-to-r !from-text !to-main !mt-4
                            ${(isLoading || !isValid) ? '!opacity-50 !cursor-not-allowed' : ''}`}
                        loading={isLoading}
                        disabled={isLoading || !isValid}
                        loaderProps={{ color: 'white', size: 'sm', type: 'dots' }}
                    >
                        Verify
                    </Button>

                    <Group position="center" className="!mt-4 !flex !gap-0 !justify-center !items-center">
                        <Text className="!cursor-pointer !text-base !font-semibold">Didn't receive the OTP?</Text>
                        <Button 
                            variant="subtle" 
                            className="!text-text !text-base !font-bold !p-0"
                            onClick={() => {/* Add resend OTP logic here */}}
                        >
                            Resend OTP
                        </Button>
                    </Group>
                </form>
            </Group>
        </AuthFormLayout>
    );
};

export default Verfication
