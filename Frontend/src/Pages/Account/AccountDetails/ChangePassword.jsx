import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, Text, TextInput } from '@mantine/core';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';


const passwordSchema = yup.object().shape({
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup.string().required('New password is required'),
});

const ChangePassword = ({isPasswordModalOpen, setIsPasswordModalOpen}) => {
    const { control: passwordControl, handleSubmit: handlePasswordSubmit } = useForm({
        resolver: yupResolver(passwordSchema)
    });
    const onPasswordSubmit = (data) => {
        console.log('Password change:', data);
        setIsPasswordModalOpen(false);
    };

    return (
        <Modal
            opened={isPasswordModalOpen}
            onClose={() => setIsPasswordModalOpen(false)}
            title={<Text className="!text-2xl !font-bold">Change Password</Text>}
            centered
        >
            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
                <Controller
                    name="currentPassword"
                    control={passwordControl}
                    render={({ field, fieldState: { error } }) => (
                        <TextInput
                            {...field}
                            type="password"
                            label="Current Password"
                            placeholder='Enter your current password'
                            error={error?.message}
                            classNames={{
                                input: 'bg-gray-50 border-0 h-12',
                            }}
                        />
                    )}
                />

                <Controller
                    name="newPassword"
                    control={passwordControl}
                    render={({ field, fieldState: { error } }) => (
                        <TextInput
                            {...field}
                            type="password"
                            label="New Password"
                            placeholder='Enter your new password'
                            error={error?.message}
                            classNames={{
                                input: 'bg-gray-50 border-0 h-12',
                            }}
                        />
                    )}
                />

                <div className="flex justify-end gap-3 mt-6">
                    <Button 
                        variant="outline" 
                        onClick={() => setIsPasswordModalOpen(false)}
                        className="!border-gray-300 !text-gray-500"
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit"
                        className="!bg-main !text-white hover:!bg-[#0a2c28]"
                    >
                        Change Password
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default ChangePassword