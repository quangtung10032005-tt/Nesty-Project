import { useEffect, useState } from "react";
import { getAdminOrders, updateOrderStatus } from "../../services/adminService";
import { useNavigate } from "react-router-dom";

export default function OrderManagementPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadOrders = async () => {
        try {
            const data = await getAdminOrders();
            setOrders(data);
        } catch (error) {
            console.error("Lỗi tải đơn hàng:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        if (window.confirm(`Xác nhận đổi trạng thái thành ${newStatus}?`)) {
            try {
                await updateOrderStatus(id, newStatus);
                loadOrders(); // Tải lại danh sách sau khi update
            } catch (error) {
                alert("Cập nhật thất bại!");
            }
        }
    };

    if (loading) return <div>Đang tải danh sách đơn hàng...</div>;

    return (
        <div className="admin-page p-4">
            <h1 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Mã Đơn</th>
                        <th className="border p-2">Ngày Đặt</th>
                        <th className="border p-2">Khách Hàng</th>
                        <th className="border p-2">Tổng Tiền</th>
                        <th className="border p-2">Trạng Thái</th>
                        <th className="border p-2">Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.donHangID} className="text-center">
                            <td className="border p-2">{order.maDonHang}</td>
                            <td className="border p-2">{new Date(order.ngayDat).toLocaleDateString("vi-VN")}</td>
                            <td className="border p-2">{order.hoTenNguoiNhan}</td>
                            <td className="border p-2">{order.tongTien.toLocaleString("vi-VN")}đ</td>
                            <td className="border p-2">
                                <select
                                    className="border p-1"
                                    value={order.trangThaiDonHang}
                                    onChange={(e) => handleStatusChange(order.donHangID, e.target.value)}
                                >
                                    <option value="ChoXacNhan">Chờ xác nhận</option>
                                    <option value="DaXacNhan">Đã xác nhận</option>
                                    <option value="DangXuLy">Đang xử lý</option>
                                    <option value="DangGiao">Đang giao</option>
                                    <option value="DaGiao">Đã giao</option>
                                    <option value="DaHuy">Đã hủy</option>
                                </select>
                            </td>
                            <td className="border p-2">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                    onClick={() => navigate(`/admin/don-hang/${order.donHangID}`)}
                                >
                                    Chi tiết
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}