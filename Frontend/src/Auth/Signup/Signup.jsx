import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Text, Group } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import AuthFormLayout from '../AuthComponents/AuthFormLayout';
import FormInput from '../Forms/FormInput';
import PasswordInput from '../Forms/PasswordInput';
import { SignUpSchema } from '../ValidationSchema';
import { LuUserRound } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { BsShieldLock } from "react-icons/bs";
import { useRegisterMutation } from '../../Store/Auth/authApi';
import { showNotification } from '../../utils/notification';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../Store/Auth/authSlice';
import Cookies from 'js-cookie';

const Signup = () => {
  const navigate = useNavigate();
  const [register, { isLoading: isLoadingSignup }] = useRegisterMutation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      Name: '',
      email: '',
      PhoneNumber: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await register(data).unwrap();
      
      // Store auth data in Redux and cookies
      dispatch(setCredentials({
          accessToken: response?.accessToken,
          refreshToken: response?.refreshToken
      }));

      Cookies.set('user', JSON.stringify(response?.user), {
        expires: 1, // Expires in 7 days
        secure: true, // Secure in production
        sameSite: 'strict', // Protection against CSRF
      });

      reset();
      showNotification.success(response?.message || 'Registration successful');
      navigate('/verfication', { 
          state: { 
              email: data?.email,
              phoneNumber: data?.PhoneNumber,
              fromLogin: false
          } 
      });
    } catch (error) {
      console.log("Error", error);
      if (error.data?.message === "Email is already registered.") {
        showNotification.info('Email already exists, please login');
        navigate('/login');
      } else {
        showNotification.error(error.data?.message || 'Registration failed');
      }
    }
  };

  return (
    <AuthFormLayout
      title="Welcome to the community"
      subtitle="Sign up to Explore"
    >
      <Group className="!px-4 sm:px-6 md:px-0 !w-full sm:!max-w-[85%] md:!max-w-[48%] flex flex-col items-center">

        <Group className="!mb-3 !w-full">
          <Text className="!text-xl sm:!text-2xl md:!text-3xl !font-bold !mb-1 sm:!mb-8 md:!mb-10 text-center sm:text-left">
            Create your Account
          </Text>
          <Text className="!font-bold !text-sm sm:!text-base text-center sm:text-left">
            Enter your Full Details
          </Text>
        </Group>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-full">
          <FormInput
            control={control}
            name="Name"
            placeholder="User Name"
            error={errors.Name?.message}
            icon={<LuUserRound color='black'/>}
          />

          <FormInput
            control={control}
            name="email"
            placeholder="Email"
            error={errors.email?.message}
            icon={<MdOutlineMail color='black'/>}
          />

          <FormInput
            control={control}
            name="PhoneNumber"
            placeholder="Phone"
            error={errors.PhoneNumber?.message}
            icon={<FaPhoneAlt color='black'/>}
          />

          <PasswordInput
            control={control}
            name="password"
            placeholder="Password"
            error={errors.password?.message}
            icon={<BsShieldLock color='black'/>}
          />

          <Button
            type="submit"
            className={`!text-white !font-bold !p-1 !w-full !bg-gradient-to-r !from-text !to-main !mt-6 sm:!mt-8 !text-sm sm:!text-base
              ${(isLoadingSignup || !isValid) ? '!opacity-50 !cursor-not-allowed' : 'hover:!opacity-90'}`}
            loading={isLoadingSignup}
            disabled={isLoadingSignup || !isValid}
            loaderProps={{ color: 'white', size: 'sm', type: 'dots' }}
          >
            Sign Up
          </Button>
        </form>

        <div className='flex justify-center w-full'>
          <Group justify="center" className="!mt-1 !flex !gap-0 flex-col sm:flex-row items-center">
            <Text className="!cursor-pointer !text-sm sm:!text-base !font-semibold text-center">
              Have an Account?
            </Text>
            <Link to={'/login'}>
              <Text className="!cursor-pointer !text-[#769F7D] !text-sm sm:!text-base !font-bold ml-0 sm:ml-1">
                Login
              </Text>
            </Link>
          </Group>
        </div>

      </Group>
    </AuthFormLayout>
  );
};

export default Signup;