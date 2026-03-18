import './globals.css'

export const metadata = {
  title: 'DushiMarketing',
  description: 'Honest affiliate marketing recommendations',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}