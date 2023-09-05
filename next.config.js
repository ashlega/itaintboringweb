/** @type {import("next").NextConfig} */
module.exports = {
  //reactStrictMode: true,
  headers: async () => [
    {
      source: '/api/commentlist',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-cache',
        },
      ],
    },
  ],
}
