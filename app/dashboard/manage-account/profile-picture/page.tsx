export default function ProfilePicturePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Picture</h1>
        <p className="text-muted-foreground">Upload and manage your profile picture</p>
      </div>
      
      <div className="max-w-2xl space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
            <span className="text-4xl">👤</span>
          </div>
          <div className="space-y-2">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
              Upload New Picture
            </button>
            <button className="px-4 py-2 border rounded-md hover:bg-muted block">
              Remove Picture
            </button>
          </div>
        </div>
        
        <div className="p-4 border rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground">
            Recommended: Square image, at least 400x400px. Max file size: 5MB
          </p>
        </div>
      </div>
    </div>
  );
}
