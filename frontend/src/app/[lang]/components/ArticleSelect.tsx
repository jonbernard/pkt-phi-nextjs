import Link from 'next/link';
import { accent } from '@/utils/colors';

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    articles: {
      data: Array<{}>;
    };
  };
}

interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
  };
}

function selectedFilter(current: string, selected: string) {
  return current === selected
    ? 'px-3 py-1 rounded-lg hover:underline bg-gray-200 dark:bg-brand-accent-primary dark:text-white'
    : 'px-3 py-1 rounded-lg hover:underline bg-gray-50 dark:bg-brand-accent-primary dark:text-white';
}

const ArticleSelect = ({
  categories,
  articles,
  params,
}: {
  categories: Category[];
  articles: Article[];
  params: {
    slug: string;
    category: string;
  };
}) => (
  <div className="p-4 rounded-lg dark:bg-gray-900 min-h-[365px] relative">
    <h4 className="text-xl font-semibold">Browse By Category</h4>

    <div>
      <div className="flex flex-wrap py-6 space-x-2 dark:border-gray-400">
        {categories.map((category: Category) => {
          if (category.attributes.articles.data.length === 0) return null;
          return (
            <Link
              key={`/blog/${category.attributes.slug}`}
              href={`/blog/${category.attributes.slug}`}
              className={selectedFilter(
                category.attributes.slug,
                params.category,
              )}
            >
              #
              {category.attributes.name}
            </Link>
          );
        })}
        <Link href="/blog" className={selectedFilter('', 'filter')}>
          #all
        </Link>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold">Other Posts You May Like</h4>
        <ul className="ml-4 space-y-1 list-disc">
          {articles.map((article: Article) => (
            <li
              key={`/blog/${params.category}/${article.attributes.slug}`}
            >
              <Link
                rel="noopener noreferrer"
                href={`/blog/${params.category}/${article.attributes.slug}`}
                className={`${params.slug === article.attributes.slug
                  && accent.text
                  }  hover:underline ${accent.text} transition-colors duration-200`}
              >
                {article.attributes.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default ArticleSelect;
