import { useState, useEffect } from "react";
import { DealImg } from "../../images/images";
import Button from "../../components/ui/Button";

const Deal = () => {
    const [timeLeft, setTimeLeft] = useState(() => {
        const savedTime = localStorage.getItem("dealEndTime");
        const currentTime = Date.now();

        if (savedTime && currentTime < savedTime) {
            const remainingTime = savedTime - currentTime;
            return {
                days: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
                hours: Math.floor((remainingTime / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((remainingTime / (1000 * 60)) % 60),
                seconds: Math.floor((remainingTime / 1000) % 60),
            };
        }

        const newEndTime = currentTime + 30 * 24 * 60 * 60 * 1000;
        localStorage.setItem("dealEndTime", newEndTime);
        return { days: 30, hours: 0, minutes: 0, seconds: 0 };
    });

    const [isTimeUp, setIsTimeUp] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { days, hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds -= 1;
                } else if (minutes > 0) {
                    seconds = 59;
                    minutes -= 1;
                } else if (hours > 0) {
                    seconds = 59;
                    minutes = 59;
                    hours -= 1;
                } else if (days > 0) {
                    seconds = 59;
                    minutes = 59;
                    hours = 23;
                    days -= 1;
                } else {
                    const newEndTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
                    localStorage.setItem("dealEndTime", newEndTime);
                    setIsTimeUp(true);
                    return { days: 30, hours: 0, minutes: 0, seconds: 0 };
                }

                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (isTimeUp) return null;

    return (
        <div className="flex flex-col bg-container md:flex-row items-center justify-center">
            <div>
                <img
                    src={DealImg}
                    alt="Shlyapali model"
                    className="rounded-lg m-auto shadow-md h-[300px]"
                />
            </div>
            <div className="p-8 bgre md:w-1/2">
                <h1 className="text-4xl font-bold text-[#fff] mb-4">Eng Yaxshi Takliflari</h1>
                <p className="text-secontary mb-6">
                    O'qish oson matn mazmuniga chalg'ituvchi bo'lishi ma'lum. Lorem Ipsum ishlatilishining sababi
                    shundaki, u odatdagidan ko'ra ko'proq harflar taqsimotiga ega.
                </p>
                <div className="flex gap-4 mb-6">
                    {[
                        { label: "Kunlar", value: timeLeft.days },
                        { label: "Soatlar", value: timeLeft.hours },
                        { label: "Daqiqalar", value: timeLeft.minutes },
                        { label: "Soniyalar", value: timeLeft.seconds },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center p-4 bg-[white] border rounded-md shadow-sm text-gray-800"
                        >
                            <span className="text-3xl font-bold">{item.value}</span>
                            <span className="text-sm">{item.label}</span>
                        </div>
                    ))}
                </div>
                <Button to={"./shop"} className="px-6 py-3">Barcha Mahsulotlarni Ko'rish →</Button>
            </div>
        </div>
    );
};

export default Deal;
