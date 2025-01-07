import React from 'react'
import { SlEarphones } from "react-icons/sl";
import { BsBox2 } from "react-icons/bs";
import { PiMoney } from "react-icons/pi";
import { Container } from '../../components/shared/Container/Container';

function Advantage() {
    const features = [
        {
            icon: <BsBox2 />,
            title: 'Bepul yetkazib berish',
            description: "500 ming so'm dan yuqori buyurtmalar uchun bepul yetkazib berish",
        },
        {
            icon: <PiMoney />,
            title: 'Pul kafolati',
            description: 'Almashtirish 3 kun ichida',
        },
        {
            icon: <SlEarphones />,
            title: 'Onlayn yordam',
            description: 'Soat 9:00 dan 18:00 gacha',
        },
    ];
    return (
        <div className='bg-container'>
            <Container className="flex justify-center space-x-20  text-primary py-10">
                {features.map((feature, index) => (
                    <div key={index} className="text-center max-w-xs">
                        <h1 className="text-2xl md:text-4xl flex justify-center items-center mb-4">
                            {feature.icon}
                        </h1>
                        <h3 className="text-lg md:text-xl font-bold">{feature.title}</h3>
                        <p className="text-secontary text-xs md:text-sm">{feature.description}</p>
                    </div>
                ))}
            </Container>
        </div>
    )
}

export default Advantage