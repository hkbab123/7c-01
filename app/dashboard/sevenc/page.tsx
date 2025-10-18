export default function SevenCDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">7C Dashboard</h1>
        <p className="text-muted-foreground">Your personal 7C workspace</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-semibold text-lg mb-2">7C Activity</h3>
          <p className="text-muted-foreground">Track your 7C engagement</p>
          <p className="text-2xl font-bold mt-4">42</p>
        </div>
        
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-semibold text-lg mb-2">Recent Updates</h3>
          <p className="text-muted-foreground">Latest 7C notifications</p>
        </div>
      </div>
      
      <div className="border rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-4">7C Content</h3>
        <p className="text-muted-foreground">Your 7C content will appear here</p>
      </div>
    </div>
  );
}
