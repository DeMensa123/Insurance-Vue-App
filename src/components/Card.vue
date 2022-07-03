<template>
  <div
    class="w-full md:w-5/12 rounded-md shadow-sm flex flex-col items-center justify-start my-4 md:my-6 md:mx-6 py-10 text-left text-base text-gray-700 border border-gray-300 bg-white"
  >
    <h3 class="block mb-6 text-2xl font-bold text-gray-800">
      <slot> {{ title }} </slot>
    </h3>
    <div class="text-center">
      <a
        class="w-full rounded-md px-4 py-2 font-bold text-gray-800 hover:text-white bg-yellow-400 transition ease-in-out duration-150 hover:bg-yellow-500 focus:outline-none focus:shadow-outline"
        type="button"
        :href="url"
      >
        {{ button }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: undefined,
    },
    button: {
      type: String,
      default: 'Mám záujem',
    },
    url: {
      type: String,
      default: '/',
    },
  },
}
</script>
