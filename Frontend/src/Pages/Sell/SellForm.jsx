import { useForm, Controller } from 'react-hook-form';
import { TextInput, Textarea, Button, Text, Container, Select } from '@mantine/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { SellSchema } from './SellSchema';

const SellForm = () => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode:"onChange",
        resolver: yupResolver(SellSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            propertyType: '',
            propertyLocation: '',
            preferredContact: '',
            message: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            console.log(data);
            reset();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container size="md" className="py-10">
            <div className="bg-white rounded-xl shadow-lg p-4 lg:p-8">
                <div className="text-left mb-6">
                    <Text className="!text-2xl !font-bold">Submit Property</Text>
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
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label="Phone Number"
                                    placeholder="Enter Your Phone Number"
                                    error={errors.phone?.message}
                                    classNames={{
                                        input: 'bg-gray-50 border-0 h-12 ',
                                    }}
                                    className='w-full'
                                />
                            )}
                        />

                        <Controller
                            name="propertyType"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Property Type"
                                    placeholder="Select Property Type"
                                    data={['Residential', 'Commercial', 'Land']}
                                    error={errors.propertyType?.message}
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
                            name="propertyLocation"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label="Property Location"
                                    placeholder="Enter the city or area where property is located"
                                    error={errors.propertyLocation?.message}
                                    classNames={{
                                        input: 'bg-gray-50 border-0 h-12',
                                    }}
                                    className='w-full'
                                />
                            )}
                        />

                        <Controller
                            name="preferredContact"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Preferred contact method"
                                    placeholder="Select contact method"
                                    data={['Phone', 'Email']}
                                    error={errors.preferredContact?.message}
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
                            className="!w-full lg:!w-[60%] !text-base !bg-main hover:bg-[#1e3d2f] h-12 mt-4"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default SellForm;
