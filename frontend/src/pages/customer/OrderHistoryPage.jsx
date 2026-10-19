import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrderHistory } from "../../services/orderService";
import OrderStatus from "../../components/order/OrderStatus";

function OrderHistoryPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrderHistory();
                setOrders(data);
            } catch (err) {
                console.error(err);
                setError("Không thể tải lịch sử mua hàng.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div style={styles.container}>Đang tải...</div>;
    }

    return (
        <div style={styles.container}>
            <h1>Lịch sử mua hàng</h1>

            {error && (
                <div style={styles.error}>
                    {error}
                </div>
            )}

            {!error && orders.length === 0 && (
                <div style={styles.empty}>
                    Bạn chưa có đơn hàng nào.
                </div>
            )}

            {orders.map((order) => (
                <div key={order.donHangID} style={styles.card}>
                    <div style={styles.header}>
                        <strong>{order.maDonHang}</strong>

                        <OrderStatus
                            status={order.trangThaiDonHang}
                        />
                    </div>

                    <div style={styles.info}>
                        <p>
                            Ngày đặt:{" "}
                            {new Date(order.ngayDat).toLocaleString("vi-VN")}
                        </p>

                        <p>
                            Tổng tiền:{" "}
                            <strong>
                                {Number(order.tongTien).toLocaleString("vi-VN")} đ
                            </strong>
                        </p>
                    </div>

                    <button
                        style={styles.button}
                        onClick={() =>
                            navigate(`/don-hang/${order.donHangID}`)
                        }
                    >
                        Xem chi tiết
                    </button>
                </div>
            ))}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "0 20px",
    },

    card: {
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "16px",
        background: "#fff",
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px",
    },

    info: {
        lineHeight: "1.6",
    },

    button: {
        border: "none",
        borderRadius: "8px",
        padding: "10px 16px",
        cursor: "pointer",
        background: "#111",
        color: "#fff",
    },

    empty: {
        padding: "40px",
        textAlign: "center",
        color: "#777",
    },

    error: {
        padding: "15px",
        background: "#ffe5e5",
        color: "#c00",
        borderRadius: "8px",
    },
};

export default OrderHistoryPage;