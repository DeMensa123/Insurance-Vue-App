<template>
  <Navbar></Navbar>
  <div id="nav"></div>
  <router-view class="mt-14 md:mt-16" />
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
  setup() {},
}
</script>
