import React from 'react'
import getCountryFromGoogleMapsUrl from '../../../Functions/getCountryFromGoogleMapsUrl'
import { Text } from '@mantine/core'
import { FaHome } from 'react-icons/fa';
import { 
    PiButterflyFill,
    PiPottedPlantFill,
    PiCityFill,
    PiGarageFill,
    PiHardHatFill 
} from "react-icons/pi";

const Features = ({singleProperty}) => {
    return (
        <div className="mb-8">
            <Text className="!font-bold !text-xl !mb-4">Highlights</Text>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FaHome size={30} className="text-main font-bold" />
                    <div className="flex flex-col items-start">
                        <Text size="sm" color="dimmed">Type</Text>
                        <Text fw={500}>{singleProperty?.locationType}</Text>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <PiButterflyFill size={30} className="text-main font-bold" />
                    <div className="flex flex-col items-start">
                        <Text size="sm" color="dimmed">View</Text>
                        <Text fw={500}>{singleProperty?.viewType}</Text>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <PiPottedPlantFill size={30} className="text-main font-bold" />
                    <div className="flex flex-col items-start">
                        <Text size="sm" color="dimmed">Garden</Text>
                        <Text fw={500}>{singleProperty?.garden === true ? "Garden" : "No Garden"}</Text>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <PiCityFill size={30} className="text-main font-bold" />
                    <div className="flex flex-col items-start">
                        <Text size="sm" color="dimmed">Location</Text>
                        <Text fw={500}>{getCountryFromGoogleMapsUrl(singleProperty?.location)}</Text>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <PiGarageFill size={30} className="text-main font-bold" />
                    <div className="flex flex-col items-start">
                        <Text size="sm" color="dimmed">Parking</Text>
                        <Text fw={500}>{singleProperty?.parking === true ? "Garage Available" : "Garage unavailable"}</Text>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <PiHardHatFill size={30} className="text-main font-bold" />
                    <div className="flex flex-col items-start">
                        <Text size="sm" color="dimmed">Building Year</Text>
                        <Text fw={500}>{singleProperty?.buildingYear}</Text>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features