function readPackage(pkg) {
  // eslint-disable-next-line no-param-reassign
  pkg.dependencies = {
    ...pkg.peerDependencies,
    ...pkg.dependencies,
  };
  // eslint-disable-next-line no-param-reassign
  pkg.peerDependencies = {};

  return pkg;
}

module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  hooks: {
    readPackage,
  },
  reactStrictMode: true,
  i18n: {
    locales: ["ar", "en", "fr"],
    defaultLocale: "en",
    localeDetection: false,
  },
 // basePath: process.env.NEXT_PUBLIC_BASE_PATH,
};
