import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../Axios";
import {
  getPartnerError,
  getPartnerPending,
  getPartnerSuccess,
} from "../../Toolkit/PartnersSlicer";
import { Pencil, Trash2, Plus, ShoppingCart, Edit } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const Partners = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isPending, isError } = useSelector((state) => state.partners);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllPartners = async () => {
      dispatch(getPartnerPending());
      try {
        const response = await Axios.get("partner");
        dispatch(getPartnerSuccess(response.data?.data || []));
      } catch (error) {
        dispatch(
          getPartnerError(error.response?.data?.message || "Unknown error")
        );
      }
    };
    getAllPartners();
  }, [dispatch]);

  const handleDelete = async () => {
    try {
      await Axios.delete(`partner/${partnerToDelete}`);
      dispatch(
        getPartnerSuccess(
          data.filter((partner) => partner._id !== partnerToDelete)
        )
      );
      toast.success("Partner muaffaqiyatli o'chirildi");
      setTimeout(() => {
        window.location.href = "/partners";
      }, 1000);
      setIsModalOpen(false);
      setPartnerToDelete(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete partner");
    }
  };

  const handleCartOpen = (partner) => {
    setSelectedPartner(partner);
    setIsCartModalOpen(true);
    fetchPartnerProducts(partner.products);
  };

  const fetchPartnerProducts = async (productIds) => {
    try {
      const response = await Axios.post("product/get-products-by-ids", {
        ids: productIds.map(item => item.productId),
      });
      setProducts(response.data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const formatNumber = (num) => {
    return new Intl.NumberFormat('uz-UZ').format(num);
  };

  const handleSelectProduct = (partnerId) => {
    navigate(`/select-product/${partnerId}`);
  };

  const ShoppingCartModal = ({ isOpen, onClose, partner }) => {
    const [newQuantity, setNewQuantity] = useState("");

    if (!isOpen) return null;

    const handleEditProduct = async (productId) => {
      toast.promise(
        Axios.put(`partner/${partner._id}/products/${productId}`, {
          newQuantity: parseInt(newQuantity),
        })
          .then(() => {
            setTimeout(() => {
              window.location.href = "/partners";
            }, 1000);
          }),
        {
          pending: "Mahsulotni tahrirlanmoqda...",
          success: "Mahsulotni tahrirlash tugatildi!",
          error: "Mahsulotni tahrirlashda xatolik!",
        }
      );
    };


    const handleDeleteProduct = async (productId) => {
      toast.promise(
        Axios.delete(`partner/${partner._id}/products/${productId}`)
          .then((response) => {
            setTimeout(() => {
              window.location.href = "/partners";
            }, 1000);
          }),
        {
          pending: "Mahsulot o'chirilmoqda...",
          success: "Mahsulot muvaffaqqiyatli o'chirildi!",
          error: "Mahsulotni o'chirishda xatolik!",
        }
      );
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 sm:mx-0">
          <h2 className="text-xl font-semibold">Dokon tarixi</h2>
          <p className="mt-2 text-lg">Dokon Nomi: {partner?.shopName}</p>

          <div className="mt-4">
            <h3 className="font-semibold">Sotib olingan mahsulotlar tarixi:</h3>
            <ul className="mt-2">
              {partner?.products?.map((purchase, index) => {
                const product = products.find((p) => p._id === purchase.productId);
                return (
                  product && (
                    <li
                      key={purchase._id}
                      className={`flex justify-between items-center py-2 border-b ${index % 3 === 2 ? 'mb-4' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        <img src={product.photos[0]} alt={product.title} className="w-10 h-10 rounded-md" />
                        <span>{product.title} ({purchase.purchasedQuantity} ta)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{formatNumber(product.price * purchase.purchasedQuantity)} so'm</span>
                        <div>
                          <input
                            type="number"
                            placeholder={`Tahrirlash: ${purchase.purchasedQuantity}`}
                            onChange={(e) => setNewQuantity(e.target.value)}
                            className="p-2 border w-32 border-gray-300 rounded-md"
                          />
                          <div className="flex gap-2 w-32 items-center justify-center py-1">
                            <button
                              onClick={() => handleEditProduct(purchase.productId)}
                              className="bg-accent/80 shadow-lg shadow-slate-400 hover:bg-accent p-2 rounded-md text-white"
                            >
                              <Edit />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(purchase.productId)}
                              className="bg-red-500/80 shadow-md shadow-slate-400 hover:bg-red-500 p-2 rounded-md text-white"
                            >
                              <Trash2 />
                            </button>
                          </div>

                        </div>

                      </div>
                    </li>
                  )
                );
              })}
            </ul>
          </div>

          <div className="mt-4 font-semibold text-lg flex justify-between">
            <span>Umumiy summa:</span>
            <span>
              {formatNumber(
                partner?.products?.reduce((total, purchase) => {
                  const product = products.find((p) => p._id === purchase.productId);
                  if (product) {
                    return total + product.price * purchase.purchasedQuantity;
                  }
                  return total;
                }, 0)
              )} so'm
            </span>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Yopish
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-green-100 w-full h-screen overflow-y-auto">
      <ToastContainer />
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-xl text-black">Xaridorlar : </h1>
        <Link
          to="/create-partner"
          className="bg-sidebarBg text-white px-2 py-2 text-sm rounded shadow hover:bg-highlight"
        >
          Xaridor qo'shish
        </Link>
      </div>

      {isPending ? (
        <p>Yuklanmoqda...</p>
      ) : isError ? (
        <p className="text-red-500 text-center text-xl">Xatolik: {isError}</p>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((partner) => (
            <div
              key={partner._id}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
            >
              <img src={partner.photos[0]} alt="Partner" className="mb-4" />
              <h2 className="text-lg font-semibold">
                Dokon Nomi: {partner.shopName}
              </h2>
              <p className="text-gray-500">Manzili: {partner.address}</p>
              <p className="text-gray-700">
                Telefon Raqami: {partner.phoneNumber}
              </p>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleSelectProduct(partner._id)}
                  className="text-green-600"
                >
                  <Plus />
                </button>
                <Link
                  to={`/edit-partner/${partner._id}`}
                  className="text-blue-600"
                >
                  <Pencil />
                </Link>
                <button
                  onClick={() => handleCartOpen(partner)}
                  className="text-orange-600"
                >
                  <ShoppingCart />
                </button>
                <button
                  onClick={() => {
                    setPartnerToDelete(partner._id);
                    setIsModalOpen(true);
                  }}
                  className="text-red-600"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center text-lg mt-4">
          Mahsulotlar topilmadi
        </p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded p-4">
            <h2 className="text-lg font-semibold">Tasdiqlash</h2>
            <p className="mt-2">Ushbu hamkorni o'chirishni xohlaysizmi?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}

      <ShoppingCartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        partner={selectedPartner}
      />
    </div>
  );
};
