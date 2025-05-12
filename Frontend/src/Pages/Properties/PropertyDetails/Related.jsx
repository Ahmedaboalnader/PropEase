import { Button, SimpleGrid, Text } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import SharedCard from '../../../Components/SharedCard'
import { FaArrowRightLong } from "react-icons/fa6";

const Related = ({getAllProperites}) => {
    return (
        <div className="mt-16">
            <div className="flex justify-between items-center mb-6">
                <Text className="!font-bold !text-xl">Similar Properties</Text>
                <Link to="/properties">
                    <Button variant="filled" className="!bg-main !rounded-lg">
                        See More <span className="ml-2"><FaArrowRightLong/></span>
                    </Button>
                </Link>
            </div>
            <SimpleGrid
                cols={{ base: 1, xs: 1, sm: 2, md: 3, lg: 4 }}
                spacing={{ base: 'md', sm: 'lg' }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}
                className="!w-full"
            >
                {getAllProperites?.slice(0, 4)?.map((property) => (
                    <div key={property?.$id}>
                        <SharedCard 
                            property={property}
                        />
                    </div>
                ))}
            </SimpleGrid>
        </div>
    )
}

export default Related