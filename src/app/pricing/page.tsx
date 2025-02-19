'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';

const tiers = [
  {
    name: 'Trial',
    id: 'tier-trial',
    href: '#',
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
    href: '#',
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
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-base font-semibold leading-7 text-indigo-600">Pricing Plans</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the Right Plan for Your Business
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Start with a free trial or upgrade to Pro for unlimited access to enterprise features.
        </p>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-4xl lg:grid-cols-2 lg:gap-x-8">
          {tiers.map((tier, tierIdx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: tierIdx * 0.1 }}
              className={classNames(
                tier.featured
                  ? 'lg:z-10 ring-2 ring-indigo-600'
                  : 'lg:mt-0',
                'flex flex-col justify-between rounded-3xl bg-white p-6 xl:p-8 shadow-lg'
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h2
                    id={tier.id}
                    className={classNames(
                      tier.featured ? 'text-indigo-600' : 'text-gray-900',
                      'text-lg font-semibold leading-8'
                    )}
                  >
                    {tier.name}
                  </h2>
                  {tier.featured && (
                    <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                      Most Popular
                    </p>
                  )}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.priceMonthly}</span>
                  {tier.priceMonthly !== 'Free' && (
                    <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                  )}
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature, index) => (
                    <li key={typeof feature === 'string' ? feature : feature.text} className="flex gap-x-3 items-center">
                      <CheckIcon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
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
                    ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                    : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                  'mt-8 block rounded-full py-2.5 px-4 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                {tier.featured ? 'Upgrade to Pro' : 'Start Trial'}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 