import React, { useState } from 'react';
import { SplitText } from '../components/ui/SplitText';
import { ScrollFloat } from '../components/ui/ScrollFloat';
import { GlassSurface } from '../components/ui/GlassSurface';
import { Toast } from '../components/ui/Toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setShowToast(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to submit contact form', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-12">
          <div>
            <h1 className="text-display-xl text-[--color-text-primary] mb-6">
              <SplitText text="Get in Touch" tag="h1" />
            </h1>
            <ScrollFloat yOffset={20} delay={0.2}>
              <p className="text-body text-[--color-text-secondary] max-w-md leading-relaxed">
                Whether you have a question about our products, shipping, or just want to say hello, we'd love to hear from you.
              </p>
            </ScrollFloat>
          </div>

          <ScrollFloat yOffset={30} delay={0.4}>
            <div className="space-y-8">
              <div>
                <h3 className="text-label text-[--color-text-muted] mb-2">Email</h3>
                <a href="mailto:hello@chasmaghar.com" className="text-display-sm text-[--color-text-primary] hover:text-[--color-text-secondary] transition-colors">
                  hello@chasmaghar.com
                </a>
              </div>
              <div>
                <h3 className="text-label text-[--color-text-muted] mb-2">Studio</h3>
                <p className="text-display-sm text-[--color-text-primary]">
                  123 Design District<br />
                  Los Angeles, CA 90012
                </p>
              </div>
              <div>
                <h3 className="text-label text-[--color-text-muted] mb-4">Social</h3>
                <div className="flex gap-4">
                  {['Instagram', 'Twitter', 'Pinterest'].map((social) => (
                    <GlassSurface key={social} borderRadius={999} className="px-6 py-2 hover:bg-white/80 transition-colors cursor-pointer">
                      <span className="text-label text-[--color-text-primary]">{social}</span>
                    </GlassSurface>
                  ))}
                </div>
              </div>
            </div>
          </ScrollFloat>
        </div>

        <ScrollFloat yOffset={40} delay={0.6}>
          <GlassSurface className="p-10 md:p-12" borderRadius={24} opacity={0.90}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-label text-[--color-text-primary] mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-4 rounded-2xl bg-white/40 border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all text-body"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-label text-[--color-text-primary] mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-4 rounded-2xl bg-white/40 border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all text-body"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-label text-[--color-text-primary] mb-2">Message</label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-4 rounded-2xl bg-white/40 border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none text-body"
                  placeholder="How can we help you?"
                />
              </div>
              <GlassSurface borderRadius={999} brightness={0} opacity={1}>
                <button
                  type="submit"
                  className="w-full py-4 bg-[#0A0A0A] text-white text-label rounded-full hover:bg-[#2A2A2A] transition-colors"
                >
                  Send Message
                </button>
              </GlassSurface>
            </form>
          </GlassSurface>
        </ScrollFloat>
      </div>

      <Toast 
        message="Message sent successfully. We'll be in touch soon." 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
}
