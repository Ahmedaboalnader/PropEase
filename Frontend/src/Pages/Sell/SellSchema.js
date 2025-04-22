import * as yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^0\d{10}$/;
const textRegex = /^[A-Za-z\s]+$/;

export const SellSchema = yup.object().shape({
    name: yup
        .string()
        .matches(textRegex, 'Name must contain only letters')
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name must be at most 50 characters')
        .required('Name is required'),
    email: yup
        .string()
        .matches(emailRegex, 'Please enter a valid email address')
        .required('Email is required'),
    phone: yup
        .string()
        .matches(phoneRegex, 'Phone number must be 11 digits and start with 0')
        .required('Phone number is required'),
    propertyType: yup
        .string()
        .oneOf(['Residential', 'Commercial', 'Land'], 'Please select a valid property type')
        .required('Property type is required'),
    propertyLocation: yup
        .string()
        .min(3, 'Location must be at least 3 characters')
        .max(100, 'Location must be at most 100 characters')
        .required('Property location is required'),
    preferredContact: yup
        .string()
        .oneOf(['Phone', 'Email'], 'Please select a valid contact method')
        .required('Preferred contact method is required'),
    message: yup
        .string()
        .min(20, 'Message must be at least 20 characters')
        .max(500, 'Message must be at most 500 characters')
        .required('Message is required'),
});