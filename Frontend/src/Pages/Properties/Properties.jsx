import React from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import PropertiesListing from './PropertiesListing'
import Filter from '../../Components/Filter';
import { useGetAllProperitesQuery } from '../../Store/Properites/PropertiesApi';
import Loading from '../../Components/Loading';

const Properties = () => {
  const{data: getAllProperites, isLoading: isLoadingGetAllProperites, refetch} = useGetAllProperitesQuery();

  const propertiesWithoutOffers = getAllProperites?.$values?.filter(
    property => property?.hasOffer === false
) || [];

  if(isLoadingGetAllProperites){
    return <Loading isLoading={true} />
  }

  return (
    <div>
      <Header />
      <Filter />
      <PropertiesListing data={propertiesWithoutOffers} isLoading={isLoadingGetAllProperites} refetch={refetch}/>
      <Footer />
    </div>
  )
}

export default Properties
