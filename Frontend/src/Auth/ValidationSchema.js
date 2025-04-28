import * as yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#]{8,}$/;
const phoneRegex = /^0\d{10}$/;
const userNameRegex = /^[A-Za-z\s]+$/;

// Schema for Sign-Up (validates all fields)
export const SignUpSchema = yup.object().shape({
Name: yup
    .string()
    .matches(userNameRegex, 'User name must contain only letters')
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
password: yup
    .string()
    .required('Password is required')
    .matches(passwordRegex,'Password must be Strong'),
});

// Schema for Login (validates email or phone based on active tab)
export const LoginSchema = (activeTab) =>
yup.object().shape({
    email:
    activeTab === 'email'
        ? yup
            .string()
            .matches(emailRegex, 'Please enter a valid email address')
            .required('Email is required')
        : yup.string().notRequired(), 
    PhoneNumber:
    activeTab === 'phone'
        ? yup
            .string()
            .matches(phoneRegex, 'Phone number must be 11 digits and start with 0')
            .required('Phone number is required')
        : yup.string().notRequired(), 
    password: yup
    .string()
    .required('Password is required')
    .matches(passwordRegex,'Password must be Strong'),
});

// Schema for Forgot Password (validates email only)
export const ForgotPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .matches(emailRegex, 'Please enter a valid email address') 
        .required('Email is required'), 
});

// Schema for Reset Password
export const ResetPasswordSchema = yup.object().shape({
    password: yup
        .string()
        .required('Password is required')
        .matches(passwordRegex,'Password must be Strong'),
    confirmPassword: yup
        .string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

// Schema for OTP Verification
export const OTPSchema = yup.object().shape({
    otp: yup
        .string()
        .matches(/^\d{6}$/, 'OTP must be 6 digits')
        .required('OTP is required'),
});