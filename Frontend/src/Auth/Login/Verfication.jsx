import React from 'react'
import AuthFormLayout from '../AuthComponents/AuthFormLayout';
import { Button, Group, Image, Text } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpSchema } from '../ValidationSchema';
import { Link } from 'react-router-dom';
import OTPInput from '../Forms/OTPInput';
import logo from '../../assets/otp.png';

const Verfication = () => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(SignUpSchema),
        defaultValues: {
            userName: '',
            email: '',
            phone: '',
            password: '',
        },
        });
    
        const onSubmit = (data) => {
            console.log(data);
            reset();
        };

    return (
        <AuthFormLayout>
            <Group className="!px-0 !max-w-[48%] flex flex-col justify-center items-center">
                <Group className="!mb-3 !w-full !flex !flex-col !items-center !justify-center">
                    <Text className="!text-3xl !font-bold ">OTP Verification</Text>
                    <Image 
                        src={logo}
                        className='!w-52 !h-52 '
                    />
                </Group>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-full justify-start">
                
                    <OTPInput />

                    <Group position="center" className="!mt-4 !flex !gap-0 !justify-center !items-center">
                        <Text className="!cursor-pointer !text-base !font-semibold">Didn’t recieve the OTP?</Text>
                        <Link to={'/signup'}>
                            <Text className="!cursor-pointer !text-text !text-base !font-bold">Resend OTP</Text>
                        </Link>
                    </Group>

                    <Button
                        type="submit"
                        className="!text-white !font-bold !p-2 !w-full !bg-gradient-to-r !from-text !to-main !mt-4"
                    >
                        Verify
                    </Button>
                </form>
            </Group>
        </AuthFormLayout>
    );
};

export default Verfication
