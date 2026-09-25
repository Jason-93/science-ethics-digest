import { Link } from 'react-router'
import { articles, siteInfo } from '../data/articles'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, CalendarDays, Tag, Clock3, Radio } from 'lucide-react'

const categoryColor: Record<string, string> = {
  'AI 安全': 'bg-red-100 text-red-800 border-red-200',
  '神经伦理': 'bg-violet-100 text-violet-800 border-violet-200',
  '生物伦理': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  '研究诚信': 'bg-amber-100 text-amber-800 border-amber-200',
  'AI 治理': 'bg-sky-100 text-sky-800 border-sky-200',
}

export default function Home() {
  const featured = articles.find((a) => a.featured)!
  const rest = articles.filter((a) => !a.featured)

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight">
              {siteInfo.name}
            </h1>
            <p className="text-sm text-stone-500">{siteInfo.englishName}</p>
          </div>
          <Badge variant="outline" className="gap-1.5 border-red-300 bg-red-50 text-red-700">
            <Radio className="h-3.5 w-3.5" />
            {siteInfo.issueLabel}
          </Badge>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Hero */}
        <section className="mb-12">
          <p className="max-w-3xl text-lg leading-relaxed text-stone-600">
            {siteInfo.description}
          </p>
        </section>

        {/* Featured */}
        <section className="mb-14">
          <h2 className="mb-4 font-serif text-xl font-semibold text-stone-800">
            焦点报道
          </h2>
          <Card className="overflow-hidden border-stone-200 shadow-sm">
            <CardHeader className="border-b border-stone-100 bg-white pb-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge className={categoryColor[featured.category]}>{featured.category}</Badge>
                <span className="flex items-center gap-1 text-sm text-stone-500">
                  <CalendarDays className="h-4 w-4" /> {featured.date}
                </span>
                <span className="flex items-center gap-1 text-sm text-stone-500">
                  <Clock3 className="h-4 w-4" /> {featured.readTime}
                </span>
              </div>
              <CardTitle className="font-serif text-3xl font-bold leading-snug">
                {featured.title}
              </CardTitle>
              <p className="mt-2 text-base leading-relaxed text-stone-600">
                {featured.subtitle}
              </p>
            </CardHeader>
            <CardContent className="bg-white pt-6">
              <p className="leading-relaxed text-stone-700">{featured.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {featured.tags.map((t) => (
                  <Badge key={t} variant="outline" className="gap-1 text-stone-500">
                    <Tag className="h-3 w-3" /> {t}
                  </Badge>
                ))}
              </div>
              {/* mini timeline */}
              <div className="mt-8">
                <h3 className="mb-4 font-serif text-lg font-semibold text-stone-800">
                  事件时间线
                </h3>
                <ol className="relative ml-3 space-y-5 border-l border-stone-200 pl-6">
                  {featured.timeline?.map((t, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-4 ring-red-100" />
                      <p className="text-sm font-semibold text-red-700">{t.date} · {t.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-stone-600">{t.detail}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <Link
                to={`/article/${featured.slug}`}
                className="mt-8 inline-flex items-center gap-1.5 font-medium text-red-700 hover:underline"
              >
                阅读完整报道与分析 <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* All articles */}
        <section>
          <h2 className="mb-4 font-serif text-xl font-semibold text-stone-800">
            本期全部报道
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((a) => (
              <Card key={a.slug} className="flex flex-col border-stone-200 bg-white shadow-sm transition hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge className={categoryColor[a.category]}>{a.category}</Badge>
                    <span className="flex items-center gap-1 text-xs text-stone-500">
                      <CalendarDays className="h-3.5 w-3.5" /> {a.date}
                    </span>
                  </div>
                  <CardTitle className="font-serif text-lg font-bold leading-snug">
                    {a.title}
                  </CardTitle>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{a.subtitle}</p>
                </CardHeader>
                <CardContent className="mt-auto pt-0">
                  <p className="text-sm leading-relaxed text-stone-600 line-clamp-3">
                    {a.summary}
                  </p>
                  <Link
                    to={`/article/${a.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-red-700 hover:underline"
                  >
                    阅读报道 <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="mt-14 rounded-lg border border-stone-200 bg-white p-6">
          <h2 className="mb-2 font-serif text-lg font-semibold text-stone-800">关于本站</h2>
          <p className="text-sm leading-relaxed text-stone-600">
            本站由定时任务驱动更新：每次运行时检索科学伦理与 AI 安全领域的最新事件，
            撰写包含事件描述与独立分析的报道，追加到内容库并提交至 Git 仓库。
            所有报道均附来源链接，供读者自行核实。最近更新：{siteInfo.updatedAt}。
          </p>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-stone-500">
          {siteInfo.name} · 科学伦理与 AI 安全事件追踪 · 内容自动更新
        </div>
      </footer>
    </div>
  )
}
