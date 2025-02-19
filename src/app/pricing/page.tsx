'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const tiers = [
  {
    name: 'Trial',
    id: 'tier-trial',
    href: 'https://knowledge.gbase.ai/auth/register',
    priceMonthly: 'Free',
    description: 'Try GBase with limited features',
    features: [
      '3 Deep Research credits',
      '100 Web Search queries',
      'Basic report exports',
      'Email support',
      'Single user access',
    ],
    featured: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: 'https://knowledge.gbase.ai/auth/register',
    priceMonthly: '$29',
    description: 'Full access to all enterprise features',
    features: [
      '100 Deep Research credits per month',
      'Unlimited Web Search queries',
      'Priority email support',
      'Team collaboration features',
      'Organization & member management',
      {
        text: 'Advanced report customization',
        comingSoon: true
      },
      {
        text: 'API access',
        comingSoon: true
      },
      {
        text: 'Custom integration solutions',
        comingSoon: true
      },
    ],
    featured: true,
  }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Pricing() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative">
      <div className="bg-[#F5F3F2] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-base font-semibold leading-7 text-black/70">Pricing Plans</h1>
            <p className="mt-2 text-4xl font-medium tracking-[-2.56px] text-black sm:text-5xl">
              Choose the Right Plan for Your Business
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-black/60">
            Start with a free trial or upgrade to Pro for unlimited access to enterprise features.
          </p>

          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-4xl lg:grid-cols-2 lg:gap-x-8">
            {tiers.map((tier, tierIdx) => (
              <motion.div
                key={tier.id}
                initial={isLoaded ? { opacity: 0, y: 20 } : false}
                animate={isLoaded ? { opacity: 1, y: 0 } : false}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: tierIdx * 0.1 }}
                className={classNames(
                  tier.featured
                    ? 'lg:z-10 ring-2 ring-black'
                    : 'lg:mt-0',
                  'flex flex-col justify-between rounded-3xl bg-white p-6 xl:p-8 shadow-lg'
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h2
                      id={tier.id}
                      className={classNames(
                        tier.featured ? 'text-black' : 'text-black/80',
                        'text-lg font-semibold leading-8'
                      )}
                    >
                      {tier.name}
                    </h2>
                    {tier.featured && (
                      <p className="rounded-full bg-black/5 px-2.5 py-1 text-xs font-semibold leading-5 text-black">
                        Most Popular
                      </p>
                    )}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-black/60">{tier.description}</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-black">{tier.priceMonthly}</span>
                    {tier.priceMonthly !== 'Free' && (
                      <span className="text-sm font-semibold leading-6 text-black/60">/month</span>
                    )}
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-black/60">
                    {tier.features.map((feature, index) => (
                      <li key={typeof feature === 'string' ? feature : feature.text} className="flex gap-x-3 items-center">
                        <CheckIcon className="h-5 w-5 flex-none text-black" aria-hidden="true" />
                        {typeof feature === 'string' ? feature : (
                          <span className="flex items-center gap-x-2">
                            {feature.text}
                            {feature.comingSoon && (
                              <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                Coming Soon
                              </span>
                            )}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.featured
                      ? 'bg-black text-white hover:bg-black/90'
                      : 'text-black ring-1 ring-inset ring-black/20 hover:ring-black/30 hover:bg-black/5',
                    'mt-8 block rounded-[999px] py-2.5 px-4 text-center text-sm font-normal leading-6 transition-all'
                  )}
                >
                  {tier.featured ? 'Upgrade to Pro' : 'Start Trial'}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <span className="text-2xl font-bold text-white">GBase</span>
              <p className="text-sm leading-6 text-gray-300">
                AI workspace for enterprise.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">Discord</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">Product</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <Link href="/#features" className="text-sm leading-6 text-gray-300 hover:text-white">Features</Link>
                    </li>
                    <li>
                      <Link href="/pricing" className="text-sm leading-6 text-gray-300 hover:text-white">Pricing</Link>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a href="https://www.sparticle.com" target="_blank" rel="noopener noreferrer" className="text-sm leading-6 text-gray-300 hover:text-white">About</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">Privacy</a>
                    </li>
                    <li>
                      <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">Terms</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-gray-400">&copy; 2025 Sparticle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 