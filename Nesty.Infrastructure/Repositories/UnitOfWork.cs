using Nesty.Application.Interfaces;
using Nesty.Application.Interfaces.Repositories;
using Nesty.Domain.Entities;
using Nesty.Infrastructure.Persistence;

namespace Nesty.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;

    private IRepository<TaiKhoan>? _taiKhoans;
    private IRepository<GiaoDichKho>? _giaoDichKhos;
    private IRepository<ThanhToan>? _thanhToans;
    private IRepository<PhieuNhapKho>? _phieuNhapKhos;

    // DAY 13: THÊM BACKING FIELD CHO CHATBOT
    private IRepository<CuocHoiThoai>? _cuocHoiThoais;
    private IRepository<TinNhanChatbot>? _tinNhanChatbots;

    public IKhachHangRepository KhachHangs { get; }

    public IRepository<TaiKhoan> TaiKhoans =>
        _taiKhoans ??= new Repository<TaiKhoan>(_context);

    public IDanhMucRepository DanhMucs { get; }
    public IKichThuocRepository KichThuocs { get; }
    public IMauSacRepository MauSacs { get; }
    public ISanPhamRepository SanPhams { get; }
    public IBienTheRepository BienThes { get; }
    public IHinhAnhRepository HinhAnhs { get; }
    public IGioHangRepository GioHangs { get; }

    public IDonHangRepository DonHangs { get; }
    public ITonKhoRepository TonKhos { get; }

    public IRepository<GiaoDichKho> GiaoDichKhos =>
        _giaoDichKhos ??= new Repository<GiaoDichKho>(_context);

    public IRepository<PhieuNhapKho> PhieuNhapKhos =>
        _phieuNhapKhos ??= new Repository<PhieuNhapKho>(_context);

    public IRepository<ThanhToan> ThanhToans =>
        _thanhToans ??= new Repository<ThanhToan>(_context);

    // DAY 13: THÊM PROPERTIES CHO FAQ VÀ CHATBOT
    public IFAQRepository FAQs { get; }
    public IRepository<CuocHoiThoai> CuocHoiThoais =>
        _cuocHoiThoais ??= new Repository<CuocHoiThoai>(_context);
    public IRepository<TinNhanChatbot> TinNhanChatbots =>
        _tinNhanChatbots ??= new Repository<TinNhanChatbot>(_context);

    public UnitOfWork(
        ApplicationDbContext context,
        IKhachHangRepository khachHangs,
        IDanhMucRepository danhMucs,
        IKichThuocRepository kichThuocs,
        IMauSacRepository mauSacs,
        ISanPhamRepository sanPhamRepository,
        IBienTheRepository bienTheRepository,
        IHinhAnhRepository hinhAnhRepository,
        IGioHangRepository gioHang,
        IDonHangRepository donHangs,
        ITonKhoRepository tonKhos,
        IFAQRepository faqs // DAY 13: INJECT FAQ
        )
    {
        _context = context;

        KhachHangs = khachHangs;
        DanhMucs = danhMucs;
        KichThuocs = kichThuocs;
        MauSacs = mauSacs;
        SanPhams = sanPhamRepository;
        BienThes = bienTheRepository;
        HinhAnhs = hinhAnhRepository;
        GioHangs = gioHang;
        DonHangs = donHangs;
        TonKhos = tonKhos;

        FAQs = faqs; // DAY 13: GÁN FAQ
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public async Task BeginTransactionAsync()
    {
        await _context.Database.BeginTransactionAsync();
    }

    public async Task CommitTransactionAsync()
    {
        await _context.Database.CommitTransactionAsync();
    }

    public async Task RollbackTransactionAsync()
    {
        await _context.Database.RollbackTransactionAsync();
    }
}