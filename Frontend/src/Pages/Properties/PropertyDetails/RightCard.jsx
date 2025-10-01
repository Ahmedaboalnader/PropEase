import { Text, Button } from '@mantine/core';
import React from 'react'
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const RightCard = ({singleProperty}) => {
    return (
            <div className="col-span-12 md:col-span-5 md:col-start-8">
                <div className="bg-white p-6 rounded-lg border shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] sticky top-24">
                    <div>
                        <Text className="!text-2xl !font-bold">{singleProperty?.listingType}</Text>
                        <Text className="!font-semibold !flex !items-center !gap-2"> Self Check In - Unlock Super host - Great Location</Text>
                    </div>
                    <div className='mt-5'>
                        <Text className="!text-2xl !font-bold">Address</Text>
                        <Text className="!font-semibold !flex !items-center !gap-2">{singleProperty?.address}</Text>
                    </div>
                    <div className='mt-5'>
                        <Text className="!text-2xl !font-bold">Owner</Text>
                        <Text className="!font-semibold !flex !items-center !gap-2">{singleProperty?.name}</Text>
                    </div>
                    <Button 
                        className="!w-full !bg-[#EA3934] !rounded-lg !text-white !mb-4 !mt-4"
                        size="lg"
                        leftSection={<FaPhoneAlt />}
                        onClick={() => window.location.href = `tel:${singleProperty?.phone}`}
                    >
                        Call Now!
                    </Button>
                    <Button 
                        className="!w-full !bg-[#128C7E] !rounded-lg !text-white"
                        size="lg"
                        leftSection={<FaWhatsapp size={20}/>}
                        onClick={() => window.open(`https://wa.me/${singleProperty?.phone}`, '_blank')}
                    >
                        WhatsApp
                    </Button>
                </div>
            </div>
    )
}

export default RightCard