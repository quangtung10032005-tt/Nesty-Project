//import React, { useState, useEffect } from "react";
//import { useParams, useNavigate } from "react-router-dom";
//import { getBienThes } from "../../api/bienTheApi";
//import { getHinhAnhs } from "../../api/hinhAnhApi";

//// Import 2 component form vừa tạo
//import BienTheForm from "./BienTheForm";
//import HinhAnhForm from "./HinhAnhForm";

//export default function SanPhamDetailPage() {
//    const { id } = useParams();
//    const navigate = useNavigate();
//    const [sanPham, setSanPham] = useState(null);
//    const [bienThes, setBienThes] = useState([]);
//    const [hinhAnhs, setHinhAnhs] = useState([]);

//    const [showBienTheForm, setShowBienTheForm] = useState(false);
//    const [showHinhAnhForm, setShowHinhAnhForm] = useState(false);

//    useEffect(() => {
//        loadData();
//    }, [id]);

//    const loadData = async () => {
//        try {
//            const [resBienThe, resHinhAnh] = await Promise.all([
//                getBienThes(id),
//                getHinhAnhs(id)
//            ]);
//            setBienThes(resBienThe.data);
//            setHinhAnhs(resHinhAnh.data);
//        } catch (error) {
//            console.error(error);
//        }
//    };

//    return (
//        <div>
//            <button onClick={() => navigate("/admin/products")}>← Quay lại</button>

//            <h2>THÔNG TIN SẢN PHẨM</h2>

//            <section>
//                <h3>BIẾN THỂ</h3>
//                <button onClick={() => setShowBienTheForm(true)}>+ Thêm biến thể</button>

//                {showBienTheForm && (
//                    <div style={{ margin: "10px 0", padding: "10px", border: "1px dashed gray" }}>
//                        <BienTheForm
//                            sanPhamId={id}
//                            onSuccess={() => { setShowBienTheForm(false); loadData(); }}
//                            onCancel={() => setShowBienTheForm(false)}
//                        />
//                    </div>
//                )}

//                {/* Đã thêm style để bảng giãn đều 100% */}
//                <table border="1" style={{ width: "100%", marginTop: "15px", textAlign: "left" }}>
//                    <thead>
//                        <tr>
//                            <th>ID</th>
//                            <th>Size</th>
//                            <th>Màu</th>
//                            <th>SKU</th>
//                            <th>Giá</th>
//                        </tr>
//                    </thead>
//                    <tbody>
//                        {bienThes.map(bt => (
//                            <tr key={bt.bienTheID}>
//                                <td>{bt.bienTheID}</td>
//                                <td>{bt.tenKichThuoc}</td>
//                                <td>{bt.tenMau}</td>
//                                <td>{bt.sku}</td>
//                                <td>{bt.giaBan}</td>
//                            </tr>
//                        ))}
//                    </tbody>
//                </table>
//            </section>

//            <section>
//                <h3>HÌNH ẢNH</h3>
//                <button onClick={() => setShowHinhAnhForm(true)}>+ Thêm hình ảnh</button>

//                {showHinhAnhForm && (
//                    <div style={{ margin: "10px 0", padding: "10px", border: "1px dashed gray" }}>
//                        <HinhAnhForm
//                            sanPhamId={id}
//                            onSuccess={() => { setShowHinhAnhForm(false); loadData(); }}
//                            onCancel={() => setShowHinhAnhForm(false)}
//                        />
//                    </div>
//                )}

//                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
//                    {hinhAnhs.map(img => (
//                        <div key={img.hinhAnhID} style={{ border: "1px solid #ccc", padding: "5px" }}>
//                            <img src={img.duongDanAnh} alt="img" width="100" />
//                            <div>{img.laAnhChinh ? "Ảnh chính: ●" : "Ảnh chính: ○"}</div>
//                        </div>
//                    ))}
//                </div>
//            </section>
//        </div>
//    );
//}


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBienThes } from "../../api/bienTheApi";
import { getHinhAnhs } from "../../api/hinhAnhApi";
import BienTheForm from "./BienTheForm";
import HinhAnhForm from "./HinhAnhForm";

export default function SanPhamDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bienThes, setBienThes] = useState([]);
    const [hinhAnhs, setHinhAnhs] = useState([]);

    const [showBienTheForm, setShowBienTheForm] = useState(false);

    // State quản lý Form Hình Ảnh
    const [showHinhAnhForm, setShowHinhAnhForm] = useState(false);
    const [editingHinhAnh, setEditingHinhAnh] = useState(null); // Lưu trữ ảnh đang được click

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            const [resBienThe, resHinhAnh] = await Promise.all([
                getBienThes(id),
                getHinhAnhs(id)
            ]);
            setBienThes(resBienThe.data);
            setHinhAnhs(resHinhAnh.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Hàm mở form thêm ảnh mới
    const handleAddHinhAnh = () => {
        setEditingHinhAnh(null);
        setShowHinhAnhForm(true);
    };

    // Hàm mở form khi click vào ảnh có sẵn để sửa/xóa
    const handleEditHinhAnh = (img) => {
        setEditingHinhAnh(img);
        setShowHinhAnhForm(true);
    };

    return (
        <div style={styles.container}>
            {/* Nút Quay lại */}
            <div>
                <button onClick={() => navigate("/admin/products")} style={styles.btnBack}>
                    <i className="fa-solid fa-arrow-left" style={{marginRight: "8px"}}></i>
                    Quay lại danh sách
                </button>
            </div>

            {/* Tiêu đề trang (Đã bỏ dấu #) */}
            <div style={styles.pageHeader}>
                <div>
                    <h2 style={styles.title}>Chi tiết sản phẩm {id}</h2>
                    {/* <p style={styles.subtitle}>Quản lý các biến thể kích thước, màu sắc và hình ảnh của sản phẩm</p> */}
                </div>
            </div>

            {/* Phần 1: Quản lý Biến thể */}
            <div style={styles.card}>
                <div style={styles.sectionHeader}>
                    <h3 style={styles.sectionTitle}>Biến thể sản phẩm</h3>
                    <button onClick={() => setShowBienTheForm(true)} style={styles.btnAdd}>
                        + Thêm biến thể
                    </button>
                </div>

                {showBienTheForm && (
                    <div style={styles.formContainer}>
                        <BienTheForm
                            sanPhamId={id}
                            onSuccess={() => { setShowBienTheForm(false); loadData(); }}
                            onCancel={() => setShowBienTheForm(false)}
                        />
                    </div>
                )}

                <div style={{ overflowX: "auto", marginTop: "1rem" }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ ...styles.th, width: "70px" }}>ID</th>
                                <th style={styles.th}>Kích thước</th>
                                <th style={styles.th}>Màu sắc</th>
                                <th style={styles.th}>Mã SKU</th>
                                <th style={styles.th}>Giá bán</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bienThes.length > 0 ? (
                                bienThes.map(bt => (
                                    <tr key={bt.bienTheID} style={styles.tr}>
                                        <td style={{ ...styles.td, fontWeight: "600", color: "#4c5663" }}>{bt.bienTheID}</td>
                                        <td style={{ ...styles.td, fontWeight: "600", color: "#0f172a" }}>{bt.tenKichThuoc}</td>
                                        <td style={styles.td}>
                                            <span style={styles.badgeMau}>{bt.tenMau}</span>
                                        </td>
                                        <td style={{ ...styles.td, fontFamily: "monospace", color: "#03182c", fontWeight: "600" }}>{bt.sku}</td>
                                        <td style={{ ...styles.td, fontWeight: "600", color: "#16a34a" }}>
                                            {Number(bt.giaBan).toLocaleString("vi-VN")} đ
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ ...styles.td, textAlign: "center", color: "#94a3b8" }}>
                                        Chưa có biến thể nào được tạo.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Phần 2: Quản lý Hình ảnh */}
            <div style={styles.card}>
                <div style={styles.sectionHeader}>
                    <div>
                        <h3 style={styles.sectionTitle}>Thư viện hình ảnh</h3>
                        {/* <p style={styles.imageTip}>Click vào hình ảnh bất kỳ để chỉnh sửa URL hoặc xóa</p> */}
                    </div>
                    <button onClick={handleAddHinhAnh} style={styles.btnAdd}>
                        + Thêm hình ảnh
                    </button>
                </div>

                {/* Khung Form Hình Ảnh */}
                {showHinhAnhForm && (
                    <div style={styles.formContainer}>
                        <HinhAnhForm
                            sanPhamId={id}
                            initialData={editingHinhAnh}
                            onSuccess={() => { setShowHinhAnhForm(false); loadData(); }}
                            onCancel={() => setShowHinhAnhForm(false)}
                        />
                    </div>
                )}

                {/* Danh sách ảnh dạng lưới thẻ */}
                <div style={styles.imageGrid}>
                    {hinhAnhs.length > 0 ? (
                        hinhAnhs.map(img => (
                            <div
                                key={img.hinhAnhID}
                                onClick={() => handleEditHinhAnh(img)}
                                style={{
                                    ...styles.imageCard,
                                    borderColor: img.laAnhChinh ? "#16a34a" : "#cbd5e1",
                                    boxShadow: img.laAnhChinh ? "0 0 0 2px rgba(22, 163, 74, 0.2)" : "none"
                                }}
                                title="Click để sửa hoặc xóa"
                            >
                                <img src={img.duongDanAnh} alt="Product" style={styles.thumbnail} />
                                <div style={styles.imageInfo}>
                                    {img.laAnhChinh ? (
                                        <span style={styles.mainBadge}>Ảnh chính ●</span>
                                    ) : (
                                        <span style={styles.subBadge}>Ảnh phụ ○</span>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Chưa có hình ảnh nào cho sản phẩm này.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

// Bảng màu & hệ thống CSS đồng bộ giao diện Admin Nesty
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
    },
    btnBack: {
        padding: "0.5rem 1rem",
        backgroundColor: "#f1f5f9",
        color: "#334155",
        border: "1px solid #cbd5e1",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "0.85rem",
        cursor: "pointer",
        transition: "all 0.2s",
    },
    pageHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: "1.5rem",
        fontWeight: "700",
        color: "#0f172a",
        margin: 0,
    },
    subtitle: {
        fontSize: "0.875rem",
        color: "#64748b",
        margin: "4px 0 0 0",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)",
        border: "1px solid #e2e8f0",
    },
    sectionHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
        flexWrap: "wrap",
        gap: "1rem",
    },
    sectionTitle: {
        fontSize: "1.15rem",
        fontWeight: "700",
        color: "#0f172a",
        margin: 0,
    },
    imageTip: {
        fontSize: "0.8rem",
        color: "#64748b",
        margin: "2px 0 0 0",
    },
    btnAdd: {
        padding: "0.55rem 1.1rem",
        backgroundColor: "#16a34a",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "0.85rem",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(22, 163, 74, 0.2)",
    },
    formContainer: {
        margin: "1rem 0",
        padding: "1.25rem",
        backgroundColor: "#f8fafc",
        border: "1px dashed #cbd5e1",
        borderRadius: "10px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "left",
    },
    th: {
        padding: "0.85rem 1rem",
        backgroundColor: "#f8fafc",
        color: "#475569",
        fontSize: "0.8rem",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        borderBottom: "1px solid #e2e8f0",
    },
    tr: {
        borderBottom: "1px solid #f1f5f9",
    },
    td: {
        padding: "1rem",
        fontSize: "0.9rem",
        verticalAlign: "middle",
    },
    badgeMau: {
        backgroundColor: "#f1f5f9",
        color: "#0f172a",
        padding: "0.25rem 0.6rem",
        borderRadius: "6px",
        fontSize: "0.8rem",
        fontWeight: "700",
        border: "1px solid #cbd5e1",
        display: "inline-block",
    },
    imageGrid: {
        display: "flex",
        gap: "15px",
        marginTop: "1rem",
        flexWrap: "wrap",
    },
    imageCard: {
        backgroundColor: "#ffffff",
        border: "1px solid #cbd5e1",
        borderRadius: "10px",
        padding: "8px",
        cursor: "pointer",
        textAlign: "center",
        width: "120px",
        transition: "all 0.2s ease",
    },
    thumbnail: {
        width: "100px",
        height: "100px",
        objectFit: "cover",
        borderRadius: "8px",
    },
    imageInfo: {
        marginTop: "8px",
    },
    mainBadge: {
        fontSize: "0.75rem",
        fontWeight: "600",
        color: "#15803d",
        backgroundColor: "#dcfce7",
        padding: "2px 6px",
        borderRadius: "12px",
        display: "inline-block",
    },
    subBadge: {
        fontSize: "0.75rem",
        fontWeight: "600",
        color: "#64748b",
        backgroundColor: "#f1f5f9",
        padding: "2px 6px",
        borderRadius: "12px",
        display: "inline-block",
    },
    btnBack: {
        padding: "0.55rem 1rem",
        backgroundColor: "#ffffff",
        color: "#475569",
        border: "1px solid #cbd5e1",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "0.85rem",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
        transition: "all 0.2s ease",
    },
};