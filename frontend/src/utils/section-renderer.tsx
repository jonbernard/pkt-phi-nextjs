import Hero from '../app/components/Hero';
import Features from '../app/components/Features';

export function sectionRenderer(section: any, index: number) {
  switch (section.__component) {
    case 'sections.hero':
      return <Hero key={index} data={section} />;
    case 'sections.features':
      return <Features key={index} data={section} />;
    default:
      return null;
  }
}
