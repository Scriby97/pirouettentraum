import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'stlaoooi',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Nach `npm run deploy` unter https://pirouettentraum.sanity.studio erreichbar
  studioHost: 'pirouettentraum',
  deployment: {
    appId: 'mt4gqtsyn12wrml9dh1efma1',
  },
})
