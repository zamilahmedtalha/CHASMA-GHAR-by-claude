import React from 'react';
import { SplitText } from '../components/ui/SplitText';
import { ScrollFloat } from '../components/ui/ScrollFloat';
import { GlassSurface } from '../components/ui/GlassSurface';

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-32">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 z-0">
          <img src="https://picsum.photos/seed/about/1920/1080" alt="Studio" className="w-full h-full object-cover opacity-60" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-display-xl text-white drop-shadow-lg">
            <SplitText text="Our Story" tag="h1" />
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-32 space-y-24">
        <ScrollFloat yOffset={40}>
          <p className="text-display-md text-[--color-text-primary] text-center italic">
            "We believe that the objects we interact with daily should elevate our experience of the world."
          </p>
        </ScrollFloat>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center about-grid">
          <ScrollFloat yOffset={30}>
            <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100">
              <img src="https://picsum.photos/seed/craft/800/1000" alt="Craftsmanship" className="w-full h-full object-cover" />
            </div>
          </ScrollFloat>
          <div className="space-y-6">
            <h2 className="text-display-md text-[--color-text-primary]">The Craft</h2>
            <p className="text-body text-[--color-text-secondary]">
              Every piece in our collection is meticulously crafted by skilled artisans. We source only the finest materials, ensuring that each item not only looks beautiful but stands the test of time.
            </p>
            <p className="text-body text-[--color-text-secondary]">
              Our design philosophy is rooted in minimalism and functionality, stripping away the unnecessary to reveal the pure essence of the object.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-[--color-border]">
          {[
            { title: "Sustainability", desc: "Committed to ethical sourcing and minimal environmental impact." },
            { title: "Quality", desc: "Uncompromising standards in materials and manufacturing." },
            { title: "Design", desc: "Timeless aesthetics that transcend seasonal trends." }
          ].map((value, i) => (
            <ScrollFloat key={i} yOffset={30} delay={i * 0.1}>
              <GlassSurface className="p-8 h-full" borderRadius={24} opacity={0.88}>
                <h3 className="text-heading mb-4">{value.title}</h3>
                <p className="text-body text-[--color-text-secondary]">{value.desc}</p>
              </GlassSurface>
            </ScrollFloat>
          ))}
        </div>
      </section>
    </div>
  );
}
