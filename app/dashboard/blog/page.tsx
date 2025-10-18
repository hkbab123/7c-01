export default function BlogDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Dashboard</h1>
          <p className="text-muted-foreground">Manage your blog posts and content</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          New Post
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-semibold text-lg mb-2">Published</h3>
          <p className="text-3xl font-bold">18</p>
        </div>
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-semibold text-lg mb-2">Drafts</h3>
          <p className="text-3xl font-bold">6</p>
        </div>
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-semibold text-lg mb-2">Total Views</h3>
          <p className="text-3xl font-bold">3.2K</p>
        </div>
      </div>
      
      <div className="border rounded-lg">
        <div className="p-4 border-b bg-muted/50">
          <input
            type="search"
            placeholder="Search your posts..."
            className="w-full max-w-sm px-3 py-2 border rounded-md"
          />
        </div>
        <div className="p-6">
          <p className="text-muted-foreground">Your blog posts will be listed here</p>
        </div>
      </div>
    </div>
  );
}
