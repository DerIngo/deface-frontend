import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import {
  FILTER_NAMES,
  PASTE_ELLIPSE_NAMES,
  type FilterName,
  type PasteEllipseName,
} from './config/constants'
import { processImage } from './services/imageService'

const PRIMARY_FILTER = FILTER_NAMES[0]
const PRIMARY_PASTE = PASTE_ELLIPSE_NAMES[0]

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<FilterName>(PRIMARY_FILTER)
  const [selectedPaste, setSelectedPaste] = useState<PasteEllipseName>(PRIMARY_PASTE)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] ?? null
    setSelectedFile(file)
    setError(null)
    setPreviewUrl(() => (file ? URL.createObjectURL(file) : null))
  }

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  useEffect(() => {
    return () => {
      if (resultUrl) {
        URL.revokeObjectURL(resultUrl)
      }
    }
  }, [resultUrl])

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value as FilterName)
  }

  const handlePasteChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPaste(event.target.value as PasteEllipseName)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!selectedFile) {
      setError('Bitte wähle zuerst ein Bild aus.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const url = await processImage(selectedFile, selectedFilter, selectedPaste)
      setResultUrl((current) => {
        if (current) {
          URL.revokeObjectURL(current)
        }
        return url
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Der Upload konnte nicht abgeschlossen werden.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-deface-ink via-slate-950 to-deface-ink text-white flex items-center justify-center px-6 py-12">
      <main className="w-full max-w-6xl space-y-10">
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.75em] text-cyan-200">
            <span className="h-px w-10 bg-cyan-300/70" aria-hidden />
            Image processing
            <span className="h-px w-10 bg-cyan-300/70" aria-hidden />
          </div>
          <h1 className="text-5xl sm:text-6xl font-semibold text-deface-azure tracking-tight">Image Defacer</h1>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left shadow-[0_20px_45px_-30px_rgba(15,23,42,0.8)] backdrop-blur">
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-cyan-200">Active filter</p>
              <label className="mt-4 block text-lg font-medium text-white">
                <span className="sr-only">Active filter wählen</span>
                <select
                  value={selectedFilter}
                  onChange={handleFilterChange}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                >
                  {FILTER_NAMES.map((filter) => (
                    <option key={filter} value={filter} className="bg-slate-900 text-slate-100">
                      {filter}
                    </option>
                  ))}
                </select>
              </label>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left shadow-[0_20px_45px_-30px_rgba(15,23,42,0.8)] backdrop-blur">
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-cyan-200">Paste style</p>
              <label className="mt-4 block text-lg font-medium text-white">
                <span className="sr-only">Paste style wählen</span>
                <select
                  value={selectedPaste}
                  onChange={handlePasteChange}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                >
                  {PASTE_ELLIPSE_NAMES.map((paste) => (
                    <option key={paste} value={paste} className="bg-slate-900 text-slate-100">
                      {paste}
                    </option>
                  ))}
                </select>
              </label>
            </article>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-[0_20px_60px_-40px_rgba(15,23,42,0.9)] backdrop-blur-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-cyan-200">Upload</p>
                <p className="text-sm text-slate-300">Filter: {selectedFilter} · Paste: {selectedPaste}</p>
              </div>
            <form className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4" onSubmit={handleSubmit}>
              <label className="flex-1">
                <span className="sr-only">Bild auswählen</span>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white transition focus:border-cyan-400 focus:outline-none"
                  onChange={handleFileChange}
                />
                {selectedFile && <p className="mt-2 text-xs text-slate-300">{selectedFile.name}</p>}
              </label>
              <button
                type="submit"
                disabled={isSubmitting || !selectedFile}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-deface-azure to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900 transition disabled:opacity-60"
              >
                {isSubmitting ? 'Lade hoch …' : 'Absenden'}
              </button>
            </form>
          </div>

          {error && (
            <p role="alert" className="mt-3 rounded-2xl border border-rose-300/70 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </p>
          )}

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <figure className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left">
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-cyan-200">Original</p>
              {previewUrl ? (
                <a href={previewUrl} target="_blank" rel="noreferrer" className="mt-4 block h-48 w-full overflow-hidden rounded-xl">
                  <img src={previewUrl} alt="Ausgewähltes Originalbild" className="h-full w-full object-contain" />
                </a>
              ) : (
                <p className="mt-4 text-sm text-slate-400">Noch kein Bild ausgewählt.</p>
              )}
            </figure>
            <figure className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left">
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-cyan-200">Ergebnis</p>
              {resultUrl ? (
                <a href={resultUrl} target="_blank" rel="noreferrer" className="mt-4 block h-48 w-full overflow-hidden rounded-xl">
                  <img src={resultUrl} alt="Vom Backend erzeugtes Bild" className="h-full w-full object-contain" />
                </a>
              ) : (
                <p className="mt-4 text-sm text-slate-400">Noch kein Ergebnis.</p>
              )}
            </figure>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
