import { Text, Button, TextInput, Modal } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../../hooks/useAuth';
import { FiEdit2 } from "react-icons/fi";
import { useState } from 'react';
import ChangePassword from './ChangePassword';

const accountSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string()
        .matches(/^[0-9]+$/, 'Phone number must contain only digits')
        .min(11, 'Phone number must be at least 11 digits')
        .required('Phone number is required'),
});

const AccountDetails = () => {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const { user } = useAuth();
    const [editableFields, setEditableFields] = useState({
        name: false,
        email: false,
        phone: false
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(accountSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phoneNumber || '',
        }
    });

    const onSubmit = (data) => {
        // Handle form submission here
        console.log(data);
    };

    const toggleEdit = (field) => {
        setEditableFields(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <>
            <div className='bg-white rounded-lg p-8 shadow-sm'>
                <Text className="!text-2xl !font-bold mb-8">Account Details</Text>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-5">
                    <div>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label="Name"
                                    placeholder="Enter Your Name"
                                    error={errors.name?.message}
                                    disabled={!editableFields.name}
                                    classNames={{
                                        input: 'bg-gray-50 border-0 h-12',
                                    }}
                                    className='w-full'
                                    rightSection={
                                        <FiEdit2 
                                            className="text-main cursor-pointer" 
                                            onClick={() => toggleEdit('name')}
                                        />
                                    }
                                />
                            )}
                        />
                    </div>

                    <div>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label="E-mail"
                                    placeholder="Enter Your E-mail"
                                    error={errors.email?.message}
                                    disabled={!editableFields.email}
                                    classNames={{
                                        input: 'bg-gray-50 border-0 h-12',
                                    }}
                                    className='w-full'
                                    rightSection={
                                        <FiEdit2 
                                            className="text-main cursor-pointer" 
                                            onClick={() => toggleEdit('email')}
                                        />
                                    }
                                />
                            )}
                        />
                    </div>

                    <div>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label="Phone Number"
                                    placeholder="Enter Your Phone Number"
                                    error={errors.phone?.message}
                                    disabled={!editableFields.phone}
                                    classNames={{
                                        input: 'bg-gray-50 border-0 h-12',
                                    }}
                                    className='w-full'
                                    rightSection={
                                        <FiEdit2 
                                            className="text-main cursor-pointer" 
                                            onClick={() => toggleEdit('phone')}
                                        />
                                    }
                                />
                            )}
                        />
                    </div>

                    <Button 
                        variant="subtle" 
                        className="!text-main !font-medium !underline !p-0 !mt-4 hover:!bg-transparent hover:!underline"
                        onClick={() => setIsPasswordModalOpen(true)}
                    >
                        Change Password
                    </Button>
                </form>
            </div>

            <ChangePassword 
                isPasswordModalOpen ={isPasswordModalOpen}
                setIsPasswordModalOpen={setIsPasswordModalOpen}
            />
        </>
    );
};

export default AccountDetails;