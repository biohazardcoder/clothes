import { DealImg } from "../../images/images";

const Deal = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center   ">
            <div className=" ">
                <img
                    src={DealImg}
                    alt="Model with hat"
                    className="rounded-lg m-auto shadow-md h-[300px] "
                />
            </div>
            <div className="p-8 bgre md:w-1/2">
                <h1 className="text-4xl font-bold text-[#fff] mb-4">Deals of the Month</h1>
                <p className="text-sidebarText mb-6">
                    It is a long established fact that a reader will be distracted by the readable content
                    of a page when looking at its layout. The point of using Lorem Ipsum is that it has
                    a more-or-less normal distribution of letters.
                </p>
                <div className="flex gap-4 mb-6">
                    {['120 Days', '18 Hours', '15 Mins', '10 Secs'].map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center p-4 bg-gray-100 border rounded-md shadow-sm text-gray-800"
                        >
                            <span className="text-3xl font-bold">{item.split(' ')[0]}</span>
                            <span className="text-sm">{item.split(' ')[1]}</span>
                        </div>
                    ))}
                </div>
                <button className="px-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-800">
                    View All Products →
                </button>
            </div>


        </div >
    );
};

export default Deal;