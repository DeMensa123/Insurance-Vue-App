<template>
  <div class="container mx-auto py-6 md:py-12 bg-gray-100">
    <div class="flex justify-center px-6">
      <div class="w-full p-5 rounded-md shadow-md bg-white">
        <h3 class="pt-4 text-3xl font-semibold text-center text-gray-800">
          {{ title }}
        </h3>

        <form class="px-8 py-8" @submit.prevent="submitForm">
          <Select
            :data="variants"
            v-model:value="selectedVariant"
            v-on:valueSelect="onValueSelectVariant"
          >
            <template v-slot:SelectLabel>Variant poistenia</template>
          </Select>

          <div class="mb-4 md:flex md:justify-start">
            <div
              class="mb-4 md:mr-4 md:mb-0"
              :class="{ error: v$.dateFrom.$errors.length }"
            >
              <div
                class="input-errors"
                v-for="error of v$.dateFrom.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
              <label
                class="block mb-2 text-lg font-bold text-gray-700"
                for="dateFrom"
              >
                Začiatok poistenia
              </label>
              <input
                :min="new Date().toISOString().split('T')[0]"
                :max="selectedVariant === variants[0] ? dateTo : undefined"
                class="cursor-pointer w-full rounded-md px-3 py-3 text-gray-700 border border-gray-300 text-base text-left focus:outline-none focus:border-gray-500 transition ease-in-out duration-150"
                id="dateFrom"
                type="date"
                v-model="dateFrom"
                required
              />
            </div>
            <div
              v-if="selectedVariant === variants[0]"
              class="mb-4 md:mr-2 md:mb-0"
              :class="{ error: v$.dateTo.$errors.length }"
            >
              <div
                class="input-errors"
                v-for="error of v$.dateTo.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
              <label
                class="block mb-2 text-lg font-bold text-gray-700"
                for="dateTo"
              >
                Koniec poistenia
              </label>
              <input
                :min="
                  dateFrom ? dateFrom : new Date().toISOString().split('T')[0]
                "
                class="cursor-pointer w-full rounded-md px-3 py-3 text-gray-700 border border-gray-300 text-base text-left focus:outline-none focus:border-gray-500 transition ease-in-out duration-150"
                id="dateTo"
                type="date"
                v-model="dateTo"
                required
              />
            </div>
          </div>
          <p
            v-if="selectedVariant === variants[0] && dateDiff === -1"
            class="text-red-600 font-semibold mb-2"
          >
            Zadali ste neplatný dátum !
          </p>
          <p
            class="mb-4 text-lg"
            v-if="selectedVariant === variants[0] && dateDiff"
          >
            Budete sa poistovať na
            <span class="font-bold">{{ dateDiff }}</span> dní
          </p>
          <Select
            :data="people"
            v-model:value="selectedPeople"
            v-on:valueSelect="onValueSelectPeople"
          >
            <template v-slot:SelectLabel>Počet osôb</template>
          </Select>
          <Select
            :data="packages"
            v-model:value="selectedPackage"
            v-on:valueSelect="onValueSelectPackage"
          >
            <template v-slot:SelectLabel>Balík</template>
          </Select>
          <label
            id="listbox-label"
            class="block mb-2 text-lg font-bold text-gray-700"
          >
            <slot name="SelectLabel">Pripoistenia</slot>
          </label>

          <Checkbox
            v-for="add in additionals"
            v-bind:key="add"
            :data="add"
            v-model:isChecked="add.value"
          ></Checkbox>
          <div
            v-if="price"
            class="text-center mb-4 text-xl font-bold text-gray-800"
          >
            Celková cena poistenia: {{ price.toFixed(2) }} €
          </div>

          <hr class="mb-6 border-t" />
          <div class="mb-6 text-center">
            <button
              class="w-full md:w-1/3 rounded-md px-4 py-2 font-bold text-gray-800 hover:text-white bg-yellow-400 hover:bg-yellow-500 transition ease-in-out duration-150 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Potvrdiť poistenie
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Select from '@/components/Select'
import Checkbox from '@/components/Checkbox'
import { computed, ref, reactive, toRefs } from 'vue'
import { required } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import moment from 'moment'
import useVuelidate from '@vuelidate/core'

export default {
  name: 'Insurance',
  props: {
    title: String,
  },
  components: {
    Select,
    Checkbox,
  },

  setup() {
    const state = reactive({
      dateFrom: Date | undefined,
      dateTo: Date | undefined,
      variants: [
        {
          name: 'krátkodobé poistenie',
        },
        {
          name: 'celoročné poistenie',
        },
      ],
      packages: [
        {
          name: 'základný balík',
          prices: [1.2, 39],
        },
        {
          name: 'rozšírený balík',
          prices: [1.8, 49],
        },
        {
          name: 'extra balík',
          prices: [2.4, 59],
        },
      ],
      people: [
        {
          name: 1,
        },
        {
          name: 2,
        },
        {
          name: 3,
        },
      ],
      additionals: [
        {
          name: 'Storno cesty',
          value: false,
          prices: [0.5, 0.2],
        },
        {
          name: 'Športové aktivity',
          value: false,
          prices: [0.3, 0.1],
        },
      ],
      dateDiff: computed(() => computeDateDiff()),
      price: computed(() => computePrice()),
    })

    let selectedVariant = ref(state.variants[0])
    let selectedPackage = ref(state.packages[0])
    let selectedPeople = ref(state.people[0])

    const rules = computed(() => ({
      dateFrom: { required },
      dateTo: {
        required: selectedVariant.value === state.variants[0] ? true : false,
      },
    }))
    const v$ = useVuelidate(rules, state)
    const router = useRouter()

    function computeDateDiff() {
      if (state.dateTo < state.dateFrom) return -1
      if (!state.dateTo || !state.dateFrom) return undefined

      return moment(state.dateTo).diff(moment(state.dateFrom), 'days') + 1
    }

    function onValueSelectVariant(value) {
      selectedVariant.value = value
      state.dateFrom = undefined
      state.dateTo = undefined
    }

    function onValueSelectPackage(value) {
      selectedPackage.value = value
    }

    function onValueSelectPeople(value) {
      selectedPeople.value = value
    }

    function computePrice() {
      let price = 0
      if (selectedVariant.value === state.variants[0]) {
        price =
          selectedPeople.value.name *
          selectedPackage.value.prices[0] *
          state.dateDiff *
          state.additionals
            .filter((add) => add.value === true)
            .reduce((prev, curr) => prev + curr.prices[0], 1) // 1 = 100 % + prirazka
      } else if (selectedVariant.value === state.variants[1]) {
        price =
          selectedPeople.value.name *
          selectedPackage.value.prices[1] *
          state.additionals
            .filter((add) => add.value === true)
            .reduce((prev, curr) => prev + curr.prices[1], 1)
      }
      return price
    }

    const submitForm = () => {
      v$.value.$touch()
      if (v$.value.$invalid) {
        return
      }
      router.push('/thank-you')
    }

    return {
      ...toRefs(state),
      selectedVariant,
      selectedPackage,
      selectedPeople,
      onValueSelectVariant,
      onValueSelectPackage,
      onValueSelectPeople,
      computePrice,
      submitForm,
      computeDateDiff,
      v$,
    }
  },
}
</script>
