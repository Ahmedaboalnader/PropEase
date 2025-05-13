import { useForm, Controller } from 'react-hook-form';
import { Button, Text, Container, Divider, Grid, Checkbox } from '@mantine/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { SellSchema } from './SellSchema';
import UploadImages from '../../Components/UploadImages';
import SellInput from '../../Components/SellInput';
import CustomSelect from '../../Components/CustomSelect';
import { useCreatePropertyMutation } from '../../Store/Properites/PropertiesApi';
import { showNotification } from '../../utils/notification';
import { useNavigate } from 'react-router-dom';

const SUPPORTED_FILE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
];

const SellForm = () => {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isValid },
    } = useForm({
        mode:"onChange",
        resolver: yupResolver(SellSchema),
        defaultValues: {
            images: [],
            title: "",
            description: "",
            location: "", 
            address: "",
            price: "",
            hasOffer: false,
            discountPercentage: "", 
            bedrooms: "",
            bathrooms: "",
            area: "",            
            propertyType: "", 
            propertyView: "",
            propertyLocation: "",
            buildingYear: "",
            listingType: "",
            hasParking: "", 
            hasGarden: "",
            name: "",
            phone: "",
        }
    });

    const [createProperty, { isLoading: isLoadingCreate }] = useCreatePropertyMutation();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
    
            // Append basic fields (make sure casing matches backend expectations)
            formData.append('Title', data.title || '');
            formData.append('Description', data.description || '');
            formData.append('Price', data.price || 0);
            formData.append('HasOffer', data.hasOffer ? 'true' : 'false');
    
            if (data.hasOffer && data.discountPercentage) {
                const discountAmount = (data.price * data.discountPercentage) / 100;
                const priceAfterDiscount = data.price - discountAmount;
                formData.append('DiscountPercentage', data.discountPercentage);
                formData.append('PriceAfterDiscount', priceAfterDiscount);
            }
    
            formData.append('Location', data.location || '');
            formData.append('Address', data.address || '');
            formData.append('PropertyType', data.propertyType || '');
            formData.append('Rooms', data.bedrooms || 1);
            formData.append('Bathrooms', data.bathrooms || 1);
            formData.append('Area', data.area || 0);
            formData.append('PropertyView', data.propertyView || '');
            formData.append('PropertyLocation', data.propertyLocation || '');
            formData.append('BuildingYear', data.buildingYear || '');
            formData.append('ListingType', data.listingType || '');
            formData.append('Parking', data.hasParking ? 'true' : 'false');
            formData.append('Garden', data.hasGarden ? 'true' : 'false');
            formData.append('Name', data.name || '');
            formData.append('Phone', data.phone || '');
    
            if (data.images && Array.isArray(data.images)) {
                data.images.forEach((image) => {
                    formData.append(`Images`, image);
                });
            }
    
            const response = await createProperty(formData).unwrap();
            console.log('Property created successfully:', response);            
            reset();
            navigate(`/property/details?id=${response?.id}`)
            showNotification.success(response?.message || 'Property created successfully');
        } catch (error) {
            console.error('Error submitting form:', error);
            showNotification.error(error?.data?.message || 'Failed to create property');
        }
    };
    
    return (
        <Container size="xl" className="py-10">
            <div className="bg-white rounded-xl shadow-custom p-4 lg:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-col justify-between gap-4 ">
                        <UploadImages 
                            control={control}
                            setValue={setValue}
                            error={errors.images}
                            inputName="images"
                            maxFiles={11}
                            accepts={SUPPORTED_FILE_TYPES.join(',')}
                            isOnlyImages={true}
                            // defaultImages={memoizedDefaultImages}
                        />

                        <Divider my="md" size="md" />

                        <Grid>
                            <SellInput
                                label="Title"
                                name="title"
                                control={control}
                                error={errors?.title}
                                placeholder="Enter Title"
                                setValue={setValue}
                                required={true}
                                type="string"
                            />
                            <SellInput
                                label="Description"
                                name="description"
                                control={control}
                                error={errors?.description}
                                placeholder="Enter Description"
                                setValue={setValue}
                                required={true}
                                type="string"
                                isTextarea={true}
                            />
                            <SellInput
                                label="Price"
                                name="price"
                                control={control}
                                error={errors?.price}
                                placeholder="Enter Price"
                                price="EGP"
                                setValue={setValue}
                                required={true}
                                min="0"
                                step="0.01"
                                type="number"
                            />
                            {watch('hasOffer') && (
                                <SellInput
                                    label="Discount Percentage"
                                    name="discountPercentage"
                                    control={control}
                                    error={errors?.discountPercentage}
                                    placeholder="Enter Discount Percentage"
                                    unit="%"
                                    setValue={setValue}
                                    required={true}
                                    min="1"
                                    max="99"
                                    step="1"
                                    type="number"
                                />
                            )}
                            <SellInput
                                label="Location"
                                name="location"
                                control={control}
                                error={errors?.location}
                                placeholder="Enter Location"
                                setValue={setValue}
                                required={true}
                                type="string"
                            />
                            <SellInput
                                label="Address"
                                name="address"
                                control={control}
                                error={errors?.address}
                                placeholder="Enter Address"
                                setValue={setValue}
                                required={true}
                                type="string"
                            />
                            <CustomSelect
                                label="Property For"
                                required={true}
                                name="listingType"
                                control={control}
                                error={errors?.listingType}
                                placeholder="Select Type Rent or Sale"
                                data={['ForSale', 'ForRent']}
                                setValue={setValue}
                            />
                            <SellInput
                                label="Area(m²)"
                                name="area"
                                control={control}
                                error={errors?.area}
                                placeholder="Enter Area(m²)"
                                unit="m²"
                                setValue={setValue}
                                required={true}
                                min="0"
                                step="0.01"
                                type="number"
                            />

                            <SellInput
                                label="Bedrooms"
                                name="bedrooms"
                                control={control}
                                error={errors?.bedrooms}
                                placeholder="Enter Bedrooms"
                                setValue={setValue}
                                required={true}
                                min="1"
                                step="1"
                                type="number"
                            />

                            <SellInput
                                label="Bathrooms"
                                name="bathrooms"
                                control={control}
                                error={errors?.bathrooms}
                                placeholder="Enter Bathrooms"
                                setValue={setValue}
                                required={true}
                                min="1"
                                step="1"
                                type="number"
                            />

                            <div className="w-full px-2 py-4 grid grid-cols-1 sm:grid-cols-12 items-start sm:items-center sm:gap-4">
                                {/* Label */}
                                <div className="col-span-12 sm:col-span-2 mb-3 sm:mb-0">
                                    <Text className="!font-bold !text-base text-gray-700" size="sm">
                                        Highlights
                                        <span className="text-[#fa5252] ml-1">*</span>
                                    </Text>
                                </div>

                                {/* Select inputs */}
                                <div className="col-span-12 sm:col-span-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 -mb-3">
                                        <CustomSelect
                                        name="propertyType"
                                        control={control}
                                        error={errors?.propertyType}
                                        placeholder="Select Property Type"
                                        data={[
                                            'Commercial',
                                            'Chalets',
                                            'Land',
                                            'SingleFamily',
                                            'Studio',
                                            'TownHouse',
                                            'Apartment',
                                            'ModernVillas',
                                        ]}
                                        setValue={setValue}
                                        />
                                        <CustomSelect
                                        name="propertyView"
                                        control={control}
                                        error={errors?.propertyView}
                                        placeholder="Select View Type"
                                        data={['SeaView', 'GardenView', 'PoolView', 'CityView', 'MountainView']}
                                        setValue={setValue}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 mt-3">
                                        <CustomSelect
                                        name="propertyLocation"
                                        control={control}
                                        error={errors?.propertyLocation}
                                        placeholder="Select Location Type"
                                        data={['Downtown', 'Suburbs', 'CoastalArea', 'Countryside', 'BusinessDistrict']}
                                        setValue={setValue}
                                        />
                                        <CustomSelect
                                        name="buildingYear"
                                        control={control}
                                        error={errors?.buildingYear}
                                        placeholder="Select Building Year"
                                        data={[
                                            'Year2025',
                                            'Year2024',
                                            'Year2023',
                                            'Year2022',
                                            'Year2021',
                                            'Year2020',
                                            'Year2019',
                                            'Year2018',
                                            'Year2017',
                                            'Year2016',
                                        ]}
                                        setValue={setValue}
                                        />
                                    </div>

                                </div>

                                {/* Checkboxes */}
                                <div className="col-span-12 sm:col-span-10 sm:col-start-3 mt-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-between bg-gray-50 h-12">
                                        <Text className="!text-gray-700 !font-semibold">Parking</Text>
                                        <Controller
                                            name="hasParking"
                                            control={control}
                                            render={({ field }) => (
                                            <Checkbox
                                                {...field}
                                                checked={field.value}
                                                color="#1F4B43"
                                                onChange={(event) => field.onChange(event.currentTarget.checked)}
                                                classNames={{ input: 'cursor-pointer' }}
                                                size="md"
                                            />
                                            )}
                                        />
                                        </div>

                                        <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-between bg-gray-50 h-12">
                                        <Text className="!text-gray-700 !font-semibold">Garden</Text>
                                        <Controller
                                            name="hasGarden"
                                            control={control}
                                            render={({ field }) => (
                                            <Checkbox
                                                {...field}
                                                checked={field.value}
                                                color="#1F4B43"
                                                onChange={(event) => field.onChange(event.currentTarget.checked)}
                                                classNames={{ input: 'cursor-pointer' }}
                                                size="md"
                                            />
                                            )}
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Grid>

                        <Divider my="md" size="md" />

                        <Grid>

                            <div className="col-span-2">
                                <Text className="!font-bold !text-base !text-gray-700 !mb-4" size="sm">
                                    Brokers Information
                                </Text>
                            </div>

                            <SellInput
                                label="Name"
                                name="name"
                                control={control}
                                error={errors?.name}
                                placeholder="Enter Name"
                                setValue={setValue}
                                required={true}
                                type="string"
                            />
                            <SellInput
                                label="Contact Method"
                                name="phone"
                                control={control}
                                error={errors?.phone}
                                placeholder="Enter Phone Number"
                                setValue={setValue}
                                required={true}
                                phone="+20"
                                type="number"
                            />

                        </Grid>
                    </div>

                    <div className="flex justify-end w-full">
                        <Button
                            type="submit"
                            className={`w-full !rounded-lg !text-base !bg-main hover:!bg-[#1e3d2f] !h-10 !mt-4
                                ${(isLoadingCreate || !isValid) ? '!opacity-50 !cursor-not-allowed' : 'hover:!opacity-90'}`}
                            loading={isLoadingCreate}
                            disabled={isLoadingCreate || !isValid}
                            loaderProps={{ color: 'white', size: 'sm', type: 'dots' }}
                        >
                            Post Now
                        </Button>
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default SellForm;
