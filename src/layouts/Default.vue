<template>
  <div class="layout" :class="{ inverse: inverse }">
    <slot/>
    <nav class="nav">
      <span class="nav__item nav__item--home"><g-link to="/" class="nav__text nav__text--left">ance</g-link></span>
      <span class="nav__item nav__item--work"><g-link to="/work" class="nav__text nav__text--right">work</g-link></span>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'LayoutWrapper',
  computed: {
    inverse() {
      return this.$route.path === '/' || this.$route.path === '/work'
    }
  }
}
</script>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style lang="scss">
.layout {
  transition: background 0s 0.35s;
  background: $background-color;

  &.inverse {
    background: $background-color-inverse;

    .nav__text {
      color: $color-text-inverse;
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

    &--left {
      transform: rotate(-90deg) translateX(-35%) translateY(-30%);
    }

    &--right {
      transform: rotate(90deg) translateX(35%) translateY(30%);
    }
  }
}
</style>
