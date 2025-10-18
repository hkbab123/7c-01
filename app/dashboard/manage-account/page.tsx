import Link from 'next/link';

export default function ManageAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Account</h1>
        <p className="text-muted-foreground">Update your account settings and preferences</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/manage-account/profile-picture">
          <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-semibold text-lg mb-2">Profile Picture</h3>
            <p className="text-muted-foreground">Update your avatar image</p>
          </div>
        </Link>
        
        <Link href="/dashboard/manage-account/personal-profile">
          <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-semibold text-lg mb-2">Personal Profile</h3>
            <p className="text-muted-foreground">Edit username and password</p>
          </div>
        </Link>
        
        <Link href="/dashboard/manage-account/author-bio">
          <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-semibold text-lg mb-2">Author Bio</h3>
            <p className="text-muted-foreground">Write your author biography</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
