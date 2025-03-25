import { PinInput, Text, Group } from '@mantine/core';
import React from 'react'

const OTPInput = () => {
    return (
        <div className="flex flex-col items-center space-y-6">
            <Group className="justify-start !gap-0">
                <Text className="!text-lg !font-semibold">Enter OTP</Text>
                <Text className="!text-gray-500">A 6 digit code has been sent to your email</Text>
            </Group>
            <PinInput 
                length={6} 
                size="sm" 
                className="gap-1" 
            />
        </div>
    );
};

export default OTPInput
