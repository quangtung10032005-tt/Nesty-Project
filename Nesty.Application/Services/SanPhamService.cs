//using Nesty.Application.DTOs.SanPham;
//using Nesty.Application.Interfaces;
//using Nesty.Domain.Entities;

//public class SanPhamService : ISanPhamService
//{
//    private readonly IUnitOfWork _unitOfWork;

//    public SanPhamService(
//        IUnitOfWork unitOfWork)
//    {
//        _unitOfWork = unitOfWork;
//    }

//    public async Task<List<SanPhamDto>> GetAllAsync(
//        string? search)
//    {
//        var products =
//            await _unitOfWork.SanPhams
//                .SearchAsync(search);

//        return products.Select(x => new SanPhamDto
//        {
//            SanPhamID = x.SanPhamID,
//            DanhMucID = x.DanhMucID,
//            TenSanPham = x.TenSanPham,
//            MoTa = x.MoTa,
//            ThuongHieu = x.ThuongHieu,
//            TrangThai = x.TrangThai,
//            NgayTao = x.NgayTao,
//            NgayCapNhat = x.NgayCapNhat
//        }).ToList();
//    }





















//    public async Task<SanPhamDto> CreateAsync(
//    CreateSanPhamRequest request)
//    {
//        var danhMuc =
//            await _unitOfWork.DanhMucs
//                .GetByIdAsync(request.DanhMucID);

//        if (danhMuc == null)
//            throw new Exception("Danh mục không tồn tại.");

//        var product = new SanPham
//        {
//            DanhMucID = request.DanhMucID,
//            TenSanPham = request.TenSanPham,
//            MoTa = request.MoTa,
//            ThuongHieu = request.ThuongHieu,
//            TrangThai = true,
//            NgayTao = DateTime.UtcNow
//        };

//        await _unitOfWork.SanPhams
//            .AddAsync(product);

//        await _unitOfWork.SaveChangesAsync();

//        return new SanPhamDto
//        {
//            SanPhamID = product.SanPhamID,
//            DanhMucID = product.DanhMucID,
//            TenSanPham = product.TenSanPham,
//            MoTa = product.MoTa,
//            ThuongHieu = product.ThuongHieu,
//            TrangThai = product.TrangThai,
//            NgayTao = product.NgayTao
//        };
//    }

















//    public async Task<SanPhamDto?> UpdateAsync(
//    int id,
//    UpdateSanPhamRequest request)
//    {
//        var product =
//            await _unitOfWork.SanPhams
//                .GetByIdAsync(id);

//        if (product == null)
//            return null;

//        var danhMuc =
//            await _unitOfWork.DanhMucs
//                .GetByIdAsync(request.DanhMucID);

//        if (danhMuc == null)
//            throw new Exception("Danh mục không tồn tại.");

//        product.DanhMucID = request.DanhMucID;
//        product.TenSanPham = request.TenSanPham;
//        product.MoTa = request.MoTa;
//        product.ThuongHieu = request.ThuongHieu;
//        product.NgayCapNhat = DateTime.UtcNow;

//        _unitOfWork.SanPhams.Update(product);

//        await _unitOfWork.SaveChangesAsync();

//        return new SanPhamDto
//        {
//            SanPhamID = product.SanPhamID,
//            DanhMucID = product.DanhMucID,
//            TenSanPham = product.TenSanPham,
//            MoTa = product.MoTa,
//            ThuongHieu = product.ThuongHieu,
//            TrangThai = product.TrangThai,
//            NgayTao = product.NgayTao,
//            NgayCapNhat = product.NgayCapNhat
//        };
//    }






//    public async Task<bool> DeleteAsync(int id)
//    {
//        var product = await _unitOfWork.SanPhams.GetByIdAsync(id);
//        if (product == null) return false;
//        product.TrangThai = false;
//        _unitOfWork.SanPhams.Update(product);
//        await _unitOfWork.SaveChangesAsync();
//        return true;
//    }





//    public async Task<SanPhamDto?> GetByIdAsync(int id)
//    {
//        var product = await _unitOfWork.SanPhams.GetByIdAsync(id);

//        if (product == null)
//            return null;

//        return new SanPhamDto
//        {
//            SanPhamID = product.SanPhamID,
//            DanhMucID = product.DanhMucID,
//            TenSanPham = product.TenSanPham,
//            MoTa = product.MoTa,
//            ThuongHieu = product.ThuongHieu,
//            TrangThai = product.TrangThai,
//            NgayTao = product.NgayTao,
//            NgayCapNhat = product.NgayCapNhat
//        };
//    }






//}




using Nesty.Application.DTOs.SanPham;
using Nesty.Application.Interfaces;
using Nesty.Domain.Entities;

public class SanPhamService : ISanPhamService
{
    private readonly IUnitOfWork _unitOfWork;

    public SanPhamService(
        IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    // Lấy danh sách sản phẩm
    public async Task<List<SanPhamDto>> GetAllAsync(
        string? search)
    {
        var products =
            await _unitOfWork.SanPhams
                .SearchAsync(search);

        return products.Select(x => new SanPhamDto
        {
            SanPhamID = x.SanPhamID,
            DanhMucID = x.DanhMucID,
            TenSanPham = x.TenSanPham,
            MoTa = x.MoTa,
            ThuongHieu = x.ThuongHieu,
            TrangThai = x.TrangThai,
            NgayTao = x.NgayTao,
            NgayCapNhat = x.NgayCapNhat
        }).ToList();
    }

    // Thêm sản phẩm
    public async Task<SanPhamDto> CreateAsync(
        CreateSanPhamRequest request)
    {
        // Kiểm tra tên sản phẩm
        if (string.IsNullOrWhiteSpace(request.TenSanPham))
            throw new Exception("Vui lòng nhập tên sản phẩm.");

        // Kiểm tra đã chọn danh mục chưa
        if (request.DanhMucID <= 0)
            throw new Exception("Vui lòng chọn danh mục.");

        // Kiểm tra danh mục có tồn tại không
        var danhMuc =
            await _unitOfWork.DanhMucs
                .GetByIdAsync(request.DanhMucID);

        if (danhMuc == null)
            throw new Exception("Danh mục không tồn tại.");

        // Tạo sản phẩm mới
        var product = new SanPham
        {
            DanhMucID = request.DanhMucID,
            TenSanPham = request.TenSanPham,
            MoTa = request.MoTa,
            ThuongHieu = request.ThuongHieu,
            TrangThai = true,
            NgayTao = DateTime.UtcNow
        };

        await _unitOfWork.SanPhams
            .AddAsync(product);

        await _unitOfWork.SaveChangesAsync();

        return new SanPhamDto
        {
            SanPhamID = product.SanPhamID,
            DanhMucID = product.DanhMucID,
            TenSanPham = product.TenSanPham,
            MoTa = product.MoTa,
            ThuongHieu = product.ThuongHieu,
            TrangThai = product.TrangThai,
            NgayTao = product.NgayTao
        };
    }

    // Sửa sản phẩm
    public async Task<SanPhamDto?> UpdateAsync(
        int id,
        UpdateSanPhamRequest request)
    {
        var product =
            await _unitOfWork.SanPhams
                .GetByIdAsync(id);

        if (product == null)
            return null;

        var danhMuc =
            await _unitOfWork.DanhMucs
                .GetByIdAsync(request.DanhMucID);

        if (danhMuc == null)
            throw new Exception("Danh mục không tồn tại.");

        product.DanhMucID = request.DanhMucID;
        product.TenSanPham = request.TenSanPham;
        product.MoTa = request.MoTa;
        product.ThuongHieu = request.ThuongHieu;
        product.NgayCapNhat = DateTime.UtcNow;

        _unitOfWork.SanPhams.Update(product);

        await _unitOfWork.SaveChangesAsync();

        return new SanPhamDto
        {
            SanPhamID = product.SanPhamID,
            DanhMucID = product.DanhMucID,
            TenSanPham = product.TenSanPham,
            MoTa = product.MoTa,
            ThuongHieu = product.ThuongHieu,
            TrangThai = product.TrangThai,
            NgayTao = product.NgayTao,
            NgayCapNhat = product.NgayCapNhat
        };
    }

    // Vô hiệu hóa hoặc kích hoạt lại sản phẩm
    public async Task<bool> DeleteAsync(int id)
    {
        var product =
            await _unitOfWork.SanPhams.GetByIdAsync(id);

        if (product == null)
            return false;

        // Đảo ngược trạng thái hiện tại
        product.TrangThai = !product.TrangThai;
        product.NgayCapNhat = DateTime.UtcNow;

        _unitOfWork.SanPhams.Update(product);

        await _unitOfWork.SaveChangesAsync();

        return true;
    }

    // Lấy thông tin sản phẩm theo ID
    public async Task<SanPhamDto?> GetByIdAsync(int id)
    {
        var product =
            await _unitOfWork.SanPhams.GetByIdAsync(id);

        if (product == null)
            return null;

        return new SanPhamDto
        {
            SanPhamID = product.SanPhamID,
            DanhMucID = product.DanhMucID,
            TenSanPham = product.TenSanPham,
            MoTa = product.MoTa,
            ThuongHieu = product.ThuongHieu,
            TrangThai = product.TrangThai,
            NgayTao = product.NgayTao,
            NgayCapNhat = product.NgayCapNhat
        };
    }
}







