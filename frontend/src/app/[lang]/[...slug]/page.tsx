import { Metadata } from 'next';

import type { APIResponseCollection, APIResponseData } from '@types';

import Link from 'next/link';
import { getPageBySlug } from '@/utils/get-page-by-slug';
import { FALLBACK_SEO } from '@/utils/constants';
import { sectionRenderer } from '@/utils/section-renderer';

import ComponentRenderer from './renderer';
import { accent } from '@/utils/colors';

type Props = {
  params: {
    lang: string,
    slug: string
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPageBySlug(params.slug, params.lang);

  if (!page.data?.[0]?.attributes?.seo) return FALLBACK_SEO;

  const metadata = page.data[0].attributes.seo;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

export default async function PageRoute({ params }: Props) {
  const page = await getPageBySlug(params.slug, params.lang) as APIResponseCollection<'api::page.page'>;
  if (page.data.length === 0) return null;
  const { content, contentSections } = (page.data[0] as APIResponseData<'api::page.page'>).attributes;

  return (
    <div className="container p-6 mx-auto sm:py-12 lg:pb-24">
      {contentSections?.map((section, index: number) => sectionRenderer(section, index))}
      {content && (
        <div className="scroll-content grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-2 order-1">
            {content.map((section) => (
              <section key={section.id} id={section.name?.toLowerCase().replace(/\W/gi, '-')} className="space-y-6">
                <h2 className={`text-2xl leading-6 font-bold p-4 text-white sticky top-6 z-20 ${accent.bg}`}>{section.name}</h2>
                <div className="px-2">
                  {section.components?.map(
                    (component, index) => <ComponentRenderer key={index} data={component} />,
                  )}
                </div>
              </section>
            ))}
          </div>
          <div className="col-span-2 lg:col-span-1 order-first lg:order-last">
            <div className="bg-opacity-50 bg-gray-300 rounded p-4 sticky top-6">
              <h2 className="text-xl leading-6 font-bold mb-4">On this page</h2>
              <ul>
                {content.map((section) => (
                  <li key={section.name} className="underline underline-offset-2">
                    <Link href={`#${section.name?.toLowerCase().replace(/\W/gi, '-')}`}>{section.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
