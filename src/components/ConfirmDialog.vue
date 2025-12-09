<template>
  <v-dialog :fullscreen="mobile">
    <template #activator="{ props: activatorProps }">
      <slot name="activator" :props="activatorProps" />
    </template>

    <template #default="{ isActive }">
      <v-card>
        <v-card-text class="fill-height d-flex align-center justify-center flex-column">
          <div class="text-center">Êtes-vous sûre ?</div>
          <div class="pt-4 d-flex">
            <v-btn size="large" variant="tonal" @click="() => {emits('no'); isActive.value = false}">Non</v-btn>
            <div class="px-4" />
            <v-btn color="primary" size="large" @click="() => {emits('yes'); isActive.value = false}">Oui</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
<script lang="ts" setup>

  import { useDisplay } from 'vuetify/framework'

  const { mobile } = useDisplay()
  const emits = defineEmits(['yes', 'no'])

</script>
