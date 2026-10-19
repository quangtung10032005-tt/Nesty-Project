import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full group relative">
            <Link to={`/products/${product.sanPhamID}`} className="flex flex-col h-full">

                {/* Badge Thương hiệu (Nếu có) */}
                {product.thuongHieu && (
                    <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                        {product.thuongHieu}
                    </div>
                )}

                {/* Phần Hình ảnh */}
                <div className="aspect-w-1 aspect-h-1 w-full bg-gray-50 overflow-hidden relative border-b border-gray-100">
                    {product.anhChinh ? (
                        <img
                            src={product.anhChinh}
                            alt={product.tenSanPham}
                            className="w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-64 flex items-center justify-center text-gray-400 bg-gray-100">
                            Không có ảnh
                        </div>
                    )}
                </div>

                {/* Phần Thông tin */}
                <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-gray-900 font-bold text-lg line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                        {product.tenSanPham}
                    </h3>

                    {/* Thêm mô tả ngắn gọn */}
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                        {product.moTa || "Giày thể thao thiết kế hiện đại, mang lại cảm giác thoải mái suốt ngày dài."}
                    </p>

                    <div className="mt-auto">
                        <p className="text-red-600 font-extrabold text-xl">
                            {product.giaThapNhat?.toLocaleString("vi-VN")}
                            {product.giaCaoNhat > product.giaThapNhat && ` - ${product.giaCaoNhat?.toLocaleString("vi-VN")}`} đ
                        </p>
                    </div>
                </div>

                {/* Nút Mua ngay */}
                <div className="px-5 pb-5 mt-auto">
                    <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Mua ngay
                    </button>
                </div>

            </Link>
        </div>
    );
}

export default ProductCard;