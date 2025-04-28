import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, Text } from '@mantine/core';
import React from 'react'
import { useForm } from 'react-hook-form';
import { ChangePasswordSchema } from '../AccountSchema';
import PasswordInput from '../../../Auth/Forms/PasswordInput';
import { BsShieldLock } from 'react-icons/bs';
import { useChangePasswordMutation } from '../../../Store/Account/accountApi';
import { showNotification } from '../../../utils/notification';

const ChangePassword = ({isPasswordModalOpen, setIsPasswordModalOpen}) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(ChangePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    });

    const[changePassword, {isLoading:isLoadingChangePassword}] = useChangePasswordMutation();

    const onPasswordSubmit = async (data) => {
        try {
            await changePassword({
                currentPassword: data?.currentPassword,
                newPassword: data?.newPassword,
                confirmNewPassword: data?.confirmPassword
            }).unwrap();
            
            showNotification.success('Password changed successfully');
            reset();
            setIsPasswordModalOpen(false);
        } catch (error) {
            showNotification.error(error.data?.message || 'Failed to change password');
        }
    };

    return (
        <Modal
            opened={isPasswordModalOpen}
            onClose={() => setIsPasswordModalOpen(false)}
            title={<Text className="!text-2xl !font-bold">Change Password</Text>}
            centered
        >
            <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4">
                <PasswordInput
                    control={control}
                    name="currentPassword"
                    label="Current Password"
                    placeholder="Enter your current password"
                    error={errors.currentPassword?.message}
                    icon={<BsShieldLock color='black'/>}
                />
                <PasswordInput
                    control={control}
                    name="newPassword"
                    label="New Password"
                    placeholder="Enter your new password"
                    error={errors.newPassword?.message}
                    icon={<BsShieldLock color='black'/>}
                />
                <PasswordInput
                    control={control}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Enter your Confirm password"
                    error={errors.confirmPassword?.message}
                    icon={<BsShieldLock color='black'/>}
                />

                <div className="flex justify-end gap-3 mt-6">
                    <Button 
                        variant="outline" 
                        onClick={() => setIsPasswordModalOpen(false)}
                        className="!border-gray-300 !text-gray-500"
                        disabled={isLoadingChangePassword}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit"
                        className={`!bg-main !text-white hover:!bg-[#0a2c28] 
                            ${(isLoadingChangePassword || !isValid) ? '!opacity-50 !cursor-not-allowed' : 'hover:!opacity-90'}`}
                        loading={isLoadingChangePassword}
                        disabled={isLoadingChangePassword || !isValid}
                        loaderProps={{ color: 'white', size: 'sm', type: 'dots' }}
                    >
                        Change Password
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default ChangePassword