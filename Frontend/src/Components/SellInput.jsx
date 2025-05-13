import React from 'react';
import { TextInput, Text, Grid, Textarea, Checkbox } from '@mantine/core';
import { Controller } from 'react-hook-form';

const SellInput = ({
label,
name,
control,
error,
placeholder,
required = true,
min = "0",
step = "0.01",
unit,
type = "number", 
isTextarea = false,
price = false,
phone = false,
minRows = 4,
setValue,
}) => {
return (
    <Grid.Col className="px-8 py-4 border-b border-gray-200" span={12}>
        <div className="grid grid-cols-1 sm:grid-cols-12 items-start sm:items-center sm:gap-4">
        <div className="sm:col-span-2">
            <Text className="!font-bold !text-base text-gray-700" size="sm">
            {label}
            {required && <span className="text-[#fa5252] ml-1">*</span>}
            </Text>
        </div>
        <div className="sm:col-span-10">
            <Controller
            name={name}
            control={control}
            render={({ field }) => (
                isTextarea ? (
                <Textarea
                    {...field}
                    placeholder={placeholder || `Enter ${label}`}
                    error={error?.message}
                    classNames={{
                    input: 'bg-gray-50 border-0 rounded-lg shadow-sm',
                    root: 'hover:shadow-md transition-shadow duration-300',
                    wrapper: 'rounded-lg',
                    }}
                    className="w-full"
                    autosize
                    minRows={minRows}
                />
                ) : (
                <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                        <TextInput
                            {...field}
                            placeholder={placeholder || `Enter ${label}`}
                            error={error?.message}
                            classNames={{
                            input: '!py-5 bg-gray-50 border-0 h-12 rounded-lg shadow-sm',
                            root: 'hover:shadow-md transition-shadow duration-300',
                            wrapper: 'rounded-lg',
                            }}
                            className="w-full"
                            type={type}
                            min={type === "number" ? min : undefined}
                            step={type === "number" ? step : undefined}
                            rightSection={unit && <Text className="text-gray-500 mr-2">{unit}</Text>}
                            leftSectionWidth={50}
                            leftSection={price ? (
                            <div className="flex items-center h-full">
                                <Text className="!text-black !ml-2">{price}</Text>
                                <div className="h-8 border-r border-gray-300 mx-2"></div>
                            </div>
                            ) : phone ? (
                            <div className="flex items-center h-full">
                                <Text className="!text-black !ml-2">{phone}</Text>
                                <div className="h-8 border-r border-gray-300 mx-2"></div>
                            </div>
                            ) : null}
                            onChange={(e) => {
                            if (type === "number") {
                                const value = e.target.value.replace(/[^0-9.]/g, '');
                                field.onChange(value);
                            } else {
                                field.onChange(e.target.value);
                            }
                            }}
                        />
                        {price && (
                            <div className="border border-gray-300 rounded-[5px] p-2 flex items-center justify-between mt-2 sm:mt-0 sm:min-w-[150px]">
                                <Text className="!text-gray-700 !font-semibold">Offer</Text>
                                <Controller
                                    name="hasOffer"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            color="#1F4B43"
                                            onChange={(e) => {
                                                const checked = e.currentTarget.checked;
                                                field.onChange(checked);
                                                if (!checked) {
                                                    setValue('discountPercentage', '');
                                                }
                                            }}
                                            classNames={{
                                                input: 'cursor-pointer',
                                            }}
                                        />
                                    )}
                                />  
                            </div>  
                        )}
                    </div>
                </div>
                )
            )}
            />
        </div>
        </div>
    </Grid.Col>
);
};

export default SellInput;