import Image from 'next/image'

const CATEGORIES = [
  { title: 'Chizmachilik', img: '/chizmachilik.jpg' },
  { title: 'Dizayn', img: '/dizayn.jpg' },
  { title: 'AI', img: '/ai.jpg' },
]

export default function CategorySection() {
  return (
    <section className="px-5 pt-[220px] pb-20 mobile:pt-40 mobile:pb-12">
      <h2 className="font-sf text-[80px] font-normal text-primary leading-none mb-20 mobile:text-[36px] mobile:mb-10 mobile:text-center">
        Chizmachilik va dizayn materiallari
        <br className="hidden mobile:block" />
        bir joyda. Topilmadimi?
        <br />
        AI yordam beradi.
      </h2>
      <div className="grid grid-cols-3 gap-10 mobile:grid-cols-1 mobile:gap-6">
        {CATEGORIES.map(({ title, img }) => (
          <div key={title}>
            <h3 className="font-ppe text-[50px] font-normal text-primary leading-[1.2] tracking-[-0.02em] mb-5 mobile:text-[36px] mobile:mb-4">
              {title}
            </h3>
            <div data-cursor-hover="" className="relative h-[270px] mobile:h-[200px]">
              <Image
                src={img}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
