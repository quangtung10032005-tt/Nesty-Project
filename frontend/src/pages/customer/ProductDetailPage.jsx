import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../api/sanPhamApi";
import { addToCart } from "../../api/gioHangApi";

function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await getProductDetail(id);
                setProduct(data);
                const mainImage = data.hinhAnhs?.find(x => x.laAnhChinh);
                if (mainImage) setSelectedImage(mainImage.duongDanAnh);
                else if (data.hinhAnhs?.length > 0) setSelectedImage(data.hinhAnhs[0].duongDanAnh);
            } catch (error) {
                console.error(error);
                setError("Không thể tải thông tin sản phẩm.");
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    if (loading) return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">Đang tải sản phẩm...</div>;
    if (error) return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-red-500">{error}</div>;
    if (!product) return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">Không tìm thấy sản phẩm.</div>;

    const sizes = [...new Map(product.bienThes.map(item => [item.kichThuocID, { id: item.kichThuocID, name: item.tenKichThuoc }])).values()];
    const colors = [...new Map(product.bienThes.map(item => [item.mauSacID, { id: item.mauSacID, name: item.tenMau, code: item.maMau }])).values()];

    const prices = product.bienThes.map(x => x.giaBan);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

    const updateVariant = (sizeId, colorId) => {
        if (!sizeId || !colorId) {
            setSelectedVariant(null);
            return;
        }
        const variant = product.bienThes.find(item => item.kichThuocID === Number(sizeId) && item.mauSacID === Number(colorId));
        setSelectedVariant(variant || null);
    };

    const handleSelectSize = (sizeId) => {
        setSelectedSize(sizeId);
        updateVariant(sizeId, selectedColor);
    };

    const handleSelectColor = (colorId) => {
        setSelectedColor(colorId);
        updateVariant(selectedSize, colorId);
    };

    const handleAddToCart = async () => {
        if (!selectedVariant) {
            alert("Vui lòng chọn kích thước và màu sắc.");
            return;
        }
        try {
            setAddingToCart(true);
            await addToCart(selectedVariant.bienTheID, quantity);
            alert("Đã thêm sản phẩm vào giỏ hàng.");
        } catch (error) {
            console.error(error);
            if (error.response?.status === 401) {
                alert("Vui lòng đăng nhập để sử dụng giỏ hàng.");
                return;
            }
            alert("Không thể thêm sản phẩm vào giỏ hàng.");
        } finally {
            setAddingToCart(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

                {/* CỘT TRÁI: ẢNH SẢN PHẨM */}
                <div className="flex flex-col gap-4">
                    <div className="w-full bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-100 aspect-square">
                        {selectedImage ? (
                            <img src={selectedImage} alt={product.tenSanPham} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">Không có ảnh</div>
                        )}
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {product.hinhAnhs?.map(image => (
                            <button
                                key={image.hinhAnhID}
                                onClick={() => setSelectedImage(image.duongDanAnh)}
                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === image.duongDanAnh ? 'border-blue-600 shadow-md' : 'border-transparent hover:border-gray-300'}`}
                            >
                                <img src={image.duongDanAnh} alt={product.tenSanPham} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* CỘT PHẢI: THÔNG TIN SẢN PHẨM */}
                <div className="flex flex-col">
                    <div className="mb-6">
                        <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">{product.tenDanhMuc}</span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">{product.tenSanPham}</h1>
                        <p className="text-gray-500 mb-4">Thương hiệu: <span className="font-medium text-gray-900">{product.thuongHieu}</span></p>

                        <div className="text-3xl font-bold text-gray-900 mb-6">
                            {selectedVariant
                                ? `${selectedVariant.giaBan.toLocaleString("vi-VN")} đ`
                                : `${minPrice.toLocaleString("vi-VN")} ${minPrice !== maxPrice ? `- ${maxPrice.toLocaleString("vi-VN")}` : ''} đ`
                            }
                        </div>

                        <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl">{product.moTa}</p>
                    </div>

                    <div className="border-t border-gray-200 py-6 space-y-6">
                        {/* KÍCH THƯỚC */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Kích thước</h3>
                            <div className="flex flex-wrap gap-3">
                                {sizes.map(size => (
                                    <button
                                        key={size.id}
                                        onClick={() => handleSelectSize(String(size.id))}
                                        className={`min-w-[3rem] px-4 py-2 rounded-lg font-medium border transition-all ${selectedSize === String(size.id) ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-900 border-gray-300 hover:border-blue-400'}`}
                                    >
                                        {size.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* MÀU SẮC */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Màu sắc</h3>
                            <div className="flex flex-wrap gap-3">
                                {colors.map(color => (
                                    <button
                                        key={color.id}
                                        onClick={() => handleSelectColor(String(color.id))}
                                        className={`px-5 py-2 rounded-lg font-medium border transition-all ${selectedColor === String(color.id) ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-900 border-gray-300 hover:border-blue-400'}`}
                                    >
                                        {color.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* THÔNG BÁO BIẾN THỂ */}
                        {selectedSize && selectedColor && !selectedVariant && (
                            <p className="text-red-500 font-medium bg-red-50 p-3 rounded-lg">Mẫu sản phẩm này hiện không có sẵn hoặc đã hết hàng.</p>
                        )}
                        {selectedVariant && (
                            <p className="text-green-600 font-medium text-sm">Kho hàng: Sẵn sàng giao (SKU: {selectedVariant.sku})</p>
                        )}
                    </div>

                    {/* HÀNH ĐỘNG GIỎ HÀNG */}
                    <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row gap-4 mt-auto">
                        <div className="flex items-center justify-between border border-gray-300 rounded-xl bg-white w-full sm:w-32 h-14">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full flex items-center justify-center text-gray-600 hover:text-blue-600 text-xl font-bold rounded-l-xl transition-colors">-</button>
                            <span className="font-semibold text-gray-900">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-full flex items-center justify-center text-gray-600 hover:text-blue-600 text-xl font-bold rounded-r-xl transition-colors">+</button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={!selectedVariant || addingToCart}
                            className={`flex-1 h-14 rounded-xl font-bold text-lg transition-all shadow-md ${(!selectedVariant || addingToCart) ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5'}`}
                        >
                            {addingToCart ? "Đang xử lý..." : "THÊM VÀO GIỎ"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;