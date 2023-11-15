'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CgWebsite } from 'react-icons/cg';
import { FaDiscord } from 'react-icons/fa';
import { AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai';
import Logo from '../Logo';
import { accent } from '@/utils/colors';
import { CategoryLinkData, FooterLinkData } from './types';

const FooterLink = ({ url, text }: FooterLinkData) => {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className={`hover:dark:opacity-80 ${path === url && accent.text
          }`}
      >
        {text}
      </Link>
    </li>
  );
};

const CategoryLink = ({ attributes }: CategoryLinkData) => (
  <li className="flex">
    <Link
      href={`/blog/${attributes.slug}`}
      className={accent.textHover}
    >
      {attributes.name}
    </Link>
  </li>
);

const RenderSocialIcon = ({ social }: { social: string | undefined }) => {
  switch (social) {
    case 'WEBSITE':
      return <CgWebsite />;
    case 'TWITTER':
      return <AiFillTwitterCircle />;
    case 'YOUTUBE':
      return <AiFillYoutube />;
    case 'DISCORD':
      return <FaDiscord />;
    default:
      return null;
  }
};

const Footer = ({
  logoUrl,
  logoText,
  logoSubtext,
  menuLinks,
  categoryLinks,
  legalLinks,
  socialLinks,
}: {
  logoUrl: string | null;
  logoText: string | null;
  logoSubtext: string | null;
  menuLinks: Array<FooterLinkData>;
  categoryLinks: Array<CategoryLinkData>;
  legalLinks: Array<FooterLinkData>;
  socialLinks: Array<FooterLinkData>;
}) => (
  <footer className="py-6 dark:bg-black dark:text-gray-50">
    <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
      <div className="grid grid-cols-12">
        <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
          <Logo src={logoUrl} size={96}>
            {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
            {logoSubtext && <p className="font-bold">{logoSubtext}</p>}
          </Logo>
        </div>

        <div className="col-span-6 text-center md:text-left md:col-span-3">
          <p className="pb-1 text-lg font-medium">Categories</p>
          <ul>
            {categoryLinks.map((link: CategoryLinkData) => (
              <CategoryLink key={link.id} {...link} />
            ))}
          </ul>
        </div>

        <div className="col-span-6 text-center md:text-left md:col-span-3">
          <p className="pb-1 text-lg font-medium">Menu</p>
          <ul>
            {menuLinks.map((link: FooterLinkData) => (
              <FooterLink key={link.id} {...link} />
            ))}
          </ul>
        </div>
      </div>
      <div className="grid justify-center pt-6 lg:justify-between">
        <div className="flex">
          <span className="mr-2">
            ©
            {new Date().getFullYear()}
            {' '}
            All rights reserved
          </span>
          <ul className="flex">
            {legalLinks.map((link: FooterLinkData) => (
              <Link
                href={link.url}
                className="text-gray-400 hover:text-gray-300 mr-2"
                key={link.id}
              >
                {link.text}
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              rel="noopener noreferrer"
              href={link.url}
              title={link.text}
              target={link.newTab ? '_blank' : '_self'}
              aria-label={link.text}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${accent.bg} text-white dark:text-brand-black`}
            >
              <RenderSocialIcon social={link.social} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
