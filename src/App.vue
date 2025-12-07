<template>
  <v-app>
    <v-app-bar :color="current.dark ? 'deep-orange-darken-4' : 'deep-orange-lighten-4'" title="Nitting Helper" />
    <v-main>
      <router-view v-slot="{ Component }">
        <v-fade-transition hide-on-leave>
          <v-container class="fill-height" max-width="500">
            <component :is="Component" />
          </v-container>
        </v-fade-transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>

  import { useTheme } from 'vuetify/framework'

  const { current } = useTheme()
</script>
