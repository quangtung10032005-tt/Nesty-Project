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
        <div>
            <button onClick={() => navigate("/admin/products")} style={{ padding: "5px", marginBottom: "15px" }}>← Quay lại</button>

            <h2>THÔNG TIN SẢN PHẨM</h2>

            <section>
                <h3>BIẾN THỂ</h3>
                <button onClick={() => setShowBienTheForm(true)}>+ Thêm biến thể</button>

                {showBienTheForm && (
                    <div style={{ margin: "10px 0", padding: "10px", border: "1px dashed gray" }}>
                        <BienTheForm
                            sanPhamId={id}
                            onSuccess={() => { setShowBienTheForm(false); loadData(); }}
                            onCancel={() => setShowBienTheForm(false)}
                        />
                    </div>
                )}

                <table border="1" style={{ width: "100%", marginTop: "15px", textAlign: "left", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Size</th>
                            <th>Màu</th>
                            <th>SKU</th>
                            <th>Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bienThes.map(bt => (
                            <tr key={bt.bienTheID}>
                                <td>{bt.bienTheID}</td>
                                <td>{bt.tenKichThuoc}</td>
                                <td>{bt.tenMau}</td>
                                <td>{bt.sku}</td>
                                <td>{bt.giaBan}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section style={{ marginTop: "30px" }}>
                <h3>HÌNH ẢNH</h3>
                <button onClick={handleAddHinhAnh}>+ Thêm hình ảnh</button>

                {/* Khung Form Hình Ảnh (dùng chung cho Thêm mới và Sửa) */}
                {showHinhAnhForm && (
                    <div style={{ margin: "10px 0", padding: "15px", border: "1px dashed gray" }}>
                        <HinhAnhForm
                            sanPhamId={id}
                            initialData={editingHinhAnh} // Truyền dữ liệu ảnh đang chọn vào form
                            onSuccess={() => { setShowHinhAnhForm(false); loadData(); }}
                            onCancel={() => setShowHinhAnhForm(false)}
                        />
                    </div>
                )}

                {/* Danh sách ảnh */}
                <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
                    {hinhAnhs.map(img => (
                        <div
                            key={img.hinhAnhID}
                            onClick={() => handleEditHinhAnh(img)} // Click vào ảnh để sửa
                            style={{
                                border: img.laAnhChinh ? "2px solid green" : "1px solid #ccc",
                                padding: "5px",
                                cursor: "pointer",
                                textAlign: "center"
                            }}
                            title="Click để sửa hoặc xóa"
                        >
                            <img src={img.duongDanAnh} alt="img" width="100" height="100" style={{ objectFit: "cover" }} />
                            <div style={{ marginTop: "5px", fontSize: "12px", color: "white" }}>
                                {img.laAnhChinh ? "Ảnh chính: ●" : "Ảnh chính: ○"}
                            </div>
                        </div>
                    ))}
                </div>
                <p style={{ fontSize: "12px", color: "gray", marginTop: "10px" }}>* Click vào hình ảnh bất kỳ để sửa URL hoặc xóa</p>
            </section>
        </div>
    );
}