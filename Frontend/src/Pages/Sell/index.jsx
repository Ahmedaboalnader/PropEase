import React from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import CustomHeader from '../../Components/CustomHeader'
import CoverImage from '../../assets/sell.png';
import SellForm from './SellForm';


const index = () => {
    return (
        <>
            <Header />
            <CustomHeader title='Sell Property' image={CoverImage} />
            <SellForm />
            <Footer />
        </>
    )
}

export default index