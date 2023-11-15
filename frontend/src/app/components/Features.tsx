import Link from 'next/link';
import { accent } from '@/utils/colors';

export interface FeaturesProps {
  data: {
    heading: string;
    description: string;
    feature: FeatureData[];
  };
}

interface FeatureData {
  // id: string;
  title: string;
  description: string;
  showLink: boolean;
  newTab: boolean;
  url: string;
  text: string;
}

const Feature = ({
  title, description, showLink, newTab, url, text,
}: FeatureData) => (
  <div className="flex flex-col items-center p-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`w-8 h-8 ${accent.text}`}
    >
      <path
        fillRule="evenodd"
        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
        clipRule="evenodd"
      />
    </svg>
    <h3 className="my-3 text-3xl font-semibold">{title}</h3>
    <div className="space-y-1 leading-tight my-6">
      <p>{description}</p>
    </div>
    {showLink && url && text && (
      <div>
        <Link
          href={url}
          target={newTab ? '_blank' : '_self'}
          className={`inline-block px-4 py-2 mt-4 text-sm font-semibold text-white transition duration-200 ease-in-out ${accent.bg} dark:text-brand-black rounded-lg hover:opacity-80`}
        >
          {text}
        </Link>
      </div>
    )}
  </div>
);

const Features = ({ data }: FeaturesProps) => (
  <section className="dark:bg-black dark:text-gray-100 m:py-12 lg:py-24">
    <div className="container mx-auto py-4 space-y-2 text-center">
      <h2 className="text-5xl font-bold">{data.heading}</h2>
      <p className="dark:text-gray-400">{data.description}</p>
    </div>
    <div className="container mx-auto my-6 grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.feature.map((feature: FeatureData, index: number) => (
        <Feature key={index} {...feature} />
      ))}
    </div>
  </section>
);

export default Features;
