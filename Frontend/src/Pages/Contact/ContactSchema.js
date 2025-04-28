import * as yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^0\d{10}$/;
const textRegex = /^[A-Za-z\s]+$/;

export const ContactSchema = yup.object().shape({
name: yup
    .string()
    .matches(textRegex, 'User name must contain only letters')
    .min(3, 'User name must be at least 3 characters')
    .max(50, 'User name must be at most 50 characters')
    .required('User name is required'),
email: yup
    .string()
    .matches(emailRegex, 'Please enter a valid email address')
    .required('Email is required'),
PhoneNumber: yup
    .string()
    .matches(phoneRegex, 'Phone number must be 11 digits and start with 0')
    .required('Phone number is required'),
subject: yup
    .string()
    .matches(textRegex, 'Subject must contain only letters')
    .min(5, 'Subject must be at least 5 characters')
    .max(50, 'Subject must be at most 50 characters')
    .required('Subject is required'),
message: yup
    .string()
    .matches(textRegex, 'Message must contain only letters')
    .min(20, 'Message must be at least 20 characters')
    .max(500, 'Message must be at most 500 characters')
    .required('Message is required'),
});