import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Text, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import AuthFormLayout from '../AuthComponents/AuthFormLayout';
import FormInput from '../Forms/FormInput';
import PasswordInput from '../Forms/PasswordInput';
import { LoginSchema } from '../ValidationSchema'; 
import RememberMe from './RememberMe';
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { BsShieldLock } from "react-icons/bs";

const Login = () => {
  const [activeTab, setActiveTab] = useState('email');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema(activeTab)), 
    defaultValues: {
      email: '',
      phone: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    const submissionData = { ...data };
    if (activeTab === 'email') {
      delete submissionData.phone; 
    } else {
      delete submissionData.email; 
    }

    console.log(submissionData); 
    reset();
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
              name="phone"
              placeholder="Phone"
              error={errors.phone?.message}
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
            className="!text-white !p-2 !w-full !bg-gradient-to-r !from-text !to-main !mt-8"
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