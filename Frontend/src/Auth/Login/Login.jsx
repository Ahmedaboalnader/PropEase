import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Text, Group } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import AuthFormLayout from '../AuthComponents/AuthFormLayout';
import FormInput from '../Forms/FormInput';
import PasswordInput from '../Forms/PasswordInput';
import { LoginSchema } from '../ValidationSchema'; 
import RememberMe from './RememberMe';
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { BsShieldLock } from "react-icons/bs";
import { useLoginMutation, useLoginPhoneMutation } from '../../Store/Auth/authApi';
import { showNotification } from '../../utils/notification';
import { useDispatch } from 'react-redux';
import { setCredentials, setVerifiedCredentials } from '../../Store/Auth/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('email');
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
  const [loginPhone, { isLoading: isLoadingPhoneLogin }] = useLoginPhoneMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(LoginSchema(activeTab)), 
    defaultValues: {
      email: '',
      PhoneNumber: '',
      password: '',
    },
  });
  
  const onSubmit = async (data) => {
    try {
      const submissionData = { ...data };
      let response;
      
      if (activeTab === 'email') {
        delete submissionData.PhoneNumber;
        response = await login(submissionData).unwrap();
      } else {
        delete submissionData.email;
        response = await loginPhone(submissionData).unwrap();
      }

      dispatch(setCredentials({
        accessToken: response?.accessToken,
        refreshToken: response?.refreshToken
      }));
      dispatch(setVerifiedCredentials());

      reset();
      showNotification.success(response?.message || 'Login successful');
      navigate('/');
    } catch (error) {
      if (error?.message?.includes('verify your email')) {
        showNotification.warning("Please verify your email first");
        navigate('/verfication', { 
          state: { 
            email: data?.email,
            fromLogin: true 
          } 
        });
      } else {
        showNotification.error(error.data?.message || 'Login failed');
      }
    }
  };

  return (
    <AuthFormLayout title="Welcome to the community" subtitle="Login to Explore">
      <Group className="!px-0 !max-w-[45%]">
        <Group className="!mb-3 !w-full">
          <Text className="!text-3xl !font-bold !mb-10">Login your Account</Text>
        </Group>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-full">
          <div className="flex mb-4 w-full">
            <button
              type="button" 
              className={`flex-1 text-center py-2 border-b-2 ${
                activeTab === 'email'
                  ? 'border-black font-semibold'
                  : 'border-transparent text-gray-500'
              }`}
              onClick={() => setActiveTab('email')}
            >
              E-mail
            </button>
            <button
              type="button" 
              className={`flex-1 text-center py-2 border-b-2 ${
                activeTab === 'phone'
                  ? 'border-black font-semibold'
                  : 'border-transparent text-gray-500'
              }`}
              onClick={() => setActiveTab('phone')}
            >
              Mobile Number
            </button>
          </div>

          {activeTab === 'email' ? (
            <FormInput
              control={control}
              name="email"
              placeholder="Email"
              error={errors.email?.message}
              icon={<MdOutlineMail color='black'/>}
            />
          ) : (
            <FormInput
              control={control}
              name="PhoneNumber"
              placeholder="Phone"
              error={errors.PhoneNumber?.message}
              icon={<FaPhoneAlt color='black'/>}
            />
          )}

          <PasswordInput
            control={control}
            name="password"
            placeholder="Password"
            error={errors.password?.message}
            icon={<BsShieldLock color='black'/>}
          />

          <RememberMe />

          <Button
            type="submit"
            className={`!text-white !font-bold !p-2 !w-full !bg-gradient-to-r !from-text !to-main !mt-8 
              ${((isLoadingLogin || isLoadingPhoneLogin) || !isValid) ? '!opacity-50 !cursor-not-allowed' : 'hover:!opacity-90'}`}
            loading={isLoadingLogin || isLoadingPhoneLogin}
            disabled={isLoadingLogin || isLoadingPhoneLogin || !isValid}
            loaderProps={{ color: 'white', size: 'sm', type: 'dots' }}
          >
            Login
          </Button>
        </form>

        <div className='flex justify-center w-full'>
          <Group justify="center" className="!mt-1 !flex !gap-0 ">
            <Text className="!cursor-pointer !text-base !font-semibold">Don’t have an account?</Text>
            <Link to={'/signup'}>
              <Text className="!cursor-pointer !text-[#769F7D] !text-base !font-bold">Sign up</Text>
            </Link>
          </Group>
        </div>
        
      </Group>
    </AuthFormLayout>
  );
};

export default Login;