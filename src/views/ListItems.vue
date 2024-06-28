<template>
    <div>
        <v-row class="ma-2 align-center">
            <v-btn icon route color="warning" to="/" class="ml-4"><v-icon>mdi-arrow-left</v-icon></v-btn>
            <v-spacer></v-spacer>
            <strong>LISTA GERAL DE ITEMS</strong>
            <v-spacer></v-spacer>
            <v-btn icon color="primary" class="mr-4" @click="novo()"><v-icon>mdi-plus</v-icon></v-btn>
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
                        <v-list-item-content @click="editar(item)">
                          <v-list-item-title class="primary--text">{{ item.descricao }}</v-list-item-title>
                          <v-list-item-subtitle>
                            <span class="grey--text mr-3">{{ setCategoria(item.categoria) }}</span>
                          </v-list-item-subtitle>
                          <v-list-item-subtitle>
                            <span class="grey--text mr-2">{{ 'Unidade: ' }}</span>
                            <span class="primary--text mr-4">{{ setUnidade(item.unidade) }}</span>
                            <span class="grey--text mr-2">{{ ' Valor:' }}</span>
                            <strong class="primary--text">{{ parseFloat(item.valor).toFixed(2) }}</strong>
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
        v-model="dialog"
        scrollable
        persistent
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title primary-title>ITEM DE ORÇAMENTO</v-card-title>
          <v-card-subtitle>
            Atenção: o preço deve ser cadastrado por unidade
          </v-card-subtitle>
          <v-card-text>
            <v-col cols="12">
              <v-row>
                <v-select
                    :items="categorias"
                    v-model="categoria"
                    item-text="nome"
                    item-value="id"
                    label="Categoria"
                ></v-select>
              </v-row>
              <v-row>
                <v-text-field
                    color="success"
                    v-model="descricao"
                    maxLength="200"
                    label="Descrição"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-select
                    :items="unidades"
                    v-model="unidade"
                    item-text="nome"
                    item-value="id"
                    label="Unidade"
                ></v-select>
              </v-row>
              <v-row>
                <v-text-field
                  type="number"
                  color="success"
                  v-model="valor"
                  maxLength="20"
                  label="Valor"
                ></v-text-field>
              </v-row>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="warning"
              text
              @click="fechar()"
              >fechar
            </v-btn>
            <v-btn
              color="success"
              text
              @click="salvar()"
              >{{ fazer }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="dialog2"
        scrollable
        persistent
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title primary-title>{{ remover.nome }}</v-card-title>
          <v-card-subtitle>
            <strong class="ml-3"></strong>
          </v-card-subtitle>
          <v-card-text>
            <v-col cols="12">
              <v-row>
                <strong>Confirma a exclusão deste item?</strong>
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
    name: "list-items",
    computed: {
      items() {
        return this.$store.getters.items;
      },
      categorias() {
        return this.$store.getters.categorias;
      },
      unidades() {
        return this.$store.getters.unidades;
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
        dialog2: false,
        remover: "",
        item: "",
        fazer: "salvar",
        categoria: "",
        descricao: "",
        unidade: "",
        valor: ""
      };
    },
    methods: {
      novo() {
        this.limpar
        this.dialog = true
      },
      setCategoria(c){
        let nome = ''
        for (let i = 0; i < this.categorias.length; i++) {
          const el = this.categorias[i];
          if (el.id === c){
            nome = el.nome
          }
        }
        return nome
      },
      setUnidade(u){
        let nome = ''
        for (let i = 0; i < this.unidades.length; i++) {
          const el = this.unidades[i];
          if (el.id === u){
            nome = el.nome
          }
        }
        return nome
      },
      editar(item) {
        this.item = item
        this.categoria = item.categoria
        this.descricao = item.descricao
        this.unidade = item.unidade
        this.valor = item.valor
        this.fazer = "editar"
        this.dialog = true
      },
      salvar() {
        if(
          !this.categoria ||
          !this.descricao ||
          !this.unidade ||
          !this.valor
        ){
          return
        }
        const obj = {
          categoria: this.categoria,
          descricao: this.descricao,
          unidade: this.unidade,
          valor: this.valor
        }
        if(this.fazer === "editar") {
          obj.id = this.item.id
          this.edit(obj)
        } else {
          this.save(obj)
        }
        this.fechar()
      },
      remove(item) {
        this.remover = {
          id: item.id,
          nome: item.descricao
        }
        this.dialog2 = true
      },
      edit(item) {
        this.$store.dispatch("updateItem", item);
        this.$store.dispatch("loadItems");
        this.fechar()
      },
      save(item) {
        this.$store.dispatch("saveItem", item);
        this.$store.dispatch("loadItems");
        this.fechar()
      },
      deletar(id) {
        this.$store.dispatch("deleteItem", id);
        this.$store.dispatch("loadItems");
        this.fechar()
      },
      fechar(){
        this.dialog = false
        this.dialog2 = false
        this.limpar()
      },
      limpar() {
        this.item = ""
        this.categoria = ""
        this.descricao = ""
        this.unidade = ""
        this.valor = ""
        this.fazer = "salvar"
      }
    },
  };
</script>
