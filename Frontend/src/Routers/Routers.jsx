import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '../Components/Loading';
import ScrollToTopButton from '../Components/ScrollToTopButton';

// Lazy loaded pages
const Home = lazy(() => import('../Pages/Home/Home'));
const Properties = lazy(() => import('../Pages/Properties/Properties'));
const Services = lazy(() => import('../Pages/Services/Services'));
const Contact = lazy(() => import('../Pages/Contact/Contact'));
const Login = lazy(() => import('../Auth/Login/Login'));
const Signup = lazy(() => import('../Auth/Signup/Signup'));
const ForgotPassword = lazy(() => import('../Auth/Login/ForgotPassword/'));
const ResetPassword = lazy(() => import('../Auth/Login/ResetPassword'));
const Verfication = lazy(() => import('../Auth/Login/Verfication'));

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
                        path="/services"
                        element={
                            <Suspense fallback={<Loading />}>
                                <Services />
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

                </Routes>
            </Router>
        </>
    );
};

export default Routers;
