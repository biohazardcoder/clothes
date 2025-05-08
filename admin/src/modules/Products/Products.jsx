import { useEffect, useState } from "react";
import Axios from "../../Axios";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiLoaderAlt } from "react-icons/bi";
import useSWR from "swr";

const fetcher = url => Axios.get(url).then(res => res.data.data);
export const Products = () => {
  const { data: products = [], error, isLoading, mutate } = useSWR("product", fetcher);

  const data = products;
  const isPending = isLoading;
  const isError = error;
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [formData, setFormData] = useState({
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
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalStock, setTotalStock] = useState(0);

useEffect(() => {
  if (products.length > 0) {
    const total = products.reduce((acc, product) => acc + product.total, 0);
    const stock = products.reduce((acc, product) => acc + product.stock, 0);
    setTotalPrice(total);
    setTotalStock(stock);
  }
}, [products]);
  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteConfirmOpen(true);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      title: product.title || "",
      price: product.price || "",
      category: product.category || "",
      stock: product.stock || "",
      sale: product.sale || "",
      color: product.color || "",
      size: product.size || "",
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      toast.error("Iltimos, mahsulotni tanlang!");
      return;
    }

    if (!formData.title && !formData.price && !formData.category && !formData.stock) {
      toast.error("Iltimos, biror maydonni tahrir qiling!");
      return;
    }

    try {
      const updatedData = {};

      if (formData.title) updatedData.title = formData.title;
      if (formData.price) updatedData.price = formData.price;
      if (formData.category) updatedData.category = formData.category;
      if (formData.stock) updatedData.stock = formData.stock;
      if (formData.sale) updatedData.sale = formData.sale;
      if (formData.size) updatedData.size = formData.size;
      if (formData.color) updatedData.color = formData.color;

      try {
        const response = await Axios.put(`product/${selectedProduct._id}`, updatedData);
        console.log(response.data);

        await mutate();

        toast.success("Mahsulot muvaffaqiyatli yangilandi!");
        setIsModalOpen(false)
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        toast.error("Mahsulotni yangilashda xato");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Mahsulotni yangilashda xato");
    }
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;
    try {
      await Axios.delete(`product/${selectedProduct._id}`);
      toast.success("Mahsulot muvaffaqiyatli o'chirildi");
      await mutate(); 
      setIsDeleteConfirmOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Mahsulotni o'chirishda xato"
      );
    }
  };

  return (
    <div className="p-8 bg-wishlistBg w-full h-screen overflow-y-auto">
      <ToastContainer />
      <div className="w-full h-[50px] flex py-4 md:flex-row justify-between items-center mb-4">
        <h1 className="text-xl text-mainText">
          Mahsulotlar: <br />
          <div className="flex flex-col">
            <span className="text-sm">
              Umumiy mahsulotlar soni:{" "}
              <strong className="text-lg font-semibold">
                {new Intl.NumberFormat("us").format(totalStock)}
              </strong> ta
            </span>
            <span className="text-sm">
              Umumiy mahsulotlar narxi:{" "}
              <strong className="text-lg font-semibold">
                {new Intl.NumberFormat("us").format(totalPrice)}
              </strong>{" "}so'm

            </span>
          </div>
        </h1>
        <Link
          to={"/create-product"}
          className="bg-sidebarBg text-white px-3 py-2 text-sm rounded shadow hover:bg-highlight duration-400 transition-colors"
        >
          Mahsulot yaratish
        </Link>
      </div>
      {isPending ? (
        <div className="items-center w-full h-1/2 justify-center flex">
                <BiLoaderAlt className="animate-spin text-2xl text-white"/>
               </div>
      ) : isError ? (
        <p className="text-red-500 text-center text-xl">Xato: {isError}</p>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 py-4 lg:grid-cols-3 gap-4">
          {data.map((product) => {
            const safePhotos = product.photos && Array.isArray(product.photos) ? product.photos : [];
            const imageSrc = safePhotos.length > 0 ? safePhotos[0] : "default-image.jpg";
            return (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg p-2 hover:shadow-xl transition-shadow"
              >
                <img
                  src={imageSrc || "https://www.landuse-ca.org/wp-content/uploads/2019/04/no-photo-available.png"}
                  alt={product.title}
                  className="w-full h-[350px] object-cover object-top rounded mb-2"
                />

                <h2 className="text-lg font-bold">{product.title}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-600"><span className="font-semibold text-black">Narxi: </span>
                  {new Intl.NumberFormat('us').format(product.price)}
                  {" "}so'm</p>
                <p className="text-gray-600"><span className="font-semibold text-black">Omborda mavjud:</span> {product.stock} ta</p>
                <p className="text-gray-600"><span className="font-semibold text-black">Umumiy narx: </span>
                  {new Intl.NumberFormat('us').format(product.total)}
                  {" "}so'm</p>
                <p className="text-gray-600"><span className="font-semibold text-black">Kategoriya:</span> {product.category}</p>
                <div className="flex justify-end mt-2 gap-2">
                  <button onClick={() => handleProductClick(product)} 
                   className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700"
                  title="Tahrirlash">
                    <Pencil className="text-white w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="bg-red-600 text-white rounded-md p-2 hover:bg-red-700"
                    title="O'chirish"
                  >
                    <Trash2 className="text-white w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600 text-center text-lg mt-4">
          Mahsulot topilmadi.
        </p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Mahsulotni tahrirlash</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-semibold">Mahsulot nomi:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-semibold">Narx:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="sale" className="block text-sm font-semibold">Avvalgi narxi:</label>
                <input
                  type="number"
                  id="sale"
                  name="sale"
                  value={formData.sale}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="color" className="block text-sm font-semibold">Rangi:</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="size" className="block text-sm font-semibold">O'lchami:</label>
                <input
                  type="text"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-semibold">Kategoriya:</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="stock" className="block text-sm font-semibold">Omborda mavjud:</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Bekor qilish
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">O'chirishni tasdiqlash</h3>
            <p>Mahsulotni o'chirishni xohlaysizmi?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Bekor qilish
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
