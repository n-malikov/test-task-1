<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormField>

    <UFormField label="Телефон" name="phone">
      <UInput
          v-model="state.phone"
          type="tel"
          placeholder="+7 (___) ___-__-__"
          v-maska="phoneMask"
      />
    </UFormField>

    <UFormField label="Сообщение" name="message">
      <UTextarea v-model="state.message" :rows="5" />
    </UFormField>

    <UFormField name="privacy">
      <UCheckbox
          v-model="state.privacy"
          label="Я даю согласие на обработку данных в соответствии с Политикой конфиденциальности"
      />
    </UFormField>

    <UButton type="submit">
      Отправить
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import { vMaska } from 'maska/vue'

const phoneMask = '+7 (###) ###-##-##'

const schema = v.object({
  name: v.pipe(
      v.string(),
      v.minLength(2, 'имя слишком короткое'),
      v.maxLength(50, 'кто ты, воин?')
  ),
  phone: v.pipe(
      v.string(),
      v.minLength(18, 'неверный формат номера'),   // +7 (777) 777-77-77 = 18
      v.maxLength(18, 'неверный формат номера'),
      v.check(
          (val) => (val.match(/\d/g) || []).length >= 11,
          'номер должен содержать 11 цифр'
      )
  ),
  message: v.pipe(
      v.string(),
      v.minLength(10, 'не менее 10 символов')
  ),
  privacy: v.pipe(
      v.boolean(),
      v.literal(true, 'необходимо дать согласие на обработку данных')
  )
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  name: '',
  phone: '',
  message: '',
  privacy: false
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>

<style scoped>

</style>