using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Nesty.Application.Interfaces;
using Nesty.Application.Interfaces.Repositories;
using Nesty.Application.Interfaces.Services;
using Nesty.Application.Services;
using Nesty.Infrastructure.Persistence;
using Nesty.Infrastructure.Repositories;
using System.Text;

namespace Nesty
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();






            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp", policy =>
                {
                    policy.WithOrigins("http://localhost:3000", "http://localhost:5173") // Hỗ trợ cả CRA lẫn Vite
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });





            // Swagger / OpenAPI
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Nesty API",
                    Version = "v1",
                    Description = "API documentation for Nesty system"
                });

                // C?u hình nút Authorize nh?p JWT Bearer Token
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Nh?p JWT token vào ô bên d??i (không c?n gõ ch? 'Bearer ')"
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            // Khai báo k?t n?i DbContext
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            // ??ng ký xác th?c JWT Bearer
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
                    };
                });

            builder.Services.AddAuthorization();

            // ??ng ký Repositories & UnitOfWork
            builder.Services.AddScoped<IKhachHangRepository, KhachHangRepository>();
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

            // ??ng ký Services
            builder.Services.AddScoped<IJwtService, JwtService>();
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<ICustomerService, CustomerService>();







            // quan ly danh muc
            builder.Services.AddScoped<IDanhMucRepository,DanhMucRepository>();

            builder.Services.AddScoped<IKichThuocRepository,KichThuocRepository>();

            builder.Services.AddScoped<IMauSacRepository,MauSacRepository>();


            builder.Services.AddScoped<IKichThuocService, KichThuocService>();

            builder.Services.AddScoped<IMauSacService, MauSacService>();

            builder.Services.AddScoped<IDanhMucService, DanhMucService>();

            // quản lý sản phẩm hình ảnh biến thể

            builder.Services.AddScoped<ISanPhamRepository,SanPhamRepository>();


            builder.Services.AddScoped<ISanPhamService, SanPhamService>();

            builder.Services.AddScoped<IBienTheRepository,BienTheRepository>();

            builder.Services.AddScoped<IHinhAnhRepository,HinhAnhRepository>();

            builder.Services.AddScoped<IBienTheService, BienTheService>();
            builder.Services.AddScoped<IHinhAnhService, HinhAnhService>();


            // day 6
            // Thêm vào khối đăng ký service (Dependency Injection)
            builder.Services.AddScoped<ISanPhamCustomerService, SanPhamCustomerService>();



            // day 8  Gio hang 
            builder.Services.AddScoped<IGioHangRepository, GioHangRepository>();

            builder.Services.AddScoped<IGioHangCustomerService, GioHangCustomerService>();




            // day 9 thanh toan

            builder.Services.AddScoped<IDonHangRepository, DonHangRepository>();
            builder.Services.AddScoped<ITonKhoRepository, TonKhoRepository>();
            builder.Services.AddScoped<IDonHangCustomerService, DonHangCustomerService>();
            builder.Services.AddScoped<IThanhToanCustomerService, ThanhToanCustomerService>();



            // day 10
            // Đăng ký Services cho Day 11
            builder.Services.AddScoped<IDonHangAdminService, DonHangAdminService>();
            builder.Services.AddScoped<IKhachHangAdminService, KhachHangAdminService>();


            // day 12
            // Day 12
            builder.Services.AddScoped<IQuanLyKhoService, QuanLyKhoService>();

            // day 13
            // Repositories
            builder.Services.AddScoped<IFAQRepository, FAQRepository>();

            // Services
            builder.Services.AddScoped<IFAQService, FAQService>();
            builder.Services.AddScoped<IThongKeService, ThongKeService>();
            builder.Services.AddScoped<IChatbotService, ChatbotService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Nesty API v1");
                });
            }

            app.UseHttpsRedirection();


            app.UseCors("AllowReactApp");

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}