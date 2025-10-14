export default defineAppConfig({
  socials: {
    x: 'https://x.com/kodadot',
    telegram: 'https://t.me/kodadot',
    github: 'https://github.com/exezbcz/paraport'
  },
  header: {
    logo: {
      light: '/logo-dark.svg',
      dark: '/logo-light.svg',
      alt: 'ParaPort Logo'
    },
    title: false,
    showLinkIcon: true,
    search: true
  },
  footer: {
    iconLinks: [
      {
        href: 'https://github.com/exezbcz/paraport',
        icon: 'simple-icons:polkadot'
      }
    ]
  },
  ui: {
    colors: {
      primary: 'gray',
      neutral: 'gray'
    }
  }
})
