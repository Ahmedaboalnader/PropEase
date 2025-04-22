import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '../Components/Loading';
import ScrollToTopButton from '../Components/ScrollToTopButton';
import PrivateRoute from '../Routes/PrivateRoute.jsx';

// Lazy loaded pages
const Home = lazy(() => import('../Pages/Home/Home'));
const Properties = lazy(() => import('../Pages/Properties/Properties'));
const PropertyDetails = lazy(() => import('../Pages/Properties/PropertyDetails/PropertyDetails'));
const Contact = lazy(() => import('../Pages/Contact/Contact'));
const Sell = lazy(() => import('../Pages/Sell/index'));
const Login = lazy(() => import('../Auth/Login/Login'));
const Signup = lazy(() => import('../Auth/Signup/Signup'));
const ForgotPassword = lazy(() => import('../Auth/Login/ForgotPassword/'));
const ResetPassword = lazy(() => import('../Auth/Login/ResetPassword'));
const Verfication = lazy(() => import('../Auth/Login/Verfication'));
const Account = lazy(() => import('../Pages/Account/index.jsx'));
const Offers = lazy(() => import('../Pages/Offers/Offers.jsx'));

function Routers() {
    return (
        <>
            <ScrollToTopButton />
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />

                    <Route
                        path="/home"
                        element={
                            <Suspense fallback={<Loading />}>
                                <Home />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/properties"
                        element={
                            <Suspense fallback={<Loading />}>
                                <Properties />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/property/details"
                        element={
                            <Suspense fallback={<Loading />}>
                                <PropertyDetails />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/contact"
                        element={
                            <Suspense fallback={<Loading />}>
                                <Contact />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/sell"
                        element={
                            <Suspense fallback={<Loading />}>
                                <Sell />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/offers"
                        element={
                            <Suspense fallback={<Loading />}>
                                <Offers />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Suspense fallback={<Loading />}>
                                <Login />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <Suspense fallback={<Loading />}>
                                <Signup />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/forgot-password"
                        element={
                            <Suspense fallback={<Loading />}>
                                <ForgotPassword />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/reset-password"
                        element={
                            <Suspense fallback={<Loading />}>
                                <ResetPassword />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/verfication"
                        element={
                            <Suspense fallback={<Loading />}>
                                <Verfication />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/account/:tabValue"
                        element={
                            <Suspense fallback={<Loading />}>
                                <PrivateRoute>
                                    <Account />
                                </PrivateRoute>
                            </Suspense>
                        }
                    />

                </Routes>
            </Router>
        </>
    );
};

export default Routers;
