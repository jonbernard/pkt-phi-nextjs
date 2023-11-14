'use client';

import { Fade } from 'react-slideshow-image';
import Image from 'next/image';
import { getStrapiMedia } from '../../../utils/api-helpers';

interface ImageProps {
  id: number;
  attributes: {
    alternativeText: string | null;
    caption: string | null;
    url: string;
  };
}

interface SlidShowProps {
  files: {
    data: ImageProps[];
  };
}

const Slideshow = ({ data }: { data: SlidShowProps }) => (
  <div className="slide-container">
    <Fade>
      {data.files.data.map((fadeImage, index) => {
        const imageUrl = getStrapiMedia(fadeImage.attributes.url);
        return (
          <div key={index}>
            {imageUrl && <Image className="w-full h-96 object-cover rounded-lg" height={400} width={600} alt="alt text" src={imageUrl} />}
          </div>
        );
      })}
    </Fade>
  </div>
);

export default Slideshow;
