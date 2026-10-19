import { useEffect, useState } from "react";
import { getProducts } from "../../api/sanPhamApi";
import { getDanhMucs } from "../../api/danhMucApi";
import { getKichThuocs } from "../../api/kichThuocApi";
import { getMauSacs } from "../../api/mauSacApi";
import ProductCard from "../../components/product/ProductCard";

function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [danhMucs, setDanhMucs] = useState([]);
    const [kichThuocs, setKichThuocs] = useState([]);
    const [mauSacs, setMauSacs] = useState([]);

    const [filters, setFilters] = useState({
        search: "",
        danhMucID: "",
        minPrice: "",
        maxPrice: "",
        kichThuocID: "",
        mauSacID: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadFilterData = async () => {
            try {
                const [danhMucData, kichThuocData, mauSacData] = await Promise.all([
                    getDanhMucs(),
                    getKichThuocs(),
                    getMauSacs()
                ]);

                setDanhMucs(danhMucData.data || danhMucData || []);
                setKichThuocs(kichThuocData.data || kichThuocData || []);
                setMauSacs(mauSacData.data || mauSacData || []);
            } catch (error) {
                console.error(error);
                setError("Không thể tải dữ liệu bộ lọc.");
            }
        };

        loadFilterData();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await getProducts(filters);
            setProducts(res.data || res || []);
        } catch (error) {
            console.error(error);
            setError("Không thể tải danh sách sản phẩm.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleReset = async () => {
        const emptyFilters = { search: "", danhMucID: "", minPrice: "", maxPrice: "", kichThuocID: "", mauSacID: "" };
        setFilters(emptyFilters);
        try {
            setLoading(true);
            const res = await getProducts(emptyFilters);
            setProducts(res.data || res || []);
        } catch (error) {
            setError("Lỗi tải lại danh sách.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Danh sách sản phẩm</h1>

            {error && <p className="text-red-500 mb-4 bg-red-50 p-3 rounded">{error}</p>}

            {/* BỘ LỌC (FILTERS) */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />

                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={filters.danhMucID} onChange={(e) => setFilters({ ...filters, danhMucID: e.target.value })}>
                        <option value="">Tất cả danh mục</option>
                        {danhMucs.map(item => (<option key={item.danhMucID} value={item.danhMucID}>{item.tenDanhMuc}</option>))}
                    </select>

                    <input type="number" placeholder="Giá từ" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" value={filters.minPrice} onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} />
                    <input type="number" placeholder="Giá đến" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} />

                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={filters.kichThuocID} onChange={(e) => setFilters({ ...filters, kichThuocID: e.target.value })}>
                        <option value="">Kích thước</option>
                        {kichThuocs.map(item => (<option key={item.kichThuocID} value={item.kichThuocID}>{item.tenKichThuoc}</option>))}
                    </select>

                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={filters.mauSacID} onChange={(e) => setFilters({ ...filters, mauSacID: e.target.value })}>
                        <option value="">Màu sắc</option>
                        {mauSacs.map(item => (<option key={item.mauSacID} value={item.mauSacID}>{item.tenMau}</option>))}
                    </select>
                </div>

                <div className="mt-4 flex gap-3">
                    <button onClick={loadProducts} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">Áp dụng</button>
                    <button onClick={handleReset} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition">Xóa bộ lọc</button>
                </div>
            </div>

            {/* DANH SÁCH SẢN PHẨM */}
            {loading ? (
                <div className="flex justify-center items-center py-20"><p className="text-gray-500 text-lg">Đang tải sản phẩm...</p></div>
            ) : products.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
                    <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào phù hợp.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.map(product => (
                        <ProductCard key={product.sanPhamID} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductListPage;