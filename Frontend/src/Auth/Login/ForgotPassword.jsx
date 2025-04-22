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
        <AuthFormLayout>
            <Group className="!px-0 !max-w-[48%]">

            <Group className="!mb-8 !w-full">
                <Text className="!text-3xl !font-bold !mb-2">Forgot Password?</Text>
                <Text className="!font-semibold !text-sm">Don’t worry! It happens. 
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
                <Group justify="center" className="!mt-1 !flex !gap-0 ">
                    <Text className="!cursor-pointer !text-base !font-semibold">Don’t have an account?</Text>
                    <Link to={'/signup'}>
                        <Text className="!cursor-pointer !text-[#769F7D] !text-base !font-bold">Sign up</Text>
                    </Link>
                </Group>
            </div>
            

            </Group>
        </AuthFormLayout>
    );
};

export default ForgotPassword
