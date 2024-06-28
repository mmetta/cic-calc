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
        dialog: false,
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
        this.$store.dispatch('selItem', item)
        this.remover = {
          id: item.id,
          nome: item.descricao
        }
        this.dialog = true
      },
      deletar(id) {
        this.$store.dispatch("deleteItem", id);
        this.$store.dispatch("loadItems");
        this.fechar()
      },
      fechar() {
        this.$store.dispatch('selItem', {})
        this.dialog = false
      }
    }
}
</script>
