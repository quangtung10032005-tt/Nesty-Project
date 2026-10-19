//function HomePage() {
//    return (
//        <div>
//            <h1>Nesty Shoes</h1>
//            <p>Website bán giày dép trực tuyến Nesty.</p>
//            <p>Khách hàng có thể xem sản phẩm, tìm kiếm, lọc sản phẩm và đặt hàng.</p>
//        </div>
//    );
//}

//export default HomePage;




import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <div className="max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
                    Bước đi phong cách cùng <span className="text-blue-600">Nesty</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed">
                    Khám phá bộ sưu tập giày dép hiện đại, mang đến sự thoải mái và tự tin cho mọi hành trình của bạn. Trải nghiệm mua sắm trực tuyến chưa bao giờ dễ dàng đến thế.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/products"
                        className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        Xem Sản Phẩm Ngay
                    </Link>

                    <Link
                        to="/theo-doi-don-hang"
                        className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all shadow-sm"
                    >
                        Theo Dõi Đơn Hàng
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;