import * as yup from 'yup';

const phoneRegex = /^0\d{10}$/;

export const SellSchema = yup.object().shape({
// Property Information
images: yup
    .array()
    .min(1, 'At least one image is required')
    .max(11, 'Maximum 11 images allowed')
    .required('Images are required'),
title: yup
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be at most 100 characters')
    .required('Title is required'),
description: yup
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must be at most 1000 characters')
    .required('Description is required'),
price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),
location: yup
    .string()
    .min(100, 'Location must be at least 100 characters')
    .max(1000, 'Location must be at most 1000 characters')
    .required('Location is required')
    .test(
        'is-google-maps-url',
        'Please provide a valid Google Maps URL in the correct format',
        (value) => {
        if (!value) return false;
        try {
            const url = new URL(value);
            const isGoogleMaps = (
            url.hostname.includes('google.') && 
            url.pathname.includes('/maps/place/')
            );
            if (!isGoogleMaps) return false;
            const hasCoords = /@(-?\d+\.\d+),(-?\d+\.\d+)/.test(value);
            if (!hasCoords) return false;
            return true;
        } catch {
            return false;
        }
        }
    ),
address: yup
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be at most 200 characters')
    .required('Address is required'),
area: yup
    .number()
    .typeError('Area must be a number')
    .positive('Area must be positive')
    .required('Area is required'),
bedrooms: yup
    .number()
    .typeError('Bedrooms must be a number')
    .integer('Bedrooms must be an integer')
    .min(1, 'Minimum 1 bedroom')
    .required('Bedrooms is required'),
bathrooms: yup
    .number()
    .typeError('Bathrooms must be a number')
    .integer('Bathrooms must be an integer')
    .min(1, 'Minimum 1 bathroom')
    .required('Bathrooms is required'),

// Highlights
propertyType: yup
    .string()
    .oneOf(
    ['Commercial', 'Chalets', 'Land', 'SingleFamily', 'Studio', 'TownHouse', 'Apartment', 'ModernVillas'],
    'Please select a valid property type'
    )
    .required('Property type is required'),
propertyView: yup
    .string()
    .oneOf(
    ['SeaView', 'GardenView', 'PoolView', 'CityView', 'MountainView'],
    'Please select a valid view type'
    )
    .required('View type is required'),
propertyLocation: yup
    .string()
    .oneOf(
    ['Downtown', 'Suburbs', 'CoastalArea', 'Countryside', 'BusinessDistrict'],
    'Please select a valid location type'
    )
    .required('Location type is required'),
buildingYear: yup
    .string()
    .oneOf(
    ['Year2025', 'Year2024', 'Year2023', 'Year2022', 'Year2021', 'Year2020', 'Year2019', 'Year2018', 'Year2017', 'Year2016'],
    'Please select a valid building year'
    )
    .required('Building year is required'),
listingType: yup
    .string()
    .oneOf(['ForSale', 'ForRent'], 'Please select a valid listing type')
    .required('Listing type is required'),
hasOffer: yup.boolean().optional().default(false),
discountPercentage: yup
    .mixed() 
    .when('hasOffer', {
    is: true,
    then: () =>
        yup
        .number()
        .typeError('Discount must be a number')
        .min(1, 'Discount must be at least 1%')
        .max(99, 'Discount must be at most 99%')
        .required('Discount is required when offer is enabled'),
    otherwise: (schema) => schema.notRequired(),
    })
  .nullable() // Explicitly allow null values
  .transform((value) => (value === '' ? null : value)), // Transform empty strings to null
hasParking: yup.boolean(),
hasGarden: yup.boolean(),

// Broker Information
name: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Name is required'),
phone: yup
    .string()
    .matches(phoneRegex, 'Phone number must be 11 digits and start with 0')
    .required('Phone number is required'),
});