import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput, Textarea, Button, Text, Container } from '@mantine/core';
import { ContactSchema } from './ContactSchema';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { showNotification } from '../../utils/notification';
import { useContactMutation } from '../../Store/ContactUs/contactUsApi';

const ContactForm = () => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        mode:"onChange",
        resolver: yupResolver(ContactSchema),
        defaultValues: {
            name: '',
            email: '',
            PhoneNumber: '',
            subject: '',
            message: '',
        },
    });

    const[sendContactData, {isLoading: isLoadingContact}] = useContactMutation();

    const onSubmit = async (data) => {
        try {
            const response = await sendContactData(data).unwrap();
            reset();
            showNotification.success(response?.message || 'Contact Us successful');

        } catch (error) {
            console.error('Error:', error);
            showNotification.error(error.data?.message || 'Contact Us failed');
        }
    };

    return (
        <Container size="sm" className="py-10">
            <div className="bg-white rounded-xl shadow-lg p-4 lg:p-8">
                <div className="text-left mb-6">
                    <Text className="!text-2xl !font-bold">Send Us An E-mail</Text>
                    <Text className="!text-gray-600 !font-semibold !text-sm !mt-2 lg:!w-[65%]">
                        Step into our contact oasis, where questions find answers, and your presence is truly treasured.
                    </Text>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-col md:flex-row md:justify-between gap-4">
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label="Name"
                                    placeholder="Enter Your Name"
                                    error={errors.name?.message}
                                    classNames={{
                                        input: 'bg-gray-50 border-0 h-12',
                                    }}
                                    className='w-full'
                                />
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label="E-mail"
                                    placeholder="Enter Your E-mail"
                                    error={errors.email?.message}
                                    classNames={{
                                        input: 'bg-gray-50 border-0 h-12',
                                    }}
                                    className='w-full'
                                />
                            )}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:justify-between gap-4">
                        <Controller
                            name="PhoneNumber"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label="Phone Number"
                                    placeholder="Enter Your Phone Number"
                                    error={errors.PhoneNumber?.message}
                                    classNames={{
                                        input: 'bg-gray-50 border-0 h-12 ',
                                    }}
                                    className='w-full'
                                />
                            )}
                        />

                        <Controller
                            name="subject"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label="Subject"
                                    placeholder="Enter Your Subject"
                                    error={errors.subject?.message}
                                    classNames={{
                                        input: 'bg-gray-50 border-0 h-12',
                                    }}
                                    className='w-full'
                                />
                            )}
                        />
                    </div>

                    <Controller
                        name="message"
                        control={control}
                        render={({ field }) => (
                            <Textarea
                                {...field}
                                label="Message"
                                placeholder="Enter Your Message"
                                error={errors.message?.message}
                                autosize
                                minRows={6}
                                classNames={{
                                    input: 'bg-gray-50 border-0',
                                }}
                            />
                        )}
                    />

                    <div className="flex justify-center w-full">
                        <Button
                            type="submit"
                            className={`!w-full lg:!w-[80%] !bg-main hover:bg-[#1e3d2f] h-12 mt-4
                                ${(isLoadingContact || !isValid) ? '!opacity-50 !cursor-not-allowed' : 'hover:!opacity-90'}`}
                            loading={isLoadingContact}
                            disabled={isLoadingContact || !isValid}
                            loaderProps={{ color: 'white', size: 'sm', type: 'dots' }}
                        >
                            Send Mail
                        </Button>
                    </div>
                </form>

                <div className="flex flex-col gap-6 md:flex-row justify-between mt-12 px-4">
                    <div className="flex items-center gap-3">
                        <MdEmail size={24} className="text-[#2B5743]" />
                        <div className="flex flex-col">
                            <Text className="!font-bold !text-main !-mb-2">Our Mail</Text>
                            <Text className="!font-semibold">ionendk@gmail.com</Text>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaPhoneAlt size={20} className="text-[#2B5743]" />
                        <div className="flex flex-col">
                            <Text className="!font-bold !text-main !-mb-2">Our Phone Number</Text>
                            <Text className="!font-semibold">011113444553</Text>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ContactForm;
