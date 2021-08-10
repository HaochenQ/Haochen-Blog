module.exports = {
  title: "Haochen",
  tagline: "Learning is a Lifelong Process",
  url: "https://haochenqi.com/",
  baseUrl: "/",
  //onBrokenLinks: "throw",
  //onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  //organizationName: "Haochen", // Usually your GitHub org/user name.
  projectName: "Haochen-Blog", // Usually your repo name.
  stylesheets: ["https://fonts.font.im/css?family=Raleway:500,700"],
  themeConfig: {
    navbar: {
      title: "Haochen",
      logo: {
        alt: "My Site Logo",
        src: "img/haochen.logo.svg",
      },
      items: [
        // {
        //   to: "docs/",
        //   activeBasePath: "docs",
        //   label: "Docs",
        //   position: "left",
        // },
        { type: "localeDropdown", position: "right" },
        { to: "blog", label: "Blog", position: "right" },

        {
          href: "https://github.com/HaochenQ",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Social Media",
          items: [
            {
              label: "Linkedin",
              href: "https://www.linkedin.com/in/haochen-qi-a36393171/",
            },
            {
              label: "Facebook",
              href: "https://www.facebook.com/haochen.qi.520",
            },
          ],
        },
        // {
        //   title: "Docusaurus",
        //   items: [
        //     {
        //       label: "Style Guide",
        //       to: "docs/",
        //     },
        //     {
        //       label: "Second Doc",
        //       to: "docs/doc2/",
        //     },
        //   ],
        // },
        // {
        //   title: "Community",
        //   items: [
        //     {
        //       label: "Stack Overflow",
        //       href: "https://stackoverflow.com/questions/tagged/docusaurus",
        //     },
        //     {
        //       label: "Discord",
        //       href: "https://discordapp.com/invite/docusaurus",
        //     },
        //     {
        //       label: "Twitter",
        //       href: "https://twitter.com/docusaurus",
        //     },
        //   ],
        // },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/HaochenQ",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Haochen. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/master/website/",
        },
        blog: {
          path: "./blog",
          //routeBasePath: "/",
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh-cn"],
    localeConfigs: {
      en: {
        label: "English",
      },
      "zh-cn": {
        label: "中文",
      },
    },
  },
};
