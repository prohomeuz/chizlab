const ABOUT_ROWS = [
  {
    title: 'Biz kimmiz?',
    desc: 'Chizlab — chizmachilik va dizayn materiallari makoni. Bilim va kreativlik bir joyda.',
  },
  {
    title: 'Hikoyamiz',
    desc: 'Oddiy gʻoyadan boshlangan loyiha. Bugun esa ijodkorlar uchun platforma.',
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
        <div
          key={row.title}
          className="sticky top-[130px] mobile:top-[70px] bg-bg"
          style={{ zIndex: i + 1 }}
        >
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

          {/* Mobile layout — always visible */}
          <div className="hidden mobile:block py-[22px]">
            <p className="font-ppe text-[46px] text-primary m-0 font-normal leading-[1.1] tracking-[-0.02em] mb-4">
              {row.title}
            </p>
            <p className="font-sf text-[18px] text-primary m-0 font-normal leading-[1.55] pb-[10px]">
              {row.desc}
            </p>
          </div>

          {/* Divider */}
          {i < arr.length - 1 && <div className="h-px bg-accent w-full mobile:hidden" />}
          <div className="hidden mobile:block h-px bg-accent w-full" />
        </div>
      ))}
    </section>
  )
}
