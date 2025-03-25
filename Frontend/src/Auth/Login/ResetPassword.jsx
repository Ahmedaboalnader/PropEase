import React from 'react'
import AuthFormLayout from '../AuthComponents/AuthFormLayout';
import { Button, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetPasswordSchema } from '../ValidationSchema';
import PasswordInput from '../Forms/PasswordInput';
import { BsShieldLock } from "react-icons/bs";

const ResetPassword = () => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
        } = useForm({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return (
        <AuthFormLayout>
            <Group className="!px-0 !max-w-[48%]">

            <Group className="!mb-8 !w-full">
                <Text className="!text-3xl !font-bold !mb-2">Reset Password</Text>
                <Text className="!font-semibold !text-sm">Ready to create new password? 
                    Please type something you’ll remember. 
                </Text>
            </Group>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-full">

                <PasswordInput
                    control={control}
                    name="password"
                    placeholder="Password"
                    error={errors.password?.message}
                    icon={<BsShieldLock color='black'/>}
                />

                <PasswordInput
                    control={control}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    error={errors.confirmPassword?.message}
                    icon={<BsShieldLock color='black'/>}
                />

                <Button
                    type="submit"
                    className="!text-white !font-bold !p-2 !w-full !bg-gradient-to-r !from-text !to-main !mt-8"
                >
                    Confirm
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

export default ResetPassword
