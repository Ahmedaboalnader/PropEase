import React, { useState } from 'react';
import {Container,} from '@mantine/core';
import ExternalShareModal from '../../../Components/ExternalShareModal';
import Location from '../../../Components/Location';
import PreviewImages from './PreviewImages';
import RightCard from './RightCard';
import LeftCard from './LeftCard';
import Features from './Features';
import Related from './Related';

const PropertySinglePage = ({ singleProperty, getAllProperites }) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    return (
        <>
            <Container size="2xl" className="!py-8 max-lg:!px-2 lg:!px-16">
                <PreviewImages images={singleProperty?.images?.$values}/>
                <div className="w-full grid grid-cols-12 gap-8 mt-20">
                    <LeftCard singleProperty={singleProperty} setIsShareModalOpen ={setIsShareModalOpen}/>
                    <RightCard singleProperty={singleProperty}/>
                </div>
                <Location location={singleProperty?.location} />
                <Features singleProperty={singleProperty}/>
                <Related getAllProperites={getAllProperites}/>
            </Container>

            <ExternalShareModal 
                open={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
            />

        </>
    );
};

export default PropertySinglePage;