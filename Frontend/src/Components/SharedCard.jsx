import React from 'react'
import { Card, Badge, Text, Group } from '@mantine/core';
import { FaBath, FaBed, FaRulerCombined } from 'react-icons/fa';
import { IoIosHeartEmpty } from "react-icons/io";

const SharedCard = ({property, onClick, offers}) => {
    return (
        <Card 
            shadow="sm" 
            padding="0"
            radius="md" 
            withBorder 
            className="!rounded-2xl !overflow-hidden !border !border-gray-300 !cursor-pointer"
            onClick={onClick}
            style={{ transition: 'transform 0.3s ease-in-out' }}
        >
            <div className="!relative !h-56">
                <img src={property.image} alt={property.title} className="!w-full !h-full !object-cover" />
                {offers ? (
                    <div className="!absolute !top-2 !right-2 !flex">
                        <Badge className='!bg-red-500 !text-white !min-w-[60px] !p-2 !text-xs !rounded-md !font-medium'>10% Discount</Badge>
                    </div>
                ) : (
                    <div className="!absolute !top-2 !left-2 !flex !gap-2">
                        <Badge className='!bg-main !text-white !min-w-[60px] !p-2 !rounded-full !font-medium'>FOR RENT</Badge>
                        <Badge className='!bg-yellowCustom !text-black !min-w-[60px] !p-2 !rounded-full !font-semibold'>FEATURED</Badge>
                    </div>
                )}                
            </div>
            <div className="!mt-4 !space-y-2 !px-5 !pb-2">
                <Text className="!font-bold !text-xl">{property.title}</Text>
                <Text className='!font-medium !text-sm !text-gray-600'>{property.location}</Text>
                <Group className='!flex !items-center !justify-center max-sm:!gap-2 lg:!justify-start !border-b !py-4'>
                    <Group className='!flex !items-center !justify-center !gap-3 !border !border-gray-300 !rounded-full !py-2 !min-w-fit !px-4'>
                        <FaBed size={18} />
                        <Text size="xs">{property.rooms}</Text>
                    </Group>
                    <Group className='!flex !items-center !justify-center !gap-3 !border !border-gray-300 !rounded-full !py-2 !min-w-fit !px-4'>
                        <FaBath size={18} />
                        <Text size="xs">{property.baths}</Text>
                    </Group>
                    <Group className='!flex !items-center !justify-center !gap-3 !border !border-gray-300 !rounded-full !py-2 !min-w-fit !px-4'>
                        <FaRulerCombined size={18} />
                        <Text size="xs">{property.size} m²</Text>
                    </Group>
                </Group>

                <Group className='!flex !items-center !justify-between'>
                    <div>
                        {offers ? (
                            <div className='flex items-center gap-2'>
                                <Text className='!text-gray-500 !text-base !font-medium !line-through'>{property.price} EGP</Text>
                                <Text className='!text-red-400 !text-lg !font-semibold'>15,000,000 EGP</Text>
                            </div>
                        ) : (
                            <Text className='!text-red-400 !text-lg !font-semibold'>{property.price} EGP</Text>
                        )}
                    </div>
                    <div className='!border !border-gray-300 !rounded-full !w-10 !h-10 !flex !justify-center !items-center !cursor-pointer hover:!bg-gray-100'>
                        <IoIosHeartEmpty size={22} /> 
                    </div>
                </Group>
            </div>
        </Card>
    )
}

export default SharedCard