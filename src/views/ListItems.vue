<template>
    <div>
        <v-row class="ma-2 align-center">
            <v-btn icon route color="warning" to="/" class="ml-4"><v-icon>mdi-arrow-left</v-icon></v-btn>
            <v-spacer></v-spacer>
            <strong>LISTA GERAL DE ITEMS</strong>
            <v-spacer></v-spacer>
            <v-btn icon color="primary" class="mr-4"><v-icon>mdi-plus</v-icon></v-btn>
        </v-row>
        <v-row class="justify-center">
            <v-col cols="12" md="8">
                <v-list>
                    <v-list-item-group v-model="active" color="primary">
                      <v-list-item
                        three-line
                        v-for="item in items"
                        :key="item.id"
                        aria-selected="active"
                      > 
                        <v-list-item-content @click="edit(item)">
                          <v-list-item-title class="primary--text">{{ item.categoria }}</v-list-item-title>
                          <v-list-item-subtitle>
                            <span class="primary--text mr-3">{{ item.descricao }}</span>
                          </v-list-item-subtitle>
                          <v-list-item-subtitle>
                            <span class="primary--text mr-3">{{ 'Unidade: ' }}{{ item.unidade }}{{ ' Valor:' }}</span>
                            <strong>{{ item.valor }}</strong>
                          </v-list-item-subtitle>
                        </v-list-item-content>
          
                        <v-list-item-action class="py-5 px-3 ma-1">
                          <v-btn
                            icon
                            color="red"
                            @click="deletar(calc)"
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
    name: "list-items",
    computed: {
      items() {
        const c = this.$store.getters.items;
        return c;
      }
    },
    watch: {
        items(f) {
        console.log(f.length);
        return f
      },
    },
    mounted() {
    },
    data() {
      return {
        loading: false,
        active: "",
        dialog: false,
        remover: "",
      };
    },
    methods: {
      edit(item) {
        console.log("Editar", item.id);
        // this.$store.dispatch("setCliente", cliente);
        // this.$store.dispatch("loadClienteVisitas", cliente.id);
        // this.$router.push("/cliente");
      },
      deletar(item) {
        console.log("Deletar", item.id);
        // this.$store.dispatch("deleteCalc", calc.id);
        // this.$store.dispatch("loadCalcs");
      },
    },
  };
</script>
