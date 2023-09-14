const dotEnv = require('dotenv');
const result = dotEnv.config({ path: '.env' })
const resultLocal = dotEnv.config({ path: '.env.local' })
const resultTest = dotEnv.config({ path: '.env.test' })
const resultProd = dotEnv.config({ path: '.env.production' })

/** @type {import("next").NextConfig} */

//...result.parsed, 

//...result.parsed, 

var nextConfig = {
  reactStrictMode: true,
  env: {...result.parsed, ...resultTest.parsed, ...resultProd.parsed, ...resultLocal.parsed}
  /*headers: async () => [
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
  */
}

//console.log("env: " + result.parsed.HIGHLIGHTS_LIST)
//console.log("env summed up: " + nextConfig.env.TEST_DATA)

module.exports = nextConfig;



