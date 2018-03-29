import os from 'os';

export function getProjectRootPath() {
  const rootPath = `${os.homedir()}/siva`;
  return rootPath;
}

export const gatsbyTemplates = [
  {
    name: 'Default',
    url: '',
    demo: 'http://gatsbyjs.github.io/gatsby-starter-default/',
    description: 'Default Gatsby Template',
    author: 'gatsbyjs'
  },
  {
    name: 'Blog',
    url: 'https://github.com/gatsbyjs/gatsby-starter-blog',
    demo: 'http://gatsbyjs.github.io/gatsby-starter-blog/',
    description: 'Gatsby starter for creating a blog',
    author: 'gatsbyjs'
  },
  {
    name: 'Minimal (Hello World)',
    url: 'https://github.com/gatsbyjs/gatsby-starter-hello-world',
    demo: 'https://aberrant-fifth.surge.sh/',
    description: 'Minimalistic starter, only with bare essentials',
    author: 'gatsbyjs'
  },
  {
    name: 'Redux',
    url: 'https://github.com/caki0915/gatsby-starter-redux',
    demo: 'https://caki0915.github.io/gatsby-starter-redux/',
    description: 'Simple and clean Startersite for Gatsby with Redux and Emotion',
    author: 'caki0915'
  },
  {
    name: 'Lumen',
    url: 'https://github.com/alxshelepenok/gatsby-starter-lumen',
    demo: 'https://lumen.netlify.com/',
    description: 'A minimal, lightweight and mobile-first starter for creating blazing-fast static blogs',
    author: 'alxshelepenok'
  },
  {
    name: 'Dark Theme Portfolio (One Page)',
    url: 'https://github.com/LeKoArts/gatsby-starter-portfolio-emilia',
    demo: 'https://portfolio-emilia.netlify.com/',
    description: 'A portfolio starter for Gatsby (Dark Theme, One-Page). The target audience are designers and photographers',
    author: 'LeKoArts'
  },
  {
    name: 'Photographer Portfolio',
    url: 'https://github.com/LeKoArts/gatsby-starter-portfolio-emma',
    demo: 'https://portfolio-emma.netlify.com/',
    description: 'A portfolio starter for Gatsby (White Theme, Grid Layout). The target audience are designers and photographers',
    author: 'LeKoArts'
  },
  {
    name: 'Bootstrap Starter',
    url: 'https://github.com/jaxx2104/gatsby-starter-bootstrap',
    demo: 'https://gatstrap.netlify.com/',
    description: 'Gatsby starter for bootstrap a blog',
    author: 'jaxx2104'
  },
  {
    name: 'Typescript Starter',
    url: 'https://github.com/fabien0102/gatsby-starter',
    demo: 'https://fabien0102-gatsby-starter.netlify.com/',
    description: 'Gatsby starter with typescript and many cools dev tools',
    author: 'fabien0102'
  },
  {
    name: 'Material Starter',
    url: 'https://github.com/Vagr9K/gatsby-material-starter',
    demo: 'https://vagr9k.github.io/gatsby-material-starter/',
    description: 'A blog starter with Material design in mind for GatsbyJS',
    author: 'Vagr9K'
  },
  {
    name: 'Advanced Starter',
    url: 'https://github.com/Vagr9K/gatsby-advanced-starter',
    demo: 'https://vagr9k.github.io/gatsby-advanced-starter/',
    description: 'A skeleton starter for GatsbyJS that focuses on SEO/Social features/development environment',
    author: 'Vagr9K'
  },
  {
    name: 'Casper',
    url: 'https://github.com/haysclark/gatsby-starter-casper',
    demo: 'https://haysclark.github.io/gatsby-starter-casper/',
    description: 'The Casper theme v1.4 ported to Gatsby',
    author: 'haysclark'
  },
  {
    name: 'Netlify',
    url: 'https://github.com/AustinGreen/gatsby-starter-netlify-cms',
    demo: 'https://gatsby-netlify-cms.netlify.com/',
    description: 'Example gatsby + netlify cms project',
    author: 'AustinGreen'
  },
  {
    name: 'Documentation Site',
    url: 'https://github.com/ericwindmill/gatsby-starter-docs',
    demo: 'https://gatsby-docs-starter.netlify.com/',
    description: 'Forked gatsby-advanced-starter made for documentation sites',
    author: 'ericwindmill'
  },
];
