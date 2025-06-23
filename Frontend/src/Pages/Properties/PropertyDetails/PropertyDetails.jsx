import React from 'react'
import Header from '../../../Header/Header'
import PropertySinglePage from './PropertySinglePage'
import Footer from '../../../Footer/Footer'
import { useGetAllProperitesQuery, useGetSinglePropertyQuery } from '../../../Store/Properites/PropertiesApi'
import { useSearchParams } from 'react-router-dom';
import Loading from '../../../Components/Loading'

const Propertydetails = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const{data: singleProperty, isLoading: isLoadingProperty, refetch: refetchDetails} = useGetSinglePropertyQuery(id);
    const{data: getAllProperites, isLoading: isLoadingGetAllProperites, refetch: refetchListing} = useGetAllProperitesQuery();

    // Get the first 4 properties if array exists and has items
    const displayedProperties = getAllProperites?.$values?.length > 0 
        ? getAllProperites.$values.slice(0, 4)
        : [];   

    if(isLoadingProperty || isLoadingGetAllProperites){
        return <Loading isLoading={true} />
    }

    return (
        <>
            <Header />
            <PropertySinglePage 
                singleProperty={singleProperty} 
                getAllProperites={displayedProperties}
                refetchDetails={refetchDetails}
                refetchListing={refetchListing}
            />
            <Footer />
        </>
    )
}

export default Propertydetails