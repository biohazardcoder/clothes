import { useState, useEffect } from "react";
import { DealImg } from "../../images/images";
import Button from "../../components/ui/Button";

const Deal = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 29,
        hours: 18,
        minutes: 15,
        seconds: 10,
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
                    clearInterval(timer);
                    setIsTimeUp(true);
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
                    alt="Model with hat"
                    className="rounded-lg m-auto shadow-md h-[300px]"
                />
            </div>
            <div className="p-8 bgre md:w-1/2">
                <h1 className="text-4xl font-bold text-[#fff] mb-4">Deals of the Month</h1>
                <p className="text-secontary mb-6">
                    It is a long established fact that a reader will be distracted by the readable content
                    of a page when looking at its layout. The point of using Lorem Ipsum is that it has
                    a more-or-less normal distribution of letters.
                </p>
                <div className="flex gap-4 mb-6">
                    {[
                        { label: "Days", value: timeLeft.days },
                        { label: "Hours", value: timeLeft.hours },
                        { label: "Mins", value: timeLeft.minutes },
                        { label: "Secs", value: timeLeft.seconds },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center p-4 bg-white border rounded-md shadow-sm text-gray-800"
                        >
                            <span className="text-3xl font-bold">{item.value}</span>
                            <span className="text-sm">{item.label}</span>
                        </div>
                    ))}
                </div>
                <Button className="px-6 py-3  ">
                    View All Products →
                </Button>
            </div>
        </div>
    );
};

export default Deal;
