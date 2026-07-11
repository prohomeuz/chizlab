'use client'

import Image from 'next/image'
import Link from 'next/link'
import { slugify } from '@/lib/slug'
import chizmachilikImg from '../../public/chizmachilik.jpg'
import dizaynImg from '../../public/dizayn.jpg'
import aiImg from '../../public/ai.jpg'

const CATEGORIES = [
  { title: 'Chizmachilik', img: chizmachilikImg, href: `/materiallar/${slugify('Chizmachilik')}` },
  { title: 'Dizayn', img: dizaynImg, href: `/materiallar/${slugify('Dizayn')}` },
  { title: 'AI', img: aiImg, href: null },
]

export default function CategorySection() {
  return (
    <section className="px-5 pt-[220px] pb-20 bp-lg:pt-[180px] bp-md:pt-[150px] bp-md:pb-16 bp-sm:pt-[120px] bp-sm:pb-14 bp-xs:pt-40 bp-xs:pb-12 mobile:pt-40 mobile:pb-12">
      <h2 className="font-sf text-[80px] font-normal text-primary leading-none mb-20 bp-lg:text-[60px] bp-lg:mb-16 bp-md:text-[48px] bp-md:mb-12 bp-sm:text-[40px] bp-sm:mb-10 bp-sm:leading-[1.1] bp-xs:text-[36px] bp-xs:mb-10 bp-xs:leading-[1.1] mobile:text-[36px] mobile:mb-10 mobile:text-center">
        Chizmachilik va dizayn materiallari
        <br className="hidden mobile:block" />
        bir joyda. Topilmadimi?
        <br className="hidden mobile:block" />
        AI yordam beradi.
      </h2>
      <div className="grid grid-cols-3 gap-10 bp-lg:gap-8 bp-md:gap-6 bp-sm:grid-cols-1 bp-sm:gap-8 bp-xs:grid-cols-1 bp-xs:gap-6 mobile:grid-cols-1 mobile:gap-6">
        {CATEGORIES.map(({ title, img, href }) => (
          <div key={title}>
            <h3 className="font-ppe text-[50px] font-normal text-primary leading-[1.2] tracking-[-0.02em] mb-5 bp-lg:text-[42px] bp-md:text-[32px] bp-md:mb-4 bp-sm:text-[38px] bp-sm:mb-4 bp-xs:text-[36px] bp-xs:mb-4 mobile:text-[36px] mobile:mb-4">
              {title}
            </h3>
            <div
              data-cursor-hover=""
              className="relative h-[270px] bp-md:h-[190px] bp-sm:h-[230px] bp-xs:h-[200px] mobile:h-[200px] cursor-pointer"
              onClick={() => (href ? undefined : alert('Tez kunda!'))}
            >
              {href ? (
                <Link href={href} className="relative block w-full h-full" aria-label={title}>
                  <Image
                    src={img}
                    alt={title}
                    fill
                    placeholder="blur"
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 749px) 100vw, calc(33vw - 40px)"
                  />
                </Link>
              ) : (
                <Image
                  src={img}
                  alt={title}
                  fill
                  placeholder="blur"
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 749px) 100vw, calc(33vw - 40px)"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
