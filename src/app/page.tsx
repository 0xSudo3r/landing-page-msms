import { DownloadButton } from "@/components/DownloadButton";
import { 
  Package, 
  BarChart3, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Store,
  ChevronRight
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 bg-black text-white selection:bg-indigo-500/30">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* Navigation */}
      <header className="border-b border-white/[0.08] bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-white font-semibold text-lg tracking-wide group cursor-pointer">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center transition-transform group-hover:scale-105">
              <Store className="h-4 w-4 text-white" />
            </div>
            <span>مدير المحل</span>
          </div>
          <a href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group">
            المميزات
            <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 rtl:rotate-180 rtl:group-hover:translate-x-1" />
          </a>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-40 flex flex-col items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-zinc-300 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-colors hover:bg-white/10 cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              التحديث الجديد 2026
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 max-w-3xl leading-[1.1]">
              إدارة محلك. 
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-white drop-shadow-sm">بكل بساطة.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed font-light">
              نظام متكامل للمخزون، المبيعات، الصيانة، والعملاء. 
              صُمم ليكون الأسرع والأكثر أماناً في السوق المصري.
            </p>
            
            <div className="pt-6 relative">
              <div className="absolute inset-0 bg-white/20 blur-[30px] rounded-full scale-75 opacity-50 pointer-events-none -z-10"></div>
              <DownloadButton />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm font-medium text-zinc-500">
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                <span>بدون اشتراك شهري</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                <span>دعم كامل للعربية</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>تشفير للبيانات</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">أدوات قوية. واجهة استثنائية.</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-xl font-light">كل ما تحتاجه لزيادة مبيعاتك والتحكم في محلك بضغطة زر، بتصميم يريح العين ويرفع الإنتاجية.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Feature 1 */}
              <div className="group relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-10 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-indigo-500/20 transition-colors"></div>
                <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Package className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">المخزون والمبيعات</h3>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  تتبع دقيق للمنتجات، دعم كامل لأجهزة الباركود، وإصدار فواتير سريعة مع إدارة مبسطة للمرتجعات والخصومات.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-10 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-cyan-500/20 transition-colors"></div>
                <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <BarChart3 className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">التقارير والأرباح</h3>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  تقارير مالية يومية وشهرية توضح حركة المبيعات وصافي الأرباح لمساعدتك في اتخاذ قرارات دقيقة مبنية على الأرقام.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-10 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-emerald-500/20 transition-colors"></div>
                <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Users className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">العملاء والموردين</h3>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  قاعدة بيانات متكاملة بجهات الاتصال (دعم كامل للأرقام بـ 13 رقماً)، ومتابعة دقيقة للديون والمدفوعات.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-10 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-amber-500/20 transition-colors"></div>
                <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <ShieldCheck className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">الصيانة والأمان</h3>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  إدارة ذكية لعمليات الصيانة. مع نسخ احتياطي تلقائي سحابي ومحلي مشفر لحماية بياناتك من التلف أو الفقد.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-black/50 backdrop-blur-xl py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Store className="h-5 w-5 opacity-50" />
            <span className="opacity-80">مدير المحل</span>
          </div>
          
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} جميع الحقوق محفوظة. مُصمم بعناية.
          </p>
          
          <div className="flex items-center gap-4 text-sm font-medium">
            <a href="https://github.com/0xSudo3r/mobile-shop-manager-arabic" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}


