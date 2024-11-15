import React, { useState } from "react";
import { Section } from "../../Components/Section/Section";
import Axios from "../../Axios";
import { Link } from "react-router-dom";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  getPartnerPending,
  getPartnerSuccess,
  getPartnerError,
} from "../../Toolkit/PartnersSlicer";
import { toast, ToastContainer } from "react-toastify";

export const CreatePartner = () => {
  const dispatch = useDispatch();
  const [partnerData, setPartnerData] = useState({
    shopName: "",
    address: "",
    phoneNumber: "",
    photos: [],
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPartnerData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = async (e) => {
    try {
      const formImageData = new FormData();
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        formImageData.append("photos", files[i]);
      }
      const { data } = await Axios.post("upload", formImageData);
      setPartnerData((prevData) => ({
        ...prevData,
        photos: [...prevData.photos, ...data.photos],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(getPartnerPending());
    try {
      const response = await Axios.post("/partner/create", {
        shopName: partnerData.shopName,
        address: partnerData.address,
        phoneNumber: partnerData.phoneNumber,
        photos: partnerData.photos,
      });
      dispatch(getPartnerSuccess(response.data));
      toast.success("New partner added successfully!");
      setTimeout(() => {
        window.location.href = "/partners";
      }, 1000);
    } catch (error) {
      dispatch(getPartnerError(error.response.data.message));
      console.log(error.response.data.message);
    }
  };

  const confirmDeletePhoto = (photo) => {
    setPhotoToDelete(photo);
    setShowConfirmModal(true);
  };

  const deletePhoto = () => {
    setPartnerData((prevData) => ({
      ...prevData,
      photos: prevData.photos.filter((photo) => photo !== photoToDelete),
    }));
    window.location.reload()
    setShowConfirmModal(false);
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
  };

  const InputStyle = `border border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent transition ease-in-out duration-200 text-sm`;
  const FileInputStyle =
    partnerData.photos.length > 0
      ? "flex items-center justify-center border-2 border-dashed border-green-500 rounded-md p-1 cursor-pointer transition duration-200 bg-green-100 text-sm"
      : "flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md p-1 cursor-pointer hover:bg-gray-100 transition duration-200 text-sm";

  return (
    <Section className="bg-dashboardBg flex justify-center items-center p-4 pb-10 h-screen">
      <ToastContainer />
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-md h-auto bg-white p-4 rounded-lg shadow-md flex flex-col gap-5"
      >
        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-3">
          Xaridor qo'shish
        </h1>

        <input
          type="text"
          name="shopName"
          className={InputStyle}
          value={partnerData.shopName}
          onChange={handleInputChange}
          placeholder="Xaridor ismi"
          required
        />
        <input
          type="text"
          name="address"
          className={InputStyle}
          value={partnerData.address}
          onChange={handleInputChange}
          placeholder="Xaridor Manzili"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          className={InputStyle}
          value={partnerData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Xaridor raqami"
          required
        />

        <label className={FileInputStyle}>
          <FaCloudUploadAlt className="text-3xl text-gray-500 mb-1" />
          <input
            type="file"
            name="photos"
            className="hidden"
            onChange={handleFileChange}
            required
          />
          <span className="text-gray-700">
            {partnerData.photos.length > 0
              ? "Fotosurat yuklandi"
              : "Fotosurat yuklash uchun bosing"}
          </span>
        </label>

        <div className="flex flex-col ">
          <span className="text-sm">
            Fotosuratni oldindan ko‘rish:</span>
          {partnerData.photos.length > 0 ? (
            partnerData.photos.map((photo, index) => (
              <div key={index} className="relative inline-block">
                <img
                  src={photo}
                  alt="Preview"
                  className="w-24 h-24 border border-highlight p-1 mt-1"
                />
                <FaTimes
                  onClick={() => confirmDeletePhoto(photo)}
                  className="absolute top-0 right-0 text-red-500 cursor-pointer"
                />
              </div>
            ))
          ) : (
            <p className="text-sm mt-2 text-red-500">Fotosurat yuklanmagan!</p>
          )}
        </div>

        <div className="space-y-1">
          <button
            type="submit"
            className="bg-slate-800 w-full text-lg py-2 rounded-md text-white  hover:bg-slate-600 transition duration-200"
          >
            Yaratish
          </button>
          <button
            className="bg-red-500  w-full text-lg py-2 rounded-md text-white  hover:bg-red-600 transition duration-200"
          >
            <Link to={"/partners"}>
              Ortga qaytish
            </Link>
          </button>
        </div>
      </form>

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <h2 className="text-md font-semibold">Oʻchirishni tasdiqlang
            </h2>
            <p className="text-sm">
              Haqiqatan ham bu fotosuratni oʻchirib tashlamoqchimisiz?
            </p>
            <div className="flex justify-end mt-3">
              <button
                onClick={cancelDelete}
                className="mr-2 text-gray-500 text-sm"
              >
                Bekor qilish
              </button>
              <button
                onClick={deletePhoto}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};
