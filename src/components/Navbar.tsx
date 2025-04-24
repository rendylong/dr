'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion, useScroll } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'Features', 
    href: '/#features',
    dropdown: [
      { name: 'Deep Research', href: '/features/deep-research', description: '10x more insights with AI-powered research' },
    ]
  },
  { name: 'Pricing', href: '/pricing' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 0);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.header 
      className="fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200"
      animate={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0)',
        backdropFilter: isScrolled ? 'blur(8px)' : 'none',
        borderColor: isScrolled ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0)'
      }}
    >
      <nav className="flex items-center justify-between p-4 lg:px-[240px] max-w-[1920px] mx-auto" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-[22.5px] font-medium tracking-[-0.48px] text-black">
              GBase
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <div key={item.name} className="relative">
              {item.dropdown ? (
                <div
                  className="group"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className="flex items-center gap-x-1 text-[15px] font-normal text-black opacity-50 hover:opacity-100 transition-opacity"
                  >
                    {item.name}
                    <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                  
                  {/* Dropdown menu */}
                  <div
                    className={`absolute left-0 top-full w-72 rounded-xl bg-white p-4 shadow-lg ring-1 ring-black/5 transition-all duration-200 ${
                      activeDropdown === item.name ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block rounded-lg p-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium text-black">{dropdownItem.name}</div>
                        <div className="mt-1 text-sm text-gray-500">{dropdownItem.description}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="text-[15px] font-normal text-black opacity-50 hover:opacity-100 transition-opacity"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="https://knowledge.gbase.ai/auth/register"
            className="rounded-[999px] bg-black px-[13px] py-[8px] text-[15px] font-normal text-white border border-black hover:bg-black/90 transition-all"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 z-50">
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="text-[22.5px] font-medium tracking-[-0.48px] text-black">
                    GBase
                  </span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <div key={item.name}>
                        {item.dropdown ? (
                          <div className="space-y-2">
                            <div className="px-3 py-2 text-[15px] font-normal text-black opacity-50">
                              {item.name}
                            </div>
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="block px-6 py-2 text-[15px] font-normal text-black opacity-50 hover:opacity-100 transition-opacity"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className="block px-3 py-2 text-[15px] font-normal text-black opacity-50 hover:opacity-100 transition-opacity"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="py-6">
                    <Link
                      href="https://knowledge.gbase.ai/auth/register"
                      className="rounded-[999px] bg-black px-[13px] py-[8px] text-[15px] font-normal text-white border border-black hover:bg-black/90 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
} 