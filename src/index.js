'use strict';

import Home from './pages/Home.js';
import Result from './pages/Result.js';
import Error404 from './pages/Error404.js';

import Utils from './services/Utils.js';

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  '/': Home,
  '/result': Result
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
  // Lazy load view element:
  const content = null || document.getElementById('page_container');

  // Get the parsed URl from the addressbar
  let request = Utils.parseRequestURL();

  let parsedURL = request.resource ? '/' + request.resource : '/';

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  let page = routes[parsedURL] ? routes[parsedURL] : Error404;

  content.innerHTML = await page.render();
  await page.after_render();
};

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
