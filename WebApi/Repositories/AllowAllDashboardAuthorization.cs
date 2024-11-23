using Hangfire.Dashboard;

public class AllowAllDashboardAuthorization : IDashboardAuthorizationFilter
{
	public bool Authorize(DashboardContext context)
	{
		// Allow anyone to access the dashboard
		return true;
	}
}
