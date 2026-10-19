import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAdminCustomerDetail } from "../../services/adminService";

export default function CustomerDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getAdminCustomerDetail(id);
                setCustomer(data);
            } catch (error) {
                console.error("Lỗi tải chi tiết KH:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    if (loading) return <div>Đang tải hồ sơ khách hàng...</div>;
    if (!customer) return <div>Không tìm thấy khách hàng.</div>;

    return (
        <div className="admin-page p-4">
            <button onClick={() => navigate(-1)} className="mb-4 text-blue-500 underline">← Quay lại danh sách</button>
            <h1 className="text-2xl font-bold mb-4">Hồ sơ khách hàng: {customer.hoTen}</h1>

            <div className="border p-4 rounded bg-gray-50 mb-6 w-1/2">
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>SĐT:</strong> {customer.soDienThoai}</p>
                <p><strong>Giới tính:</strong> {customer.gioiTinh}</p>
                <p><strong>Ngày sinh:</strong> {customer.ngaySinh ? new Date(customer.ngaySinh).toLocaleDateString("vi-VN") : 'Chưa cập nhật'}</p>
                <p><strong>Ngày tham gia:</strong> {customer.ngayTao ? new Date(customer.ngayTao).toLocaleDateString("vi-VN") : 'N/A'}</p>
            </div>

            <h2 className="text-xl font-bold mb-2">Lịch sử mua hàng ({customer.lichSuDonHang.length} đơn)</h2>
            {customer.lichSuDonHang.length === 0 ? (
                <p className="text-gray-500 italic">Khách hàng này chưa mua đơn nào.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">Mã Đơn</th>
                            <th className="border p-2">Ngày Đặt</th>
                            <th className="border p-2">Tổng Tiền</th>
                            <th className="border p-2">Trạng Thái</th>
                            <th className="border p-2">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customer.lichSuDonHang.map(order => (
                            <tr key={order.donHangID} className="text-center">
                                <td className="border p-2 font-bold">{order.maDonHang}</td>
                                <td className="border p-2">{new Date(order.ngayDat).toLocaleDateString("vi-VN")}</td>
                                <td className="border p-2">{order.tongTien.toLocaleString("vi-VN")}đ</td>
                                <td className="border p-2 text-red-500">{order.trangThaiDonHang}</td>
                                <td className="border p-2">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                                        onClick={() => navigate(`/admin/don-hang/${order.donHangID}`)}
                                    >
                                        Xem Đơn
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}