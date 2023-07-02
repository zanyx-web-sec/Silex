import fetch from 'node-fetch'
import { ServerConfig } from '../server/config'

type HooksOptions = {
  gitUrl?: string
  buildUrl?: string
}

const rootPath = process.env.DATA_FOLDER

// **********
throw new Error('TODO: implement hooks plugin')
const EVENT_ASSET_WRITE_END = 'silex:asset:write:end'
const EVENT_PUBLISH_END = 'silex:publish:end'
const EVENT_WRITE_END = 'silex:write:end'
function projectPath(projectId: string) { return `${rootPath}/${projectId}` }
// **********

export default async function(config: ServerConfig, opts: HooksOptions = {}) {
  // Options with defaults
  const options = {
    gitUrl: process.env.SILEX_HOOK_GIT,
    buildUrl: process.env.SILEX_HOOK_BUILD,
    ...opts
  }
  config.on(EVENT_WRITE_END, async ({ res, req, projectId, data }) => {
    if(options.gitUrl) {
      await hook(options.gitUrl, {
        path: projectPath(projectId),
        message: 'Change from Silex',
      })
    }
  })
  config.on(EVENT_ASSET_WRITE_END, async ({ res, req, projectId, uploadDir, form, data }) => {
    if(options.gitUrl) {
      await hook(options.gitUrl, {
        path: projectPath(projectId),
        message: 'Change from Silex',
      })
    }
  })
  config.on(EVENT_PUBLISH_END, async ({ projectId, files, req, res }) => {
    if(options.buildUrl) {
      await hook(options.buildUrl)
    }
  })
}

async function hook(url, params = {}) {
  if(url) {
    const urlObj = new URL(url)
    console.log('Calling hook', {url})
    try {
      Object.keys(params)
        .forEach(key => urlObj.searchParams.append(key, params[key]))
      return fetch(urlObj.toString())
    } catch(error) {
      console.log('Hook call failed', {url, error})
      return null
    }
  }
}