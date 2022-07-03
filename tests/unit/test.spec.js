import { shallowMount } from '@vue/test-utils'
import Insurance from '@/components/Insurance.vue'
import Checkbox from '@/components/Checkbox.vue'

describe('Insurance.vue', () => {
  it('renders props.title when passed', () => {
    const title = 'new title'
    const wrapper = shallowMount(Insurance, {
      props: { title },
    })
    expect(wrapper.text()).toMatch(title)
  })
})

test('sets the checkbox', async () => {
  const wrapper = shallowMount(Checkbox, {
    props: {
      data: Object,
      isChecked: Boolean,
    },
  })

  const checkbox = wrapper.find('input[type="checkbox"]')
  await checkbox.setChecked()
  expect(checkbox.element.checked).toBeTruthy()
})
