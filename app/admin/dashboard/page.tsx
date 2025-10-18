export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin control panel</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-semibold text-lg mb-2">Total Users</h3>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-semibold text-lg mb-2">Total Posts</h3>
          <p className="text-3xl font-bold">567</p>
        </div>
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-semibold text-lg mb-2">Categories</h3>
          <p className="text-3xl font-bold">42</p>
        </div>
      </div>
    </div>
  );
}
