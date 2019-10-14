<template>
  <Layout>
    <transition name="overlay-left-full" mode="out-in">
      <router-view />
    </transition>
    <div class="overlay-left" />
    <div class="overlay-right" />
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$static.metadata.siteName,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$static.metadata.siteDescription
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay-left {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 0;
  background: $background-color-inverse;
  transition-duration: 0.35s;

  z-index: 999;

  .heading {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.overlay-right {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 0;
  background: $background-color-inverse;
  transition-duration: 0.35s;

  z-index: 999;
}

.overlay-left-full-enter ~ .overlay-right {
  width: 100vw;
}

.overlay-left-full-enter-active ~ .overlay-right,
.overlay-left-full-leave-active ~ .overlay-right {
  width: 100vw;
}

.overlay-left-full-enter-active ~ .overlay-right {
  transition-timing-function: ease-in;
}

.overlay-left-full-enter-active ~ .overlay-right,
.overlay-left-full-enter-to ~ .overlay-right {
  display: none;
}

.overlay-left-full-enter-to ~ .overlay-left {
  width: 0;
}

.overlay-left-full-leave-active ~ .overlay-left {
  transition-timing-function: ease;
}

.overlay-left-full-enter ~ .overlay-left,
.overlay-left-full-enter-active ~ .overlay-left,
.overlay-left-full-enter-to ~ .overlay-left {
  transition-duration: unset !important;
  width: 100vw;
}

.overlay-left-full-enter-active,
.overlay-left-full-leave-active {
  transition-duration: 0.35s;
}
</style>

<static-query>
query App {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>