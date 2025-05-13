import React from 'react';
import { Select, Text, Grid } from '@mantine/core';
import { Controller } from 'react-hook-form';

const CustomSelect = ({
label,
name,
control,
error,
placeholder,
data,
setValue,
required = false
}) => {
return (
    <Grid.Col className={`px-8 py-4 ${label ? "border-b border-gray-200" : "" }`} span={12}>
    <div className="grid grid-cols-1 sm:grid-cols-12 items-start sm:items-center sm:gap-4">
        <div className="sm:col-span-2">
        <Text className="!font-bold !text-base text-gray-700" size="sm">
            {label}
            {required && <span className="text-[#fa5252] ml-1">*</span>}
        </Text>
        </div>
        <div className={`${label ? "sm:col-span-10" : "sm:col-span-12"}`}>
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
            <Select
                {...field}
                placeholder={placeholder || `Select ${label}`}
                data={data || []}
                error={error?.message}
                className="w-full"
                classNames={{
                input: '!py-5 bg-white border border-gray-200 h-12 rounded-lg shadow-sm !w-full',
                root: 'hover:shadow-md transition-shadow duration-300',
                dropdown: 'rounded-lg shadow-lg',
                item: 'hover:bg-gray-100',
                }}
                onChange={(value) => {
                field.onChange(value);
                if (setValue) setValue(name, value);
                }}
            />
            )}
        />
        </div>
    </div>
    </Grid.Col>
);
};

export default CustomSelect;
