import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Deploy a Digital PhD Employee
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Who learns your business in weeks. Day 1 capable. Evolves with you.
          </p>
          <Link href="/onboard">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition">
              Start Free Trial
            </button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">
            From Onboarding to Integration
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Day 1 */}
            <div className="bg-slate-700 rounded-lg p-8">
              <div className="text-blue-400 text-sm font-bold mb-2">DAY 1</div>
              <h3 className="text-xl font-bold text-white mb-4">Immediate Impact</h3>
              <ul className="text-slate-300 space-y-2">
                <li>✓ Email management</li>
                <li>✓ Research & analysis</li>
                <li>✓ Document writing</li>
                <li>✓ Code review</li>
              </ul>
            </div>

            {/* Weeks 1-3 */}
            <div className="bg-slate-700 rounded-lg p-8">
              <div className="text-green-400 text-sm font-bold mb-2">WEEKS 1-3</div>
              <h3 className="text-xl font-bold text-white mb-4">Deep Learning</h3>
              <ul className="text-slate-300 space-y-2">
                <li>✓ Business processes</li>
                <li>✓ Your voice & style</li>
                <li>✓ Customer insights</li>
                <li>✓ Internal workflows</li>
              </ul>
            </div>

            {/* Weeks 4+ */}
            <div className="bg-slate-700 rounded-lg p-8">
              <div className="text-purple-400 text-sm font-bold mb-2">WEEKS 4+</div>
              <h3 className="text-xl font-bold text-white mb-4">Full Integration</h3>
              <ul className="text-slate-300 space-y-2">
                <li>✓ CRM automation</li>
                <li>✓ PR & marketing</li>
                <li>✓ Sales pipeline</li>
                <li>✓ Strategic decisions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-8">
          Replace 25 people. Hire 1 incredible digital employee.
        </h2>
        <Link href="/onboard">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition">
            Request Demo
          </button>
        </Link>
      </section>
    </main>
  )
}
