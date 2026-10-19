import { useEffect, useState } from "react";
import { getAdminCustomers } from "../../services/adminService";
import { useNavigate } from "react-router-dom";

export default function CustomerManagementPage() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getAdminCustomers();
                setCustomers(data);
            } catch (error) {
                console.error("Lỗi tải danh sách KH:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <div>Đang tải danh sách khách hàng...</div>;

    return (
        <div className="admin-page p-4">
            <h1 className="text-2xl font-bold mb-4">Quản lý khách hàng</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Họ Tên</th>
                        <th className="border p-2">SĐT</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Ngày Tham Gia</th>
                        <th className="border p-2">Số Đơn Hàng</th>
                        <th className="border p-2">Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(c => (
                        <tr key={c.khachHangID} className="text-center">
                            <td className="border p-2">{c.khachHangID}</td>
                            <td className="border p-2">{c.hoTen}</td>
                            <td className="border p-2">{c.soDienThoai}</td>
                            <td className="border p-2">{c.email}</td>
                            <td className="border p-2">{c.ngayTao ? new Date(c.ngayTao).toLocaleDateString("vi-VN") : 'N/A'}</td>
                            <td className="border p-2 font-bold">{c.soLuongDonHang}</td>
                            <td className="border p-2">
                                <button
                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                    onClick={() => navigate(`/admin/khach-hang/${c.khachHangID}`)}
                                >
                                    Hồ sơ
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}