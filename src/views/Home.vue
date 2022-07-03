<template>
  <div class="mt-12 bg-gray-100 min-h-screen">
    <div class="container mx-auto flex justify-center items-center pt-6">
      <h3 class="pt-4 text-5xl font-semibold text-center text-gray-800">
        Poistovňa Istota
      </h3>
    </div>
    <div class="flex flex-wrap justify-center items-center py-6 md:py-10">
      <Card
        v-for="card in cards"
        v-bind:key="card"
        :title="card.title"
        :button="card.button"
        :url="card.url"
      />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import { reactive, toRefs } from 'vue-demi'
export default {
  name: 'Home',
  components: {
    Card,
  },
  setup() {
    const state = reactive({
      cards: [
        {
          title: 'Cestovné poistenie',
          button: 'Mám záujem',
          url: '/travel-insurance',
        },
      ],
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>
