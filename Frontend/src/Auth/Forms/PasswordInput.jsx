import React, { useState } from 'react';
import { TextInput } from '@mantine/core';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Controller } from 'react-hook-form';

const PasswordInput = ({ control, name, placeholder, error, icon, label }) => {
const [passwordVisibility, setPasswordVisibility] = useState(false);

const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
};

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextInput
                    {...field}
                    label={label}
                    type={passwordVisibility ? 'text' : 'password'}
                    placeholder={placeholder}
                    error={error}
                    classNames={{
                        input: `border p-2 w-full rounded-sm !outline-none ${
                        error ? 'border-red-500' : 'border-gray-200'
                        }`,
                        error: 'text-red-500 text-xs ml-1',
                    }}
                    className="!relative"
                    rightSection={
                        field.value && ( 
                        <div
                            onClick={togglePasswordVisibility}
                            className="cursor-pointer "
                        >
                            {passwordVisibility ? (
                            <FaEyeSlash size={18} className="!text-blue-900" />
                            ) : (
                            <FaEye size={18} className="!text-gray-500" />
                            )}
                        </div>
                        )
                    }
                    leftSection={icon}
                />
            )}
        />
    );
};

export default PasswordInput;