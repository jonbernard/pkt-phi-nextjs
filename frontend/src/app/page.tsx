import LangRedirect from './components/LangRedirect';
import { sectionRenderer } from '../utils/section-renderer';
import { getPageBySlug } from '@/utils/get-page-by-slug';
import { APIResponseCollection } from '@/types/types';

export default async function RootRoute({ params }: { params: { lang: string } }) {
  try {
    const page = await getPageBySlug('home', params.lang) as APIResponseCollection<'api::page.page'>;

    if (page.data.length === 0 && params.lang !== 'en') return <LangRedirect />;
    if (page.data.length === 0) return null;
    const { contentSections } = page.data[0].attributes;
    return contentSections?.map((section, index: number) => sectionRenderer(section, index));
  } catch (error) {
    console.error('Missing or invalid credentials');
  }
}
