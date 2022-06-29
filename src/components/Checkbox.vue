<template>
  <div
    class="w-full rounded-md shadow-sm flex items-center justify-start mb-4 pl-3 py-3 text-left text-base text-gray-700 border border-gray-300"
  >
    <input
      class="h-4 w-4 opacity-0 absolute ml-3 cursor-pointer"
      type="checkbox"
      :checked="isChecked"
      @input="$emit('update:isChecked', $event.target.checked)"
    />

    <label class="block pl-3 text-lg font-bold text-gray-700">
      <i
        class="fa mr-3 w-5 h-5"
        :class="{
          'fa-check-square text-yellow-400': isChecked,
          'fa-square text-gray-300 ': !isChecked,
        }"
      ></i>
      <slot>{{ data.name }}</slot>
    </label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    data: Object,
    isChecked: Boolean,
  },
}
</script>
