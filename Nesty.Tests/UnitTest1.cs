using Xunit;

namespace Nesty.Tests
{
    public class KiemTraXUnit
    {
        [Fact]
        public void KiemTra_PhepCong()
        {
            // Arrange
            int a = 5;
            int b = 10;

            // Act
            int ketQua = a + b;

            // Assert
            Assert.Equal(15, ketQua);
        }
    }
}