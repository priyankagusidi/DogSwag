// import withBundleAnalyzer  from '@next/bundle-analyzer';

// const nextConfig = {
//   reactStrictMode: false,
//   images: {
//     domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'res.cloudinary.com'],
//   },
// };


// const modulesToTranspile = [
//   FullCalendar,
//   interactionPlugin,
//   dayGridPlugin,
// ];

// const withTranspiledModules = withTM(modulesToTranspile);

// export default withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// })(nextConfig);


import withBundleAnalyzer from "@next/bundle-analyzer";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import withTM from "next-transpile-modules";

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "res.cloudinary.com",
    ],
  },
};



const withTranspiledModules = withTM()(nextConfig);

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(withTranspiledModules);

// export async function rewrites() {
//   return [
//     {
//       source: "/api/:path*",
//       destination: "http://example.comzz/api/:path*",
//     },
//   ];
// }


