export default function PersonalProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Personal Profile</h1>
        <p className="text-muted-foreground">Update your username and password</p>
      </div>
      
      <div className="max-w-2xl space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        
        <div className="pt-6 border-t">
          <h3 className="font-semibold text-lg mb-4">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>
        
        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md">
          Save Changes
        </button>
      </div>
    </div>
  );
}
