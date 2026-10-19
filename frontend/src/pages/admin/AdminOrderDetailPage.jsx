import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAdminOrderDetail } from "../../services/adminService";

export default function AdminOrderDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getAdminOrderDetail(id);
                setOrder(data);
            } catch (error) {
                console.error("Lỗi tải chi tiết đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    if (loading) return <div>Đang tải chi tiết đơn hàng...</div>;
    if (!order) return <div>Không tìm thấy đơn hàng.</div>;

    return (
        <div className="admin-page p-4">
            <button onClick={() => navigate(-1)} className="mb-4 text-blue-500 underline">← Quay lại</button>
            <h1 className="text-2xl font-bold mb-4">Chi tiết đơn hàng: {order.maDonHang}</h1>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border p-4 rounded bg-gray-50">
                    <h3 className="font-bold border-b pb-2 mb-2">Thông tin khách hàng</h3>
                    <p><strong>Họ tên:</strong> {order.hoTenNguoiNhan}</p>
                    <p><strong>SĐT:</strong> {order.soDienThoaiNhan}</p>
                    <p><strong>Email (TK):</strong> {order.emailKhachHang}</p>
                    <p><strong>Địa chỉ nhận:</strong> {order.diaChiNhan}</p>
                </div>
                <div className="border p-4 rounded bg-gray-50">
                    <h3 className="font-bold border-b pb-2 mb-2">Thông tin đơn hàng</h3>
                    <p><strong>Ngày đặt:</strong> {new Date(order.ngayDat).toLocaleString("vi-VN")}</p>
                    <p><strong>Trạng thái hệ thống:</strong> <span className="text-red-500 font-bold">{order.trangThaiDonHang}</span></p>
                    <p><strong>Trạng thái giao hàng:</strong> {order.trangThaiGiaoHang || 'Chưa cập nhật'}</p>
                    <p><strong>ĐVVC:</strong> {order.donViVanChuyen || 'Chưa cập nhật'} - <strong>Mã VĐ:</strong> {order.maVanDon || 'Chưa cập nhật'}</p>
                </div>
            </div>

            <h3 className="font-bold mb-2">Sản phẩm đã đặt</h3>
            <table className="w-full border-collapse border border-gray-300 mb-4">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Tên sản phẩm</th>
                        <th className="border p-2">Phân loại (Size - Màu)</th>
                        <th className="border p-2">Đơn giá</th>
                        <th className="border p-2">Số lượng</th>
                        <th className="border p-2">Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map(item => (
                        <tr key={item.bienTheID} className="text-center">
                            <td className="border p-2 text-left">{item.tenSanPham}</td>
                            <td className="border p-2">{item.kichThuoc} - {item.mauSac}</td>
                            <td className="border p-2">{item.donGia.toLocaleString("vi-VN")}đ</td>
                            <td className="border p-2">{item.soLuong}</td>
                            <td className="border p-2">{item.thanhTien.toLocaleString("vi-VN")}đ</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className="text-xl font-bold text-right">Tổng cộng: {order.tongTien.toLocaleString("vi-VN")}đ</h2>
        </div>
    );
}