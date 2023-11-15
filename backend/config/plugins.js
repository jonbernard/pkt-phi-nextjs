module.exports = {
  seo: {
    enabled: true,
  },
  'preview-button': {
    enabled: true,
    config: {
      contentTypes: [
        {
          uid: 'api::home.home',
          published: {
            url: 'http://localhost:3000',
          },
        },
        {
          uid: 'api::page.page',
          draft: {
            url: 'http://localhost:3000/preview',
            query: {
              type: 'page',
              slug: '{slug}',
            },
          },
          published: {
            url: 'http://localhost:3000/{slug}',
          },
        },
        {
          uid: 'api::post.post',
          draft: {
            url: 'http://localhost:3000/preview',
            query: {
              type: 'post',
              slug: '{slug}',
            },
          },
          published: {
            url: 'http://localhost:3000/news/{slug}',
          },
        },
      ],
    },
  },
};