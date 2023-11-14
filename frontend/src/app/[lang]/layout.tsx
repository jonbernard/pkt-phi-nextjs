import type { Metadata } from 'next';
import { cache } from 'react';

import './globals.css';
import { getStrapiMedia, getStrapiURL } from '../../utils/api-helpers';
import { fetchAPI } from '../../utils/fetch-api';

import { i18n } from '../../../i18n-config';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { FALLBACK_SEO } from '@/utils/constants';
import { gillSans } from '@/utils/fonts';

const getGlobal = cache(async (lang: string) => {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token) throw new Error('The Strapi API Token environment variable is not set.');

  const path = '/global';
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      'metadata.shareImage',
      'favicon',
      'notificationBanner.link',
      'navbar.links',
      'navbar.navbarLogo.logoImg',
      'footer.footerLogo.logoImg',
      'footer.menuLinks',
      'footer.legalLinks',
      'footer.socialLinks',
      'footer.categories',
    ],
    locale: lang,
  };
  return fetchAPI(path, urlParamsObject, options);
});

export async function generateMetadata(
  { params }: { params: { lang: string } },
): Promise<Metadata> {
  const meta = await getGlobal(params.lang);

  if (!meta?.data?.attributes?.metadata) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: {
      template: '%s | Phi Chapter of the Phi Kappa Tau Fraternity',
      default: `${metadata.metaTitle} | Phi Chapter of the Phi Kappa Tau Fraternity`, // a default is required when creating a template
    },
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const global = await getGlobal(params.lang);
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;

  const { notificationBanner, navbar, footer } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data.attributes.url,
  );

  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo.logoImg.data.attributes.url,
  );

  return (
    <html lang={params.lang} className={gillSans.variable}>
      <body className="text-brand-black" suppressHydrationWarning>
        <Navbar
          links={navbar.links}
          logoUrl={navbarLogoUrl}
          logoText={navbar.navbarLogo.logoText}
        />

        <main className="dark:bg-black dark:text-gray-100 min-h-screen container mx-auto">
          {children}
        </main>

        <Banner data={notificationBanner} />

        <Footer
          logoUrl={footerLogoUrl}
          logoText={footer.footerLogo.logoText}
          logoSubtext={footer.footerLogo.logoSubtext}
          menuLinks={footer.menuLinks}
          categoryLinks={footer.categories.data}
          legalLinks={footer.legalLinks}
          socialLinks={footer.socialLinks}
        />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
