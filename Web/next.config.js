/*
const dotEnv = require('dotenv');
const result = dotEnv.config({ path: '.env' })
const resultLocal = dotEnv.config({ path: '.env.local' })
const resultTest = dotEnv.config({ path: '.env.test' })
const resultProd = dotEnv.config({ path: '.env.production' })
*/

/** @type {import("next").NextConfig} */

//...result.parsed, 

//...result.parsed, 

var nextConfig = {
  reactStrictMode: false, //react is rendering twice for some reason when this is true. See here: https://github.com/vercel/next.js/issues/35822
  //env: {...result.parsed, ...resultTest.parsed, ...resultProd.parsed, ...resultLocal.parsed}
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



