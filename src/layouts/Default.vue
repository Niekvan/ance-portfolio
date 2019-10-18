<template>
  <div class="layout" :class="{ inverse: inverse }">
    <slot/>
    <nav class="nav">
      <span class="nav__item nav__item--home"><g-link to="/about/" class="nav__text nav__text--left">ance</g-link></span>
      <span class="nav__item nav__item--work"><g-link to="/" class="nav__text nav__text--right">work</g-link></span>
    </nav>
    <transition name="move-up">
      <div v-show="!loaded" class="loader">
        <h1 class="loader__text heading heading--loader">Ance</h1>
        <span class="loader__dot" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'LayoutWrapper',
  data() {
    return {
      loaded: false
    }
  },
  computed: {
    inverse() {
      return this.$route.path === '/' || this.$route.path.includes('/about')
    }
  },
  mounted() {
    setTimeout(() => {
      this.loaded = true;
    }, 2000)
  }
}
</script>

<style lang="scss" scoped>
.layout {
  transition: background 0s 0.35s;
  background: $background-color;

  .loader {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: $background-color-inverse;
    overflow: hidden;

    &__text {
      position: absolute;
      top: 50vh;
      left: 50vw;
      transform: translate(-50%, -50%);
      color: $color-text-inverse;
    }

    &__dot {
      position: absolute;
      width: 10rem;
      height: 10rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: leftright 1.5s infinite alternate linear;

      border-radius: 50%;
      background: $background-color-inverse;
      opacity: 0.75;
      filter: blur(3rem);
    }
  }

  &.inverse {
    background: $background-color-inverse;

    .nav__text {
      color: $color-text-inverse;

      &::after {
        background: $background-color;
      }
    }

    .loader {
      background: $background-color;

      &__text {
        color: $color-text-primary;
      }

      &__dot {
        background: $background-color;
        opacity: 1;
        filter: blur(2rem);
      }
    }
  }
}
.nav {
  &__item {
    position: fixed;
    top: $margin-top-phone;
    width: $margin-side-phone;
    text-align: center;

    @include breakpoint(tablet, min) {
      width: $margin-side-tablet;
      top: $margin-top-tablet;

      .active--exact {
        &::after {
          width: 100%;
        }
      }
    }

    &--home {
      left: 0;
    }

    &--work {
      right: 0;
    }
  }

  &__text {
    display: inline-block;
    text-transform: uppercase;
    text-decoration: none;
    color: $color-text-primary;
    position: relative;

    &::after {
      content: '';
      height: 2px;
      width: 0;
      position: absolute;
      left: 0;
      bottom: 0;
      background: $background-color-inverse;
      transition: width 0.3s;
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }

    &--left {
      transform: rotate(-90deg) translateX(-35%) translateY(-30%);
    }

    &--right {
      transform: rotate(90deg) translateX(35%) translateY(30%);
    }
  }
}

.move-up-leave-active {
  transition: height 1.5s;
}

.move-up-leave-to {
  height: 0 !important;
}

@keyframes leftright {
  0% {
    transform: translate(calc(-50% - 3rem), -50%);
  }

  100% {
    transform: translate((calc(-50% + 3rem)), -50%);
  }
}
</style>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
