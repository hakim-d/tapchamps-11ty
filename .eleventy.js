const htmlmin = require('html-minifier')
const now = String(Date.now())
const Image = require("@11ty/eleventy-img")
const { minify } = require("terser");

async function imageShortcode(src, alt, sizes, formats, draggable, cls, url=false) {
  let metadata = await Image(src, {
    widths: sizes,
    formats: formats
  });
  let imageAttributes = {
    alt,
    draggable,
    class: cls,
    sizes,
    loading: "lazy",
    decoding: "async",
  };
  return url ? metadata.webp[0].outputPath : Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy({'backend/*': '/'});
  eleventyConfig.addPassthroughCopy({'backend/contact/*': '/contact'});
  eleventyConfig.addWatchTarget('./styles/tailwind.config.js')
  eleventyConfig.addWatchTarget('./styles/tailwind.css')
  eleventyConfig.addPassthroughCopy({
    './node_modules/swiper/swiper-bundle.min.css': './css/swiper.css',
  })
  eleventyConfig.addPassthroughCopy({
    './node_modules/swiper/swiper-bundle.min.js': './js/swiper.js',
  })
  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.js': './js/alpine.js',
  })
  eleventyConfig.addPassthroughCopy({
    './node_modules/animejs/lib/anime.min.js': './js/anime.js',
  })
  eleventyConfig.addPassthroughCopy({
    './node_modules/apexcharts/dist/apexcharts.min.js': './js/apexcharts.js',
  })
  // eleventyConfig.addPassthroughCopy({
  //   './node_modules/@alpinejs/intersect/dist/cdn.min.js': './js/intersect.js',
  // })
  eleventyConfig.addPassthroughCopy({'./assets/tapchamps-logo.svg': './img/tapchamps-logo.svg'})
  eleventyConfig.addPassthroughCopy({'./assets/tapchamps-dark-logo.svg': './img/tapchamps-dark-logo.svg'})
  eleventyConfig.addPassthroughCopy({'./assets/header-bg.svg': './img/header-bg.svg'})
  eleventyConfig.addPassthroughCopy({'./assets/header-dark-bg.svg': './img/header-dark-bg.svg'})
  

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  eleventyConfig.addShortcode('version', function () {
    return now
  })
  
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
      })
      return minified
    }
    return content
  })

  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
      code,
      callback
    ) {
      try {
        const minified = await minify(code);
        callback(null, minified.code);
      } catch (err) {
        console.error("Terser error: ", err);
        // Fail gracefully.
        callback(null, code);
      }
  });

};