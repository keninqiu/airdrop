"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { Twitter, Github, Linkedin, Send, BookText, ChartCandlestick } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navbar');
  const socialLinks = [
    {
      title: "Twitter",
      href: process.env.NEXT_PUBLIC_TWITTER_URL,
      Icon: Twitter,
    },
    {
      title: "LinkedIn",
      href: process.env.NEXT_PUBLIC_LINKEDIN_URL,
      Icon: Linkedin,
    },
    {
      title: "Telegram",
      href: process.env.NEXT_PUBLIC_TELEGRAM_URL,
      Icon: Send,
    },
    { title: "Github", href: process.env.NEXT_PUBLIC_GITHUB_URL, Icon: Github },
    { title: "Docs", href: process.env.NEXT_PUBLIC_DOCS_URL, Icon: BookText },
    {
      title: "DexScreener",
      href: process.env.NEXT_PUBLIC_DEXSCREENER_URL,
      Icon: ChartCandlestick,
    },
  ].filter((l) => !!l.href);

  const quickLinks = [
    { label: tNav('home'), href: "#home" },
    { label: tNav('airdrops'), href: "#airdrops" },
    { label: tNav('blog'), href: "#blog" },
    { label: tNav('faq'), href: "#faq" },
    { label: t('submitAirdrop'), href: "/submit-airdrop" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative"
    >
      <div className="px-[5%] pt-16 pb-24 relative z-0">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14"
          >
            {/* Brand */}
            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/" className="flex items-center gap-2">
                  <Image src="/horizontal-lockup.svg" alt="PayAI Logo" width={120} height={32} />
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-4 text-body text-gray-600 max-w-xs"
              >
                {t('description')}
              </motion.p>

              {/* Social */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-6 flex items-center gap-3"
              >
                {socialLinks.map(({ title, href, Icon }, index) => (
                  <motion.a
                    key={title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.7 + index * 0.1,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={title}
                    className="inline-flex items-center justify-center size-9 rounded-full border border-gray-200 bg-white text-midnight hover:text-primary-700 hover:border-gray-300 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <Icon className="w-[18px] h-[18px]" strokeWidth={2.25} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <motion.h4
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-body font-medium text-midnight tracking-wide mb-4"
              >
                {t('quickLinks')}
              </motion.h4>
              <ul className="space-y-3 text-body text-gray-600">
                {quickLinks.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      whileHover={{ x: 4, color: "#111729" }}
                      transition={{ duration: 0.2 }}
                      href={item.href}
                      className="hover:text-midnight transition-colors"
                    >
                      {item.label}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div variants={itemVariants}>
              <motion.h4
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-body font-medium text-midnight tracking-wide mb-4"
              >
                {t('legal')}
              </motion.h4>
              <ul className="space-y-3 text-body text-gray-600">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href="/privacy-policy"
                      className="hover:text-midnight transition-colors"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {t('privacyPolicy')}
                    </Link>
                  </motion.div>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href="/terms-of-service"
                      className="hover:text-midnight transition-colors"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {t('termsOfService')}
                    </Link>
                  </motion.div>
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
