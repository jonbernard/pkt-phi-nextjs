'use client';

import { BlocksRenderer } from '@strapi/blocks-react-renderer';

import { APIResponseData } from '@types';
import Image from 'next/image';
import { getStrapiMedia } from '@/utils/api-helpers';

const ContentRenderer: React.FC<{ data: APIResponseData<'api::page.page'>['attributes']['content'][0] }> = (props) => {
  const { data } = props;

  if (data?.text) {
    return <div className="rich-text"><BlocksRenderer content={data.text} /></div>;
  }

  if (data?.image) {
    const image = data.image.data.attributes;
    const url = getStrapiMedia(image.url);
    if (!url) return null;

    return (
      <div className="container relative">
        <Image
          src={url}
          alt="image"
          width={image.width}
          height={image.height}
        />
      </div>
    );
  }

  return null;
};

export default ContentRenderer;
