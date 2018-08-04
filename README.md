# Frontend Template
A repository to experiment with a front end setup for Umbraco / CMS driven sites using VueJS + Tailwind

## Why?
I really love VueJS and am trying to use it more and more in my projects, however most examples I've found revolve around it's use for web APPLICATION's or SPAs, rather than server rendered WEBSITE's backed by a CMS like I mostly work with.

For me, CMS / Website based dev has a few requirements that don't tend to fit too well with the usual setups.

1. Pages and thus component usage on the page are usually decided dynamically, thus a core Vue instance can't exist to orchestrate the page.
2. Pages need to have server rendered content on them to ensure a degree of SEO friendlyness.

Becuase of this, it requires a slightly different way of thinking so this repository is just a place for me to experiment with an ideal setup.

As well as VueJS, I'm also looking into the Tailwind CSS framework as I'm really starting to see the benefits of functional CSS. 

## Structure
For the structure I'm planning on holding the front end source files seperate to the Umbraco web folder. In the build script I'm building to a `./build` folder, but I'll eather likely build straight to the Umbraco web folder, or setup a copy command.

The setup is based around 4 major components, which are:

1. NPM - A package installer
2. Laravel Mix - A wrapper around webpack to make it simpler to config
3. Tailwind CSS - A functional CSS framework
4. VueJS - A kick ass JS framework

The main entry point then is the `package.json` file which dictates the dependencies and the core build script triggers.

After this comes `webpack.mix.js` which holds the build configuration and essentially does the following:

1. Clean out the build folder
2. Compile js, including Vue SFCs
3. Compile css, including Tailwind

This file then leads on to `tailwind.js` which contains the Tailwind configuration.

Lastly the `src` folder contains the raw CSS and JS files.

From a CSS perspective, this just follow the documented tailwind approach. In the JS folder it's using VueJS, but I've created a base file to work how I think will work best. This is, having a single Vue instance at the app level that doesn't really do anything, and then a script which loads and registers all component globally. I'm doing this as like I say, because the page is built dynamically we can't really know when / if a component is going to be used so we'll just treat them all as global.

## Best Practises
As well as this structure there are also some practises that seem to lend themselves well to website dev.

1. Try and create templateless components where possible and use slots to provide the markup. The reason for this is to have as much rendered markup as possible.
2. Event if you can't use templatless components, use slots to provide content so that the content can exist in the page should JS be unavailable.
3. If you have specific components to replace standard dom elements, use the `is` attribute to apply the component so that the original dom element can be present in the page as a fallback.