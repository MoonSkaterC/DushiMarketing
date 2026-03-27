import Link from 'next/link'
import { notFound } from 'next/navigation'
import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'posts.json')

async function getLocalPost(slug) {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    const posts = JSON.parse(data)
    return posts.find(p => p.slug === slug && p.published) || null
  } catch {
    return null
  }
}

async function getWordPressPost(slug) {
  try {
    const res = await fetch(
      `https://dushimarketing.wordpress.com/wp-json/wp/v2/posts?slug=${slug}&_fields=id,slug,title,content,date`,
      { next: { revalidate: 60 } }
    )
    const posts = await res.json()
    return posts[0] || null
  } catch {
    return null
  }
}

export default async function BlogPost({ params }) {
  const { slug } = await params

  const local = await getLocalPost(slug)

  if (local) {
    return <PostPage
      title={local.title}
      date={local.date}
      content={local.content}
      source="local"
    />
  }

  const wp = await getWordPressPost(slug)
  if (!wp) notFound()

  return <PostPage
    title={wp.title.rendered}
    date={wp.date}
    content={wp.content.rendered}
    source="wordpress"
  />
}

function PostPage({ title, date, content }) {
  const formatted = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

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

      <div className="post-hero">
        <div className="wrap">
          <Link href="/blog" className="post-back">← All posts</Link>
          <h1>{title}</h1>
          <p className="post-date">{formatted}</p>
        </div>
      </div>

      <div className="post-body wrap">
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
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
