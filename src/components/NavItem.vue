<template>
  <div class="flex flex-col w-full h-full">
    <div class="md:min-h-full mx-2 flex items-center">
      <router-link
        :to="url"
        class="text-gray-800 hover:text-white w-full flex flex-row px-2 my-2 items-center justify-center hover:bg-yellow-500 p-2 rounded-md text-base font-bold text-center transition duration-150 ease-in-out cursor-pointer flex-shrink-0 focus:outline-none"
        >{{ text }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: undefined,
    },
    text: {
      type: String,
      default: undefined,
    },
  },
}
</script>
