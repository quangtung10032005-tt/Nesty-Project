using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Nesty.Application.Interfaces;
using Nesty.Domain.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Nesty.Application.Services
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;

        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(TaiKhoan taiKhoan)
        {
            var key = _configuration["Jwt:Key"]!;

            var securityKey =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(key));

            var credentials =
                new SigningCredentials(
                    securityKey,
                    SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(
                ClaimTypes.NameIdentifier,
                taiKhoan.TaiKhoanID.ToString()),

            new Claim(
                ClaimTypes.Name,
                taiKhoan.TenDangNhap),

            new Claim(
                ClaimTypes.Role,
                taiKhoan.VaiTro)
        };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(
                    double.Parse(
                        _configuration["Jwt:ExpireMinutes"]!)),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler()
                .WriteToken(token);
        }
    }
}
