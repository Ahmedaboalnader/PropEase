import React from 'react'
import { Badge, Group, Text } from '@mantine/core'
import { FaShare, FaHeart, FaFlag } from 'react-icons/fa';
import { FiMapPin } from "react-icons/fi";
import { 
    PiBedFill, 
    PiBathtubFill, 
    PiTriangleFill,
} from "react-icons/pi";
import getCountryFromGoogleMapsUrl from '../../../Functions/getCountryFromGoogleMapsUrl';
import numberToWords from '../../../Functions/numberToWords';
import { IoPricetagsOutline } from "react-icons/io5";

const LeftCard = ({singleProperty, setIsShareModalOpen}) => {
    return (
        <div className="col-span-12 md:col-span-7">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <Text className="!text-2xl !font-bold">{singleProperty?.title}</Text>
                    <Text className="!text-gray-700 !font-semibold !flex !items-center !gap-2"> <FiMapPin /> {`${getCountryFromGoogleMapsUrl(singleProperty?.location)}, ${singleProperty?.locationType}`}</Text>
                    {singleProperty?.hasOffer ? (
                        <div className='flex items-center gap-2 mt-4'>
                            <IoPricetagsOutline />
                            <Text className='!text-gray-500 !text-base !font-medium !line-through'>{singleProperty?.price} EGP</Text>
                            <Text className='!text-red-400 !text-lg !font-semibold'>{singleProperty?.priceAfterDiscount}</Text>
                        </div>
                    ) : (
                        <div className='flex items-center gap-2 mt-4'>
                            <IoPricetagsOutline />
                            <Text className='!text-black !text-lg !font-bold'>{singleProperty?.price} EGP</Text>
                        </div>
                    )}
                </div>
                <div className='flex items-center gap-4'>
                    <Badge 
                        className="!bg-transparent !text-black !border !border-gray-400 !rounded-full !w-10 !h-10 !cursor-pointer"
                        onClick={() => setIsShareModalOpen(true)}
                    >
                        <FaShare size={18} />
                    </Badge>
                    <Badge className="!bg-transparent !text-red-600 !border !border-gray-400 !rounded-full !w-10 !h-10 !cursor-pointer">
                        <FaHeart size={18} />
                    </Badge>
                    <Badge className="!bg-transparent !text-black !border !border-gray-400 !rounded-full !w-10 !h-10 !cursor-pointer"><FaFlag size={18} /></Badge>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-14 border border-gray-400 rounded-xl">
                <div className="text-left p-4">
                    <Text size="sm" color="dimmed" fw={500}>Bedroom</Text>
                    <Group className="mt-2 !flex !items-center !justify-start">
                        <PiBedFill size={24} className='!text-gray-400'/>
                        <Text fw={700}>{numberToWords(singleProperty?.rooms)}</Text>
                    </Group>
                </div>
                <div className="text-left border-l-2 border-gray-300 pl-4 p-4">
                    <Text size="sm" color="dimmed" fw={500}>Bathroom</Text>
                    <Group className="mt-2 !flex !items-center !justify-start">
                        <PiBathtubFill size={24} className='!text-gray-400'/>
                        <Text fw={700}>{numberToWords(singleProperty?.bathrooms)}</Text>
                    </Group>
                </div>
                <div className="text-left border-l-2 border-gray-300 pl-4 p-4">
                    <Text size="sm" color="dimmed" fw={500}>Area</Text>
                    <Group className="mt-2 !flex !items-center !justify-start">
                        <PiTriangleFill size={24} className='!text-gray-400'/>
                        <Text fw={700}>{`${singleProperty?.area} m²`}</Text>
                    </Group>
                </div>
            </div>

            {/* Description */}
            <div className="my-16">
                <Text className="!font-bold !text-xl !mb-4">Description</Text>
                <Text className="!text-base !font-semibold">
                    {singleProperty?.description}                     
                </Text>
            </div>
    </div>
    )
}

export default LeftCard