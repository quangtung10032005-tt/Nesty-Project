
using Moq;
using Xunit;

using Nesty.Application.DTOs.SanPham;
using Nesty.Application.Interfaces;
using Nesty.Application.Interfaces.Repositories;
using Nesty.Domain.Entities;

namespace Nesty.Tests.UseCase.QuanLySanPham
{
    public class ThemSanPhamTests
    {
        private readonly Mock<IUnitOfWork> _mockUnitOfWork;
        private readonly Mock<ISanPhamRepository> _mockSanPhamRepository;
        private readonly Mock<IDanhMucRepository> _mockDanhMucRepository;

        private readonly SanPhamService _service;

        public ThemSanPhamTests()
        {
            _mockUnitOfWork = new Mock<IUnitOfWork>();
            _mockSanPhamRepository = new Mock<ISanPhamRepository>();
            _mockDanhMucRepository = new Mock<IDanhMucRepository>();

            _mockUnitOfWork
                .SetupGet(x => x.SanPhams)
                .Returns(_mockSanPhamRepository.Object);

            _mockUnitOfWork
                .SetupGet(x => x.DanhMucs)
                .Returns(_mockDanhMucRepository.Object);

            _mockUnitOfWork
                .Setup(x => x.SaveChangesAsync())
                .ReturnsAsync(1);

            _service = new SanPhamService(_mockUnitOfWork.Object);
        }

        // SP01: Thêm sản phẩm đầy đủ thông tin
        [Fact]
        public async Task SP01_ThemSanPham_ThanhCong()
        {
            var request = new CreateSanPhamRequest
            {
                DanhMucID = 1,
                TenSanPham = "Giày thể thao",
                MoTa = "Giày thể thao nam",
                ThuongHieu = "Nesty"
            };

            _mockDanhMucRepository
                .Setup(x => x.GetByIdAsync(1))
                .ReturnsAsync(new DanhMucSanPham
                {
                    DanhMucID = 1,
                    TenDanhMuc = "Giày thể thao",
                    TrangThai = true
                });

            _mockSanPhamRepository
                .Setup(x => x.AddAsync(It.IsAny<SanPham>()))
                .Callback<SanPham>(sp => sp.SanPhamID = 100)
                .Returns(Task.CompletedTask);

            var result = await _service.CreateAsync(request);

            Assert.NotNull(result);
            Assert.Equal(100, result.SanPhamID);
            Assert.Equal(1, result.DanhMucID);
            Assert.Equal("Giày thể thao", result.TenSanPham);
            Assert.Equal("Giày thể thao nam", result.MoTa);
            Assert.Equal("Nesty", result.ThuongHieu);
            Assert.True(result.TrangThai);

            _mockSanPhamRepository.Verify(
                x => x.AddAsync(It.IsAny<SanPham>()),
                Times.Once);

            _mockUnitOfWork.Verify(
                x => x.SaveChangesAsync(),
                Times.Once);
        }

        // SP02: Bỏ trống tên sản phẩm
        [Fact]
        public async Task SP02_ThemSanPham_BoTrongTen()
        {
            var request = new CreateSanPhamRequest
            {
                DanhMucID = 1,
                TenSanPham = "",
                MoTa = "Giày thể thao nam",
                ThuongHieu = "Nesty"
            };

            var exception = await Assert.ThrowsAsync<Exception>(
                () => _service.CreateAsync(request));

            Assert.Equal(
                "Vui lòng nhập tên sản phẩm.",
                exception.Message);

            _mockSanPhamRepository.Verify(
                x => x.AddAsync(It.IsAny<SanPham>()),
                Times.Never);

            _mockUnitOfWork.Verify(
                x => x.SaveChangesAsync(),
                Times.Never);
        }

        // SP03: Chưa chọn danh mục
        [Fact]
        public async Task SP03_ThemSanPham_ChuaChonDanhMuc()
        {
            var request = new CreateSanPhamRequest
            {
                DanhMucID = 0,
                TenSanPham = "Giày thể thao",
                MoTa = "Giày thể thao nam",
                ThuongHieu = "Nesty"
            };

            var exception = await Assert.ThrowsAsync<Exception>(
                () => _service.CreateAsync(request));

            Assert.Equal(
                "Vui lòng chọn danh mục.",
                exception.Message);

            _mockSanPhamRepository.Verify(
                x => x.AddAsync(It.IsAny<SanPham>()),
                Times.Never);

            _mockUnitOfWork.Verify(
                x => x.SaveChangesAsync(),
                Times.Never);
        }

        // SP04: Bỏ trống thương hiệu
        [Fact]
        public async Task SP04_ThemSanPham_BoTrongThuongHieu()
        {
            var request = new CreateSanPhamRequest
            {
                DanhMucID = 1,
                TenSanPham = "Giày thể thao",
                MoTa = "Giày thể thao nam",
                ThuongHieu = ""
            };

            _mockDanhMucRepository
                .Setup(x => x.GetByIdAsync(1))
                .ReturnsAsync(new DanhMucSanPham
                {
                    DanhMucID = 1,
                    TenDanhMuc = "Giày thể thao",
                    TrangThai = true
                });

            var result = await _service.CreateAsync(request);

            Assert.NotNull(result);
            Assert.Equal("", result.ThuongHieu);

            _mockSanPhamRepository.Verify(
                x => x.AddAsync(It.IsAny<SanPham>()),
                Times.Once);

            _mockUnitOfWork.Verify(
                x => x.SaveChangesAsync(),
                Times.Once);
        }

        // SP05: Bỏ trống mô tả
        [Fact]
        public async Task SP05_ThemSanPham_BoTrongMoTa()
        {
            var request = new CreateSanPhamRequest
            {
                DanhMucID = 1,
                TenSanPham = "Giày thể thao",
                MoTa = "",
                ThuongHieu = "Nesty"
            };

            _mockDanhMucRepository
                .Setup(x => x.GetByIdAsync(1))
                .ReturnsAsync(new DanhMucSanPham
                {
                    DanhMucID = 1,
                    TenDanhMuc = "Giày thể thao",
                    TrangThai = true
                });

            var result = await _service.CreateAsync(request);

            Assert.NotNull(result);
            Assert.Equal("", result.MoTa);

            _mockSanPhamRepository.Verify(
                x => x.AddAsync(It.IsAny<SanPham>()),
                Times.Once);

            _mockUnitOfWork.Verify(
                x => x.SaveChangesAsync(),
                Times.Once);
        }

        // Kiểm thử bổ sung: Danh mục không tồn tại
        [Fact]
        public async Task ThemSanPham_DanhMucKhongTonTai()
        {
            var request = new CreateSanPhamRequest
            {
                DanhMucID = 99,
                TenSanPham = "Giày thể thao",
                MoTa = "Mô tả sản phẩm",
                ThuongHieu = "Nesty"
            };

            _mockDanhMucRepository
                .Setup(x => x.GetByIdAsync(99))
                .ReturnsAsync((DanhMucSanPham?)null);

            var exception = await Assert.ThrowsAsync<Exception>(
                () => _service.CreateAsync(request));

            Assert.Equal(
                "Danh mục không tồn tại.",
                exception.Message);

            _mockSanPhamRepository.Verify(
                x => x.AddAsync(It.IsAny<SanPham>()),
                Times.Never);

            _mockUnitOfWork.Verify(
                x => x.SaveChangesAsync(),
                Times.Never);
        }
    }
}
