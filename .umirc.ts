import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  proxy: {
    '/mock': {
      target: 'https://6cxx9pggi4.execute-api.us-east-1.amazonaws.com/prod/',
      changeOrigin: true,
      secure: false,
      headers: {
        Referer: 'https://6cxx9pggi4.execute-api.us-east-1.amazonaws.com/prod/',
      },
    },
  },
  mock: false,
});


