import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import {
  getAdminsError,
  getAdminsPending,
  getAdminsSuccess,
} from "../../Toolkit/AdminsSlicer";
import { Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { BiLoaderAlt } from "react-icons/bi";

export const Admins = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isPending, isError } = useSelector((state) => state.admins);
  const [isXS, setIsXS] = useState(window.innerWidth <= 767);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsXS(window.innerWidth <= 767);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getAllAdmins = async () => {
      dispatch(getAdminsPending());
      try {
        const response = await Axios.get("admin");
        dispatch(getAdminsSuccess(response.data?.data || []));
      } catch (error) {
        dispatch(
          getAdminsError(error.response?.data?.message || "Noma'lum xato")
        );
      }
    };
    getAllAdmins();
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm("Siz ushbu adminni o'chirishni xohlaysizmi?")) return;
    try {
      await Axios.delete(`admin/${id}`);
      dispatch(getAdminsSuccess(data.filter((admin) => admin._id !== id)));
      toast.success("Admin muvaffaqiyatli o'chirildi!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Adminni o'chirishda xato");
    }
  };

  const toggleCollapse = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="p-4 sm:p-8 bg-wishlistBg h-screen overflow-y-auto">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl sm:text-3xl text-mainText">
          Adminlar [ {data.length} ]
        </h1>
        <button
          onClick={() => navigate("/create-admin")}
          className="bg-sidebarBg text-white py-2 px-3 rounded hover:bg-slate-700"
        >
          Yangi Admin Qo'shish
        </button>
      </div>

      {isPending ? (
       <div className="items-center w-full h-1/2 justify-center flex">
        <BiLoaderAlt className="animate-spin text-2xl text-white"/>
       </div>
      ) : isError ? (
        <p className="text-red-500 text-center text-xl">Xato: {isError}</p>
      ) : data.length > 0 ? (
        <div className="w-full">
          {data.map((admin, index) => (
            <div key={admin._id} className="border-b border-gray-300">
              <div
                className={`flex items-center ${isXS ? "bg-orange-500 text-white p-2 cursor-pointer" : "p-2"
                  }`}
                onClick={() => toggleCollapse(index)}
              >
                {isXS && (
                  <span className="ml-auto">
                    {activeIndex === index ? "-" : "+"}
                  </span>
                )}
              </div>
              {((isXS && activeIndex === index) || !isXS) && (
                <div className="p-4 space-y-2 bg-gray-100">
                  <div>
                    <div className="flex">
                      <div className="font-bold">Ism:</div>
                      <div className="ml-2">{admin.firstName}</div>
                    </div>
                    <div className="flex">
                      <div className="font-bold">Familiya:</div>
                      <div className="ml-2">{admin.lastName}</div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="font-bold">Telefon raqami:</div>
                    <div className="ml-2">{admin.phoneNumber}</div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleDelete(admin._id)}
                      className="bg-red-600 text-white rounded-md p-1 hover:bg-red-700"
                    >
                      <Trash2 className="text-white text-[10px]" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center text-lg mt-4">
          Adminlar topilmadi.
        </p>
      )}
    </div>
  );
};
