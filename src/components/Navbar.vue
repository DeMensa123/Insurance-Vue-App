<template>
  <nav
    class="w-full shadow-md top-0 fixed flex flex-col md:flex-row justify-center bg-yellow-400 z-20 text-gray-800"
    style="-webkit-tap-highlight-color: transparent"
  >
    <div
      class="w-full justify-between items-center"
      :class="isOpen ? 'flex-col' : 'flex-row'"
    >
      <div
        class="flex justify-between items-center w-full px-8 md:px-0"
        :class="{ 'shadow-md md:shadow-none': isOpen }"
      >
        <!-- Logo -->
        <router-link
          to="/"
          class="min-h-full ml-2 h-14 md:h-16 md:ml-10 px-2 py-4 flex items-center flex-shrink-0"
          ><i
            class="fa-solid fa-suitcase fa-xl transition duration-150 ease-in-out cursor-pointer hover:text-white"
          ></i>
        </router-link>

        <!-- Hamburger menu -->
        <button
          type="button"
          class="block md:hidden text-2xl h-10 w-10 rounded text-gray-800 hover:bg-white hover:text-yellow-400 focus:outline-none"
          @click="toggleNavigation"
        >
          <template v-if="!isOpen">
            <span>
              <i class="fas fa-bars"></i>
            </span>
          </template>
          <template v-else>
            <span>
              <i class="fas fa-times"></i>
            </span>
          </template>
        </button>
      </div>
    </div>
    <ul
      class="w-full md:h-16 flex flex-col md:flex-row justify-center items-center"
      :class="{ 'hidden md:flex': !isOpen }"
    >
      <NavItem
        v-for="(item, index) in navigationItems"
        :key="index"
        :url="item.url"
        :text="item.text"
      >
      </NavItem>
    </ul>
  </nav>
</template>

<script>
import NavItem from '@/components/NavItem'
import { toRefs, reactive } from 'vue'

export default {
  components: {
    NavItem,
  },
  setup() {
    const state = reactive({
      navigationItems: [
        {
          url: '/travel-insurance',
          text: 'Cestovné poistenie',
        },
        {
          url: '/health-insurance',
          text: 'Zdravotné poistenie',
        },
        {
          url: '/',
          text: 'Online služby',
        },
      ],
      isOpen: false,
    })
    const toggleNavigation = () => {
      state.isOpen = !state.isOpen
    }
    return {
      ...toRefs(state),
      toggleNavigation,
    }
  },

  watch: {
    $route() {
      this.isOpen = false
    },
  },
}
</script>
