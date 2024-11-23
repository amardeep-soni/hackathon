using Microsoft.EntityFrameworkCore;
using WebApi.Fetatures;
using WebApi.Repositories;

try
{
	string DefaultCorsPolicyName = "hackathon";
	var builder = WebApplication.CreateBuilder(args);

	// Add services to the container.
	builder.Services.AddControllers();

	// Set up Swagger (for development purposes)
	builder.Services.AddEndpointsApiExplorer();
	builder.Services.AddSwaggerGen();

	// Database context configuration
	builder.Services.AddDbContext<CampsDbContext>(options =>
		options.UseSqlServer(builder.Configuration.GetConnectionString("DbConnection"))
	);

	// AutoMapper configuration
	builder.Services.AddAutoMapper(typeof(MappingProfile));

	// Repositories
	builder.Services.AddScoped<ScrappingRepository>();
	builder.Services.AddScoped<CampsRepository>();

	// CORS configuration
	builder.Services.AddCors(options =>
	{
		options.AddPolicy(DefaultCorsPolicyName, corsBuilder =>
		{
			// Get CORS origins from configuration (appsettings.json or other config)
			var allowedOrigins = builder.Configuration["App:CorsOrigins"]
				?.Split(",", StringSplitOptions.RemoveEmptyEntries)
				.Select(o => o.TrimEnd('/')) // Ensure no trailing slashes
				.ToArray();

			// Allow specific origins and setup other CORS rules
			if (allowedOrigins != null && allowedOrigins.Any())
			{
				corsBuilder.WithOrigins(allowedOrigins)  // Allow only the defined origins
						   .SetIsOriginAllowedToAllowWildcardSubdomains()
						   .AllowAnyHeader()
						   .AllowAnyMethod()
						   .AllowCredentials();  // Allow credentials like cookies if necessary
			}
			else
			{
				// If no valid origins are provided, this will block all requests
				corsBuilder.AllowAnyOrigin()  // Fallback, in case the origin is not specified
						   .AllowAnyHeader()
						   .AllowAnyMethod();
			}
		});
	});

	var app = builder.Build();

	// Configure the HTTP request pipeline.
	//if (app.Environment.IsDevelopment())
	//{
		// Swagger UI only in development
		app.UseSwagger();
		app.UseSwaggerUI();
	//}

	// Enforce HTTPS redirection
	app.UseHttpsRedirection();

	// Enable CORS policy globally
	app.UseCors(DefaultCorsPolicyName);

	app.UseAuthorization();

	// Map API controllers
	app.MapControllers();

	// Start the application
	app.Run();
}
catch (Exception ex)
{
	Console.WriteLine(ex.Message);
}
