<template>
  <div class="container">
    <div class="grid">
      <div class="col-desk-6 header">
        <r-img :image="story.content.main_image" :description="story.content.main_image_description" />
      </div>
      <div class="col-desk-6 scroll body">
        <div class="scroll__wrapper">
          <div class="scroll__items scroll__items--1">
            <span 
              v-for="(item, index) in story.content.scroll_skills"
              :key="`item-${index}-1`"
              class="scroll__item"
            >
              {{ item.text }}
            </span>
          </div>
          <!-- <p class="scroll__items scroll__items--2">
            <span 
              v-for="(item, index) in story.content.scroll_skills"
              :key="`item-${index}-2`"
              class="scroll__item"
            >
              {{ item.text }}
            </span>
          </p> -->
        </div>
      </div>
       <div class="col-desk-4 col-desk-shift-1 col-mob-4 col-mob-shift-0 text body--large" v-html="body" />
      <div class="col-desk-6 image">
        <r-img :image="story.content.lower_image" :description="story.content.lower_image_description" />
      </div>
      <div class="col-desk-6 scroll scroll--contact body">
        <div class="scroll__wrapper">
          <div class="scroll__items scroll__items--1">
            <a 
              v-for="(item, index) in story.content.scroll_contact" 
              :key="`contact-${index}-1`" 
              :href="item.link"
              rel="noreferrer"
              target="_blank"
              class="scroll__item"
            >
              {{ item.text }}
            </a>
          </div>
          <!-- <p class="scroll__items scroll__items--2">
            <a 
              v-for="(item, index) in story.content.scroll_contact" 
              :key="`contact-${index}-2`" 
              :href="item.link"
              rel="noreferrer"
              target="_blank"
              class="scroll__item"
            >
              {{ item.text }}
            </a>
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import resizedImage from '~/components/resizedImage.vue'

export default {
  name: "Home",
  metaInfo: {
    title: "Portfolio Ance"
  },
  components: {
    'r-img': resizedImage
  },
  data() {
    return {
      story: null
    }
  },
  computed: {
    body() {
      return marked(this.$page.allAbout.edges[0].node.content.body)
    }
  },
  created() {
    this.story = this.$page.allAbout.edges[0].node
  }
};
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  width: 100%;
  padding: $margin-top-phone $margin-side-phone;

  @include breakpoint(tablet, min) {
    padding: $margin-top-tablet $margin-side-tablet;
  }
}

.header {
  position: relative;
}

.scroll {
  position: relative;
  height: 2em;

  &--contact {
    margin-top: 2em;
  }

  &__wrapper {
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  &__items {
    display: flex;
    justify-content: space-around;
    white-space: nowrap;

    position: absolute;
    width: 100%;

    animation: scroll-left 40s linear infinite;
    animation-play-state: running;

    &:hover {
      animation-play-state: paused;
    }

    &--1 {
      z-index: 1;
    }

    // &--2 {
    //   animation-delay: 20s;
    // }

  }

  &__item {
    color: $color-text-inverse;
    text-decoration: none;
    flex-grow: 1;
    padding: 0 1rem;
    text-align: center;

    @include breakpoint(tablet, min) {
      padding: 0;
    }
  }

  &::after {
    content: "";
    width: calc(100% - #{$grid-mobile-gutter});
    height: 1px;
    position: absolute;
    bottom: 0;
    left: $grid-mobile-gutter / 2;
    background: $color-text-inverse;

    @include breakpoint(tablet, min) {
      width: calc(100% - #{$grid-tablet-gutter});
      left: $grid-tablet-gutter / 2;
    }

    @include breakpoint(desktop, min) {
      width: calc(100% - #{$grid-desktop-gutter});
      left: $grid-desktop-gutter / 2;
    }
  }
}

.text {
  padding: $margin-top-phone 0;

  @include breakpoint(tablet, min) {
    padding: 4 * $margin-top-tablet 0;
  }
}

@keyframes scroll-left {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}
</style>

<page-query>
query {
  allAbout {
    edges {
      node {
        id
        content {
          main_image
          main_image_description
          scroll_skills {
            text
          }
          body
          lower_image
          lower_image_description
          scroll_contact {
            text
            link
          }
        }
      }
    }
  }
}
</page-query>