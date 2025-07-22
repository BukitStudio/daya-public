import { defineConfig } from "astro/config";

import { imageService } from "@unpic/astro/service";


export default defineConfig({
  site: 'https://soberstudio.dev',
  output: 'static',
   devToolbar: {
    enabled: false,
  },
  image: {
    service: imageService(
      {  placeholder: "blurhash",
      // This is the default
      layout: "constrained",}
    ),
  },

})