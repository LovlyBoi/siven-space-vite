<template>
  <div class="content-card theme-600-bg w-full box-border rounded-lg">
    <div class="card-header">
      <div
        class="header-tag text-xs font-light text-white inline-block mr-4"
        :class="[mapColor[tag.color]]"
      >
        {{ tag.name }}
      </div>
      <div
        class="update-time theme-400-text text-xs inline-block cursor-default"
      >
        {{ formatedPublishDate }}
      </div>
    </div>
    <div class="card-title theme-600-text tracking-wide my-3 cursor-pointer">
      {{ title }}
    </div>
    <div class="card-pictures-wrapper w-full" :class="[`pictures-${picNum}`]">
      <div
        class="picture bg-slate-400 overflow-hidden flex"
        v-for="(picUrl, index) in pictures.slice(0, 4)"
        :key="picUrl + index"
      >
        <img
          :src="picUrl"
          class="object-cover min-w-full min-h-full cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import dayjs from '@utils/day'
import { TagColor, BlogType } from './type'

const props = defineProps<{
  id: string
  author: string
  type: BlogType
  title: string
  pictures: string[]
  tag: { name: string; color: TagColor }
  publishDate: string
  updateDate: string
}>()

const mapColor: { [k in TagColor]: string } = {
  yellow: 'bg-yellow-400',
  pink: 'bg-pink-400',
  indigo: 'bg-indigo-400',
  green: 'bg-green-400',
}

const picNum = ref(props.pictures.length > 4 ? 4 : props.pictures.length)

const formatedPublishDate = computed(() =>
  dayjs(new Date(props.publishDate)).format('YYYY / M / DD')
)
</script>

<style lang="less" scoped>
.content-card {
  @media (min-width: 640px) {
    // 三列，两个边距共 20px，减掉之后除以 3
    width: calc((100% - 20px) / 3);
  }
  margin-bottom: 10px;
  padding: 15px;

  .card-header .header-tag {
    padding: 1px 6px;
    border-radius: 4px;
  }

  .card-title {
    font-size: 18px;
  }

  .card-pictures-wrapper {
    .picture {
      border-radius: 4px;
      height: 200px;

      img {
        transition: transform 300ms ease-in-out;

        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }

  .pictures-1 {
    .picture {
      width: 100%;
    }
  }

  .pictures-2 {
    .picture {
      width: 100%;
      height: 180px;

      &:nth-child(1) {
        margin-bottom: 8px;
      }
    }
  }

  .pictures-3 {
    .picture {
      height: 200px;

      &:nth-child(1) {
        width: 100%;
        margin-bottom: 8px;
      }

      &:nth-child(2) {
        float: left;
        width: 48.5%;
        height: 150px;
      }

      &:nth-child(3) {
        float: right;
        width: 48.5%;
        height: 150px;
      }
    }
  }

  .pictures-4 {
    .picture {
      height: 180px;

      &:nth-child(1) {
        height: 150px;
        margin-bottom: 8px;
      }
      &:nth-child(2) {
        float: left;
        width: 48.5%;
        height: 200px;
      }
      &:nth-child(3) {
        float: right;
        width: 48.5%;
        height: 96px;
        margin-bottom: 8px;
      }
      &:nth-child(4) {
        float: right;
        width: 48.5%;
        height: 96px;
      }
    }
  }
}
</style>
