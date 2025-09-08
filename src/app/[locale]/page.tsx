const mockPosts = [
  {
    id: 1,
    title: 'How to Build a Modern Blog with Next.js',
    excerpt:
      'Learn the basics of building a fast, modern blog using Next.js and React.',
    author: 'Jane Doe',
    date: '2025-09-01',
    image: 'https://source.unsplash.com/random/800x400?blog,tech',
  },
  {
    id: 2,
    title: 'Understanding Server Components',
    excerpt:
      'A deep dive into React Server Components and how they improve performance.',
    author: 'John Smith',
    date: '2025-08-28',
    image: 'https://source.unsplash.com/random/800x400?server,react',
  },
  {
    id: 3,
    title: 'Styling in Next.js: Best Practices',
    excerpt:
      'Explore different ways to style your Next.js apps for maintainability and speed.',
    author: 'Alex Lee',
    date: '2025-08-20',
    image: 'https://source.unsplash.com/random/800x400?css,design',
  },
]

export default function Home() {
  return (
    <main className="font-sans bg-background min-h-screen">
      <header className="py-8 px-4 border-b border-default flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-2">My Blog</h1>
        <p className="text-lg text-muted">
          Insights & tutorials for modern web development
        </p>
      </header>

      <section className="max-w-3xl mx-auto mt-8 px-4">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Featured Post</h2>
          <div className="rounded-lg overflow-hidden shadow-lg bg-card flex flex-col md:flex-row">
            <img
              src={mockPosts[0].image}
              alt={mockPosts[0].title}
              width={800}
              height={400}
              className="w-full md:w-1/2 h-48 object-cover"
            />
            <div className="p-6 flex-1">
              <h3 className="text-xl font-bold mb-2">{mockPosts[0].title}</h3>
              <p className="text-muted mb-4">{mockPosts[0].excerpt}</p>
              <div className="text-xs text-muted">
                By {mockPosts[0].author} &middot; {mockPosts[0].date}
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Latest Posts</h2>
        <div className="grid gap-6">
          {mockPosts.slice(1).map((post) => (
            <div
              key={post.id}
              className="rounded-lg overflow-hidden shadow bg-card flex flex-col md:flex-row"
            >
              <img
                src={post.image}
                alt={post.title}
                width={800}
                height={400}
                className="w-full md:w-1/3 h-32 object-cover"
              />
              <div className="p-4 flex-1">
                <h3 className="text-lg font-bold mb-1">{post.title}</h3>
                <p className="text-muted mb-2">{post.excerpt}</p>
                <div className="text-xs text-muted">
                  By {post.author} &middot; {post.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
