import Link from 'next/link'

async function getPosts() {
  const res = await fetch(
    'https://dushimarketing.wordpress.com/wp-json/wp/v2/posts?_fields=id,slug,title,excerpt,date,categories',
    { next: { revalidate: 60 } }
  )
  return res.json()
}

export default async function Blog() {
  const posts = await getPosts()

  return (
    <>
      <header className="nav">
        <Link href="/" className="nav-logo">DushiMarketing</Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/blog" className="active">Blog</Link>
          <Link href="/about">About</Link>
        </nav>
      </header>

      <div className="blog-hero">
        <span className="eyebrow">The blog</span>
        <h1>Guides, reviews &amp; honest takes.</h1>
        <p>No filler. Thoughtful breakdowns of tools that actually move the needle.</p>
      </div>

      <div className="blog-list wrap">
        {posts.map((post: any) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="post-row">
            <span className="post-cat">Blog</span>
            <span className="post-title">{post.title.rendered}</span>
            <span className="post-meta">{new Date(post.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
            <span className="post-arrow">→</span>
          </Link>
        ))}
      </div>

      <footer className="footer">
        <div className="wrap footer-inner">
          <div className="footer-brand">
            <Link href="/" className="nav-logo">DushiMarketing</Link>
            <p>Honest affiliate marketing.</p>
          </div>
          <nav className="footer-nav">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
        <div className="footer-base">© 2026 DushiMarketing</div>
      </footer>
    </>
  )
}
