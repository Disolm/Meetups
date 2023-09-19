<template>
  <div class='image-uploader'>
    <label
      class='image-uploader__preview'
      :class="{'image-uploader__preview-loading': loading}"
      :style="urlImg && {'--bg-url': 'url(' + urlImg + ')'}"
      @[eventnamelabel].prevent='removeImg'
    >
      <span
        class='image-uploader__text'
      >
        {{ textInElement }}
      </span>
      <input
        v-bind='$attrs'
        type='file'
        accept='image/*'
        class='image-uploader__input'
        @[eventnameinput]='previewFiles'
      />
    </label>
  </div>
</template>

<script>
// TO DO: Task 06-wrappers/05-UiImageUploader

export default {
  name: 'UiImageUploader',
  props: {
    preview: {
      type: String,
      required: false,
    },
    uploader: {
      type: Function,
      required: false,
    },
  },
  inheritAttrs: false,
  emits: ['select', 'upload', 'error', 'remove'],
  data() {
    return {
      loading: false,
      urlImg: this.preview,
    };
  },
  computed: {
    eventnameinput() {
      return this.urlImg ? null : 'change';
    },
    eventnamelabel() {
      return this.urlImg && !this.loading ? 'click' : null;
    },
    textInElement() {
      if (this.loading) return 'Загрузка...';
      if (this.urlImg) return 'Удалить изображение';
      return 'Загрузить изображение';
    },
  },
  methods: {
    async previewFiles(event) {
      if (!event.currentTarget.files.length) return;
      let file = event.currentTarget.files[0];
      this.$emit('select', file);
      this.urlImg = URL.createObjectURL(file);

      if (this.uploader) {
        this.loading = true;
        this.uploader(file).then((response) => {
          this.$emit('upload', response);
          this.urlImg = response.image;
        }).catch((error) => {
            this.$emit('error', error);
            this.urlImg = '';
          },
        ).finally(() => {
          this.loading = false;
        });
      }
      event.target.value = null;
    },
    removeImg() {
      this.urlImg = '';
      this.$emit('remove');
    },
  },
};
</script>

<style scoped>
/* _image-uploader.css */

.image-uploader {
}

.image-uploader__input {
    opacity: 0;
    height: 0;
}

.image-uploader__preview {
    --bg-url: var(--default-cover);
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
    border: 2px solid var(--blue-light);
    border-radius: 8px;
    transition: 0.2s border-color;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 512px;
    height: 228px;
}

.image-uploader__text {
    color: var(--white);
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
}

.image-uploader__preview:hover {
    border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
    cursor: no-drop;
}
</style>
