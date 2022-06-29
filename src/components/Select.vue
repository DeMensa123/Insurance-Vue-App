<template>
  <label id="listbox-label" class="block mb-2 text-gray-700 text-lg font-bold">
    <slot name="SelectLabel"></slot>
  </label>

  <div class="relative" v-click-outside="closeDropdown">
    <span class="inline-block w-full mb-4 rounded-md shadow-sm">
      <button
        type="button"
        @click="openDropdown"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        class="cursor-pointer relative w-full pl-3 pr-10 py-3 rounded-md text-gray-700 text-left text-base border border-gray-300 focus:outline-none focus:border-gray-500 transition ease-in-out duration-150"
      >
        <div class="flex items-center space-x-3">
          <span class="block truncate"> {{ value.name }} </span>
        </div>
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
        >
          <i class="fa-solid fa-sort text-gray-300"></i>
        </span>
      </button>
    </span>

    <div
      v-show="isOpen"
      class="absolute z-50 w-full rounded-md shadow-md bg-white"
    >
      <ul
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-item"
        class="max-h-56 rounded-md mt-1 py-1 shadow-sm overflow-auto focus:outline-none text-base"
      >
        <li
          tabindex="0"
          @click="select(d)"
          id="listbox-item"
          role="option"
          v-for="d in data"
          v-bind:key="d"
          class="text-gray-800 select-none relative py-3 pl-3 pr-9 cursor-pointer hover:text-white hover:bg-yellow-400 focus:outline-none focus:text-white focus:bg-yellow-400"
        >
          <div class="flex items-center">
            <span
              class="block truncate"
              v-bind:class="{
                'font-normal': !isSelected(d),
                'font-semibold': isSelected(d),
              }"
            >
              {{ d.name }}
            </span>
          </div>
          <span
            v-show="isSelected(d)"
            class="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <i class="fa-solid fa-check text-gray-800"></i>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'click-outside-vue3'
import { reactive, defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'Select',
  props: {
    data: Array,
    value: Object,
  },
  setup(context, { emit }) {
    const state = reactive({
      isOpen: false,
    })

    function isSelected(value) {
      return this.value === value
    }

    function closeDropdown() {
      state.isOpen = false
    }
    function openDropdown() {
      state.isOpen = true
    }
    function select(value) {
      state.isOpen = false
      emit('valueSelect', value)
    }

    return {
      ...toRefs(state),
      isSelected,
      closeDropdown,
      openDropdown,
      select,
    }
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
})
</script>
