import React from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import CustomHeader from '../../Components/CustomHeader'
import CoverImage from '../../assets/sell.png';
import SellForm from './SellForm';
import { useSearchParams } from 'react-router-dom';
import { useGetSinglePropertyQuery } from '../../Store/Properites/PropertiesApi';


const Sell = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const { data: singleProperty, isLoading: isLoadingProperty, refetch } = useGetSinglePropertyQuery(id, {
        skip: !id
    });

    return (
        <>
            <Header />
            <CustomHeader title='Sell Property' image={CoverImage} />
            <SellForm 
                singleProperty={singleProperty}
                isLoadingProperty={isLoadingProperty}
                refetchDetails={refetch}
            />
            <Footer />
        </>
    )
}

export default Sell;