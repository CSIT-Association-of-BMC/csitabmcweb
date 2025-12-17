"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

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
    label: "Address",
    value: "Golpark-3, Butwal Multiple Campus",
  },
];

export default function ContactForm() {
  return (
    <section className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600">
            <span className="h-2 w-2 rounded-full bg-[#2b3870]" />
            <span>Contact</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900">
            Let's talk about community
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Reach us directly through the contacts below or find us on campus.
            We keep things simple—no forms, just people.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-5"
          >
            {contactItems.map(({ icon: Icon, label, value, href }) => {
              const Wrapper: React.ElementType = href ? "a" : "div";
              return (
                <Wrapper
                  key={label}
                  {...(href && { href })}
                  className="block rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className="h-11 w-11 rounded-lg bg-[#2b3870]/10 text-[#2b3870] grid place-items-center">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        {label}
                      </p>
                      <p className="text-base font-semibold text-slate-900">
                        {value}
                      </p>
                    </div>
                  </div>
                </Wrapper>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
              <div className="absolute inset-0" aria-hidden />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3332.0!2d83.4679022!3d27.7107553!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996873e6c33d6bf%3A0x969e9716a8ecad23!2sButwal%20Multiple%20Campus%2C%20Golpark%2C%20Butwal%2C%20Rupandehi%2C%20Nepal!5e0!3m2!1sen!2snp!4v0000000000000"
                loading="lazy"
                allowFullScreen
                style={{ border: 0 }}
                className="w-full h-[420px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
