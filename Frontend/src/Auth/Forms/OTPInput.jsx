import { PinInput, Text, Group } from '@mantine/core';
import React from 'react';
import { Controller } from 'react-hook-form';

const OTPInput = ({ control, name, error }) => {
    return (
        <div className="flex flex-col items-center space-y-6">
            <Group className="justify-start !gap-0">
                <Text className="!text-lg !font-semibold">Enter OTP</Text>
                <Text className="!text-gray-500">A 6 digit code has been sent to your email</Text>
            </Group>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <PinInput
                        length={6}
                        size="sm"
                        className="gap-1"
                        {...field}
                        onChange={(value) => field.onChange(value)}
                    />
                )}
            />
            {error && (
                <Text className="!text-red-500 !text-sm !mt-1">{error}</Text>
            )}
        </div>
    );
};

export default OTPInput
