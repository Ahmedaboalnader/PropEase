import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const LeftSide = ({ title, subtitle }) => {
    return (
        <section className={`flex justify-center gap-80 ${!title || !subtitle ? "flex-row items-start py-10" : "flex-col items-center"} w-1/2 !h-full`}>

            <div className='bg-white/10 px-8 py-4 rounded-tl-3xl rounded-br-3xl'>
                <Link to="/" className="flex items-center gap-0">
                    <img src={logo} alt="PropEase Logo" />
                    <h1 className='text-main font-bold text-base'>PropEase</h1>
                </Link> 
            </div>

            {(title || subtitle) && (
                <div className="w-full flex items-end justify-center">
                    <div className=" bg-white/10 rounded-tl-3xl rounded-br-3xl px-8 py-4 font-semibold">
                        <p className="text-white text-center text-lg  z-40">
                            {title}
                            <br />
                            <span className="text-sm opacity-80">{subtitle}</span>
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default LeftSide;