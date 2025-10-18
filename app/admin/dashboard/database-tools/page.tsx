export default function DatabaseToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Database Tools</h1>
        <p className="text-muted-foreground">Manage and maintain your database</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2">Backup Database</h3>
          <p className="text-muted-foreground mb-4">Create a backup of your database</p>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Create Backup
          </button>
        </div>
        
        <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2">Restore Database</h3>
          <p className="text-muted-foreground mb-4">Restore from a previous backup</p>
          <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md">
            Restore
          </button>
        </div>
        
        <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2">Optimize Database</h3>
          <p className="text-muted-foreground mb-4">Optimize database performance</p>
          <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md">
            Optimize
          </button>
        </div>
        
        <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2">Database Stats</h3>
          <p className="text-muted-foreground mb-4">View database statistics</p>
          <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md">
            View Stats
          </button>
        </div>
      </div>
    </div>
  );
}
