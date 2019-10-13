// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import 'normalize.css'
import '~/assets/scss/main.scss'
import 'lazysizes'

import DefaultLayout from '~/layouts/Default.vue'

const meta = [
  {
    name: 'keywords',
    content: 'Ance,Janevica,Ance Janavevica,design,research,Latvia,Eindhoven,Design Academy Eindhoven,polinating,pollinating,concept,graphic design,experience design'
  },
  {
    name: 'author',
    content: 'Ance Janevica'
  },
  {
    name: 'robots',
    content: 'index, follow'
  },
  {
    property: 'site_name',
    content: 'Portfolio Ance Janevica'
  },
  {
    key: 'description',
    name: 'description',
    content: 'Ance Janevica is a multidisciplinary designer with a focus on research design.'
  },
  {

  }
]

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  head.meta.push(...meta)
}