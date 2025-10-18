export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Post Categories</h1>
          <p className="text-muted-foreground">Organize posts into categories</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          New Category
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {['Technology', 'Design', 'Business', 'Lifestyle', 'Travel'].map((category) => (
          <div key={category} className="p-4 border rounded-lg bg-card hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg">{category}</h3>
            <p className="text-sm text-muted-foreground mt-1">12 posts</p>
            <div className="flex gap-2 mt-4">
              <button className="text-sm text-blue-600 hover:underline">Edit</button>
              <button className="text-sm text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
