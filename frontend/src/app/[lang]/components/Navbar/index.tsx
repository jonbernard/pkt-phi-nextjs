'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Logo from '../Logo';
import { MobileNavLinkProps, NavLinkProps } from './types';

const NavLink = ({ url, text }: NavLinkProps) => {
  const path = usePathname();

  return (
    <li className="flex">
      <Link
        href={url}
        className={`flex items-center mx-4 -mb-1 border-b-2 dark:border-transparent ${path === url && 'text-brand-primary border-brand-primary dark:text-brand-accent-primary dark:border-brand-accent-primary'
          }}`}
      >
        {text}
      </Link>
    </li>
  );
};

// color="text-brand-primary dark:text-brand-accent-primary"
const MobileNavLink = ({ url, text, closeMenu }: MobileNavLinkProps) => {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  };
  return (
    <Link
      href={url}
      onClick={handleClick}
      className={`-mx-3 block rounded-lg px-3 py-2 text-2xl font-semibold leading-7 text-gray-100 hover:bg-gray-900 ${path === url && 'text-brand-primary border-brand-primary dark:text-brand-accent-primary dark:border-brand-accent-primary'
        }}`}
    >
      {text}
    </Link>
  );
};

const Navbar = ({
  links,
  logoUrl,
  logoText,
}: {
  links: Array<NavLinkProps>;
  logoUrl: string | null;
  logoText: string | null;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="p-4 dark:bg-black dark:text-gray-100">
      <div className="container flex justify-between h-16 mx-auto px-0 sm:px-6">
        <Logo src={logoUrl}>
          {logoText && <h2 className="text-2xl font-bold leading-6 mt-2">{logoText}</h2>}
        </Logo>

        <div className="items-center flex-shrink-0 hidden lg:flex">
          <ul className="items-stretch hidden space-x-3 lg:flex">
            {links.map((item: NavLinkProps) => (
              <NavLink key={item.id} {...item} />
            ))}
          </ul>
        </div>

        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed bg-brand-tertiary inset-y-0 rtl:left-0 ltr:right-0 z-50 w-full overflow-y-auto dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <div />
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-200/10">
                <div className="space-y-2 py-6">
                  {links.map((item) => (
                    <MobileNavLink
                      key={item.id}
                      closeMenu={closeMenu}
                      {...item}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
        <button
          className="p-4 lg:hidden text-brand-tertiary dark:text-gray-100"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Bars3Icon className="h-7 w-7" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
