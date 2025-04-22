import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SharedCard from '../../Components/SharedCard';
import { SimpleGrid, Container, Pagination, Center } from '@mantine/core';

const PropertiesListing = ({data, offers}) => {
    const navigate = useNavigate();
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedProperties = data.slice(startIndex, startIndex + itemsPerPage);

    const handleCardClick = () => {
        navigate(`/property/details`);
    };

    return (
        <Container size="2xl" className="!px-16 !py-6">
            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3 }}
                spacing="lg"
                verticalSpacing="xl"
            >
                {displayedProperties?.map((property) => (
                    <SharedCard 
                        key={property.id} 
                        property={property}
                        onClick={() => handleCardClick(property.id)}
                        offers={offers}
                    />
                ))}
            </SimpleGrid>

            <Center className="mt-12">
                <Pagination 
                    total={totalPages}
                    value={currentPage}
                    onChange={setCurrentPage}
                    color="#1F4B43"
                    radius="sm"
                />
            </Center>
        </Container>
    );
};

export default PropertiesListing;