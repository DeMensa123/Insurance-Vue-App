<template>
  <div class="about mt-12">
    <button @click="score++">{{ score }} twice is {{ double }}</button>
    <p>{{ hello }} or {{ bye }}</p>
    <button @click="count++">{{ count }} twice is {{ twice }}</button>
  </div>
</template>

<script>
import { ref, computed, reactive, toRefs, onMounted } from 'vue'

export default {
  setup() {
    const state = reactive({
      bye: 'bye',
      count: 20,
      twice: computed(() => state.count * 2),
    })
    const score = ref(0)
    const double = computed(() => score.value * 2)

    const dude = ref('Bulma')
    const hello = computed(() => 'Hello, I am ' + dude.value)

    onMounted(() => console.log('I am ready'))
    return { ...toRefs(state), score, double, hello }
  },
}
</script>
