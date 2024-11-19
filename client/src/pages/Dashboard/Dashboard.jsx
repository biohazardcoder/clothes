import { useSelector } from "react-redux";
import { FaUser, FaPhone, FaLocationArrow } from "react-icons/fa";

function Dashboard() {
    const { data } = useSelector((state) => state.user);

    return (
        <div className="h-screen bg-container text-mainText  py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center p-2 gap-2">
                        <img src={data.avatar} alt="image" className="w-10 border-accent border-2 rounded-full  " />
                        <h1 className="text-2xl text-white font-semibold  ">Hello, {data.firstName}</h1>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Personal Info</h2>
                        <div className="flex items-center gap-2 text-gray-600">
                            <FaUser size={20} />
                            <span className="font-medium">{data.firstName} {data.lastName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mt-3">
                            <FaPhone size={20} />
                            <span className="font-medium">{data.phoneNumber}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mt-3">
                            <FaLocationArrow size={20} />
                            <span className="font-medium">{data.address}</span>
                        </div>
                    </div>



                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Account Settings</h2>
                        <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500 transition duration-300 mb-4">
                            Edit Account
                        </button>
                        <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-500 transition duration-300">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Dashboard;
