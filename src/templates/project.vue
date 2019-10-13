<template>
  <div class="container">
    <div ref="container" class="wrapper">
      <div class="container__content" :style="{ transform: `translateX(${scrollLeft}px)` }">
        <div class="panel text-panel text-panel--details">
          <p 
            v-for="(detail, index) in $page.project.content.details"
            :key="`detail-${index}`"
            class="body detail"
          >{{ detail.text }}</p>
        </div>
        <div class="panel text-panel text-panel--description">
          <h1 class="heading heading--1 title" v-html="$page.project.content.title" />
          <p class="content" v-html="$page.project.content.description" />
        </div>
        <p-img 
          v-for="(slide, index) in $page.project.content.slides" 
          :key="`image-${index}`" 
          class="panel image-panel" 
          :image="slide.image" 
          :alt="slide.description"
        />
        <div class="panel">
          <div class="grid">
            <div class="col-desk-2" />
             <div class="col-desk-1">
                <span class="line line--left"/>
             </div>
             <div class="col-desk-2 v-center">
               <p class="body contact">
                  For more information please contact:<br>
                  <a href="mailto:info@ance.xyz">info@ance.xyz</a>
               </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import projectImage from '~/components/projectImage.vue'

export default {
  components: {
    'p-img': projectImage
  },
  data() {
    return {
      scrollLeft: 0,
      maxScroll: 0
    }
  },
  computed: {
    device() {
      if (!window) {
        return
      } return window
        .getComputedStyle(this.$refs.container, '::before')
        .getPropertyValue('content')
        .replace(/'/g, "")
        .replace(/"/g, "")
        .split(", ")[0]
    }
  },
  mounted() {
    if (this.device !== 'phone') {
      window.addEventListener('wheel', this.handleScroll, { passive: true })
    }
  },
  beforeDestroy() {
    if (this.device !== 'phone') {
      window.removeEventListener('wheel', this.handleScroll, { passive: true })
    }
  },
  methods: {
    handleScroll(e) {
      this.maxScroll = this.$refs.container.getBoundingClientRect().width - window.innerWidth
      const delta = e.wheelDelta || e.deltaX * 100 || e.deltaY * 100
      if (!(Math.abs(this.scrollLeft + delta) > this.maxScroll) && (this.scrollLeft + delta) <= 0) {
        this.scrollLeft += delta
      } else if (Math.abs(this.scrollLeft + delta) > this.maxScroll) {
        this.scrollLeft = -this.maxScroll
      } else if ((this.scrollLeft + delta) > 0) {
        this.scrollLeft = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  flex-direction: column;
  position: relative;
  height: auto;
  width: calc(100vw - #{2 * $margin-side-phone});
  padding: $margin-top-phone $margin-side-phone;


  @include breakpoint(tablet, min) {
    flex-direction: row;
    overflow: hidden;
    padding: 0;
    padding-top: $margin-top-tablet;
    padding-bottom: $margin-top-tablet;
    padding-left: $margin-side-tablet;
    height: calc(100vh - #{2 * $margin-top-tablet});
    width: calc(100vw - #{$margin-side-tablet});
  }

  .wrapper {
    display: inline-block;
    height: 100%;

    &::before {
      content: 'phone';
      display: none;

      @include breakpoint(tablet, min) {
        content: 'tablet';
      }

      @include breakpoint(desktop, min) {
        content: 'desktop';
      }
    }
  }

  &__content {
    height: 100%;
    transform: translateZ(0);
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000;
    transition: transform 1s ease-out;

    @include breakpoint(tablet, max) {
      max-width: 100vw;
    }

    @include breakpoint(tablet, min) {
      display: flex;
      flex-direction: row;
      min-width: 150vw;
      width: auto;
      padding-right: $margin-side-tablet + $margin-gutter-tablet;
    }

    .grid {
      width: 75vw;
      height: 100%;
    }

    .detail {
      white-space: pre-wrap;
    }
  }

  .panel {
    &:not(:first-child) {
      @include breakpoint(tablet, min) {
        margin-left: $margin-gutter-tablet;
      }
    }

    &:last-child {
      @include breakpoint(tablet, min) {
        margin-right: $margin-gutter-tablet;
      }
    }
  }

  .text-panel {
    flex: 0 0 auto;

    &--details {
      @include breakpoint(tablet, min) {
        width: calc(100vw / 6);
        align-self: flex-end;
      }
    }

    &--description {
      @include breakpoint(tablet, min) {
        width: calc(100vw / 6 * 2);
      }
    }
  }

  .image-panel {
    position: relative;
    width: 100%;

    @include breakpoint(tablet, max) {
      max-width: 100%;
      max-height: 100%;
    }

    @include breakpoint(tablet, min) {
      height: 100%;
      width: auto;
    }
  }
}
</style>

<page-query>
query project($id: ID!) {
  project(id: $id) {
    id
    path
    content {
      title
      description
      details {
        text
      }
      main_image {
        description
        image
      }
      slides {
          description
          image
      }
    }
  }
}
</page-query>