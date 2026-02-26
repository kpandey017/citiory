import Link from "next/link"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Citiory</h3>
            <p className="text-sm text-gray-600">City intelligence for better relocation decisions.</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Explore</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><Link href="/cities" className="hover:text-blue-600">Cities</Link></li>
              <li><Link href="/compare" className="hover:text-blue-600">Compare</Link></li>
              <li><Link href="/rankings" className="hover:text-blue-600">Rankings</Link></li>
              <li><Link href="/best" className="hover:text-blue-600">Best</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Learn</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><Link href="/blog" className="hover:text-blue-600">Blog</Link></li>
              <li><Link href="/guides" className="hover:text-blue-600">Guides</Link></li>
              <li><Link href="/topics" className="hover:text-blue-600">Topics</Link></li>
              <li><Link href="/keywords" className="hover:text-blue-600">Keyword Guides</Link></li>
              <li><Link href="/methodology" className="hover:text-blue-600">Methodology</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Support</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><Link href="/sitemap.xml" className="hover:text-blue-600">Sitemap</Link></li>
              <li><Link href="/robots.txt" className="hover:text-blue-600">Robots</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-gray-100 text-sm text-gray-500">
          © {year} Citiory. All rights reserved.
        </div>
      </div>
    </footer>
  )
}