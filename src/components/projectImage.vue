<template>
  <picture>
    <source :data-srcset="srcSetWebp" type="image/webp">
    <source :data-srcset="srcSet">
    <img 
      data-sizes="auto"
      :data-src="src"
      :src="src"
      :alt="description"
      class="lazyload image"
    />
  </picture>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: 'image of Ance Janevica'
    }
  },
  data() {
    return {
      sizes: ['300', '500', '700', '1000', '1200', '1500', '1700']
    }
  },
  computed: {
    srcSet() {
      if (this.image) {
        return this.sizes.map((size) => `${this.resizeUrl(this.image, size, false)} ${size}w`)
      }
    },
    srcSetWebp() {
      if (this.image) {
        return this.sizes.map((size) => `${this.resizeUrl(this.image, size, true)} ${size}w`)
      }
    },
    src() {
      if (this.image) {
        return this.image.replace('//a.storyblok.com', 'https://img2.storyblok.com/10x0')
      }
    }
  },
  methods: {
    resizeUrl(link, size, webp) {
      if (webp) {
        return `https://img2.storyblok.com/${size}x0/filters:format(webp)${link.replace('//a.storyblok.com', '')}`
      } else {
        return `https://img2.storyblok.com/${size}x0${link.replace('//a.storyblok.com', '')}`
      }
    }
  }
}
</script>

<style lang="scss">
.image {
  height: 100%;
}

.lazyload,
.lazyloading {
	opacity: 0;
}
.lazyloaded {
	opacity: 1;
	transition: opacity 300ms;
}
</style>