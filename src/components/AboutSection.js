const ABOUT_ROWS = [
  {
    title: 'Biz kimmiz?',
    desc: 'Chizlab — chizmachilik va dizayn materiallari makoni. Bilim va kreativlik bir joyda.',
  },
  {
    title: 'Hikoyamiz',
    desc: "Oddiy g'oyadan boshlangan loyiha. Bugun esa ijodkorlar uchun platforma.",
  },
  {
    title: 'Nega Chizlab?',
    desc: "Murakkab texnik bilimlarni oson va kreativ usulda o'rganing.",
  },
  {
    title: 'Jamoamiz',
    desc: 'Sifat va innovatsiyaga intiluvchi professional mutaxassislar birlashmasi.',
  },
  {
    title: 'Missiyamiz',
    desc: 'Oʻzbekiston ijodkorlik madaniyatini yuksaltirish va yangi imkoniyatlar yaratish.',
  },
  {
    title: "Ta'riflar",
    desc: (
      <>
        Bepul bazadan foydalaning yoki <strong className="font-bold">Pro</strong> bilan barcha
        resurslarga cheksiz yo'l oching.
      </>
    ),
  },
]

export default function AboutSection({ openAboutIdx, onToggle }) {
  return (
    <section className="px-5 pt-[100px] pb-20 mobile:py-[60px]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-16 justify-center">
        <img src="/naqsh-about.svg" alt="" className="w-[26.6px] h-[26.6px]" />
        <p className="font-sf text-[24px] text-primary m-0 font-normal">Biz haqimizda</p>
        <img src="/naqsh-about.svg" alt="" className="w-[26.6px] h-[26.6px]" />
      </div>

      {/* Rows */}
      {ABOUT_ROWS.map((row, i, arr) => (
        <div key={row.title}>
          {/* Desktop layout */}
          <div className="flex py-[60px] items-start mobile:hidden">
            <div className="flex-[0_0_50%] pr-8">
              <p className="font-ppe text-[70px] text-primary m-0 font-normal leading-[1.1] tracking-[-0.02em]">
                {row.title}
              </p>
            </div>
            <div className="flex-[0_0_50%] pl-8">
              <p className="font-sf text-[44px] text-primary m-0 font-normal leading-[1.3]">
                {row.desc}
              </p>
            </div>
          </div>

          {/* Mobile layout — accordion */}
          <div className="hidden mobile:block">
            <button
              onClick={() => onToggle(i)}
              className="w-full bg-transparent border-0 py-[22px] flex items-center justify-between gap-3 text-left [-webkit-tap-highlight-color:transparent]"
            >
              <p className="font-ppe text-[46px] text-primary m-0 font-normal leading-[1.1] tracking-[-0.02em]">
                {row.title}
              </p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
                style={{
                  transform: openAboutIdx === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.42s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#003837"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              className="grid"
              style={{
                gridTemplateRows: openAboutIdx === i ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.44s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div className="overflow-hidden">
                <p
                  className="font-sf text-[18px] text-primary m-0 font-normal leading-[1.55] pb-[26px]"
                  style={{
                    opacity: openAboutIdx === i ? 1 : 0,
                    transform: openAboutIdx === i ? 'translateY(0)' : 'translateY(8px)',
                    transition:
                      openAboutIdx === i
                        ? 'opacity 0.36s ease 0.09s, transform 0.36s ease 0.09s'
                        : 'opacity 0.16s ease, transform 0.16s ease',
                  }}
                >
                  {row.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          {i < arr.length - 1 && <div className="h-px bg-accent w-full mobile:hidden" />}
          <div className="hidden mobile:block h-px bg-accent w-full" />
        </div>
      ))}
    </section>
  )
}
