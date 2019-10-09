<template>
  <div class="loading image__wrapper" :style="padding">
    <img v-if="imageSrc" :data-src="imageSrc" :data-srcset="imageSrcset" data-sizes="auto" class="image lazyload">
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      reg: /(?:^\/\/a\.storyblok\.com\/f\/[0-9]+\/)(?<width>[0-9]+)x(?<height>[0-9]+)/g
      // reg: /https:\/\/via\.placeholder\.com\/(?<width>[0-9]+)x(?<height>[0-9]+)(?:.*)$/g
    }
  },
  computed: {
    padding() {
      const { width, height } = this.reg.exec(this.image).groups
      return {
        paddingBottom: `${(height / width) * 100}%`
      }
    },
    imageSrc() {
      if (!this.image) {
        return null
      }
      return this.image.replace('a.storyblok.com', 'img2.storyblok.com/500x0')
    },
    imageSrcset() {
      if (!this.image) {
        return null
      }
      return `${this.image.replace(`a.storyblok.com`, `img2.storyblok.com/1000x0/filters:quality(60)`)} 2x`
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
  }
}
</script>

<style lang="scss" scoped>
.image {
  &__wrapper {
    position: relative;
    overflow: hidden;
    background: linear-gradient(rgb(242, 242, 242) 66%, rgba(242, 242, 242, 0));

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
</style>