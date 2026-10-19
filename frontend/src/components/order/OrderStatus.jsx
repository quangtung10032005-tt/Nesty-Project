const statusMap = {
    ChoXacNhan: "Chờ xác nhận",
    DaXacNhan: "Đã xác nhận",
    DangXuLy: "Đang xử lý",
    DangGiao: "Đang giao",
    DaGiao: "Đã giao",
    DaHuy: "Đã hủy",
};

function OrderStatus({ status }) {
    return (
        <span>
            {statusMap[status] || status || "Không xác định"}
        </span>
    );
}

export default OrderStatus;