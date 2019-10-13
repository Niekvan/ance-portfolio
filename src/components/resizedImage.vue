<template>
  <div class="loading image__wrapper" :style="padding">
    <img 
      v-if="imageSrc" 
      :data-src="imageSrc" 
      :data-srcset="imageSrcset" 
      data-sizes="auto" 
      class="image lazyload"
      :alt="description"
    >
  </div>
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
    imageSrcset() {
      if (!this.image) {
        return null
      }
      return this.sizes.map((size) => `${this.resizeUrl(this.image, size)} ${size}w`)
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
    resizeUrl(link, size) {
      return `https://img2.storyblok.com/${size}x0${link.replace('//a.storyblok.com', '')}`
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
  opacity: 0; }

.loading,
.lazyload,
.lazyloaded,
.image {
  opacity: 1;
  transition: 2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
</style>