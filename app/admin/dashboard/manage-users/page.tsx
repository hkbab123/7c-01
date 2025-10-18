export default function ManageUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <p className="text-muted-foreground">View and manage all registered users</p>
      </div>
      
      <div className="border rounded-lg">
        <div className="p-4 border-b bg-muted/50">
          <input
            type="search"
            placeholder="Search users..."
            className="w-full max-w-sm px-3 py-2 border rounded-md"
          />
        </div>
        <div className="p-6">
          <p className="text-muted-foreground">User table will be displayed here</p>
        </div>
      </div>
    </div>
  );
}
