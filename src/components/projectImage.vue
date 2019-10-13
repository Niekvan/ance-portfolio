<template>
  <img 
    data-sizes="auto"
    :data-srcset="srcSet"
    :data-src="src"
    :src="src"
    :alt="description"
    class="lazyload"
  />
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
        return this.sizes.map((size) => `${this.resizeUrl(this.image, size)} ${size}w`)
      }
    },
    src() {
      if (this.image) {
        return this.image.replace('//a.storyblok.com', 'https://img2.storyblok.com/700x0')
      }
    }
  },
  methods: {
    resizeUrl(link, size) {
      return `https://img2.storyblok.com/${size}x0${link.replace('//a.storyblok.com', '')}`
    }
  }
}
</script>

<style lang="scss">
.lazyload,
.lazyloading {
  opacity: 0; }

.loading,
.lazyload,
.lazyloaded,
.image {
  opacity: 1;
  transition: 2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
</style>