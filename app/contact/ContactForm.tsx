"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, MessageSquare } from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    label: "Phone",
    value: "+977-9841148149",
    href: "tel:+977-9841148149",
  },
  {
    icon: Mail,
    label: "Email",
    value: "team@csitabmc.com",
    href: "mailto:team@csitabmc.com",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Butwal Multiple Campus",
    href: "https://maps.app.goo.gl/o9GhaQJSkUmjHuc1A",
    description: "Golpark-3, Butwal, Rupandehi",
  },
];

export default function ContactForm() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white py-16 md:py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-5"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#2b3870] animate-pulse" />
            <span>Get In Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Let's build something together
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about our workshops, events, or community? We're here
            to help and would love to hear from you.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">
                Contact Information
              </h2>
              <p className="text-sm text-slate-600">
                Choose your preferred way to reach us
              </p>
            </div>

            <div className="space-y-4">
              {contactItems.map(
                ({ icon: Icon, label, value, href, description }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={label === "Visit Us" ? "_blank" : undefined}
                    rel={
                      label === "Visit Us" ? "noopener noreferrer" : undefined
                    }
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-[#2b3870]/20 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#2b3870] to-[#1f2b5c] text-white grid place-items-center shadow-md group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                          {label}
                        </p>
                        <p className="text-base font-semibold text-slate-900 mb-1 group-hover:text-[#2b3870] transition-colors">
                          {value}
                        </p>
                        <p className="text-xs text-slate-600">{description}</p>
                      </div>
                      <Send className="h-4 w-4 text-slate-400 group-hover:text-[#2b3870] group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.a>
                )
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#2b3870] to-[#1f2b5c] p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/20 grid place-items-center">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2">
                    Join our community
                  </p>
                  <p className="text-xs text-white/80 leading-relaxed mb-4">
                    Connect with fellow students, share ideas, and stay updated
                    with our latest events and workshops.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://www.facebook.com/csitabmc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    >
                      Facebook
                    </a>
                    <a
                      href="https://www.instagram.com/csitabmc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://np.linkedin.com/company/csitabmc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative lg:sticky lg:top-24"
          >
            <div className="space-y-3 mb-4">
              <h2 className="text-2xl font-semibold text-slate-900">
                Find Us Here
              </h2>
              <p className="text-sm text-slate-600">
                Visit our campus at Butwal Multiple Campus
              </p>
            </div>
            <div className="relative rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.0893769534484!2d83.46570831506203!3d27.710755382796644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996873e6c33d6bf%3A0x969e9716a8ecad23!2sButwal%20Multiple%20Campus!5e0!3m2!1sen!2snp!4v1234567890123"
                loading="lazy"
                allowFullScreen
                title="Butwal Multiple Campus Location"
                className="w-full h-[400px] lg:h-[520px]"
                style={{ border: 0 }}
              />
              <div className="absolute bottom-4 left-4 right-4">
                <a
                  href="https://maps.google.com/?q=Butwal+Multiple+Campus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/95 backdrop-blur-sm border border-slate-200 shadow-lg text-sm font-semibold text-slate-900 hover:bg-white transition-all"
                >
                  <MapPin className="h-4 w-4 text-[#2b3870]" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
