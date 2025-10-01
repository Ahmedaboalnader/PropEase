import React from 'react'
import AuthFormLayout from '../AuthComponents/AuthFormLayout';
import { Button, Group, Text } from '@mantine/core';
import FormInput from '../Forms/FormInput';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPasswordSchema } from '../ValidationSchema';
import { MdOutlineMail } from "react-icons/md";
import { useForgotPasswordMutation } from '../../Store/Auth/authApi';
import { showNotification } from '../../utils/notification';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(ForgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await forgotPassword(data).unwrap();
            reset();
            showNotification.success(response?.message || 'Reset code sent successfully');
            navigate('/verfication', { 
                state: { 
                    email: data?.email,
                    fromForgotPassword: true
                } 
            });
        } catch (error) {
            console.log("Error", error);
            showNotification.error(error.data?.message || 'Failed to send reset code');
        }
    };

    return (
        <AuthFormLayout
            title="Welcome to the community" 
            subtitle="Login to Explore"
        >
        <Group className="!px-4 sm:px-6 md:px-0 !w-full sm:!max-w-[85%] md:!max-w-[48%] flex flex-col items-center">

            <Group className="!mb-8 !w-full">
                <Text className="!text-xl sm:!text-2xl md:!text-3xl !font-bold !mb-1 sm:!mb-8 md:!mb-10 text-center sm:text-left">Forgot Password?</Text>
                <Text className="!font-bold !text-sm sm:!text-base text-center sm:text-left">Don’t worry! It happens. 
                        Please enter the email associated with your account.
                </Text>
            </Group>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-full">
                <FormInput
                    control={control}
                    name="email"
                    placeholder="Email"
                    error={errors.email?.message}
                    icon={<MdOutlineMail color='black'/>}
                />

                <Button
                    type="submit"
                    className={`!text-white !font-bold !p-2 !w-full !bg-gradient-to-r !from-text !to-main !mt-8
                        ${(isLoading || !isValid) ? '!opacity-50 !cursor-not-allowed' : 'hover:!opacity-90'}`}
                    loading={isLoading}
                    disabled={isLoading || !isValid}
                    loaderProps={{ color: 'white', size: 'sm', type: 'dots' }}
                >
                    Send Code
                </Button>
            </form>

            <div className='flex justify-center w-full'>
                <Group justify="center" className="!mt-1 !flex !gap-0 flex-col sm:flex-row items-center">
                    <Text className="!cursor-pointer !text-sm sm:!text-base !font-semibold text-center">Don’t have an account?</Text>
                    <Link to={'/signup'}>
                        <Text className="!cursor-pointer !text-[#769F7D] !text-sm sm:!text-base !font-bold ml-0 sm:ml-1">Sign up</Text>
                    </Link>
                </Group>
            </div>
            

            </Group>
        </AuthFormLayout>
    );
};

export default ForgotPassword
