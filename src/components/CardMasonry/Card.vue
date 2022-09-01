<template>
  <div class="content-card w-full bg-white box-border rounded-lg">
    <div class="card-header">
      <div
        class="header-tag bg-indigo-400 text-xs font-light text-white inline-block mr-4"
      >
        {{ tag.name }}
      </div>
      <div
        class="update-time text-xs inline-block text-gray-400 cursor-default"
      >
        {{ formatedPublishDate }}
      </div>
    </div>
    <div class="card-title text-gray-600 tracking-wide my-3 cursor-pointer">
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
import moment from '../../utils/moment'
import { TagColor } from './type'

const props = defineProps<{
  tag: { name: string; color: TagColor }
  author: string
  publishDate: string
  updateDate: string
  title: string
  pictures: string[]
  id: number
}>()

const picNum = ref(props.pictures.length > 4 ? 4 : props.pictures.length)

// const cardStore = useStore()

// const showBlog = () => {
//   cardStore.showCardPopUp(props.id)
// }

const formatedPublishDate = computed(() =>
  moment(new Date(parseInt(props.publishDate))).format('YYYY / M / DD')
)
</script>

<style lang="less" scoped>
.content-card {
  @media (min-width: 640px) {
    // 三列，两个边距共 20px，减掉之后除以 3
    width: calc((100% - 20px) / 3);
    margin-bottom: 10px;
  }
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
