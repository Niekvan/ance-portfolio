<template>
  <div class="container">
    <div 
      v-for="(edge, index) in $page.allProject.edges" 
      :key="edge.node.id"
      class="project"
    >
      <g-link 
        class="grid project__link" 
        :to="edge.node.path"
      >
        <h3 class="project__heading heading heading--1 col-desk-2 col-mob-4 inverse">
          {{ edge.node.content.title }}
        </h3>
        <div class="col-desk-3 col-mob-4">
          <r-img
            v-if="edge.node.content.main_image[0]"
            :image="edge.node.content.main_image[0].image"
            class="project__image"
            :alt="`${edge.node.title} main image`"
          />
        </div>
        <div class="line col-desk-6 inverse"/>
        <p class="col-desk-2 col-mob-2 project__details project__details--count inverse">
          {{index +1}}/{{$page.allProject.edges.length}}
        </p>
        <p class="project__details project__details--year col-desk-2 col-desk-shift-2 col-mob-2 col-mob-shift-0 inverse">
          {{ edge.node.content.year }}
        </p>
      </g-link>
    </div>
  </div>
</template>

<script>
import resizedImage from '~/components/resizedImage.vue'

export default {
  name: 'Work',
  components: {
    'r-img': resizedImage
  },
  methods: {
    handleMouseover(e) {
      console.log(e, e.clientX)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: stretch;

  box-sizing: border-box;
  width: 100%;
  padding: $margin-top-phone $margin-side-phone;

  @include breakpoint(tablet, min) {
    padding: $margin-top-tablet $margin-side-tablet;
  }
}

.project {
  position: relative;

  &__link {
    text-decoration: none;
  }

  &__heading {
    font-size: 3rem;
    font-weight: 300;

    margin: 0;
    margin-bottom: -0.25em;
    align-self: flex-end;
  }

  &__image {
    display: block;
    width: 100%;
  }

  &__details {
    position: relative;

    &--year {
      text-align: right;
    }

  }

  &:first-child {
    margin-top: $margin-top-phone;

    @include breakpoint(tablet, min) {
      margin-top: $margin-top-tablet;
    }
  }

  &:not(:last-child) {
    margin-bottom: $margin-side-phone;

    @include breakpoint(tablet, min) {
      margin-bottom: $margin-side-tablet;
    }
  }
}
</style>

<page-query>
query {
  allProject {
    edges {
      node {
        id
        path
        content {
          title
          year
          main_image {
            description
            image
          }
        }
      }
    }
  }
}
</page-query>