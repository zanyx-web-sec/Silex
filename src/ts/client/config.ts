import * as blocksBasicPlugin from 'grapesjs-blocks-basic/dist/grapesjs-blocks-basic.min.js'
import * as headerPlugin from 'grapesjs-plugin-header/dist/grapesjs-plugin-header.min.js'
import * as sliderPlugin from 'grapesjs-lory-slider/dist/grapesjs-lory-slider.min.js'

import { pagePanelPlugin } from './grapesjs/page-panel'
import { newPageDialog, cmdOpenNewPageDialog } from './grapesjs/new-page-dialog'
import { projectBarPlugin } from './grapesjs/project-bar'
import { settingsDialog, cmdOpenSettings } from './grapesjs/settings'
import { blocksPlugin } from './grapesjs/blocks'

/**
 * @fileoverview Silex config overridable from index.pug
 */

const catBasic = 'Containers'
const catText = 'Texts'
const catMedia = 'Media'
const projectId = new URL(location.href).searchParams.get('projectId')
const loadEndpoint = `/website/?projectId=${projectId}`
const uploadEndpoint = `/assets/?projectId=${projectId}`

// reference to avoid removal by typescript
blocksBasicPlugin
headerPlugin
projectBarPlugin
pagePanelPlugin
newPageDialog
settingsDialog
blocksPlugin
sliderPlugin

export const defaultConfig = {

  /**
   * debug mode
   */
  debug: false,

  /**
   * Grapesjs config
   */
  editor: {
    height: '100%',
    showOffsets: 1,
    showDevices: 1,
    pageManager: true,
    layerManager: {
      appendTo: '.layer-manager-container',
    },
    blockManager: {
      appendTo: '.block-manager-container',
    },

    assetManager: {
      upload: uploadEndpoint,
    },
    storageManager: {
      id: '', // do not add a prefix to the saved object
      type: 'remote',
      urlStore: loadEndpoint,
      urlLoad: loadEndpoint,
    },
    container: '#gjs',

    plugins: [
      'grapesjs-plugin-header',
      'blocks',
      'gjs-blocks-basic',
      'project-bar',
      'page-panel',
      'new-page-dialog',
      'settings-dialog',
      'grapesjs-lory-slider',
    ],
    importWebpage: {
      modalImportLabel: '',
      modalImportContent: 'Paste a web page HTML code here.',
      modalImportButton: 'Import',
      modalImportTitle: 'Import from website',
    },
    pluginsOpts: {
      'gjs-blocks-basic': {
        category: catBasic,
        flexGrid: true,
      },
      'grapesjs-plugin-header': {
        category: catText,
        labelN1: 'Heading 1 (H1)',
        labelN2: 'Heading 2 (H2)',
        labelN3: 'Heading 3 (H3)',
        labelN4: 'Heading 4 (H4)',
        labelN5: 'Heading 5 (H5)',
        labelN6: 'Heading 6 (H6)',
      },
      'project-bar': {
        panels: [
          {
            id: 'dash',
            className: 'logo',
            attributes: { title: 'Go to your dashboard' },
            link: '/',
            command: 'open-dash',
          }, {
            id: 'block-manager-btn',
            className: 'block-manager-btn fa fa-fw fa-plus-square',
            attributes: { title: 'Insert new elements', containerClassName: 'block-manager-container', },
            command: 'open-blocks',
          }, {
            id: 'layer-manager-btn',
            className: 'layer-manager-btn fa fa-fw fa-list',
            attributes: { title: 'Layers', containerClassName: 'layer-manager-container', },
            command: 'open-layers',
          }, {
            id: 'page-panel-btn',
            className: 'page-panel-btn fa fa-fw fa-file',
            attributes: { title: 'Pages', containerClassName: 'page-panel-container', },
            command: 'open-pages',
          }, {
            id: 'settings-dialog-btn',
            className: 'page-panel-btn fa fa-fw fa-cog',
            attributes: { title: 'Settings' },
            command: 'open-settings',
          },
        ],
      },
      'page-panel': {
        cmdOpenNewPageDialog,
        cmdOpenSettings,
        appendTo: '.page-panel-container',
      },

      'grapesjs-lory-slider': {
        sliderBlock: {
          category: catMedia,
        },
      }
    },
  },
}