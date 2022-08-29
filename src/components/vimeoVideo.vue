<template>
  <div class="video-wrapper panel image-panel">
    <iframe
      ref="iframe"
      v-if="url"
      :src="url"
      :style="`aspect-ratio: ${ratio} / 1`"
      allowfullscreen
    />
  </div>
</template>

<script>
export default {
  props: {
    video: {
      required: true,
    },
  },
  computed: {
    url() {
      if (this.video?.vimeo_oembed) {
        return `https://player.vimeo.com/video/${
          this.video.vimeo_oembed.response.video_id
        }`;
      }
      return undefined;
    },
    ratio() {
      if (this.video?.vimeo_oembed) {
        return (
          this.video.vimeo_oembed.response.width /
          this.video.vimeo_oembed.response.height
        );
      }
      return 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.video-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  iframe {
    height: 100%;
    border: none;

    @include breakpoint('tablet', min) {
      height: 70%;
    }
  }
}
</style>
