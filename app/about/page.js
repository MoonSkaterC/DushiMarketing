import Link from 'next/link'

export default function About() {
  return (
    <>
      <header className="nav">
        <Link href="/" className="nav-logo">DushiMarketing</Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about" className="active">About</Link>
        </nav>
      </header>

      <div className="about-hero wrap">
        <div>
          <span className="eyebrow">About us</span>
          <h1>Honest marketing<br/>for real people.</h1>
        </div>
        <div>
          <p>DushiMarketing was built on a simple belief — affiliate marketing does not have to be pushy or misleading. We exist to cut through the noise and give you recommendations you can trust.</p>
        </div>
      </div>

      <section className="about-section">
        <div className="wrap about-section-inner">
          <span className="about-section-label">Our values</span>
          <div>
            <h2>How we operate</h2>
            <div className="values-list">
              <div className="value-row"><span className="value-num">01</span><span>We test every tool before recommending it</span></div>
              <div className="value-row"><span className="value-num">02</span><span>Full affiliate disclosure on every post</span></div>
              <div className="value-row"><span className="value-num">03</span><span>Reader trust always comes before commission</span></div>
              <div className="value-row"><span className="value-num">04</span><span>Reviews updated regularly — no stale picks</span></div>
            </div>
          </div>
        </div>
      </section>

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