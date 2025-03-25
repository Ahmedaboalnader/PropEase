import React from 'react';
import { TextInput } from '@mantine/core';
import { Controller } from 'react-hook-form';

const FormInput = ({ control, name, placeholder, error, icon, type = 'text', classNames }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextInput
                {...field}
                    name={name}
                    placeholder={placeholder}
                    error={error}
                    type={type}
                    classNames={{
                        input: `border p-2 w-full rounded-sm !outline-none ${
                        error ? 'border-red-500' : 'border-gray-200'
                        }`,
                        error: 'text-red-500 text-xs mt-1',
                        ...classNames,
                    }}
                    leftSection={icon}
                />
            )}
        />
    );
};

export default FormInput;