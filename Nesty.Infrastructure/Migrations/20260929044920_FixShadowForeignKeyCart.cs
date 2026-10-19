using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nesty.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixShadowForeignKeyCart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChiTietGioHang_BienTheSanPham_BienTheSanPhamBienTheID",
                table: "ChiTietGioHang");

            migrationBuilder.DropForeignKey(
                name: "FK_ChiTietGioHang_GioHang_GioHangID1",
                table: "ChiTietGioHang");

            migrationBuilder.DropIndex(
                name: "IX_ChiTietGioHang_BienTheSanPhamBienTheID",
                table: "ChiTietGioHang");

            migrationBuilder.DropIndex(
                name: "IX_ChiTietGioHang_GioHangID1",
                table: "ChiTietGioHang");

            migrationBuilder.DropColumn(
                name: "BienTheSanPhamBienTheID",
                table: "ChiTietGioHang");

            migrationBuilder.DropColumn(
                name: "GioHangID1",
                table: "ChiTietGioHang");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BienTheSanPhamBienTheID",
                table: "ChiTietGioHang",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GioHangID1",
                table: "ChiTietGioHang",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietGioHang_BienTheSanPhamBienTheID",
                table: "ChiTietGioHang",
                column: "BienTheSanPhamBienTheID");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietGioHang_GioHangID1",
                table: "ChiTietGioHang",
                column: "GioHangID1");

            migrationBuilder.AddForeignKey(
                name: "FK_ChiTietGioHang_BienTheSanPham_BienTheSanPhamBienTheID",
                table: "ChiTietGioHang",
                column: "BienTheSanPhamBienTheID",
                principalTable: "BienTheSanPham",
                principalColumn: "BienTheID");

            migrationBuilder.AddForeignKey(
                name: "FK_ChiTietGioHang_GioHang_GioHangID1",
                table: "ChiTietGioHang",
                column: "GioHangID1",
                principalTable: "GioHang",
                principalColumn: "GioHangID");
        }
    }
}
