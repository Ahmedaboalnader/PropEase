import React, { useState, useEffect } from 'react';
import { TextInput, Button, Select, Group, Container, Text } from '@mantine/core';
import { IoSearchOutline } from "react-icons/io5";

const Filter = ({ onFilterChange }) => {
    const [priceOpen, setPriceOpen] = useState(false);
    const [areaOpen, setAreaOpen] = useState(false);
    const [bedroomsOpen, setBedroomsOpen] = useState(false);
    
    const [filters, setFilters] = useState({
        Search: '',
        listingType: '',
        propertyType: '',
        minPrice: '',
        maxPrice: '',
        minArea: '',
        maxArea: '',
        minRooms: '',
        maxRooms: '',
        sortBy: ''
    });

    // Handle filter changes and clear events
    const handleInputChange = (name, value) => {
        const updatedFilters = {
            ...filters,
            [name]: value === null ? '' : value // Clear value when deselected
        };
        
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setPriceOpen(false);
            setAreaOpen(false);
            setBedroomsOpen(false);
        };
        
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Property type options
    const propertyTypes = [
        { label: 'Modern Villas', value: 'ModernVillas' },
        { label: 'Apartment', value: 'Apartment' },
        { label: 'Town House', value: 'TownHouse' },
        { label: 'Studio', value: 'Studio' },
        { label: 'Single Family', value: 'SingleFamily' },
        { label: 'Chalets', value: 'Chalets' },
        { label: 'Land', value: 'Land' },
        { label: 'Commercial', value: 'Commercial' }
    ];

    const generatePriceOptions = () => {
        const options = [];        
        for (let i = 100000; i <= 1000000; i += i < 500000 ? 50000 : 100000) {
            options.push(i.toLocaleString('en-US'));
        }
        for (let i = 1500000; i <= 5000000; i += i < 3000000 ? 500000 : 1000000) {
            options.push(i.toLocaleString('en-US'));
        }
        return options;
    };

    // Area options
    const areaOptions = [
        '50 m²', '100 m²', '200 m²', '300 m²', '400 m²', '500 m²'
    ];

    // Bedroom options
    const bedroomOptions = ['1', '2', '3', '4', '5', '6'];

    // Sort options
    const sortOptions = [
        { label: 'Price: Low to High', value: 'PriceLowToHigh' },
        { label: 'Price: High to Low', value: 'PriceHighToLow' },
        { label: 'Newest First', value: 'NewestFirst' },
        { label: 'Oldest First', value: 'OldestFirst' }
    ];

    return (
        <Container size="2xl" className="!py-4 !px-4 lg:!py-8 lg:!px-16">
            {/* Search Bar */}
            <div className="relative mb-6">
                <TextInput
                    placeholder="City, community or building"
                    className="!w-full"
                    classNames={{
                        input: `!rounded-full !py-5 !border-main`,
                        wrapper: '!w-full'
                    }}
                    value={filters.Search}
                    onChange={(e) => handleInputChange('Search', e.target.value)}
                    rightSectionWidth={40}
                    rightSection={
                        <Button 
                            className="!bg-yellowCustom !text-black !rounded-full !w-10 !h-10 !min-w-10 !p-0"
                            onClick={() => onFilterChange(filters)}
                        >
                            <IoSearchOutline size={20} />
                        </Button>
                    }
                />
            </div>

            {/* Filter Options */}
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                {/* Listing Type */}
                <Select
                    placeholder="Type"
                    className="!w-full"
                    data={[
                        { label: 'Rent', value: 'ForRent' },
                        { label: 'Buy', value: 'ForSale' }
                    ]}
                    value={filters.listingType}
                    onChange={(value) => handleInputChange('listingType', value)}
                    classNames={{
                        input: '!bg-main !text-white !border-none !rounded-md',
                    }}
                    clearable
                    searchable
                />

                {/* Property Type */}
                <Select
                    placeholder="Property type"
                    className="!w-full"
                    data={propertyTypes}
                    value={filters.propertyType}
                    onChange={(value) => handleInputChange('propertyType', value)}
                    classNames={{
                        input: '!bg-main !text-white !border-none !rounded-md',
                    }}
                    clearable
                    searchable
                />

                {/* Price Range */}
                <div className="!w-full relative">
                    <Select
                        placeholder="Price"
                        className="!w-full"
                        value={filters.minPrice || filters.maxPrice ? 
                            `${filters.minPrice || ''}${filters.minPrice && filters.maxPrice ? ' - ' : ''}${filters.maxPrice || ''}` 
                            : ''}
                        classNames={{
                            input: '!bg-main !text-white !border-none !rounded-md',
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setPriceOpen(!priceOpen);
                        }}
                        readOnly
                    />
                    
                    {priceOpen && (
                        <div 
                            className="absolute top-[100%] left-0 mt-2 bg-white p-4 rounded-lg shadow-lg z-50 w-[300px]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Text className="font-medium mb-4">Price</Text>
                            <div className="flex items-center gap-2">
                                <Select
                                    placeholder="Min. Price"
                                    data={generatePriceOptions()}
                                    value={filters.minPrice}
                                    onChange={(value) => handleInputChange('minPrice', value)}
                                    className="flex-1"
                                    clearable
                                />
                                <span>-</span>
                                <Select
                                    placeholder="Max. Price"
                                    data={generatePriceOptions()}
                                    value={filters.maxPrice}
                                    onChange={(value) => handleInputChange('maxPrice', value)}
                                    className="flex-1"
                                    clearable
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Area Range */}
                <div className="!w-full relative">
                    <Select
                        placeholder="Area"
                        className="!w-full"
                        value={filters.minArea || filters.maxArea ? 
                            `${filters.minArea || ''}${filters.minArea && filters.maxArea ? ' - ' : ''}${filters.maxArea || ''}` 
                            : ''}
                        classNames={{
                            input: '!bg-main !text-white !border-none !rounded-md',
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setAreaOpen(!areaOpen);
                        }}
                        readOnly
                    />
                    
                    {areaOpen && (
                        <div 
                            className="absolute top-[100%] left-0 mt-2 bg-white p-4 rounded-lg shadow-lg z-50 w-[300px]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Text className="font-medium mb-4">Area</Text>
                            <div className="flex items-center gap-2">
                                <Select
                                    placeholder="Min. Area"
                                    data={areaOptions}
                                    value={filters.minArea}
                                    onChange={(value) => handleInputChange('minArea', value)}
                                    className="flex-1"
                                    clearable
                                />
                                <span>-</span>
                                <Select
                                    placeholder="Max. Area"
                                    data={areaOptions}
                                    value={filters.maxArea}
                                    onChange={(value) => handleInputChange('maxArea', value)}
                                    className="flex-1"
                                    clearable
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Bedrooms Range */}
                <div className="!w-full relative">
                    <Select
                        placeholder="Bedrooms"
                        className="!w-full"
                        value={filters.minRooms || filters.maxRooms ? 
                            `${filters.minRooms || ''}${filters.minRooms && filters.maxRooms ? ' - ' : ''}${filters.maxRooms || ''}` 
                            : ''}
                        classNames={{
                            input: '!bg-main !text-white !border-none !rounded-md',
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setBedroomsOpen(!bedroomsOpen);
                        }}
                        readOnly
                    />
                    
                    {bedroomsOpen && (
                        <div 
                            className="absolute top-[100%] left-0 mt-2 bg-white p-4 rounded-lg shadow-lg z-50 w-[350px]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Text className="font-medium mb-4">Bedrooms</Text>
                            <div className="flex items-center gap-2">
                                <Select
                                    placeholder="Min. Bedrooms"
                                    data={bedroomOptions}
                                    value={filters.minRooms}
                                    onChange={(value) => handleInputChange('minRooms', value)}
                                    className="flex-1"
                                    clearable
                                />
                                <span>-</span>
                                <Select
                                    placeholder="Max. Bedrooms"
                                    data={bedroomOptions}
                                    value={filters.maxRooms}
                                    onChange={(value) => handleInputChange('maxRooms', value)}
                                    className="flex-1"
                                    clearable
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Sort By */}
                <Select
                    placeholder="Sort By"
                    className="!w-full"
                    data={sortOptions}
                    value={filters.sortBy}
                    onChange={(value) => handleInputChange('sortBy', value)}
                    classNames={{
                        input: '!bg-main !text-white !border-none !rounded-md',
                    }}
                    clearable
                    searchable
                />
            </div>
        </Container>
    );
};

export default Filter;