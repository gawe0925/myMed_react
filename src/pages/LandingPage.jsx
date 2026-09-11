import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from "../components/Navbar"
import DynamicPrompt from '../components/DynamicPrompt'
import demoImg from "../assets/demo-screenshot.png";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    /* app-shell: 溫暖柔和的 Baby Blue 底色 */
    <div className="min-h-screen mt-6 w-full bg-[#f2f7fb] text-slate-700 flex flex-col pt-16 pb-12 px-4 md:px-6 font-sans">

      <Navbar />

      <Toaster />

      {/* main-container: 純白主卡片 */}
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-6 md:p-12 shadow-[0_4px_25px_rgba(186,215,233,0.25)] border border-sky-100 flex flex-col gap-12 text-left">

        {/* ================= HERO SECTION ================= */}
        <header className="flex flex-col items-start w-full">
          <div className="mb-4 px-3.5 py-2 rounded-md bg-[#e7ecef] text-xs font-semibold text-[#343a40] tracking-wide">
            Built on the pharmacy floor, not in a lab
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#212529] leading-tight max-w-2xl">
            Your medications shouldn't need <em className="italic font-normal text-yellow-600">four different apps</em> to manage.
          </h1>

          <div className="space-y-4 text-left mt-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
              <span className="text-s font-semibold text-[#1b4332]/60">Search medication</span>
              <span className="text-s text-slate-500">→</span>
              <span className="text-s font-semibold text-[#1b4332]/70">Build your list</span>
              <span className="text-s text-slate-500">→</span>
              <span className="text-s font-semibold text-[#1b4332]/90">Add personal notes</span>
            </div>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl">
              Simply search medications, build custom lists, and add your own notes in one clean place. Everything ready when you hit the pharmacy counter.
            </p>
          </div>
          
          <div className="flex gap-6 justify-start mt-6 flex-wrap w-full">
            <button
              onClick={() => navigate("/search")}
              className="h-10 px-6 rounded-lg bg-[#ffcb69] border border-[#dee2e6] text-sm font-semibold text-[#212529] transition-all shadow-sm hover:bg-[#ff9e00] active:scale-[0.98]"
            >
              Start building your list
            </button>
            <a 
              href="https://github.com/gawe0925/myMed_react" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-10 px-6 inline-flex items-center rounded-lg bg-sky-50 border border-sky-200/80 text-sm font-semibold text-gray-550 transition-all shadow-sm hover:bg-sky-100 active:scale-[0.98]"
            >
              View the code
            </a>
          </div>
          
          <div className="mt-4 text-xs font-medium tracking-wide text-slate-400">
            Free to use, no account required to search
          </div>

          {/* ANIMATED FRAGMENT VISUAL (Baby Blue Theme) */}
          <div className="relative h-[24px] mt-10 w-full max-w-[560px] hidden sm:block self-center" aria-hidden="true">
            {/* Floating Card 1 */}
            <div className="absolute top-1/2 left-1/2 w-[168px] bg-sky-50/80 border border-sky-100 rounded-lg p-3 shadow-sm text-xs font-medium text-slate-600 opacity-0 animate-[frag1_1.6s_cubic-bezier(.2,.9,.25,1)_.1s_both]">
              Medication search site
            </div>

            {/* Floating Card 2 */}
            <div className="absolute top-1/2 left-1/2 w-[168px] bg-sky-50/80 border border-sky-100 rounded-lg p-3 shadow-sm text-xs font-medium text-slate-600 opacity-0 animate-[frag2_1.6s_cubic-bezier(.2,.9,.25,1)_.25s_both]">
              Notes app
            </div>

            {/* Floating Card 3 */}
            <div className="absolute top-1/2 left-1/2 w-[168px] bg-sky-50/80 border border-sky-100 rounded-lg p-3 shadow-sm text-xs font-medium text-slate-600 opacity-0 animate-[frag3_1.6s_cubic-bezier(.2,.9,.25,1)_.4s_both]">
              Text to your sister
            </div>

            {/* Floating Card 4 */}
            <div className="absolute top-1/2 left-1/2 w-[168px] bg-sky-50/80 border border-sky-100 rounded-lg p-3 shadow-sm text-xs font-medium text-slate-600 opacity-0 animate-[frag4_1.6s_cubic-bezier(.2,.9,.25,1)_.55s_both]">
              Sticky note on fridge
            </div>

            {/* Final Target Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.94] w-[300px] bg-white border border-sky-200 rounded-xl shadow-md p-5 opacity-0 animate-[finalIn_1s_ease-out_1.35s_both]">
              <div className="h-8 border border-sky-100 bg-sky-50/50 rounded-md flex items-center px-3 text-xs text-sky-400 mb-3">
                Search Medication...
              </div>
              <div className="flex justify-between items-center text-xs py-2 border-b border-sky-50">
                <span className="font-semibold text-slate-700">Panadol Osteo</span>
                <span className="text-[10px] text-sky-700 bg-sky-100/70 px-2 py-0.5 rounded font-semibold">Daily</span>
              </div>
              <div className="flex justify-between items-center text-xs py-2 border-b border-sky-50">
                <span className="font-semibold text-slate-700">Ventolin</span>
                <span className="text-[10px] text-sky-700 bg-sky-100/70 px-2 py-0.5 rounded font-semibold">Bali trip</span>
              </div>
              <div className="flex justify-between items-center text-xs py-2">
                <span className="font-semibold text-slate-700">Metformin</span>
                <span className="text-[10px] text-sky-700 bg-sky-100/70 px-2 py-0.5 rounded font-semibold">Daily</span>
              </div>
              <div className="mt-3 bg-amber-50/80 border border-amber-200/60 rounded-md p-2.5 text-xs text-amber-800 italic">
                note: get the blue box, not the white one — Mum
              </div>
            </div>
          </div>
        </header>

        <div className="mt-2 w-full max-w-4xl mx-auto">
          {/* 外層 Mockup 容器：擬真瀏覽器外框 */}
          <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-xl shadow-sky-900/5 transition-all">
            
            {/* 瀏覽器頂部 Bar (帶有三個圓點與網址列) */}
            <div className="flex items-center gap-2 border-b border-sky-100 bg-slate-50/80 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300"></span>
              </div>
              
              {/* 假網址列 */}
              <div className="ml-2 flex-1 rounded-md bg-white border border-slate-200/60 px-3 py-0.5 text-xs text-slate-400 font-mono text-center sm:text-left">
                https://my-med-react.vercel.app/lists
              </div>
            </div>

            {/* 截圖展示區 */}
            <div className="relative bg-slate-50">
              <img
                src={demoImg}
                alt="myMedication Demo"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>

        </div>

        {/* SECTION 分隔線 */}
        <div className="w-full h-px bg-gray-200" />

        {/* ================= PROBLEM SECTION ================= */}
        <section className="w-full">
          <div className="max-w-2xl mb-6">
            <div className="inline-flex items-center mb-2 text-xs font-semibold uppercase tracking-wider text-[#415a77] bg-[#ffddd2] px-2.5 py-0.5 rounded">
              The problem
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#212529] leading-snug">
              Google gives you answers. Not a list!
            </h2>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              Googling a med tells you what it is, but leaves you stranded at the counter. You need a way to organize what you find into actionable lists.
            </p>
            <div className="mt-6 flex flex-col gap-1.5 text-left">
              <span className='text-gray-400 text-sm font-medium'>Standing at the counter:</span>
              <DynamicPrompt />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border border-[#e9ecef] bg-[#f5f3f4] p-5 transition-all hover:bg-white hover: hover:shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#9a8c98] flex items-center justify-center mb-3 shadow-sm">
                <svg className="w-5 h-5 stroke-[#e9ecef]" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <h4 className="mt-4 text-sm font-semibold text-[#212529] mb-1">A good search tool</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Plenty of sites will tell you what a medication is for. On its own, genuinely useful.</p>
            </div>

            <div className="rounded-lg border border-[#e9ecef] bg-[#f5f3f4] p-5 transition-all hover:bg-white hover: hover:shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#9a8c98] flex items-center justify-center mb-3 shadow-sm">
                <svg className="w-5 h-5 stroke-[#e9ecef]" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" /><path d="M8 9h8M8 13h5" /></svg>
              </div>
              <h4 className="mt-4 text-sm font-semibold text-[#212529] mb-1">A good notes app</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Plenty of apps will let you jot down a brand preference or a concession card number. Also genuinely useful.</p>
            </div>

            <div className="rounded-lg border border-[#e9ecef] bg-[#f5f3f4] p-5 transition-all hover:bg-white hover: hover:shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#9a8c98] flex items-center justify-center mb-3 shadow-sm">
                <svg className="w-5 h-5 stroke-[#e9ecef]" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </div>
              <h4 className=" mt-4 text-sm font-semibold text-[#212529] mb-1">A good way to share it</h4>
              <p className="text-xs text-slate-600 leading-relaxed">A screenshot, a text message. Works, until someone asks a follow-up question and you're back to switching tabs.</p>
            </div>
          </div>

          {/* 淡黃/暖琥珀 Accent Highlight */}
          <div className="mt-6 p-4 rounded-lg bg-amber-100/60 border border-amber-200/50">
            <p className="italic font-medium text-xs sm:text-sm text-slate-700">
              Tape and scissors both work fine on their own. What you actually want is <span className="text-amber-800 font-semibold underline underline-offset-2 decoration-olive-500">a tape dispenser.</span>
            </p>
          </div>
        </section>

        {/* SECTION 分隔線 */}
        <div className="w-full h-px bg-gray-200" />

        {/* ================= HOW IT WORKS SECTION ================= */}
        <section id="how" className="w-full">
          <div className="max-w-2xl mb-6">
            <div className="inline-flex items-center mb-2 text-xs font-semibold uppercase tracking-wider text-[#588157] bg-[#a3b18a]/40 px-2.5 py-0.5 rounded">
              How it works
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#212529] leading-snug">
              Four steps, one place you'll actually go back to.
            </h2>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              No new habit to build — you already search for your medication. myMedication just keeps what you find.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-lg border border-[#f8f9fa] bg-[#f8f9fa] p-5 shadow-sm transition-all hover:border-gray-300 hover:shadow-lg">
              <div className="text-xs font-bold text-gray-500 mb-2">01</div>
              <h4 className="text-sm font-semibold text-[#212529] mb-1">Search it</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Type the name on your script, even if you're not sure of the spelling. Fuzzy search finds it anyway.</p>
            </div>

            <div className="rounded-lg border border-[#f8f9fa] bg-[#f8f9fa] p-5 shadow-sm transition-all hover:border-gray-300 hover:shadow-lg">
              <div className="text-xs font-bold text-gray-500 mb-2">02</div>
              <h4 className="text-sm font-semibold text-[#212529] mb-1">Add it to a list</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Daily meds, a trip, someone you're picking up for — make as many lists as your life actually needs.</p>
            </div>

            <div className="rounded-lg border border-[#f8f9fa] bg-[#f8f9fa] p-5 shadow-sm transition-all hover:border-gray-300 hover:shadow-lg">
              <div className="text-xs font-bold text-gray-500 mb-2">03</div>
              <h4 className="text-sm font-semibold text-[#212529] mb-1">Note anything that matters</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Brand you prefer, your concession card, "ask if there's a shortage" — whatever you'd normally forget by the counter.</p>
            </div>

            <div className="rounded-lg border border-[#f8f9fa] bg-[#f8f9fa] p-5 shadow-sm transition-all hover:border-gray-300 hover:shadow-lg">
              <div className="text-xs font-bold text-gray-500 mb-2">04</div>
              <h4 className="text-sm font-semibold text-[#212529] mb-1">Hand it off</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Send the whole list — notes included — to whoever's picking it up for you. <em className="italic text-slate-400">(In progress.)</em></p>
            </div>
          </div>
        </section>

        <div className="w-full rounded-xl bg-[#fff0f3]/60 p-6">
          <h3 className="text-lg font-bold text-[#212529] mb-2">Why not just ask an AI?</h3>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">Fair question, and a fast one. But it doesn't hold up for what this is actually for.</p>
          <ul className="list-none mt-4 flex flex-col gap-2.5">
            <li className="text-xs md:text-sm text-slate-600 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#660708]">
              An AI reply is a wall of text you edit by typing a new prompt. A list is something you tap, rename, and reorder in a second.
            </li>
            <li className="text-xs md:text-sm text-slate-600 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#660708]">
              Every question costs something. A list you built once just sits there, free, for as long as you need it.
            </li>
            <li className="text-xs md:text-sm text-slate-600 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#660708]">
              The people who most need to hand a list to someone else (an elderly parent, someone with a support worker) are the least likely to want to prompt a chatbot to get it.
            </li>
          </ul>
        </div>

        <div className="w-full h-px bg-gray-200" />

        {/* ================= FEATURES SECTION ================= */}
        <section className="w-full">
          <div className="max-w-2xl mb-6">
            <div className="inline-flex items-center mb-2 text-xs font-semibold uppercase tracking-wider text-sky-800 bg-sky-100/60 px-2.5 py-0.5 rounded border border-sky-200/50">
              What's inside
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#212529] leading-snug">
              Everything a script needs, nothing it doesn't.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="rounded-lg border border-sky-100 bg-white p-5 border-l-4 border-l-[#8d99ae] shadow-sm">
              <h4 className="text-sm font-semibold text-[#212529] mb-1">Fuzzy search</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Get a match even if you weren't sure how it's spelled.</p>
            </div>

            <div className="rounded-lg border border-sky-100 bg-white p-5 border-l-4 border-l-[#8d99ae] shadow-sm">
              <h4 className="text-sm font-semibold text-[#212529] mb-1">Custom lists</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Daily meds, a trip, someone else's pickup — split them however makes sense to you.</p>
            </div>

            <div className="rounded-lg border border-sky-100 bg-white p-5 border-l-4 border-l-[#8d99ae] shadow-sm">
              <h4 className="text-sm font-semibold text-[#212529] mb-1">Rename inline</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Click a list name, type, click away. It's saved.</p>
            </div>

            <div className="rounded-lg border border-sky-100 bg-white p-5 border-l-4 border-l-[#8d99ae] shadow-sm">
              <h4 className="text-sm font-semibold text-[#212529] mb-1">Personal notes</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Brand, concession card, anything you'd otherwise forget to mention.</p>
            </div>

            <div className="rounded-lg border border-sky-100 bg-white p-5 border-l-4 border-l-[#8d99ae] shadow-sm">
              <h4 className="text-sm font-semibold text-[#212529] mb-1">Your account, your lists</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Signed in with Firebase Auth. Nobody else sees them.</p>
            </div>

            <div className="rounded-lg border border-sky-100 bg-white p-5 border-l-4 border-l-[#8d99ae] shadow-sm">
              <h4 className="text-sm font-semibold text-[#212529] mb-1">Synced everywhere</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Add it on your phone at the pharmacy, it's already there on your laptop at home.</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 border border-sky-200/60 bg-[#edf2f4] rounded-md px-3.5 py-1.5 text-xs text-slate-600 mt-6">
            <span className="text-[10px] bg-[#ffbc42] text-[#212529] px-2 py-0.5 rounded font-semibold">NEXT UP</span>
            Share a list with your family member or a caregiver.
          </div>
        </section>

        {/* SECTION Line*/}
        <div className="w-full h-px bg-gray-200" />

        {/* ================= ABOUT SECTION ================= */}
        <section id="about" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
          {/* left section */}
          <div>
            <div className="inline-flex items-center mb-2 text-xs font-semibold uppercase tracking-wider text-[#212529] bg-[#b8c0ff]/60 px-2.5 py-0.5 rounded">
              Who built this
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#212529] leading-snug mb-3">
              Mark Cheng
              <br />
              <span className="text-slate-500 font-normal text-lg md:text-xl">
                Built to fix real-world pharmacy challenges.
              </span>
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Born on the dispensary floor and shaped by direct feedback from pharmacists and patients. I transformed frontline healthcare insights into a production-ready application to streamline daily workflows.
            </p>
          </div>

          {/* right section */}
          <div className="grid grid-cols-1 gap-3 w-full">
            <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm flex items-start gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg text-lg">🏥</div>
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Frontline Driven</h3>
                <p className="text-xs text-slate-500 mt-0.5">Designed from real dispensary bottlenecks, not standard tutorials.</p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm flex items-start gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg text-lg">⚡</div>
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">User-Centric Workflow</h3>
                <p className="text-xs text-slate-500 mt-0.5">Iterated through continuous patient & pharmacist feedback loops.</p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm flex items-start gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg text-[#4361ee] text-lg">🚀</div>
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Production Architecture</h3>
                <p className="text-xs text-slate-500 mt-0.5">Fully responsive, cloud-backed app with automated CI/CD deployment.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA SECTION ================= */}
        <section className="rounded-xl border border-sky-100 bg-sky-50/60 p-8 md:p-10 w-full text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#212529]">
            No more switching tabs at the counter.
          </h2>
          <p className="text-slate-600 mt-2 mb-6 text-xs md:text-sm">
            Search any medication, add notes, and build your own custom list in seconds.
          </p>
          <div className="flex gap-3 justify-start flex-wrap">
            <button
              onClick={() => navigate("/search")}
              className="h-10 px-6 rounded-lg bg-[#8ac926]/50 border border-[#8ac926]/10 text-sm font-semibold text-[#343a40] transition-all shadow-sm hover:bg-[#f0ffce] hover:border-[#dee2e6] active:scale-[0.98]"
            >
              Start building your list
            </button>
            <a 
              href="https://github.com/gawe0925/myMed_react" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-10 px-6 inline-flex items-center rounded-lg bg-white border border-sky-200 text-sm font-semibold text-sky-800 transition-all shadow-sm hover:bg-sky-50 active:scale-[0.98]"
            >
              View the code on GitHub
            </a>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="pt-8 pb-4 text-left max-w-4xl mx-auto w-full px-2 text-slate-400 text-xs font-medium">
        myMedication — built from the pharmacy floor.{' '}
        <a href="https://github.com/gawe0925/myMed_react" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">
          GitHub
        </a>
      </footer>
    </div>
  );
}