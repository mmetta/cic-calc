<template>
    <div>
        <v-row class="ma-2 align-center">
            <v-btn icon route color="success" to="/" class="mr-4"><v-icon>mdi-arrow-left</v-icon></v-btn>
            <v-spacer></v-spacer>
            <strong>LISTA DE ORÇAMENTOS</strong>
            <v-spacer></v-spacer>
            <v-btn icon color="primary" class="mr-4" @click="novo()"><v-icon>mdi-plus</v-icon></v-btn>
        </v-row>
        <v-row class="justify-center">
            <v-col cols="12" md="8">
                <v-list>
                    <v-list-item-group v-model="active" color="primary">
                      <v-list-item
                        three-line
                        v-for="item in orcamentos"
                        :key="item.id"
                        aria-selected="active"
                      > 
                        <v-list-item-content @click="editar(item)">
                          <v-list-item-title class="primary--text">{{ item.cliente }}</v-list-item-title>
                          <v-list-item-subtitle>
                            <span class="grey--text mr-3">{{ item.data }}</span>
                          </v-list-item-subtitle>
                          <v-list-item-subtitle>
                            <span class="grey--text mr-2">{{ 'Número de itens: ' }}</span>
                            <span class="primary--text mr-4">{{ item.linhas.length }}</span>
                            <span class="grey--text mr-2">{{ ' Total:' }}</span>
                            <strong class="primary--text">{{ parseFloat(item.total).toFixed(2) }}</strong>
                          </v-list-item-subtitle>
                        </v-list-item-content>
          
                        <v-list-item-action class="py-5 px-3 ma-1">
                          <v-btn
                            icon
                            color="red"
                            @click="remove(item)"
                          >
                            <v-icon color="red">mdi-delete-outline</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
            </v-col>
        </v-row>

        <v-dialog
        v-model="dialog2"
        scrollable
        persistent
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title primary-title>{{ 'DELETAR ORÇAMENTO?' }}</v-card-title>
          <v-card-subtitle>
            {{  remover.data  }} <strong class="ml-3">{{ remover.cliente }}</strong>
          </v-card-subtitle>
          <v-card-text>
            <v-col cols="12">
              <v-row>
                <strong class="pr-2">{{ remover.linhas }}</strong><span>itens.</span>
              </v-row>
              <v-row>
                <strong class="pr-2">{{ 'Total:' }}</strong><span>{{remover.total}}</span>
              </v-row>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="warning"
              text
              @click="fechar()"
              >não
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="red"
              text
              @click="deletar(remover.id)"
              >sim
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </div>
</template>
<script>
export default {
    name: "orc-view",
    computed: {
      orcamentos() {
        return this.$store.getters.orcamentos;
      },
    },
    watch: {
        orcamentos(f) {
        console.log(f.length);
        return f
      },
    },
    data() {
      return {
        loading: false,
        active: "",
        dialog2: false,
        remover: "",
        item: "",
        fazer: "salvar",
        data: "",
        cliente: "",
        contato: "",
        items: [],
        total: ""
      };
    },
    methods: {
      novo() {
        this.$store.dispatch('selItem', {})
        this.$router.push('/calc')
      },
      editar(item) {
        this.$store.dispatch('selItem', item)
        // this.$router.push('/calc')
        this.$router.push('/pdfview')
      },
      remove(item) {
        this.remover = {
          id: item.id,
          cliente: item.cliente,
          data: item.data,
          linhas: item.linhas.length,
          total: item.total
        }
        this.dialog2 = true
      },
      deletar(id) {
        this.$store.dispatch("deleteOrcamento", id);
        this.$store.dispatch("loadOrcamentos");
        this.fechar()
      },
      fechar() {
        this.$store.dispatch('selItem', {})
        this.dialog2 = false
      }
    }
}
</script>
