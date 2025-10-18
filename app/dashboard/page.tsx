export default function UserDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your overview</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-semibold text-lg mb-2">My Posts</h3>
          <p className="text-3xl font-bold">24</p>
        </div>
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-semibold text-lg mb-2">Total Views</h3>
          <p className="text-3xl font-bold">3,456</p>
        </div>
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-semibold text-lg mb-2">Engagement</h3>
          <p className="text-3xl font-bold">89%</p>
        </div>
      </div>
    </div>
  );
}
