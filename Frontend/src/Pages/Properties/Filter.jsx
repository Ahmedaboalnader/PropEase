import React, { useState } from 'react';
import { TextInput, Button, Select, Group, Container, Text } from '@mantine/core';
import { IoSearchOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

const Filter = () => {
    const [priceOpen, setPriceOpen] = useState(false);

    return (
        <Container size="2xl" className="!py-8 !px-16">
            {/* Search Bar */}
            <div className="relative mb-6">
                <TextInput
                    placeholder="City, community or building"
                    className="!w-full"
                    classNames={{
                        input: `!rounded-full !py-5 !border-main`,
                        wrapper: '!w-full'
                    }}
                    rightSectionWidth={40}
                    rightSection={
                        <Button className="!bg-yellowCustom !text-black !rounded-full !w-10 !h-10 !min-w-10 !p-0">
                            <IoSearchOutline size={20} />
                        </Button>
                    }
                />
            </div>

            {/* Filter Options */}
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                <Select
                    placeholder="Rent"
                    className="!w-full"
                    data={['Rent', 'Buy']}
                    classNames={{
                        input: '!bg-main !text-white !border-none !rounded-md',
                    }}
                />

                <Select
                    placeholder="Property type"
                    className="!w-full"
                    data={[
                        'Modern villas',
                        'Apartment',
                        'Town house',
                        'Studio',
                        'Single family',
                        'Chalets',
                        'Land'
                    ]}
                    classNames={{
                        input: '!bg-main !text-white !border-none !rounded-md',
                    }}
                />

                <div className="!w-full relative">
                    <Select
                        placeholder="Price"
                        className="!w-full"
                        classNames={{
                            input: '!bg-main !text-white !border-none !rounded-md',
                        }}
                        onClick={() => setPriceOpen(!priceOpen)}
                    />
                    
                    {priceOpen && (
                        <div className="absolute top-[100%] left-0 mt-2 bg-white p-4 rounded-lg shadow-lg z-50 w-[300px]">
                            <Text className="font-medium mb-4">Price</Text>
                            <div className="flex items-center gap-2">
                                <Select
                                    placeholder="Min. Price"
                                    data={[
                                        '5,000', '6,000', '7,000', '8,000', '9,000',
                                        '10,000', '11,000', '12,000', '15,000',
                                        '20,000', '25,000', '30,000', '35,000',
                                        '40,000', '45,000', '50,000', '60,000',
                                        '70,000', '80,000', '90,000', '100,000',
                                        '150,000', '200,000', '250,000', '300,000'
                                    ]}
                                    className="flex-1"
                                />
                                <span>-</span>
                                <Select
                                    placeholder="Max. Price"
                                    data={[
                                        '5,000', '6,000', '7,000', '8,000', '9,000',
                                        '10,000', '11,000', '12,000', '15,000',
                                        '20,000', '25,000', '30,000', '35,000',
                                        '40,000', '45,000', '50,000', '60,000',
                                        '70,000', '80,000', '90,000', '100,000',
                                        '150,000', '200,000', '250,000', '300,000'
                                    ]}
                                    className="flex-1"
                                />
                            </div>
                        </div>
                    )}
                </div>
                <Select
                    placeholder="Area range"
                    className="!w-full"
                    data={[
                        '50-100 m²',
                        '100-200 m²',
                        '200-300 m²',
                        '300-500 m²',
                        '500+ m²'
                    ]}
                    classNames={{
                        input: '!bg-main !text-white !border-none !rounded-md',
                    }}
                />

                <Select
                    placeholder="More filters"
                    className="!w-full"
                    data={['Bedrooms', 'Bathrooms', 'Amenities']}
                    classNames={{
                        input: '!bg-main !text-white !border-none !rounded-md',
                    }}
                />

                <Select
                    placeholder="Sort By"
                    className="!w-full"
                    data={[
                        'Price: Low to High',
                        'Price: High to Low',
                        'Newest First',
                        'Oldest First'
                    ]}
                    classNames={{
                        input: '!bg-main !text-white !border-none !rounded-md',
                        placeholder: '!text-white',
                    }}
                />
            </div>

            {/* Breadcrumb and Results Count */}
            <div className="flex flex-col gap-1 mt-8">
                <div className="flex items-center gap-2">
                    <IoHomeOutline size={20} className="!text-main !font-bold" />
                    <IoIosArrowForward />
                    <Text className="text-gray-500 !font-semibold">Properties for rent</Text>
                </div>
                <Text className="!text-xl !font-bold !mt-4">Properties for rent</Text>
                <Text className="!text-gray-500 !font-semibold">500 Properties</Text>
            </div>
        </Container>
    );
};

export default Filter;