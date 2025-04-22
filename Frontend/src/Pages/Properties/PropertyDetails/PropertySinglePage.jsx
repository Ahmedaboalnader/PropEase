import React, { useState } from 'react';
import {
    Badge,
    Button,
    Group,
    Text,
    Container,
} from '@mantine/core';
import { FaHome, FaPhoneAlt, FaWhatsapp, FaShare, FaHeart, FaFlag, FaCarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FiMapPin } from "react-icons/fi";
import { 
    PiBedFill, 
    PiBathtubFill, 
    PiSwimmingPoolBold,
    PiTriangleFill,
    PiButterflyFill,
    PiPottedPlantFill,
    PiCityFill,
    PiGarageFill,
    PiHardHatFill 
} from "react-icons/pi";
import rent1 from '../../../assets/rent1.png';
import rent2 from '../../../assets/rent2.png';
import rent3 from '../../../assets/rent3.png';
import rent4 from '../../../assets/rent4.png';
import rent5 from '../../../assets/rent5.png';
import SharedCard from '../../../Components/SharedCard';
import { FaArrowRightLong } from "react-icons/fa6";
import { Modal } from '@mantine/core';
import { FaPlus } from 'react-icons/fa6';


const generateProperties = (count) => {
    const properties = [];
    for (let i = 1; i <= count; i++) {
        properties.push({
            id: i,
            title: 'New Apartment Nice View',
            location: 'Taj Sultan - Taj City Compound',
            price: '18,000,000 EGP',
            image: rent2, 
            rooms: 4,
            baths: 1,
            size: 460,
        });
    }
    return properties;
};

const PropertySinglePage = () => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const images = [rent1, rent2, rent3, rent4, rent5, rent2, rent4, rent1, rent3, rent5]; 

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    
    return (
        <Container size="2xl" className="!py-8 !px-16">
            <Modal 
                opened={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                size="70%"
                centered
            >
                <div className="grid grid-cols-3 gap-4 p-4">
                    {images.map((img, index) => (
                        <img 
                            key={index}
                            src={img}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg cursor-pointer"
                            onClick={() => setCurrentImageIndex(index)}
                        />
                    ))}
                </div>
            </Modal>

            <div className="relative mb-8 rounded-xl overflow-hidden">
                <div className="flex flex-row-reverse gap-4">
                    {/* Thumbnails */}
                    <div className="flex flex-col gap-2">
                        {images.slice(0, 4).map((img, index) => (
                            <div 
                                key={index} 
                                className={`w-32 h-24 rounded-lg overflow-hidden cursor-pointer ${currentImageIndex === index ? 'border-2 border-main' : ''}`}
                                onClick={() => setCurrentImageIndex(index)}
                            >
                                <img 
                                    src={img} 
                                    alt={`Thumbnail ${index + 1}`} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                        {images.length > 4 && (
                            <div 
                                className="w-32 h-24 rounded-lg overflow-hidden cursor-pointer relative"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <img 
                                    src={images[4]} 
                                    alt="More images" 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/70 h-full flex items-center justify-center gap-1 text-white">
                                    <FaPlus size={13} />
                                    <Text className="!font-bold">{images.length - 4}</Text>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Image */}
                    <div className="relative flex-1 h-[520px]">
                        <img
                            src={images[currentImageIndex]}
                            alt={`Property image ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover rounded-xl"
                        />
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                        >
                            <FaChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                        >
                            <FaChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-12 gap-8 mt-20">
                <div className="col-span-9">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <Text className="!text-2xl !font-bold">New Apartment Nice View</Text>
                            <Text className="!text-gray-700 !font-semibold !flex !items-center !gap-2"> <FiMapPin /> Elora Compound - Arabia Holding</Text>
                        </div>
                        <div className='flex items-center gap-4'>
                            <Badge className="!bg-transparent !text-black !border !border-gray-400 !rounded-full !w-10 !h-10"><FaShare size={18} /></Badge>
                            <Badge className="!bg-transparent !text-red-600 !border !border-gray-400 !rounded-full !w-10 !h-10"><FaHeart size={18} /></Badge>
                            <Badge className="!bg-transparent !text-black !border !border-gray-400 !rounded-full !w-10 !h-10"><FaFlag size={18} /></Badge>
                        </div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 mt-14 border border-gray-400 rounded-xl">
                        <div className="text-left p-4">
                            <Text size="sm" color="dimmed" fw={500}>Bedroom</Text>
                            <Group className="mt-2 !flex !items-center !justify-start">
                                <PiBedFill size={24} className='!text-gray-400'/>
                                <Text fw={700}>Four</Text>
                            </Group>
                        </div>
                        <div className="text-left border-l-2 border-gray-300 pl-4 p-4">
                            <Text size="sm" color="dimmed" fw={500}>Bathroom</Text>
                            <Group className="mt-2 !flex !items-center !justify-start">
                                <PiBathtubFill size={24} className='!text-gray-400'/>
                                <Text fw={700}>Four</Text>
                            </Group>
                        </div>
                        <div className="text-left border-l-2 border-gray-300 pl-4 p-4">
                            <Text size="sm" color="dimmed" fw={500}>Garage</Text>
                            <Group className="mt-2 !flex !items-center !justify-start">
                                <FaCarAlt size={24} className='!text-gray-400'/>
                                <Text fw={700}>One</Text>
                            </Group>
                        </div>
                        <div className="text-left border-l-2 border-gray-300 pl-4 p-4">
                            <Text size="sm" color="dimmed" fw={500}>Pool</Text>
                            <Group className="mt-2 !flex !items-center !justify-start">
                                <PiSwimmingPoolBold size={24} className='!text-gray-400'/>
                                <Text fw={700}>One</Text>
                            </Group>
                        </div>
                        <div className="text-left border-l-2 border-gray-300 pl-4 p-4">
                            <Text size="sm" color="dimmed" fw={500}>Area</Text>
                            <Group className="mt-2 !flex !items-center !justify-start">
                                <PiTriangleFill size={24} className='!text-gray-400'/>
                                <Text fw={700}>1,024 ft</Text>
                            </Group>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="my-16">
                        <Text className="!font-bold !text-xl !mb-4">Description</Text>
                        <Text className="!text-base !font-semibold">
                            Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, 
                            mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum 
                            tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad 
                            litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque 
                            ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis 
                            convallis diam sit amet lacinia. Aliquam in elementum tellus.                        
                        </Text>
                    </div>
                </div>

                {/* Right Sidebar - 1/4 width */}
                <div className="col-span-3">
                    <div className="bg-white p-4 rounded-lg border shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                        <div>
                            <Text className="!text-2xl !font-bold">X The Brokers</Text>
                            <Text className="!font-semibold !flex !items-center !gap-2"> Self Check In - Unlock Super host - Great Location</Text>
                        </div>
                        <div className='mt-5'>
                            <Text className="!text-2xl !font-bold">Address</Text>
                            <Text className="!font-semibold !flex !items-center !gap-2"> Address: Office 22, Building 22, New Cairo City, north 22, Cairo.</Text>
                        </div>
                        <Button 
                            className="!w-full !bg-[#EA3934] !rounded-lg !text-white !mb-4 !mt-4"
                            size="lg"
                            leftSection={<FaPhoneAlt />}
                        >
                            Call Now!
                        </Button>
                        <Button 
                            className="!w-full !bg-[#128C7E] !rounded-lg !text-white"
                            size="lg"
                            leftSection={<FaWhatsapp size={20}/>}
                        >
                            WhatsApp
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <Text className="!font-bold !text-xl !mb-4">Highlights</Text>
                <div className="grid grid-cols-3 gap-8">
                    <div className="flex items-center gap-3">
                        <FaHome size={30} className="text-main font-bold" />
                        <div className="flex flex-col items-start ">
                            <Text size="sm" color="dimmed">Type</Text>
                            <Text fw={500}>Single Family</Text>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <PiButterflyFill size={30} className="text-main font-bold" />
                        <div className="flex flex-col items-start ">
                            <Text size="sm" color="dimmed">View</Text>
                            <Text fw={500}>Single Family</Text>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <PiPottedPlantFill size={30} className="text-main font-bold" />
                        <div className="flex flex-col items-start ">
                            <Text size="sm" color="dimmed">Garden</Text>
                            <Text fw={500}>No Garden</Text>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <PiCityFill size={30} className="text-main font-bold" />
                        <div className="flex flex-col items-start ">
                            <Text size="sm" color="dimmed">Location</Text>
                            <Text fw={500}>City</Text>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <PiGarageFill size={30} className="text-main font-bold" />
                        <div className="flex flex-col items-start ">
                            <Text size="sm" color="dimmed">Parking</Text>
                            <Text fw={500}>Garage Available</Text>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <PiHardHatFill size={30} className="text-main font-bold" />
                        <div className="flex flex-col items-start ">
                            <Text size="sm" color="dimmed">Building Year</Text>
                            <Text fw={500}>2004</Text>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16">
                <div className="flex justify-between items-center mb-6">
                    <Text className="!font-bold !text-xl">Similar Properties</Text>
                    <Button variant="filled" className="!bg-main !rounded-lg">
                        See More <span className="ml-2"><FaArrowRightLong/></span>
                    </Button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {generateProperties(4).map((property) => (
                        <SharedCard 
                            key={property.id}
                            property={property}
                            // onClick={() => handleCardClick(property.id)}
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default PropertySinglePage;