using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SOFTWARE.Migrations
{
    /// <inheritdoc />
    public partial class turno_modificacion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Poblacion",
                table: "Turno",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Poblacion",
                table: "Turno");
        }
    }
}
