using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class CampsStaggings_TableAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CampStaggings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CampName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ActivitiesOffered = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DatesAndDurations = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AgeGroup = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CostsAndScholarships = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TestimonialsOrReviews = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ClassSchedule = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EndDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Capacity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RegistrationDeadline = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SpotsAvailable = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Highlights = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HostedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CampLink = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageLink = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CampStaggings", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CampStaggings");
        }
    }
}
