<template>
  <div
    :class="[
      'relative flex w-50px h-26px px-6px items-center justify-between cursor-pointer rounded-15px bg-[#151515]',
      getClass
    ]"
    @click="toggleDark()"
  >
    <div class="absolute dark-switch-inner w-16px h-16px rounded-9px bg-white"></div>
    <i-emojione-sun-with-face class="text-lg mr-6px" />
    <i-line-md-moon-filled class="text-lg text-[#ffce31] moon-icon" />
  </div>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import { useAppStoreWithOut } from '@/store/modules/app'
const store = useAppStoreWithOut()
const isDark = useDark()
const prefixCls = 'dark-switch'
const getClass = computed(() => [
  prefixCls,
  {
    [`${prefixCls}__dark`]: unref(isDark)
  }
])
const toggleDark = useToggle(isDark)

store.setDarkMode(isDark.value)

watch(
  () => isDark.value,
  (val) => {
    store.setDarkMode(val)
  }
)
</script>

<style lang="scss">
@import '@/styles/variables.module.scss';
@mixin prefix($selector) {
  #{$selector} {
    &-inner {
      transition: transform 0.5s, background-color 0.5s;
      will-change: transform;
      transform: translateX(calc(100% + 6px));
      z-index: 2;
    }

    &__dark {
      border: 1px solid $border-lighter;

      #{$selector}-inner {
        transform: translateX(0);
      }
    }
  }
}
@include prefix('.dark-switch');
.moon-icon {
  rotate: -90deg;
}
</style>
