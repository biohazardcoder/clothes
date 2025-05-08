import React, { useState } from "react";
import { Section } from "../../Components/Section/Section";
import Axios from "../../Axios";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import useSWR from "swr";

const fetcher = url => Axios.get(url).then(res => res.data.data);
export const AddProduct = () => {
  const { mutate } = useSWR("product", fetcher);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    category: "",
    company: "",
    stock: "",
    size: "",
    sale: "",
    color: "",
    photos: [],
  });

  const [imagePreview, setImagePreview] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = async (e) => {
    setImageUploading(true);
    try {
      const formImageData = new FormData();
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        formImageData.append("photos", files[i]);
      }
      const { data } = await Axios.post("upload", formImageData);
      setProductData((prevData) => ({
        ...prevData,
        photos: [...prevData.photos, ...data.photos],
      }));
      setImagePreview(data.photos[0]);
    } catch (err) {
      toast.error("Rasm yuklashda xatolik yuz berdi.");
      console.log(err);
    } finally {
      setImageUploading(false);
    }
  };
  
  const handleRemoveImage = () => {
    setImagePreview("");
    setProductData((prevData) => ({ ...prevData, photos: [] }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Axios.post("/product/create", {
        title: productData.title,
        price: productData.price,
        sale: productData.sale,
        category: productData.category,
        company: productData.company,
        stock: productData.stock,
        color: productData.color,
        size: productData.size,
        photos: productData.photos,
      });
      toast.success("Yangi mahsulot qo'shildi!");
      await mutate();
      navigate("/products");
    } catch (error) {
      toast.error("Mahsulotni qo'shishda xato!");
      console.log(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Section className="bg-wishlistBg flex  h-screen p-4 pb-10">
      <ToastContainer />
      <form
        onSubmit={handleFormSubmit}
        className="md:w-3/4 w-full m-auto  bg-white p-4 rounded-lg shadow-md flex flex-col gap-4"
      >
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-4">
          Yangi mahsulot qo'shish
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="title"
              className={`border border-gray-300 rounded-md p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent transition ease-in-out duration-200`}
              value={productData.title}
              onChange={handleInputChange}
              placeholder="Sarlavha"
              required
            />
            <input
              type="number"
              name="price"
              className={`border border-gray-300 rounded-md p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent transition ease-in-out duration-200`}
              value={productData.price}
              onChange={handleInputChange}
              placeholder="Narxi"
              required
            />
            <input
              type="number"
              name="sale"
              className={`border border-gray-300 rounded-md p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent transition ease-in-out duration-200`}
              value={productData.sale}
              onChange={handleInputChange}
              placeholder="Avvalgi narxi"
              required
            />
            <input
              type="text"
              name="category"
              className={`border border-gray-300 rounded-md p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent transition ease-in-out duration-200`}
              value={productData.category}
              onChange={handleInputChange}
              placeholder="Kategoriya"
              required
            />
          </div>
          <div>
          <input
              type="text"
              name="color"
              className={`border border-gray-300 rounded-md p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent transition ease-in-out duration-200`}
              value={productData.color}
              onChange={handleInputChange}
              placeholder="Rang"
            />
            <input
              type="text"
              name="stock"
              className={`border border-gray-300 rounded-md p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent transition ease-in-out duration-200`}
              value={productData.stock}
              onChange={handleInputChange}
              placeholder="Zaxira"
              required
            />
            <input
              type="text"
              name="size"
              className={`border border-gray-300 rounded-md p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent transition ease-in-out duration-200`}
              value={productData.size}
              onChange={handleInputChange}
              placeholder="O'lcham"
            />
            <input
              type="text"
              name="company"
              className={`border border-gray-300 rounded-md p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent transition ease-in-out duration-200`}
              value={productData.company}
              onChange={handleInputChange}
              placeholder="Kompaniya"
            />
          </div>
        </div>

        <div className="mt-2">
          <label className="block text-sm font-medium text-mainText mb-1">
            Rasmni yuklash oldindan ko'rsatish:
          </label>
          <label className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md p-2 cursor-pointer hover:bg-gray-100 transition duration-200">
            <FaCloudUploadAlt className="text-4xl text-gray-500 mb-2" />
            <input
              type="file"
              name="photos"
              className="hidden"
              onChange={handleFileChange}
              required
            />
            <span className="text-gray-700">
              Yuklash uchun bosing yoki torting va tashlang
            </span>
          </label>
          {imagePreview && (
            <div className="relative mt-2">
              <img
                src={imagePreview}
                alt="Tanlangan"
                className="w-full h-32 object-cover rounded mt-2"
              />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                onClick={handleRemoveImage}
                title="Rasmni olib tashlash"
              >
                X
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || imageUploading}
          className={`w-full text-xl py-2 rounded-md text-white mt-4 transition duration-200 ${
            loading || imageUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-slate-800 hover:bg-slate-600"
          }`}
        >
          {loading ? "Yuborilmoqda..." : imageUploading ? "Rasm yuklanmoqda..." : "Yuborish"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/products")}
          className="bg-red-500 w-full text-xl py-2 rounded-md text-white hover:bg-red-400 transition duration-200"
        >
          Orqaga qaytish
        </button>
      </form>
    </Section>
  );
};
