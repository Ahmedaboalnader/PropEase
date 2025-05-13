import React from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import Filter from '../../Components/Filter';
import PropertiesListing from '../Properties/PropertiesListing';
import { useGetAllProperitesQuery } from '../../Store/Properites/PropertiesApi';
import Loading from '../../Components/Loading';

const Properties = () => {

    const{data: getAllProperites, isLoading: isLoadingGetAllProperites, refetch} = useGetAllProperitesQuery();

    const propertiesWithOffers = getAllProperites?.$values?.filter(
        property => property?.hasOffer === true
    ) || [];

    if(isLoadingGetAllProperites){
        return <Loading isLoading={true} />
    }

return (
    <>
        <Header />
        <Filter />
        <PropertiesListing data={propertiesWithOffers} offers={true} refetch={refetch}/>
        <Footer />
    </>
)
}

export default Properties
