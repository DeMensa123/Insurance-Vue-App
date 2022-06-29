<template>
  <div class="my-12 bg-gray-200">
    <div class="flex container mx-auto flex-col md:flex-row py-6 md:py-16">
      <div
        class="w-full rounded-md shadow-sm flex flex-col items-center justify-start my-4 md:my-0 md:mx-4 py-3 text-left text-base text-gray-700 border border-gray-300 bg-white"
      >
        <h3 class="block mb-4 text-xl font-bold text-gray-800">
          <slot> Cestovné poistenie </slot>
        </h3>
        <!-- <a href="/travel-insurance">Mám záujem</a> -->
        <div class="mb-2 text-center">
          <a
            class="w-full rounded-md px-4 py-2 font-bold text-gray-800 hover:text-white bg-yellow-400 transition ease-in-out duration-150 hover:bg-yellow-500 focus:outline-none focus:shadow-outline"
            type="button"
            href="/travel-insurance"
          >
            Mám záujem
          </a>
        </div>
      </div>
      <div
        class="w-full rounded-md shadow-sm flex flex-col items-center justify-start my-4 md:my-0 md:mx-4 py-3 text-left text-base text-gray-700 border border-gray-300 bg-white"
      >
        <h3 class="block mb-4 text-xl font-bold text-gray-800">
          <slot> Cestovné poistenie </slot>
        </h3>
        <!-- <a href="/travel-insurance">Mám záujem</a> -->
        <div class="mb-2 text-center">
          <a
            class="w-full rounded-md px-4 py-2 font-bold text-gray-800 hover:text-white bg-yellow-400 transition ease-in-out duration-150 hover:bg-yellow-500 focus:outline-none focus:shadow-outline"
            type="button"
            href="/health-insurance"
          >
            Mám záujem
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
