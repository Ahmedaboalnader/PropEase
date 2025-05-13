import React, { useState } from 'react'
import { Card, Badge, Text, Group } from '@mantine/core';
import { FaBath, FaBed, FaRulerCombined } from 'react-icons/fa';
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { useAddFavoriteMutation } from '../Store/Favorite/FavoriteApi';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';
import { useNavigate } from 'react-router-dom';
import rent1 from '../assets/rent1.png';
import { showNotification } from '../utils/notification';
import getCountryFromGoogleMapsUrl from '../Functions/getCountryFromGoogleMapsUrl';

const SharedCard = ({property, offers,refetch}) => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addFavorite, { isLoading }] = useAddFavoriteMutation();

    const handleFavoriteClick = async (id) => {        
    if (!isAuthenticated) {
        setIsModalOpen(true);
        return;
    }

    try {
        const response = await addFavorite(Number(id)).unwrap();
        showNotification.success(response?.message || 'Favorite updated successfully');
        refetch();
    } catch (error) {
        console.error("Error:", error);
        showNotification.error(error.data?.message || 'Failed to update favorite');
    }
};

    const handleCardClick = () => {
        if(!user || !isAuthenticated){
            setIsModalOpen(true);
        }else{
            navigate(`/property/details?id=${property?.id}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    return (
        <>
            <Card 
                shadow="sm" 
                padding="0"
                radius="md" 
                withBorder 
                className="!rounded-2xl !overflow-hidden !border !border-gray-300 !cursor-pointer"
                style={{ transition: 'transform 0.3s ease-in-out' }}
            >
                <div className="!relative !h-56">
                    <img 
                        src={property?.images?.$values[0] || rent1} 
                        alt={property?.title} 
                        className="!w-full !h-full !object-cover" 
                        onClick={handleCardClick}
                    />
                    {offers ? (
                        <div className="!absolute !top-2 !right-2 !flex">
                            <Badge className='!bg-red-500 !text-white !min-w-[60px] !p-2 !text-xs !rounded-md !font-medium'>
                                {property?.discountPercentage}% Discount
                            </Badge>
                        </div>
                    ) : (
                        <div className="!absolute !top-2 !left-2 !flex !gap-2">
                            <Badge className='!bg-main !text-white !min-w-[60px] !p-2 !rounded-full !font-medium'>{property?.listingType}</Badge>
                            <Badge className='!bg-yellowCustom !text-black !min-w-[60px] !p-2 !rounded-full !font-semibold'>{property?.propertyType}</Badge>
                        </div>
                    )}                
                </div>
                <div className="!mt-4 !space-y-2 !px-5 !pb-2">
                    <Text 
                        onClick={handleCardClick}
                        className="!font-bold !text-xl line-clamp-1">{property?.title}</Text>
                    <Text className="!font-medium !text-base line-clamp-1">{property?.description}</Text>
                    <Text className='!font-medium !text-sm !text-gray-600 line-clamp-1'>{` ${getCountryFromGoogleMapsUrl(property?.location)}, ${property?.address}`}</Text>
                    <Group className='!flex !items-center !justify-center max-sm:!gap-2 lg:!justify-start !border-b !py-4'>
                        <Group className='!flex !items-center !justify-center !gap-3 !border !border-gray-300 !rounded-full !py-2 !min-w-fit !px-4'>
                            <FaBed size={18} />
                            <Text size="xs">{property?.rooms}</Text>
                        </Group>
                        <Group className='!flex !items-center !justify-center !gap-3 !border !border-gray-300 !rounded-full !py-2 !min-w-fit !px-4'>
                            <FaBath size={18} />
                            <Text size="xs">{property?.bathrooms}</Text>
                        </Group>
                        <Group className='!flex !items-center !justify-center !gap-3 !border !border-gray-300 !rounded-full !py-2 !min-w-fit !px-4'>
                            <FaRulerCombined size={18} />
                            <Text size="xs">{property?.area} m²</Text>
                        </Group>
                    </Group>

                    <Group className='!flex !items-center !justify-between'>
                        <div>
                            {property?.hasOffer ? (
                                <div className='flex items-center gap-2'>
                                    <Text className='!text-gray-500 !text-base !font-medium !line-through'>{property?.price} EGP</Text>
                                    <Text className='!text-red-400 !text-lg !font-semibold'>{property?.priceAfterDiscount}</Text>
                                </div>
                            ) : (
                                <Text className='!text-red-400 !text-lg !font-semibold'>{property?.price} EGP</Text>
                            )}
                        </div>
                        <div 
                            className={`!border !border-gray-300 !rounded-full !w-10 !h-10 !flex !justify-center !items-center !cursor-pointer hover:!bg-gray-100 ${
                                property?.isFavorite ? '!border-red-500' : ''
                            }`}
                            onClick={() => handleFavoriteClick(property?.$id)}
                            disabled={isLoading}                        
                        >
                            {property?.isFavorite ? (
                                <IoIosHeart size={22} className="text-red-500" />
                            ) : (
                                <IoIosHeartEmpty size={22} />
                            )}
                        </div>
                    </Group>
                </div>
            </Card>
            <AuthModal 
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    )
}

export default SharedCard