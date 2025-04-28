import * as yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^0\d{10}$/;
const textRegex = /^[A-Za-z\s]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#]{8,}$/;

export const AccountSchema = yup.object().shape({
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
phone: yup
    .string()
    .matches(phoneRegex, 'Phone number must be 11 digits and start with 0')
    .required('Phone number is required'),
});

export const ChangePasswordSchema = yup.object().shape({
    currentPassword: yup
        .string()
        .required('Current password is required')
        .min(8, 'Password must be at least 8 characters'),
    newPassword: yup
        .string()
        .required('New password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(passwordRegex,'Password must be Strong')
        .notOneOf([yup.ref('currentPassword')], 'New password must be different from current password'),
    confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});