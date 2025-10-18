export default function SevenCAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">7C Admin</h1>
        <p className="text-muted-foreground">Manage 7C specific settings and features</p>
      </div>
      
      <div className="space-y-4">
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-semibold text-lg mb-4">7C Configuration</h3>
          <p className="text-muted-foreground">Configure 7C module settings here</p>
        </div>
        
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-semibold text-lg mb-4">7C Analytics</h3>
          <p className="text-muted-foreground">View 7C module analytics and metrics</p>
        </div>
      </div>
    </div>
  );
}
