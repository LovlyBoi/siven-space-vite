<template>
  <div class="content-card theme-white-600-bg w-full box-border rounded-lg">
    <div class="card-header">
      <div
        class="header-tag text-xs font-light text-white inline-block mr-4"
        :class="[mapColor[tag.color]]"
      >
        {{ tag.name }}
      </div>
      <div
        class="update-time theme-gray-400-text text-xs inline-block cursor-default"
      >
        发布于 {{ formatedPublishDate }}
      </div>
    </div>
    <router-link
      :to="`/article/${id}`"
      target="_blank"
      class="block card-title theme-gray-600-text hover:text-indigo-400 dark:hover:text-pink-300 tracking-wide my-3 transition-all duration-300 delay-75"
    >
      {{ title }}
    </router-link>
    <div class="card-pictures-wrapper w-full" :class="[`pictures-${picNum}`]">
      <router-link
        :to="`/article/${id}`"
        target="_blank"
        class="picture bg-slate-400 overflow-hidden flex"
        v-for="(picUrl, index) in pictures.slice(0, 4)"
        :key="picUrl + index"
      >
        <img
          :src="picUrl + '?w=500'"
          class="object-cover min-w-full min-h-full cursor-pointer"
        />
      </router-link>
    </div>
    <div class="card-footer theme-gray-400-text text-xs mt-3 flex gap-2">
      <div class="update-date">更新于：{{ formatedUpdateDate }}</div>
      <div class="author">作者：{{ author }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import dayjs from '@utils/day'
import { TagColor, BlogType } from '@/types'

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
  dayjs(new Date(props.publishDate)).format('YYYY / M / DD ')
)

const formatedUpdateDate = computed(() =>
  dayjs(new Date(props.updateDate)).fromNow()
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

  .clearfix {
    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }

  .pictures-3 {
    .clearfix();
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
    .clearfix();
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
