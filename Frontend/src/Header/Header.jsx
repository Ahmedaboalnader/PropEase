import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Group, Text, Burger, Stack } from '@mantine/core';
import logo from '../assets/logo.svg';
import { motion } from "framer-motion";
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { FaRegUser } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import AuthModal from '../Components/AuthModal';
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
    const [mobileOpened, setMobileOpened] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, isAuthenticated, isVerified } = useAuth();

    const handleFavoriteClick = () => {
        if (!isAuthenticated || !user) {
            setIsModalOpen(true);
        } else {
            navigate('/account/favorite');
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
                        !flex !justify-center !items-center !cursor-pointer hover:!bg-gray-100'
                        onClick={handleFavoriteClick}
                    >
                        <IoIosHeartEmpty size={22} /> 
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

                {/* Mobile Menu Button */}
                <div className="lg:!hidden z-50">
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
                        className="fixed inset-0 bg-white !h-full z-40 pt-20 px-6 pb-10 flex flex-col items-center lg:!hidden"
                    >
                        <Group className="!hidden lg:!flex !space-x-0">
                            {!isAuthenticated && !user && !isVerified ? (
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

                        <Stack className="w-full !gap-4 !mb-8">
                            {navItems?.map((item) => (
                                <Link
                                    key={item?.path}
                                    to={item?.path}
                                    onClick={() => setMobileOpened(false)}
                                    className={`!w-full !text-center !px-4 !py-3 !rounded-lg !font-medium !text-main !text-lg ${
                                    location?.pathname === item?.path
                                        ? '!bg-main !text-white !font-bold'
                                        : 'hover:!bg-hover hover:!text-white'
                                    }`}
                                >
                                    {item?.name}
                                </Link>
                            ))}
                        </Stack>

                    </motion.div>
                )}
            </header>

            <AuthModal 
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
}