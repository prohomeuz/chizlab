import Image from 'next/image'
import mirzoulugbekImg from '../../public/mirzo-ulugbek.png'

const TEAM_MEMBERS = [
  {
    name: 'Moʻtabarxon\nTurdaliyeva',
    role: 'Gʻoya muallifi &\ndizayner',
    credentials: 'Magistr, MRDI\nVeb&Grafik dizayner',
    links: [
      { label: 'Telegram', href: 'https://t.me/turdaliyeva_mm' },
      { label: 'Instagram', href: 'https://instagram.com/motabarxon_muhammadyusuf/' },
      { label: 'Elektron pochta', href: 'mailto:turdaliyevamm@gmail.com' },
    ],
    photo: '/mutabarxon.svg',
    photoData: null,
    dark: false,
  },
  {
    name: 'Mirzo Ulugʻbek\nXudoyberdiyev',
    role: 'Bosh\ndasturchi',
    credentials: 'Frontend arxitektor',
    links: [
      { label: 'Telegram', href: 'https://t.me/mu_xudoyberdiyev' },
      { label: 'Veb sayt', href: 'https://ilhomlandim.uz' },
      { label: 'Github', href: 'https://github.com/prohomeuz' },
      { label: 'Elektron pochta', href: 'mailto:mu.xudoyberdiyev@gmail.com' },
    ],
    photo: mirzoulugbekImg,
    photoData: mirzoulugbekImg,
    dark: false,
  },
  {
    name: 'Ismoilov\nIslom',
    role: 'Art\ndirektor',
    credentials: 'Grafik dizayner,\nCambridge LC',
    links: [
      { label: 'Telegram', href: 'https://t.me/islamismailov' },
      { label: 'Behance', href: 'https://www.behance.net/ismailovislam' },
      { label: 'Elektron pochta', href: 'mailto:ismailovislam.wide@gmail.com' },
    ],
    photo: '/ismailov.svg',
    photoData: null,
    dark: true,
  },
]

export default function TeamSection() {
  return (
    <section className="pt-[100px] px-5 pb-20 bp-md:pt-20 bp-md:pb-16 bp-sm:py-[70px] bp-xs:py-[60px] mobile:py-[60px]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-16 justify-center bp-md:mb-12 bp-sm:mb-10 bp-xs:mb-8 mobile:mb-8">
        <img src="/naqsh-team.svg" alt="" className="w-[26.6px] h-[26.6px] bp-sm:w-[22px] bp-sm:h-[22px] bp-xs:w-[20px] bp-xs:h-[20px]" />
        <p className="font-sf text-[24px] text-primary m-0 font-normal bp-sm:text-[21px] bp-xs:text-[20px]">Jamoamiz</p>
        <img src="/naqsh-team.svg" alt="" className="w-[26.6px] h-[26.6px] bp-sm:w-[22px] bp-sm:h-[22px] bp-xs:w-[20px] bp-xs:h-[20px]" />
      </div>

      {/* Team member rows */}
      {TEAM_MEMBERS.map((member, i, arr) => (
        <div key={member.name}>
          <div className="grid grid-cols-[33.33%_41.67%_25%] grid-rows-[auto_auto] py-[60px] items-start bp-lg:py-[48px] bp-md:py-10 bp-sm:grid-cols-[1fr_170px] bp-sm:grid-rows-[auto_auto_auto] bp-sm:py-9 bp-sm:gap-x-5 bp-xs:grid-cols-[1fr_147px] bp-xs:grid-rows-[auto_auto_auto] bp-xs:py-8 bp-xs:gap-x-4 mobile:grid-cols-[1fr_147px] mobile:grid-rows-[auto_auto_auto] mobile:py-8 mobile:gap-x-4">
            <p className="[grid-column:1] [grid-row:1] font-ppe text-[60px] text-primary m-0 font-normal leading-[1.1] whitespace-pre-line bp-lg:text-[46px] bp-md:text-[36px] bp-sm:[grid-column:1/3] bp-sm:text-[44px] bp-sm:mb-6 bp-xs:[grid-column:1/3] bp-xs:text-[40px] bp-xs:mb-[25px] mobile:[grid-column:1/3] mobile:text-[40px] mobile:mb-[25px]">
              {member.name}
            </p>
            <p className="[grid-column:2] [grid-row:1] font-ppe text-[60px] text-primary m-0 font-normal leading-[1.1] whitespace-pre-line pl-8 bp-lg:text-[46px] bp-md:text-[36px] bp-md:pl-5 bp-sm:[grid-column:1] bp-sm:[grid-row:2] bp-sm:text-[26px] bp-sm:pl-0 bp-sm:mt-1.5 bp-xs:[grid-column:1] bp-xs:[grid-row:2] bp-xs:text-[24px] bp-xs:pl-0 bp-xs:mt-1.5 mobile:[grid-column:1] mobile:[grid-row:2] mobile:text-[24px] mobile:pl-0 mobile:mt-1.5">
              {member.role}
            </p>
            <div className="[grid-column:3] [grid-row:1/3] flex justify-end items-start bp-sm:[grid-column:2] bp-sm:[grid-row:2/4] bp-xs:[grid-column:2] bp-xs:[grid-row:2/4] mobile:[grid-column:2] mobile:[grid-row:2/4]">
              <div
                className={`relative w-[301px] h-[301px] overflow-hidden bp-lg:w-[240px] bp-lg:h-[240px] bp-md:w-[180px] bp-md:h-[180px] bp-sm:w-[170px] bp-sm:h-[170px] bp-xs:w-[147px] bp-xs:h-[147px] mobile:w-[147px] mobile:h-[147px] ${
                  member.dark ? 'bg-dark' : 'bg-transparent'
                }`}
              >
                <Image
                  src={member.photo}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 749px) 170px, 301px"
                  loading="lazy"
                  {...(member.photoData ? { placeholder: 'blur' } : {})}
                />
              </div>
            </div>
            <p className="[grid-column:1] [grid-row:2] font-sf text-[39px] text-accent m-0 mt-8 font-normal leading-[1.1] whitespace-pre-line bp-lg:text-[30px] bp-md:text-[22px] bp-md:mt-6 bp-sm:hidden bp-xs:hidden mobile:hidden">
              {member.credentials}
            </p>
            <div className="[grid-column:2] [grid-row:2] flex flex-col gap-2 mt-8 pl-8 bp-md:mt-6 bp-md:pl-5 bp-sm:[grid-column:1] bp-sm:[grid-row:3] bp-sm:pl-0 bp-sm:mt-3 bp-xs:[grid-column:1] bp-xs:[grid-row:3] bp-xs:pl-0 bp-xs:mt-3 mobile:[grid-column:1] mobile:[grid-row:3] mobile:pl-0 mobile:mt-3">
              {Array.from({ length: Math.ceil(member.links.length / 2) }, (_, rowIdx) => (
                <div key={rowIdx} className="flex gap-4">
                  {member.links.slice(rowIdx * 2, rowIdx * 2 + 2).map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="font-sf text-[25px] text-accent font-[275] leading-[1.1] no-underline bp-lg:text-[21px] bp-md:text-[17px] bp-sm:text-[16px] bp-xs:text-[14px] mobile:text-[14px]"
                    >
                      {'{' + link.label + '}'}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {i < arr.length - 1 && <div className="h-px bg-accent w-full" />}
        </div>
      ))}
    </section>
  )
}
