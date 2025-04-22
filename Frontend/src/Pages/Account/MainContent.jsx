import { useMediaQuery } from '@mantine/hooks';
import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SharedTabs from './SharedTabs';
import AccountDetails from './AccountDetails/AccountDetails';
import Favorite from './Favorite/Favorite';
import { Text } from '@mantine/core';
import { FaRegUser, FaRegHeart  } from "react-icons/fa";
import Logout from '../../Components/Logout';

const MainContent = () => {
    const { tabValue } = useParams();
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery("(max-width: 1023.9px)");
    const tabValues = useMemo(() => {    
        return [
            {
                id: 1,
                value: "details",
                label: "Account Details",
                Panel: <AccountDetails />,
                icon: <FaRegUser />,
            },
            {
                id: 2,
                value: "favorite",
                label: "Favorite",
                Panel: <Favorite />,
                icon: <FaRegHeart  />,
            },
        ];
    });
    return (
        <div className="min-h-screen py-8 w-full px-3 md:px-8 lg:px-12 bg-[#fafafa]">
            <Text className="!text-2xl !font-bold !my-5 !w-full !px-20 !mb-10">My Account</Text>
            <SharedTabs
                tabValue={tabValue}
                onChange={(value) => {navigate(`/account/${value}`)}}
                tabValues={tabValues}
                orientation={isSmallScreen ? "horizontal" : "vertical"}
                defaultValue={"details"}
                color={"#fff"}
                variant={"pills"}
                isSmallScreen={isSmallScreen}
            />
        </div>
    )
}

export default MainContent