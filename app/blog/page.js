import Link from 'next/link'
import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'posts.json')

async function getLocalPosts() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    const posts = JSON.parse(data)
    return posts.filter(p => p.published)
  } catch {
    return []
  }
}

async function getWordPressPosts() {
  try {
    const res = await fetch(
      'https://dushimarketing.wordpress.com/wp-json/wp/v2/posts?_fields=id,slug,title,excerpt,date,categories',
      { next: { revalidate: 60 } }
    )
    return res.json()
  } catch {
    return []
  }
}

export default async function Blog() {
  const [localPosts, wpPosts] = await Promise.all([getLocalPosts(), getWordPressPosts()])

  const localRows = localPosts.map(p => ({
    key: `local-${p.id}`,
    slug: p.slug,
    title: p.title,
    date: p.date,
    cat: 'Blog',
  }))

  const localSlugs = new Set(localPosts.map(p => p.slug))
  const wpRows = wpPosts
    .filter(p => !localSlugs.has(p.slug))
    .map(p => ({
      key: `wp-${p.id}`,
      slug: p.slug,
      title: p.title.rendered,
      date: p.date,
      cat: 'Blog',
    }))

  const allPosts = [...localRows, ...wpRows]

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
        {allPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.key} className="post-row">
            <span className="post-cat">{post.cat}</span>
            <span className="post-title">{post.title}</span>
            <span className="post-meta">{new Date(post.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
            <span className="post-arrow">→</span>
          </Link>
        ))}
        {allPosts.length === 0 && (
          <p style={{ padding: '48px 0', color: 'var(--muted)' }}>No posts yet.</p>
        )}
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
