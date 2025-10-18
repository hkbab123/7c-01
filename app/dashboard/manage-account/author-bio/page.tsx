export default function AuthorBioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Author Bio</h1>
        <p className="text-muted-foreground">Write a biography that appears on your posts</p>
      </div>
      
      <div className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Display Name</label>
          <input
            type="text"
            placeholder="Your public display name"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            rows={6}
            placeholder="Tell readers about yourself..."
            className="w-full px-3 py-2 border rounded-md"
          />
          <p className="text-sm text-muted-foreground mt-2">
            This will appear at the bottom of your blog posts
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Social Links</label>
          <div className="space-y-3">
            <input
              type="url"
              placeholder="Twitter URL"
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="url"
              placeholder="LinkedIn URL"
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="url"
              placeholder="Website URL"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        
        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md">
          Save Bio
        </button>
      </div>
    </div>
  );
}
