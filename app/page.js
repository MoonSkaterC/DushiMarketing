import Link from 'next/link'

export default function Home() {
  return (
    <>
      <header className="nav">
        <Link href="/" className="nav-logo">DushiMarketing</Link>
        <nav className="nav-links">
          <Link href="/" className="active">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
        </nav>
      </header>

      <section className="hero wrap">
        <div className="hero-text">
          <span className="eyebrow">Affiliate Marketing</span>
          <h1>Recommendations<br/>worth trusting.</h1>
          <p className="lead">We test the tools, read the fine print, and only share what we would genuinely recommend to a friend.</p>
          <div className="hero-btns">
            <Link href="/blog" className="btn btn-dark">Read the blog</Link>
            <Link href="#picks" className="btn btn-ghost">Our picks ↓</Link>
          </div>
        </div>
        <aside>
          <div className="stat-box">
            <div className="stat-item">
              <span className="stat-num">24+</span>
              <span className="stat-label">Tools tested</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">100%</span>
              <span className="stat-label">Honest reviews</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">Zero</span>
              <span className="stat-label">Hidden agendas</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="section" id="picks">
        <div className="wrap">
          <div className="section-header">
            <h2>Top picks</h2>
            <Link href="/blog" className="section-link">View all →</Link>
          </div>
          <div className="picks-grid">
            <article className="pick-card">
              <div className="pick-top">
                <span className="pick-tag">CRM</span>
                <span className="pick-stars">★★★★★</span>
              </div>
              <h3>HubSpot</h3>
              <p>The most accessible CRM available. Free to start, deep enough to scale.</p>
              <a href="#" className="pick-link">Explore HubSpot →</a>
            </article>
            <article className="pick-card featured">
              <div className="pick-top">
                <span className="pick-tag">Email</span>
                <span className="pick-badge">Editor's choice</span>
              </div>
              <h3>Mailchimp</h3>
              <p>Email marketing that stays out of your way. Beautiful templates, intuitive automation.</p>
              <a href="#" className="pick-link">Explore Mailchimp →</a>
            </article>
            <article className="pick-card">
              <div className="pick-top">
                <span className="pick-tag">SEO</span>
                <span className="pick-stars">★★★★☆</span>
              </div>
              <h3>Semrush</h3>
              <p>Industry-leading SEO and competitor intelligence. Earns its price.</p>
              <a href="#" className="pick-link">Explore Semrush →</a>
            </article>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footer-inner">
          <div className="footer-brand">
            <Link href="/" className="nav-logo">DushiMarketing</Link>
            <p>Honest affiliate marketing. Links may earn us a commission.</p>
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