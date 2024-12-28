import React, { useEffect, useState } from "react";
import authApi from "../services/axiosInstance";
import { useHistory } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import Header from "@/layout/Header";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPanels, setExpandedPanels] = useState({});
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [ordersResponse, addressesResponse] = await Promise.all([
          authApi.get("/order", {
            headers: {
              Authorization: token,
            },
          }),
          authApi.get("/user/address", {
            headers: {
              Authorization: token,
            },
          }),
        ]);

        setOrders(ordersResponse.data);
        setUserAddresses(addressesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Veriler yüklenirken hata oluştu:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [history]);

  const togglePanel = (orderId) => {
    setExpandedPanels((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const formatPrice = (price) => {
    return typeof price === "number" ? `₺${price.toFixed(2)}` : "₺0.00";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Tarih Yok";
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const OrderDetails = ({ order }) => {
    if (!order || !order.products) return null;
    const address = userAddresses.find((addr) => addr.id === order.address_id);

    return (
      <div className="bg-gray-50 p-4 rounded-lg mt-2 border border-gray-200">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-4">Order Details</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Product Image
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Product Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Unit Price
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3">
                      <img
                        src={product.images?.[0]?.url}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.description}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {product.count}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {formatPrice(product.count * product.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-3 text-sm font-semibold text-right"
                  >
                    Total Price:
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                    {formatPrice(order.price)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="mt-4 border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold mb-2">Card Information:</h4>
              <p className="text-gray-700">
                {order.card_name} - **** **** ****{" "}
                {String(order.card_no).slice(-4)}
              </p>
              <p className="text-gray-600 text-sm">
                Son Kullanma: {order.card_expire_month}/{order.card_expire_year}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold">Customer Information:</h4>
              <p className="text-gray-600 text-sm">
                {address.name} {address.surname}
              </p>
              <p className="text-gray-600 text-sm">{address.phone}</p>
            </div>
          </div>

          {address && (
            <div className="flex flex-col gap-2 justify-center">
              <h4 className="font-semibold mb-2">Delivery Address:</h4>
              <p className="text-gray-700 ">{address.title}</p>
              <p className="text-gray-600 text-sm ">{address.neighborhood}</p>
              <p className="text-gray-600 text-sm ">{address.address}</p>
              <p className="text-gray-600 text-sm ">
                {address.city} / {address.district}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Order History</h1>
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-gray-600 text-sm">Order ID</span>
                    <p className="font-medium">#{order.id}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Order Date</span>
                    <p className="font-medium">
                      {formatDate(order.order_date)}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Total Price</span>
                    <p className="font-medium">{formatPrice(order.price)}</p>
                  </div>
                  <div className="flex items-end justify-end md:justify-start">
                    <button
                      onClick={() => togglePanel(order.id)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {expandedPanels[order.id] ? (
                        <>
                          <span>Hide</span>
                          <ChevronUp size={20} />
                        </>
                      ) : (
                        <>
                          <span>Show Details</span>
                          <ChevronDown size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {expandedPanels[order.id] && <OrderDetails order={order} />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
