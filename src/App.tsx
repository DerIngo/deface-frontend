import { FILTER_NAMES, PASTE_ELLIPSE_NAMES } from './config/constants'
import { getPrimaryDefaceEndpoint } from './services/apiClient'

const detailRows = [
  { label: 'Active filter', value: FILTER_NAMES.join(', ') },
  { label: 'Paste style', value: PASTE_ELLIPSE_NAMES.join(', ') },
]

function App() {
  const endpoint = getPrimaryDefaceEndpoint()

  return (
    <div className="min-h-screen bg-gradient-to-b from-deface-ink via-slate-950 to-deface-ink text-white flex items-center justify-center px-6">
      <main className="w-full max-w-5xl text-center space-y-8 py-16">
        <div className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.5em] text-cyan-200">
          <span className="h-px w-8 bg-cyan-300/70" aria-hidden />
          Image processing
          <span className="h-px w-8 bg-cyan-300/70" aria-hidden />
        </div>
        <h1 className="text-5xl sm:text-6xl font-semibold text-deface-azure tracking-tight">Image Defacer</h1>
        <p className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto">
          A lightweight control surface for the {FILTER_NAMES.join(', ')} filter family that keeps every interaction purely visual while the heavy lifting happens at {endpoint}.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {detailRows.map((detail) => (
            <article key={detail.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left shadow-[0_20px_45px_-30px_rgba(15,23,42,0.8)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-200">{detail.label}</p>
              <p className="mt-3 text-lg font-medium text-white">{detail.value}</p>
            </article>
          ))}
        </div>
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-200">Backend</p>
        <p className="text-sm text-slate-300">{endpoint}</p>
      </main>
    </div>
  )
}

export default App
