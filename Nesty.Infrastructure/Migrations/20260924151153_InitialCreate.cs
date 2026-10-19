using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nesty.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DanhMucSanPham",
                columns: table => new
                {
                    DanhMucID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenDanhMuc = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    TrangThai = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DanhMucSanPham", x => x.DanhMucID);
                });

            migrationBuilder.CreateTable(
                name: "FAQ",
                columns: table => new
                {
                    FAQID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CauHoi = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    CauTraLoi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrangThai = table.Column<bool>(type: "bit", nullable: false),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    NgayCapNhat = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FAQ", x => x.FAQID);
                });

            migrationBuilder.CreateTable(
                name: "Kho",
                columns: table => new
                {
                    KhoID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenKho = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DiaChi = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    TrangThai = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kho", x => x.KhoID);
                });

            migrationBuilder.CreateTable(
                name: "KichThuoc",
                columns: table => new
                {
                    KichThuocID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenKichThuoc = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    TrangThai = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KichThuoc", x => x.KichThuocID);
                });

            migrationBuilder.CreateTable(
                name: "MauSac",
                columns: table => new
                {
                    MauSacID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenMau = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MaMau = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    TrangThai = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MauSac", x => x.MauSacID);
                });

            migrationBuilder.CreateTable(
                name: "NhaCungCap",
                columns: table => new
                {
                    NhaCungCapID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenNhaCungCap = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    SoDienThoai = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    DiaChi = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    TrangThai = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NhaCungCap", x => x.NhaCungCapID);
                });

            migrationBuilder.CreateTable(
                name: "TaiKhoan",
                columns: table => new
                {
                    TaiKhoanID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenDangNhap = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MatKhau = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    VaiTro = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    TrangThai = table.Column<bool>(type: "bit", nullable: false),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    LanDangNhapCuoi = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaiKhoan", x => x.TaiKhoanID);
                });

            migrationBuilder.CreateTable(
                name: "SanPham",
                columns: table => new
                {
                    SanPhamID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DanhMucID = table.Column<int>(type: "int", nullable: false),
                    TenSanPham = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThuongHieu = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    TrangThai = table.Column<bool>(type: "bit", nullable: false),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    NgayCapNhat = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DanhMucSanPhamDanhMucID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SanPham", x => x.SanPhamID);
                    table.ForeignKey(
                        name: "FK_SanPham_DanhMucSanPham_DanhMucID",
                        column: x => x.DanhMucID,
                        principalTable: "DanhMucSanPham",
                        principalColumn: "DanhMucID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SanPham_DanhMucSanPham_DanhMucSanPhamDanhMucID",
                        column: x => x.DanhMucSanPhamDanhMucID,
                        principalTable: "DanhMucSanPham",
                        principalColumn: "DanhMucID");
                });

            migrationBuilder.CreateTable(
                name: "PhieuNhapKho",
                columns: table => new
                {
                    PhieuNhapKhoID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KhoID = table.Column<int>(type: "int", nullable: false),
                    NhaCungCapID = table.Column<int>(type: "int", nullable: false),
                    MaPhieuNhap = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    NgayNhap = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TongTien = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    GhiChu = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    KhoID1 = table.Column<int>(type: "int", nullable: true),
                    NhaCungCapID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhieuNhapKho", x => x.PhieuNhapKhoID);
                    table.ForeignKey(
                        name: "FK_PhieuNhapKho_Kho_KhoID",
                        column: x => x.KhoID,
                        principalTable: "Kho",
                        principalColumn: "KhoID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PhieuNhapKho_Kho_KhoID1",
                        column: x => x.KhoID1,
                        principalTable: "Kho",
                        principalColumn: "KhoID");
                    table.ForeignKey(
                        name: "FK_PhieuNhapKho_NhaCungCap_NhaCungCapID",
                        column: x => x.NhaCungCapID,
                        principalTable: "NhaCungCap",
                        principalColumn: "NhaCungCapID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PhieuNhapKho_NhaCungCap_NhaCungCapID1",
                        column: x => x.NhaCungCapID1,
                        principalTable: "NhaCungCap",
                        principalColumn: "NhaCungCapID");
                });

            migrationBuilder.CreateTable(
                name: "KhachHang",
                columns: table => new
                {
                    KhachHangID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaiKhoanID = table.Column<int>(type: "int", nullable: false),
                    HoTen = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    SoDienThoai = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    NgaySinh = table.Column<DateTime>(type: "datetime2", nullable: true),
                    GioiTinh = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TaiKhoanID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhachHang", x => x.KhachHangID);
                    table.ForeignKey(
                        name: "FK_KhachHang_TaiKhoan_TaiKhoanID",
                        column: x => x.TaiKhoanID,
                        principalTable: "TaiKhoan",
                        principalColumn: "TaiKhoanID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_KhachHang_TaiKhoan_TaiKhoanID1",
                        column: x => x.TaiKhoanID1,
                        principalTable: "TaiKhoan",
                        principalColumn: "TaiKhoanID");
                });

            migrationBuilder.CreateTable(
                name: "BienTheSanPham",
                columns: table => new
                {
                    BienTheID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SanPhamID = table.Column<int>(type: "int", nullable: false),
                    KichThuocID = table.Column<int>(type: "int", nullable: false),
                    MauSacID = table.Column<int>(type: "int", nullable: false),
                    SKU = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    GiaBan = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TrangThai = table.Column<bool>(type: "bit", nullable: false),
                    KichThuocID1 = table.Column<int>(type: "int", nullable: true),
                    MauSacID1 = table.Column<int>(type: "int", nullable: true),
                    SanPhamID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BienTheSanPham", x => x.BienTheID);
                    table.ForeignKey(
                        name: "FK_BienTheSanPham_KichThuoc_KichThuocID",
                        column: x => x.KichThuocID,
                        principalTable: "KichThuoc",
                        principalColumn: "KichThuocID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BienTheSanPham_KichThuoc_KichThuocID1",
                        column: x => x.KichThuocID1,
                        principalTable: "KichThuoc",
                        principalColumn: "KichThuocID");
                    table.ForeignKey(
                        name: "FK_BienTheSanPham_MauSac_MauSacID",
                        column: x => x.MauSacID,
                        principalTable: "MauSac",
                        principalColumn: "MauSacID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BienTheSanPham_MauSac_MauSacID1",
                        column: x => x.MauSacID1,
                        principalTable: "MauSac",
                        principalColumn: "MauSacID");
                    table.ForeignKey(
                        name: "FK_BienTheSanPham_SanPham_SanPhamID",
                        column: x => x.SanPhamID,
                        principalTable: "SanPham",
                        principalColumn: "SanPhamID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BienTheSanPham_SanPham_SanPhamID1",
                        column: x => x.SanPhamID1,
                        principalTable: "SanPham",
                        principalColumn: "SanPhamID");
                });

            migrationBuilder.CreateTable(
                name: "HinhAnhSanPham",
                columns: table => new
                {
                    HinhAnhID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SanPhamID = table.Column<int>(type: "int", nullable: false),
                    DuongDanAnh = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    LaAnhChinh = table.Column<bool>(type: "bit", nullable: false),
                    SanPhamID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HinhAnhSanPham", x => x.HinhAnhID);
                    table.ForeignKey(
                        name: "FK_HinhAnhSanPham_SanPham_SanPhamID",
                        column: x => x.SanPhamID,
                        principalTable: "SanPham",
                        principalColumn: "SanPhamID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HinhAnhSanPham_SanPham_SanPhamID1",
                        column: x => x.SanPhamID1,
                        principalTable: "SanPham",
                        principalColumn: "SanPhamID");
                });

            migrationBuilder.CreateTable(
                name: "CuocHoiThoai",
                columns: table => new
                {
                    CuocHoiThoaiID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KhachHangID = table.Column<int>(type: "int", nullable: false),
                    ThoiGianBatDau = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ThoiGianKetThuc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TrangThai = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    KhachHangID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CuocHoiThoai", x => x.CuocHoiThoaiID);
                    table.ForeignKey(
                        name: "FK_CuocHoiThoai_KhachHang_KhachHangID",
                        column: x => x.KhachHangID,
                        principalTable: "KhachHang",
                        principalColumn: "KhachHangID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CuocHoiThoai_KhachHang_KhachHangID1",
                        column: x => x.KhachHangID1,
                        principalTable: "KhachHang",
                        principalColumn: "KhachHangID");
                });

            migrationBuilder.CreateTable(
                name: "DiaChi",
                columns: table => new
                {
                    DiaChiID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KhachHangID = table.Column<int>(type: "int", nullable: false),
                    HoTenNguoiNhan = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    SoDienThoai = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    TinhThanh = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    QuanHuyen = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PhuongXa = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DiaChiChiTiet = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    MacDinh = table.Column<bool>(type: "bit", nullable: false),
                    KhachHangID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiaChi", x => x.DiaChiID);
                    table.ForeignKey(
                        name: "FK_DiaChi_KhachHang_KhachHangID",
                        column: x => x.KhachHangID,
                        principalTable: "KhachHang",
                        principalColumn: "KhachHangID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DiaChi_KhachHang_KhachHangID1",
                        column: x => x.KhachHangID1,
                        principalTable: "KhachHang",
                        principalColumn: "KhachHangID");
                });

            migrationBuilder.CreateTable(
                name: "DonHang",
                columns: table => new
                {
                    DonHangID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KhachHangID = table.Column<int>(type: "int", nullable: false),
                    MaDonHang = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    NgayDat = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TongTien = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TrangThaiDonHang = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    GhiChu = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    HoTenNguoiNhan = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    SoDienThoaiNhan = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    TinhThanhNhan = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    QuanHuyenNhan = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PhuongXaNhan = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DiaChiNhan = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    KhachHangID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonHang", x => x.DonHangID);
                    table.ForeignKey(
                        name: "FK_DonHang_KhachHang_KhachHangID",
                        column: x => x.KhachHangID,
                        principalTable: "KhachHang",
                        principalColumn: "KhachHangID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DonHang_KhachHang_KhachHangID1",
                        column: x => x.KhachHangID1,
                        principalTable: "KhachHang",
                        principalColumn: "KhachHangID");
                });

            migrationBuilder.CreateTable(
                name: "GioHang",
                columns: table => new
                {
                    GioHangID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KhachHangID = table.Column<int>(type: "int", nullable: false),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    NgayCapNhat = table.Column<DateTime>(type: "datetime2", nullable: true),
                    KhachHangID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GioHang", x => x.GioHangID);
                    table.ForeignKey(
                        name: "FK_GioHang_KhachHang_KhachHangID",
                        column: x => x.KhachHangID,
                        principalTable: "KhachHang",
                        principalColumn: "KhachHangID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GioHang_KhachHang_KhachHangID1",
                        column: x => x.KhachHangID1,
                        principalTable: "KhachHang",
                        principalColumn: "KhachHangID");
                });

            migrationBuilder.CreateTable(
                name: "ChiTietPhieuNhapKho",
                columns: table => new
                {
                    ChiTietNhapKhoID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PhieuNhapKhoID = table.Column<int>(type: "int", nullable: false),
                    BienTheID = table.Column<int>(type: "int", nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    DonGiaNhap = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ThanhTien = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BienTheSanPhamBienTheID = table.Column<int>(type: "int", nullable: true),
                    PhieuNhapKhoID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietPhieuNhapKho", x => x.ChiTietNhapKhoID);
                    table.ForeignKey(
                        name: "FK_ChiTietPhieuNhapKho_BienTheSanPham_BienTheID",
                        column: x => x.BienTheID,
                        principalTable: "BienTheSanPham",
                        principalColumn: "BienTheID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChiTietPhieuNhapKho_BienTheSanPham_BienTheSanPhamBienTheID",
                        column: x => x.BienTheSanPhamBienTheID,
                        principalTable: "BienTheSanPham",
                        principalColumn: "BienTheID");
                    table.ForeignKey(
                        name: "FK_ChiTietPhieuNhapKho_PhieuNhapKho_PhieuNhapKhoID",
                        column: x => x.PhieuNhapKhoID,
                        principalTable: "PhieuNhapKho",
                        principalColumn: "PhieuNhapKhoID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChiTietPhieuNhapKho_PhieuNhapKho_PhieuNhapKhoID1",
                        column: x => x.PhieuNhapKhoID1,
                        principalTable: "PhieuNhapKho",
                        principalColumn: "PhieuNhapKhoID");
                });

            migrationBuilder.CreateTable(
                name: "TonKho",
                columns: table => new
                {
                    TonKhoID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KhoID = table.Column<int>(type: "int", nullable: false),
                    BienTheID = table.Column<int>(type: "int", nullable: false),
                    SoLuongTon = table.Column<int>(type: "int", nullable: false),
                    NgayCapNhat = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BienTheSanPhamBienTheID = table.Column<int>(type: "int", nullable: true),
                    KhoID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TonKho", x => x.TonKhoID);
                    table.ForeignKey(
                        name: "FK_TonKho_BienTheSanPham_BienTheID",
                        column: x => x.BienTheID,
                        principalTable: "BienTheSanPham",
                        principalColumn: "BienTheID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TonKho_BienTheSanPham_BienTheSanPhamBienTheID",
                        column: x => x.BienTheSanPhamBienTheID,
                        principalTable: "BienTheSanPham",
                        principalColumn: "BienTheID");
                    table.ForeignKey(
                        name: "FK_TonKho_Kho_KhoID",
                        column: x => x.KhoID,
                        principalTable: "Kho",
                        principalColumn: "KhoID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TonKho_Kho_KhoID1",
                        column: x => x.KhoID1,
                        principalTable: "Kho",
                        principalColumn: "KhoID");
                });

            migrationBuilder.CreateTable(
                name: "TinNhanChatbot",
                columns: table => new
                {
                    TinNhanID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CuocHoiThoaiID = table.Column<int>(type: "int", nullable: false),
                    NguoiGui = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    NoiDung = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ThoiGianGui = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CuocHoiThoaiID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TinNhanChatbot", x => x.TinNhanID);
                    table.ForeignKey(
                        name: "FK_TinNhanChatbot_CuocHoiThoai_CuocHoiThoaiID",
                        column: x => x.CuocHoiThoaiID,
                        principalTable: "CuocHoiThoai",
                        principalColumn: "CuocHoiThoaiID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TinNhanChatbot_CuocHoiThoai_CuocHoiThoaiID1",
                        column: x => x.CuocHoiThoaiID1,
                        principalTable: "CuocHoiThoai",
                        principalColumn: "CuocHoiThoaiID");
                });

            migrationBuilder.CreateTable(
                name: "ChiTietDonHang",
                columns: table => new
                {
                    ChiTietDonHangID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DonHangID = table.Column<int>(type: "int", nullable: false),
                    BienTheID = table.Column<int>(type: "int", nullable: false),
                    TenSanPham = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    KichThuoc = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    MauSac = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DonGia = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    ThanhTien = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BienTheSanPhamBienTheID = table.Column<int>(type: "int", nullable: true),
                    DonHangID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietDonHang", x => x.ChiTietDonHangID);
                    table.ForeignKey(
                        name: "FK_ChiTietDonHang_BienTheSanPham_BienTheID",
                        column: x => x.BienTheID,
                        principalTable: "BienTheSanPham",
                        principalColumn: "BienTheID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChiTietDonHang_BienTheSanPham_BienTheSanPhamBienTheID",
                        column: x => x.BienTheSanPhamBienTheID,
                        principalTable: "BienTheSanPham",
                        principalColumn: "BienTheID");
                    table.ForeignKey(
                        name: "FK_ChiTietDonHang_DonHang_DonHangID",
                        column: x => x.DonHangID,
                        principalTable: "DonHang",
                        principalColumn: "DonHangID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChiTietDonHang_DonHang_DonHangID1",
                        column: x => x.DonHangID1,
                        principalTable: "DonHang",
                        principalColumn: "DonHangID");
                });

            migrationBuilder.CreateTable(
                name: "GiaoHang",
                columns: table => new
                {
                    GiaoHangID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DonHangID = table.Column<int>(type: "int", nullable: false),
                    DonViVanChuyen = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    MaVanDon = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    TrangThaiGiaoHang = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    NgayGiao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgayDuKien = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NgayNhan = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DonHangID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiaoHang", x => x.GiaoHangID);
                    table.ForeignKey(
                        name: "FK_GiaoHang_DonHang_DonHangID",
                        column: x => x.DonHangID,
                        principalTable: "DonHang",
                        principalColumn: "DonHangID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GiaoHang_DonHang_DonHangID1",
                        column: x => x.DonHangID1,
                        principalTable: "DonHang",
                        principalColumn: "DonHangID");
                });

            migrationBuilder.CreateTable(
                name: "ThanhToan",
                columns: table => new
                {
                    ThanhToanID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DonHangID = table.Column<int>(type: "int", nullable: false),
                    PhuongThucThanhToan = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    SoTien = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TrangThaiThanhToan = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    NgayThanhToan = table.Column<DateTime>(type: "datetime2", nullable: true),
                    MaGiaoDich = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    DonHangID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThanhToan", x => x.ThanhToanID);
                    table.ForeignKey(
                        name: "FK_ThanhToan_DonHang_DonHangID",
                        column: x => x.DonHangID,
                        principalTable: "DonHang",
                        principalColumn: "DonHangID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ThanhToan_DonHang_DonHangID1",
                        column: x => x.DonHangID1,
                        principalTable: "DonHang",
                        principalColumn: "DonHangID");
                });

            migrationBuilder.CreateTable(
                name: "ChiTietGioHang",
                columns: table => new
                {
                    ChiTietGioHangID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GioHangID = table.Column<int>(type: "int", nullable: false),
                    BienTheID = table.Column<int>(type: "int", nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    BienTheSanPhamBienTheID = table.Column<int>(type: "int", nullable: true),
                    GioHangID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietGioHang", x => x.ChiTietGioHangID);
                    table.ForeignKey(
                        name: "FK_ChiTietGioHang_BienTheSanPham_BienTheID",
                        column: x => x.BienTheID,
                        principalTable: "BienTheSanPham",
                        principalColumn: "BienTheID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChiTietGioHang_BienTheSanPham_BienTheSanPhamBienTheID",
                        column: x => x.BienTheSanPhamBienTheID,
                        principalTable: "BienTheSanPham",
                        principalColumn: "BienTheID");
                    table.ForeignKey(
                        name: "FK_ChiTietGioHang_GioHang_GioHangID",
                        column: x => x.GioHangID,
                        principalTable: "GioHang",
                        principalColumn: "GioHangID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChiTietGioHang_GioHang_GioHangID1",
                        column: x => x.GioHangID1,
                        principalTable: "GioHang",
                        principalColumn: "GioHangID");
                });

            migrationBuilder.CreateTable(
                name: "GiaoDichKho",
                columns: table => new
                {
                    GiaoDichKhoID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TonKhoID = table.Column<int>(type: "int", nullable: false),
                    LoaiGiaoDich = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    ThoiGian = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LyDo = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ThamChieuID = table.Column<int>(type: "int", nullable: true),
                    GhiChu = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    TonKhoID1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiaoDichKho", x => x.GiaoDichKhoID);
                    table.ForeignKey(
                        name: "FK_GiaoDichKho_TonKho_TonKhoID",
                        column: x => x.TonKhoID,
                        principalTable: "TonKho",
                        principalColumn: "TonKhoID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GiaoDichKho_TonKho_TonKhoID1",
                        column: x => x.TonKhoID1,
                        principalTable: "TonKho",
                        principalColumn: "TonKhoID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BienTheSanPham_KichThuocID",
                table: "BienTheSanPham",
                column: "KichThuocID");

            migrationBuilder.CreateIndex(
                name: "IX_BienTheSanPham_KichThuocID1",
                table: "BienTheSanPham",
                column: "KichThuocID1");

            migrationBuilder.CreateIndex(
                name: "IX_BienTheSanPham_MauSacID",
                table: "BienTheSanPham",
                column: "MauSacID");

            migrationBuilder.CreateIndex(
                name: "IX_BienTheSanPham_MauSacID1",
                table: "BienTheSanPham",
                column: "MauSacID1");

            migrationBuilder.CreateIndex(
                name: "IX_BienTheSanPham_SanPhamID",
                table: "BienTheSanPham",
                column: "SanPhamID");

            migrationBuilder.CreateIndex(
                name: "IX_BienTheSanPham_SanPhamID1",
                table: "BienTheSanPham",
                column: "SanPhamID1");

            migrationBuilder.CreateIndex(
                name: "IX_BienTheSanPham_SKU",
                table: "BienTheSanPham",
                column: "SKU",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietDonHang_BienTheID",
                table: "ChiTietDonHang",
                column: "BienTheID");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietDonHang_BienTheSanPhamBienTheID",
                table: "ChiTietDonHang",
                column: "BienTheSanPhamBienTheID");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietDonHang_DonHangID",
                table: "ChiTietDonHang",
                column: "DonHangID");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietDonHang_DonHangID1",
                table: "ChiTietDonHang",
                column: "DonHangID1");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietGioHang_BienTheID",
                table: "ChiTietGioHang",
                column: "BienTheID");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietGioHang_BienTheSanPhamBienTheID",
                table: "ChiTietGioHang",
                column: "BienTheSanPhamBienTheID");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietGioHang_GioHangID_BienTheID",
                table: "ChiTietGioHang",
                columns: new[] { "GioHangID", "BienTheID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietGioHang_GioHangID1",
                table: "ChiTietGioHang",
                column: "GioHangID1");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietPhieuNhapKho_BienTheID",
                table: "ChiTietPhieuNhapKho",
                column: "BienTheID");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietPhieuNhapKho_BienTheSanPhamBienTheID",
                table: "ChiTietPhieuNhapKho",
                column: "BienTheSanPhamBienTheID");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietPhieuNhapKho_PhieuNhapKhoID",
                table: "ChiTietPhieuNhapKho",
                column: "PhieuNhapKhoID");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietPhieuNhapKho_PhieuNhapKhoID1",
                table: "ChiTietPhieuNhapKho",
                column: "PhieuNhapKhoID1");

            migrationBuilder.CreateIndex(
                name: "IX_CuocHoiThoai_KhachHangID",
                table: "CuocHoiThoai",
                column: "KhachHangID");

            migrationBuilder.CreateIndex(
                name: "IX_CuocHoiThoai_KhachHangID1",
                table: "CuocHoiThoai",
                column: "KhachHangID1");

            migrationBuilder.CreateIndex(
                name: "IX_DiaChi_KhachHangID",
                table: "DiaChi",
                column: "KhachHangID");

            migrationBuilder.CreateIndex(
                name: "IX_DiaChi_KhachHangID1",
                table: "DiaChi",
                column: "KhachHangID1");

            migrationBuilder.CreateIndex(
                name: "IX_DonHang_KhachHangID",
                table: "DonHang",
                column: "KhachHangID");

            migrationBuilder.CreateIndex(
                name: "IX_DonHang_KhachHangID1",
                table: "DonHang",
                column: "KhachHangID1");

            migrationBuilder.CreateIndex(
                name: "IX_DonHang_MaDonHang",
                table: "DonHang",
                column: "MaDonHang",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GiaoDichKho_TonKhoID",
                table: "GiaoDichKho",
                column: "TonKhoID");

            migrationBuilder.CreateIndex(
                name: "IX_GiaoDichKho_TonKhoID1",
                table: "GiaoDichKho",
                column: "TonKhoID1");

            migrationBuilder.CreateIndex(
                name: "IX_GiaoHang_DonHangID",
                table: "GiaoHang",
                column: "DonHangID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GiaoHang_DonHangID1",
                table: "GiaoHang",
                column: "DonHangID1",
                unique: true,
                filter: "[DonHangID1] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_GioHang_KhachHangID",
                table: "GioHang",
                column: "KhachHangID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GioHang_KhachHangID1",
                table: "GioHang",
                column: "KhachHangID1",
                unique: true,
                filter: "[KhachHangID1] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_HinhAnhSanPham_SanPhamID",
                table: "HinhAnhSanPham",
                column: "SanPhamID");

            migrationBuilder.CreateIndex(
                name: "IX_HinhAnhSanPham_SanPhamID1",
                table: "HinhAnhSanPham",
                column: "SanPhamID1");

            migrationBuilder.CreateIndex(
                name: "IX_KhachHang_TaiKhoanID",
                table: "KhachHang",
                column: "TaiKhoanID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_KhachHang_TaiKhoanID1",
                table: "KhachHang",
                column: "TaiKhoanID1",
                unique: true,
                filter: "[TaiKhoanID1] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_KichThuoc_TenKichThuoc",
                table: "KichThuoc",
                column: "TenKichThuoc",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PhieuNhapKho_KhoID",
                table: "PhieuNhapKho",
                column: "KhoID");

            migrationBuilder.CreateIndex(
                name: "IX_PhieuNhapKho_KhoID1",
                table: "PhieuNhapKho",
                column: "KhoID1");

            migrationBuilder.CreateIndex(
                name: "IX_PhieuNhapKho_MaPhieuNhap",
                table: "PhieuNhapKho",
                column: "MaPhieuNhap",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PhieuNhapKho_NhaCungCapID",
                table: "PhieuNhapKho",
                column: "NhaCungCapID");

            migrationBuilder.CreateIndex(
                name: "IX_PhieuNhapKho_NhaCungCapID1",
                table: "PhieuNhapKho",
                column: "NhaCungCapID1");

            migrationBuilder.CreateIndex(
                name: "IX_SanPham_DanhMucID",
                table: "SanPham",
                column: "DanhMucID");

            migrationBuilder.CreateIndex(
                name: "IX_SanPham_DanhMucSanPhamDanhMucID",
                table: "SanPham",
                column: "DanhMucSanPhamDanhMucID");

            migrationBuilder.CreateIndex(
                name: "IX_TaiKhoan_TenDangNhap",
                table: "TaiKhoan",
                column: "TenDangNhap",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ThanhToan_DonHangID",
                table: "ThanhToan",
                column: "DonHangID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ThanhToan_DonHangID1",
                table: "ThanhToan",
                column: "DonHangID1",
                unique: true,
                filter: "[DonHangID1] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_TinNhanChatbot_CuocHoiThoaiID",
                table: "TinNhanChatbot",
                column: "CuocHoiThoaiID");

            migrationBuilder.CreateIndex(
                name: "IX_TinNhanChatbot_CuocHoiThoaiID1",
                table: "TinNhanChatbot",
                column: "CuocHoiThoaiID1");

            migrationBuilder.CreateIndex(
                name: "IX_TonKho_BienTheID",
                table: "TonKho",
                column: "BienTheID");

            migrationBuilder.CreateIndex(
                name: "IX_TonKho_BienTheSanPhamBienTheID",
                table: "TonKho",
                column: "BienTheSanPhamBienTheID");

            migrationBuilder.CreateIndex(
                name: "IX_TonKho_KhoID_BienTheID",
                table: "TonKho",
                columns: new[] { "KhoID", "BienTheID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TonKho_KhoID1",
                table: "TonKho",
                column: "KhoID1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChiTietDonHang");

            migrationBuilder.DropTable(
                name: "ChiTietGioHang");

            migrationBuilder.DropTable(
                name: "ChiTietPhieuNhapKho");

            migrationBuilder.DropTable(
                name: "DiaChi");

            migrationBuilder.DropTable(
                name: "FAQ");

            migrationBuilder.DropTable(
                name: "GiaoDichKho");

            migrationBuilder.DropTable(
                name: "GiaoHang");

            migrationBuilder.DropTable(
                name: "HinhAnhSanPham");

            migrationBuilder.DropTable(
                name: "ThanhToan");

            migrationBuilder.DropTable(
                name: "TinNhanChatbot");

            migrationBuilder.DropTable(
                name: "GioHang");

            migrationBuilder.DropTable(
                name: "PhieuNhapKho");

            migrationBuilder.DropTable(
                name: "TonKho");

            migrationBuilder.DropTable(
                name: "DonHang");

            migrationBuilder.DropTable(
                name: "CuocHoiThoai");

            migrationBuilder.DropTable(
                name: "NhaCungCap");

            migrationBuilder.DropTable(
                name: "BienTheSanPham");

            migrationBuilder.DropTable(
                name: "Kho");

            migrationBuilder.DropTable(
                name: "KhachHang");

            migrationBuilder.DropTable(
                name: "KichThuoc");

            migrationBuilder.DropTable(
                name: "MauSac");

            migrationBuilder.DropTable(
                name: "SanPham");

            migrationBuilder.DropTable(
                name: "TaiKhoan");

            migrationBuilder.DropTable(
                name: "DanhMucSanPham");
        }
    }
}
