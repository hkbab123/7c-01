import Link from 'next/link';

export default function ManagePostsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Posts</h1>
          <p className="text-muted-foreground">Create, edit, and manage all blog posts</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          New Post
        </button>
      </div>
      
      <div className="flex gap-4 mb-6">
        <Link
          href="/admin/dashboard/manage-posts/categories"
          className="px-4 py-2 border rounded-md hover:bg-muted"
        >
          Manage Categories
        </Link>
      </div>
      
      <div className="border rounded-lg">
        <div className="p-4 border-b bg-muted/50">
          <input
            type="search"
            placeholder="Search posts..."
            className="w-full max-w-sm px-3 py-2 border rounded-md"
          />
        </div>
        <div className="p-6">
          <p className="text-muted-foreground">Posts list will be displayed here</p>
        </div>
      </div>
    </div>
  );
}
