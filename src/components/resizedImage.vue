<template>
  <div class="loading image__wrapper" :style="padding">
    <picture v-if="imageSrc" >
      <source :data-srcset="imageSrcsetWebp" type="image/webp" />
      <source :data-srcset="imageSrcset" />
      <img 
        data-sizes="auto"
        :data-src="imageSrc"
        :alt="description"
        class="image lazyload"
      >
    </picture>
  </div>
</template>

<script>
// import 'lazysizes/plugins/blur-up/ls.blur-up'

export default {
  props: {
    image: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      reg: /(?:^\/\/a\.storyblok\.com\/f\/[0-9]+\/)(?<width>[0-9]+)x(?<height>[0-9]+)/g,
      sizes: ['300', '500', '700', '1000', '1200', '1500', '1700', '2000']
    }
  },
  computed: {
    padding() {
      if (this.image) {
        const { width, height } = this.reg.exec(this.image).groups
        return {
          paddingBottom: `${(height / width) * 100}%`
        }
      }
    },
    imageSrc() {
      if (!this.image) {
        return null
      }
      return this.image.replace('//a.storyblok.com', 'https://img2.storyblok.com/700x0')
    },
    imageSrcsetWebp() {
      if (!this.image) {
        return null
      }
      return this.sizes.map((size) => `${this.resizeUrl(this.image, size, true)} ${size}w`)
    },
    imageSrcset() {
      if (!this.image) {
        return null
      }
      return this.sizes.map((size) => `${this.resizeUrl(this.image, size, false)} ${size}w`)
    }
  },
  mounted() {
    document.addEventListener('lazyloaded', function(e) {
      e.target.parentNode.classList.add('image-loaded')
      e.target.parentNode.classList.remove('loading')
    })
  },
  beforeDestroy() {
    document.removeEventListener('lazyloaded', function(e) {
      e.target.parentNode.classList.add('image-loaded')
      e.target.parentNode.classList.remove('loading')
    })
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

<style lang="scss" scoped>
.image {
  &__wrapper {
    position: relative;
    overflow: hidden;
    background: linear-gradient(rgba($background-color, 1) 66%, rgba($background-color, 0));
    transition: background 0.4s;

    &.image-loaded {
      background: transparent;
      padding-bottom: 0;
    }
  }

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 0.2s;
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