<template>
  <div class="container">
    <div class="grid">
      <div class="col-desk-6 header">
        <r-img image="https://via.placeholder.com/1676x943.png" alt />
      </div>
      <div class="col-desk-6 scroll body">
        <div class="scroll__wrapper">
          <p class="scroll__items scroll__items--1">
            <span class="scroll__item">Crafting experiences</span>
            <span class="scroll__item">Design Activism</span>
            <span class="scroll__item">Visual Communication</span>
            <span class="scroll__item">Product Design</span>
          </p>
          <p class="scroll__items scroll__items--2">
            <span class="scroll__item">Crafting experiences</span>
            <span class="scroll__item">Design Activism</span>
            <span class="scroll__item">Visual Communication</span>
            <span class="scroll__item">Product Design</span>
          </p>
        </div>
      </div>
      <p
        class="col-desk-4 col-desk-shift-1 text body--large"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque luctus urna a semper fermentum. Donec semper ultrices nisi, quis tempus lorem ultrices ullamcorper. Aenean ornare dui tempor tempus aliquam. Praesent pretium rhoncus mi, sed lacinia tellus cursus eu. Vestibulum velit sapien, scelerisque et mi volutpat, mollis pharetra diam. Vestibulum a lobortis leo. Vestibulum non risus luctus, eleifend ipsum quis, tempus elit. Etiam non viverra dolor. Nunc aliquam sollicitudin tortor, quis venenatis neque egestas mattis. Aenean ex arcu, sollicitudin sit amet lectus id, sagittis tempus urna. Morbi condimentum massa in elit accumsan mattis.</p>
      <p
        class="col-desk-4 col-desk-shift-1 text body--large"
      >Nunc turpis erat, feugiat at justo sit amet, ornare pharetra mauris. Etiam vel aliquam tellus. Maecenas gravida eleifend nunc quis faucibus. Nunc tincidunt nibh diam, eget aliquet velit posuere in. Ut metus neque, suscipit sit amet lorem ut, lobortis varius lectus. Pellentesque dignissim sem eget efficitur convallis. Cras ligula risus, viverra vitae auctor eget, consectetur non est. Phasellus at pharetra nibh, sit amet consectetur ex.</p>
      <div class="col-desk-6 image">
        <img src="https://via.placeholder.com/1676x943.png" alt />
      </div>
      <div class="col-desk-6 scroll body">
        <div class="scroll__wrapper">
          <p class="scroll__items scroll__items--1">
            <a href="mailto:info@ance.xyz" class="scroll__item">info@ance.xyz</a>
            <a
              href="https://instagram.com/klusuma"
              target="_blank"
              rel="noreferrer"
              class="scroll__item"
            >@klusuma</a>
            <a href="mailto:info@ance.xyz" class="scroll__item">info@ance.xyz</a>
          </p>
          <p class="scroll__items scroll__items--2">
            <a
              href="https://instagram.com/klusuma"
              target="_blank"
              rel="noreferrer"
              class="scroll__item"
            >@klusuma</a>
            <a href="mailto:info@ance.xyz" class="scroll__item">info@ance.xyz</a>
            <a
              href="https://instagram.com/klusuma"
              target="_blank"
              rel="noreferrer"
              class="scroll__item"
            >@klusuma</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import resizedImage from '~/components/resizedImage.vue'

export default {
  name: "Home",
  metaInfo: {
    title: "Portfolio Ance"
  },
  components: {
    'r-img': resizedImage
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
    padding-left: 100%;

    animation: scroll-left 40s linear infinite;

    &--1 {
      z-index: 1;
    }

    &--2 {
      animation-delay: 20s;
    }

  }

  &__item {
    color: $color-text-inverse;
    text-decoration: none;
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
  &:first-of-type {
    margin-top: 4 * $margin-top-phone;

    @include breakpoint(tablet, min) {
      margin-top: 4 * $margin-top-tablet;
    }
  }
}

@keyframes scroll-left {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}
</style>