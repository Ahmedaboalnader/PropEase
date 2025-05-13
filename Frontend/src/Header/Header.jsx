import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Group, Text, Burger, Stack } from '@mantine/core';
import logo from '../assets/logo.svg';
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { FaRegUser } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import AuthModal from '../Components/AuthModal';
import { useGetFavoritesQuery } from '../Store/Favorite/FavoriteApi';
import Logout from '../Components/Logout';
const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Properties', path: '/properties' },
    { name: 'Offers', path: '/offers' },
    { name: 'Sell', path: '/sell' },
    { name: 'Contact us', path: '/contact' },
];

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [mobileOpened, setMobileOpened] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, isAuthenticated, isVerified } = useAuth();

    const {data: getFavorites} = useGetFavoritesQuery(undefined, {
        skip: !isAuthenticated
    });

    useEffect(() => {
        if (getFavorites?.$values) {
            setFavoriteCount(getFavorites?.$values?.length);
        }
    }, [getFavorites]);

    const handleFavoriteClick = () => {
        if (!isAuthenticated || !user) {
            setIsModalOpen(true);
        } else {
            navigate('/account/favorite');
        }
    };

    const handleSellClick = () => {
        if (!isAuthenticated || !user) {
            setIsModalOpen(true);
            return;
        } else {
            navigate('/sell');
        }
    };

    return (
        <>
            <header className="w-full flex justify-between items-center py-4 px-4 md:px-8 md:py-0">
                {/* Left Logo */}
                <motion.div 
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <Link to="/" className="flex items-center gap-0">
                        <img src={logo} alt="PropEase Logo" className='max-sm:w-12 max-sm:h-12' />
                        <Text className='!text-main !font-bold !text-base'>PropEase</Text>
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <Group className="!hidden lg:!flex ">
                    {navItems?.map((item) => (
                    <Link
                        key={item?.path}
                        to={item?.path}
                        onClick={(e) => {
                            if (item?.path === '/sell') {
                                e.preventDefault();
                                handleSellClick();
                            }
                        }}
                        className={`!px-3 !py-1 !rounded-md !font-medium !text-main ${
                        location?.pathname === item?.path
                            ? '!bg-main !text-white !font-bold'
                            : 'hover:!bg-hover hover:!text-white'
                        }`}
                    >
                        {item?.name}
                    </Link>
                    ))}
                </Group> 

                {/* Desktop Auth Buttons */}
                <Group className="!hidden lg:!flex !space-x-0">
                    <div 
                        className='!border !border-gray-300 !rounded-full !w-10 !h-10 
                        !flex !justify-center !items-center !cursor-pointer hover:!bg-gray-100
                        relative'
                        onClick={handleFavoriteClick}
                    >
                        <IoIosHeartEmpty size={22} />
                        {favoriteCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white 
                                text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {favoriteCount}
                            </span>
                        )}
                    </div>
                    {(!isAuthenticated && !user && !isVerified) ? (
                        <>
                            <Link to="/login">
                            <Button className='!bg-main !rounded-full !py-2 !font-semibold !text-white 
                                !min-w-[120px] !border-2 !border-[#0c332e] hover:!bg-white hover:!text-[#0c332e] 
                                !transition !duration-300'>
                                Login
                            </Button>
                            </Link>
                            <Link to="/signup">
                            <Button variant='outline' className='!border !border-main !rounded-full !py-2 !font-semibold 
                                !text-main !min-w-[120px] hover:!bg-[#0c332e] hover:!text-white hover:!border-white 
                                !transition !duration-300'>
                                Sign up
                            </Button>
                            </Link>
                        </>
                    ): (
                        <Button onClick={() => navigate("/account/details")} variant='outline' className='!border !border-main !bg-main !rounded-full !py-2 !font-semibold 
                            !text-white !min-w-[120px] hover:!bg-[#0c332e] hover:!text-white hover:!border-white 
                            !transition !duration-300'
                            leftSection={<FaRegUser />}
                        >
                            {user?.name}
                        </Button>
                    )}
                </Group>

                {/* Mobile Menu Button and Heart Icon */}
                <div className="lg:!hidden flex items-center gap-3 z-50">
                    <div 
                        className='!border !border-gray-300 !rounded-full !w-10 !h-10 
                        !flex !justify-center !items-center !cursor-pointer hover:!bg-gray-100
                        relative'
                        onClick={handleFavoriteClick}
                    >
                        <IoIosHeartEmpty size={22} />
                        {favoriteCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white 
                                text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {favoriteCount}
                            </span>
                        )}
                    </div>
                    <Burger
                        opened={mobileOpened}
                        onClick={() => setMobileOpened((o) => !o)}
                        color="#0c332e"
                        size="sm"
                    />
                </div>

                {/* Mobile Menu Popover */}
                {mobileOpened && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-white !h-full z-40 pt-20 px-6 pb-10 flex flex-col lg:!hidden"
                    >
                        {/* User info if authenticated */}
                        {isAuthenticated && user && (
                            <Link to="/account/details">
                                <div className="mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
                                    <div className="bg-main rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <Text className="font-semibold text-gray-800">{user.name}</Text>
                                        <Text size="xs" className="text-gray-500">{user.email}</Text>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Navigation Links - Left aligned */}
                        <Stack className="w-full !gap-4 !mb-auto items-start">
                            {navItems?.map((item) => (
                                <Link
                                    key={item?.path}
                                    to={item?.path}
                                    onClick={(e) => {
                                        if (item?.path === '/sell') {
                                            e.preventDefault();
                                            handleSellClick();
                                        } else {
                                            setMobileOpened(false);
                                        }
                                    }}
                                    className={`!w-full !px-4 !py-2 !rounded-lg !font-medium !text-main ${
                                        location?.pathname === item?.path || 
                                        (item?.path === '/home' && location?.pathname === '/') ||
                                        (location?.pathname.includes(item?.path) && item?.path !== '/home')
                                            ? '!bg-main !text-white !font-bold'
                                            : 'hover:!bg-hover hover:!text-white'
                                    }`}
                                >
                                    {item?.name}
                                </Link>
                            ))}
                        </Stack>

                        {/* Auth buttons or Logout at bottom */}
                        <div className="mt-auto pt-4 border-t border-gray-200 w-full">
                            {(!isAuthenticated || !user || !isVerified) ? (
                                <div className="flex flex-col gap-3">
                                    <Link to="/login" className="w-full" onClick={() => setMobileOpened(false)}>
                                        <Button className='!bg-main !rounded-full !py-2 !font-semibold !text-white 
                                            !w-full !border-2 !border-[#0c332e] hover:!bg-white hover:!text-[#0c332e] 
                                            !transition !duration-300'>
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/signup" className="w-full" onClick={() => setMobileOpened(false)}>
                                        <Button variant='outline' className='!border !border-main !rounded-full !py-2 !font-semibold 
                                            !text-main !w-full hover:!bg-[#0c332e] hover:!text-white hover:!border-white 
                                            !transition !duration-300'>
                                            Sign up
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Logout />
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </header>

            <AuthModal 
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                value="sell"
            />
        </>
    );
}