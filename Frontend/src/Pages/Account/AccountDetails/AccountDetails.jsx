import { Text, Button, TextInput } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../../hooks/useAuth';
import { FiEdit2 } from "react-icons/fi";
import { useEffect, useState } from 'react';
import ChangePassword from './ChangePassword';
import { AccountSchema } from '../AccountSchema';
import { showNotification } from '../../../utils/notification';
import { usePutAccountMutation } from '../../../Store/Account/accountApi';
import { useGetAccountQuery } from '../../../Store/Account/accountApi';

const AccountDetails = () => {
    const { user } = useAuth();
    const { refetch } = useGetAccountQuery();
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [editableFields, setEditableFields] = useState({
        name: false,
        email: false,
        phone: false
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(AccountSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phoneNumber || '',
        }
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name || '',
                email: user.email || '',
                phone: user.phoneNumber || '',
            });
        }
    }, [user, reset]);

    const [updateAccount, {isLoading: isLoadingUpdateAccount}] = usePutAccountMutation();

    const handleFieldUpdate = async (fieldName, value) => {
        try {
            const updateData = {
                name: fieldName === 'name' ? value : user?.name,
                email: fieldName === 'email' ? value : user?.email,
                PhoneNumber: fieldName === 'phone' ? value : user?.phoneNumber,
            };
            
            const response = await updateAccount(updateData).unwrap();
            setEditableFields(prev => ({
                ...prev,
                [fieldName]: false
            }));
            
            await refetch(); 
            showNotification.success(response?.message || `${fieldName} updated successfully`);
        } catch (error) {
            showNotification.error(error.data?.message || 'Update failed');
        }
    };

    const onSubmit = (data) => {
        const updatedField = Object.keys(editableFields).find(key => editableFields[key]);
        if (updatedField) {
            handleFieldUpdate(updatedField, data[updatedField]);
        }

        console.log(data)
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

                    {Object.values(editableFields).some(field => field) && (
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="!bg-main hover:!bg-[#1e3d2f]"
                                loading={isLoadingUpdateAccount}
                                disabled={isLoadingUpdateAccount || !isValid}
                                loaderProps={{ color: 'white', size: 'sm', type: 'dots' }}
                            >
                                Save Changes
                            </Button>
                        </div>
                    )}

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