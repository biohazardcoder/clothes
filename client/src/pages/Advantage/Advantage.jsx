import React from 'react'
import { SlEarphones } from "react-icons/sl";
import { BsBox2 } from "react-icons/bs";
import { PiMoney } from "react-icons/pi";

function Advantage() {
    const features = [
        {
            icon: <BsBox2 />,
            title: 'Free Shipping',
            description: 'Free shipping for orders above $150',
        },
        {
            icon: <PiMoney />,
            title: 'Money Guarantee',
            description: 'Within 30 days for an exchange',
        },
        {
            icon: <SlEarphones />,
            title: 'Online Support',
            description: '24 hours a day, 7 days a week',
        },
    ];
    return (
        <div>
            <div className="flex justify-center space-x-12 text-mainText py-10">
                {features.map((feature, index) => (
                    <div key={index} className="text-center max-w-xs">
                        <h1 className="text-4xl flex justify-center items-center mb-4">
                            {feature.icon}
                        </h1>
                        <h3 className="text-lg font-bold">{feature.title}</h3>
                        <p className="text-gray-500">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Advantage