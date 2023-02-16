// /** @type {import('next').NextConfig} */
// import { env } from "process";
// const nextConfig = {
//   reactStrictMode: true,
//   styledComponents: true,
//   env: {
//     BASE_URL: process.env.BASE_URL,
//   },
// };

// module.exports = nextConfig;
module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};
