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
    <section className="px-5 pt-[100px] pb-20 bp-md:pt-20 bp-md:pb-16 bp-sm:py-[70px] bp-xs:py-[60px] mobile:py-[60px]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-16 justify-center bp-md:mb-12 bp-sm:mb-10 bp-xs:mb-8">
        <img src="/naqsh-about.svg" alt="" className="w-[26.6px] h-[26.6px] bp-sm:w-[22px] bp-sm:h-[22px] bp-xs:w-[20px] bp-xs:h-[20px]" />
        <p className="font-sf text-[24px] text-primary m-0 font-normal bp-sm:text-[21px] bp-xs:text-[20px]">Biz haqimizda</p>
        <img src="/naqsh-about.svg" alt="" className="w-[26.6px] h-[26.6px] bp-sm:w-[22px] bp-sm:h-[22px] bp-xs:w-[20px] bp-xs:h-[20px]" />
      </div>

      {/* Rows */}
      {ABOUT_ROWS.map((row, i, arr) => (
        <div
          key={row.title}
          className="sticky top-[130px] bp-lg:top-[100px] bp-md:top-[80px] bp-sm:top-[70px] bp-xs:top-[64px] mobile:top-[70px] bg-bg"
          style={{ zIndex: i + 1 }}
        >
          {/* Desktop layout */}
          <div className="flex py-[60px] items-start bp-lg:py-[48px] bp-md:py-[40px] bp-sm:hidden bp-xs:hidden mobile:hidden">
            <div className="flex-[0_0_50%] pr-8">
              <p className="font-ppe text-[70px] text-primary m-0 font-normal leading-[1.1] tracking-[-0.02em] bp-lg:text-[54px] bp-md:text-[42px]">
                {row.title}
              </p>
            </div>
            <div className="flex-[0_0_50%] pl-8 bp-md:pl-6">
              <p className="font-sf text-[44px] text-primary m-0 font-normal leading-[1.3] bp-lg:text-[34px] bp-md:text-[26px]">
                {row.desc}
              </p>
            </div>
          </div>

          {/* Stacked layout — mobile & small tablets */}
          <div className="hidden mobile:block bp-sm:block bp-xs:block py-[22px] bp-sm:py-[26px]">
            <p className="font-ppe text-[46px] text-primary m-0 font-normal leading-[1.1] tracking-[-0.02em] mb-4 bp-sm:text-[48px] bp-xs:text-[42px]">
              {row.title}
            </p>
            <p className="font-sf text-[18px] text-primary m-0 font-normal leading-[1.55] pb-[10px] bp-sm:text-[20px]">
              {row.desc}
            </p>
          </div>

          {/* Divider */}
          {i < arr.length - 1 && <div className="h-px bg-accent w-full bp-sm:hidden bp-xs:hidden mobile:hidden" />}
          <div className="hidden mobile:block bp-sm:block bp-xs:block h-px bg-accent w-full" />
        </div>
      ))}
    </section>
  )
}
