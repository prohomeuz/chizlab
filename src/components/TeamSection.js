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
    <section className="pt-[100px] px-5 pb-20 mobile:py-[60px]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-16 justify-center mobile:mb-8">
        <img src="/naqsh-team.svg" alt="" className="w-[26.6px] h-[26.6px]" />
        <p className="font-sf text-[24px] text-primary m-0 font-normal">Jamoamiz</p>
        <img src="/naqsh-team.svg" alt="" className="w-[26.6px] h-[26.6px]" />
      </div>

      {/* Team member rows */}
      {TEAM_MEMBERS.map((member, i, arr) => (
        <div key={member.name}>
          <div className="grid grid-cols-[33.33%_41.67%_25%] grid-rows-[auto_auto] py-[60px] items-start mobile:grid-cols-[1fr_120px] mobile:grid-rows-[auto_auto_auto] mobile:py-8 mobile:gap-x-4">
            <p className="[grid-column:1] [grid-row:1] font-ppe text-[60px] text-primary m-0 font-normal leading-[1.1] whitespace-pre-line mobile:[grid-column:1/3] mobile:text-[40px] mobile:mb-[25px]">
              {member.name}
            </p>
            <p className="[grid-column:2] [grid-row:1] font-ppe text-[60px] text-primary m-0 font-normal leading-[1.1] whitespace-pre-line pl-8 mobile:[grid-column:1] mobile:[grid-row:2] mobile:text-[28px] mobile:pl-0 mobile:mt-1.5">
              {member.role}
            </p>
            <div className="[grid-column:3] [grid-row:1/3] flex justify-end items-start mobile:[grid-column:2] mobile:[grid-row:2/4]">
              <div
                className={`relative w-[301px] h-[301px] overflow-hidden mobile:w-[120px] mobile:h-[120px] ${
                  member.dark ? 'bg-dark' : 'bg-transparent'
                }`}
              >
                <Image
                  src={member.photo}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 430px) 120px, 301px"
                  loading="lazy"
                  {...(member.photoData ? { placeholder: 'blur' } : {})}
                />
              </div>
            </div>
            <p className="[grid-column:1] [grid-row:2] font-sf text-[39px] text-accent m-0 mt-8 font-normal leading-[1.1] whitespace-pre-line mobile:hidden">
              {member.credentials}
            </p>
            <div className="[grid-column:2] [grid-row:2] grid grid-cols-[max-content_max-content] gap-4 mt-8 pl-8 mobile:[grid-column:1] mobile:[grid-row:3] mobile:pl-0 mobile:mt-3 mobile:grid-cols-[max-content] mobile:gap-2">
              {member.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="font-sf text-[25px] text-accent font-[275] leading-[1.1] no-underline mobile:text-[15px]"
                >
                  {'{' + link.label + '}'}
                </a>
              ))}
            </div>
          </div>
          {i < arr.length - 1 && <div className="h-px bg-accent w-full" />}
        </div>
      ))}
    </section>
  )
}
