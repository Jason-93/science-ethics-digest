import { Link, useParams } from 'react-router'
import { articles, siteInfo } from '../data/articles'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, CalendarDays, Clock3, ExternalLink, Tag } from 'lucide-react'

const categoryColor: Record<string, string> = {
  'AI 安全': 'bg-red-100 text-red-800 border-red-200',
  '神经伦理': 'bg-violet-100 text-violet-800 border-violet-200',
  '生物伦理': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  '研究诚信': 'bg-amber-100 text-amber-800 border-amber-200',
  'AI 治理': 'bg-sky-100 text-sky-800 border-sky-200',
}

export default function Article() {
  const { slug } = useParams()
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-stone-50">
        <p className="text-stone-600">未找到该报道。</p>
        <Link to="/" className="text-red-700 hover:underline">
          返回首页
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800">
            <ArrowLeft className="h-4 w-4" /> 返回 {siteInfo.name}
          </Link>
          <Badge className={categoryColor[article.category]}>{article.category}</Badge>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-stone-500">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" /> {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock3 className="h-4 w-4" /> {article.readTime}
          </span>
        </div>

        <h1 className="font-serif text-3xl font-bold leading-snug md:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 border-l-4 border-red-300 pl-4 text-lg leading-relaxed text-stone-600">
          {article.subtitle}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.map((t) => (
            <Badge key={t} variant="outline" className="gap-1 text-stone-500">
              <Tag className="h-3 w-3" /> {t}
            </Badge>
          ))}
        </div>

        {/* 事件描述 */}
        <section className="mt-12">
          <h2 className="mb-5 font-serif text-2xl font-semibold text-stone-800">
            事件描述
          </h2>
          <div className="space-y-5">
            {article.eventDescription.map((p, i) => (
              <p key={i} className="leading-8 text-stone-700">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* 完整时间线（如有） */}
        {article.timeline && (
          <section className="mt-12">
            <h2 className="mb-5 font-serif text-2xl font-semibold text-stone-800">
              事件时间线
            </h2>
            <ol className="relative ml-3 space-y-6 border-l border-stone-200 pl-6">
              {article.timeline.map((t, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-4 ring-red-100" />
                  <p className="font-semibold text-red-700">
                    {t.date} · {t.title}
                  </p>
                  <p className="mt-1 leading-7 text-stone-600">{t.detail}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* 伦理分析 */}
        <section className="mt-12">
          <h2 className="mb-5 font-serif text-2xl font-semibold text-stone-800">
            伦理分析
          </h2>
          <div className="space-y-8">
            {article.analysis.map((sec, i) => (
              <div key={i}>
                <h3 className="mb-3 font-serif text-lg font-semibold text-red-800">
                  {sec.heading}
                </h3>
                <div className="space-y-4">
                  {sec.body.map((p, j) => (
                    <p key={j} className="leading-8 text-stone-700">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 来源 */}
        <section className="mt-12 rounded-lg border border-stone-200 bg-white p-6">
          <h2 className="mb-4 font-serif text-xl font-semibold text-stone-800">来源</h2>
          <ul className="space-y-3">
            {article.sources.map((s, i) => (
              <li key={i}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-2 text-stone-600 hover:text-red-700"
                >
                  <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-stone-400 group-hover:text-red-500" />
                  <span className="leading-7">
                    <span className="font-medium">{s.title}</span>
                    <span className="text-stone-400"> — {s.publisher}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800">
            <ArrowLeft className="h-4 w-4" /> 返回全部报道
          </Link>
        </div>
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-6 text-sm text-stone-500">
          {siteInfo.name} · {siteInfo.issueLabel}
        </div>
      </footer>
    </div>
  )
}
