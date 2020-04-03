/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
  title: "Sheets Crossword", // Title for your website.
  tagline:
    "A plugin for completing crosswords from the Guardian newspaper collaboratively using Google Sheets",
  url: "https://tmiguelt.github.io", // Your website URL
  baseUrl: "/SheetsCrossword/", // Base URL for your project */

  projectName: "Sheets Crossword",
  organizationName: "TMiguelT",

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: "index", label: "Home" },
    { doc: "privacy", label: "Privacy" },
  ],

  /* path to images for header/footer */
  headerIcon: "img/favicon.ico",
  footerIcon: "img/favicon.ico",
  favicon: "img/favicon.ico",

  /* Colors for website */
  colors: {
    primaryColor: "#009e31",
    secondaryColor: "#006e22",
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Michael Milton`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: "default",
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ["https://buttons.github.io/buttons.js"],

  // On page navigation for the current documentation page.
  onPageNav: "separate",
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: "img/undraw_online.svg",
  twitterImage: "img/undraw_tweetstorm.svg",
};

module.exports = siteConfig;
