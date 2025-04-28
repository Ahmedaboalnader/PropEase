import React from 'react';
import LeftSide from './LeftSide';
import imageUrl from '../../assets/login.png';

const AuthFormLayout = ({ title, subtitle, children }) => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center p-4 relative">
            {/* Gradient Background */}
            <div
                className="absolute w-full max-w-5xl h-[600px] rounded-2xl overflow-hidden shadow-xl bg-transparent -z-50 
                            inset-0 bg-gradient-to-tr from-main to-text transform -translate-x-1/2 -translate-y-1/2 rotate-3"
                style={{
                    top: '50%',
                    left: '50%',
                }}
            ></div>

            <div className="w-full max-w-5xl h-[600px] relative rounded-2xl overflow-hidden shadow-xl bg-transparent z-10">
                <div
                    className="w-full h-full flex justify-start rounded-2xl overflow-hidden"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Left side - Image and welcome text */}
                    <LeftSide title={title} subtitle={subtitle} />

                    {/* Right side - Form */}
                    <section className="w-full md:w-[80%] md:max-w-[80%] bg-white flex flex-col justify-center items-center rounded-tl-3xl rounded-bl-3xl">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AuthFormLayout;
  

