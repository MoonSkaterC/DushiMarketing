 import Link from 'next/link'

export default function Blog() {
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
        <a href="#" className="post-row">
          <span className="post-cat">CRM</span>
          <span className="post-title">What is CRM & Salesforce? A plain-English guide</span>
          <span className="post-meta">Mar 2026 · 5 min</span>
          <span className="post-arrow">→</span>
        </a>
        <a href="#" className="post-row">
          <span className="post-cat">AI & Tech</span>
          <span className="post-title">What is natural language processing?</span>
          <span className="post-meta">Mar 2026 · 4 min</span>
          <span className="post-arrow">→</span>
        </a>
        <a href="#" className="post-row">
          <span className="post-cat">Email</span>
          <span className="post-title">Mailchimp vs. ConvertKit — which is right for you?</span>
          <span className="post-meta">Coming soon</span>
          <span className="post-arrow">→</span>
        </a>
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