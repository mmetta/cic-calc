<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
    <v-snackbar multi-line centered :value="updateExists" :timeout="-1" color="indigo">
      Novo conteúdo disponível para o APP
      <v-btn text @click="refreshApp">
        <v-icon class="mr-2">mdi-autorenew</v-icon>
        atualizar
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import update from "./mixins/update";

export default {
  name: 'App',
  mixins: [update],
  data: () => ({
    drawer: false,
    group: null,
    deferredPrompt: null,
  }),
  created() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
  },
  methods: {
    async install() {
      this.deferredPrompt.prompt();
    },
  },
};
</script>
