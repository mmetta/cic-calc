<template>
  <div>
    <v-row class="ma-2">
      <v-col class="pa-0">
        <v-row class="align-center justify-center my-2">
          <div class="primary white--text justify-center align-center" style="width: 240px; height: 100px">
            <p style="height: 100%;" class="text-center mt-5">
              Convicções Incontestáveis Construções
            </p>
          </div>
        </v-row>
        <v-row>
          <v-col cols="6">
          <v-row class="justify-end">
            <v-btn tile outlined elevation="0" route color="primary" width="200" height="100" class="ma-1" to="/orcamento">
              <v-icon class="mr-2">mdi-view-list-outline</v-icon> Orçamentos
            </v-btn>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row class="justify-start">
            <v-btn tile outlined elevation="0" route color="primary" width="200" height="100" class="ma-1" to="/calc">
              <v-icon class="mr-2">mdi-calculator-variant-outline</v-icon> calcular
            </v-btn>
          </v-row>
        </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-row class="justify-end">
              <v-btn tile outlined elevation="0" route color="primary" width="200" height="100" class="ma-1" to="/items">
                <v-icon class="mr-2">mdi-format-list-numbered</v-icon> Lista itens
              </v-btn>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row class="justify-start">
              <v-btn tile outlined elevation="0" route color="primary" width="200" height="100" class="ma-1" to="/admin">
                <v-icon class="mr-2">mdi-lock-outline</v-icon> admin
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="justify-center mt-8">
          <span style="font-size: 9pt;" class="grey--text">CIC-CALC - v-0.0.1</span>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: 'Home-view',
  }
</script>
