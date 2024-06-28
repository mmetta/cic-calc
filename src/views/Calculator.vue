<template>
    <div>
        <v-row class="ma-2 align-center">
            <v-btn icon route color="success" to="/orcamento" class="mr-4"><v-icon>mdi-arrow-left</v-icon></v-btn>
            <v-spacer></v-spacer>
            <strong>CALCULADORA</strong>
            <v-spacer></v-spacer>
        </v-row>
        <v-row class="justify-center">
        <v-col cols="12" md="8">
            <v-row class="justify-center mx-4">
                <v-text-field
                    color="success"
                    v-model="cliente"
                    maxLength="200"
                    label="Nome do cliente"
                ></v-text-field>
            </v-row>
            <v-row class="justify-center align-center mx-4">
                <v-text-field
                    color="success"
                    v-model="contato"
                    maxLength="200"
                    label="Contato"
                ></v-text-field>
                <strong class="ml-4">{{ data }}</strong>
            </v-row>
            <v-row class="justify-center mx-4">
                <v-btn
                    color="success"
                    text
                    @click="novo()"
                >novo item
                </v-btn>
            </v-row>
            <v-row class="justify-center">
                <v-data-table
                    dense
                    :headers="headers"
                    :items="linhas"
                    class="elevation-0"
                    hide-default-footer
                ></v-data-table>
            </v-row>
            <v-row class="justify-center mx-4">
                <v-btn
                    tile
                    color="success"
                    @click="salvar()"
                >{{ fazer }}
                </v-btn>
                <v-spacer></v-spacer>
                <h3>{{ total ? parseFloat(total).toFixed(2) : '0.00' }}</h3>
            </v-row>
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
      <v-card-title primary-title>Inserir item</v-card-title>
      <v-card-subtitle>
        Escolha o item e coloque a quantidade
      </v-card-subtitle>
      <v-card-text>
        <v-col cols="12">
          <v-row>
            <v-select
                :items="items"
                v-model="item"
                item-text="descricao"
                item-value="id"
                label="Lista de itens"
                @change="selectItem(item)"
            ></v-select>
          </v-row>
          <v-row class="align-center">
            <v-text-field
              type="number"
              color="success"
              v-model="quant"
              maxLength="50"
              label="Quantidade"
            ></v-text-field>
          </v-row>
          <v-row>
            <span>Valor por {{ unidade }}:</span> <strong class="ml-2">{{ parseFloat(valor).toFixed(2) }}</strong>
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
          @click="incluir()"
          >incluir
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

    </div>
</template>
<script>
export default {
    name: "calc-orc",
    computed: {
        // orcamento() {
        //     return this.$store.getters.orcamento
        // },
        items() {
            return this.$store.getters.items
        },
        unidades() {
            return this.$store.getters.unidades
        }
    },
    // watch: {
    //     orcamento(o) {
    //         console.log(o)
    //         if (o.length > 0) {
    //             this.cliente = o.cliente
    //             this.contato = o.contato
    //             this.linhas = o.linhas
    //             this.total = o.total
    //             this.id = o.id
    //         }
    //     }
    // },
    mounted() {
        const orc = this.$store.getters.orcamento
        if(orc.id) {
            this.cliente = orc.cliente
            this.contato = orc.contato
            this.linhas = orc.linhas
            this.total = orc.total
            this.id = orc.id
            this.fazer = "editar"
        }
    },
    data() {
      return {
        loading: false,
        active: "",
        fazer: "salvar",
        dialog: false,
        id: "",
        data: new Date().toLocaleDateString("pt-BR"),
        cliente: "",
        contato: "",
        linhas: [],
        item: "",
        total: "0.0",
        descricao: "",
        quant: "",
        unidade: "",
        valor: 0.0,
        headers: [
          { text: 'Descrição', value: 'descricao' },
          { text: 'Quant', align: 'center', value: 'quant' },
          { text: 'Valor', align: 'end', value: 'valor' },
          { text: 'Subtotal', align: 'end', value: 'subtotal' }
        ],
      };
    },
    methods: {
        novo() {
            this.limpar()
            this.dialog = true
        },
        selectItem(i) {
            if(!this.item) {
                return
            }
            this.setItem(i)
        },
        setItem(s){
            for (let i = 0; i < this.items.length; i++) {
            const el = this.items[i];
            if (el.id === s){
                this.id = el.id
                this.descricao = el.descricao
                this.unidade = this.setUnidade(el.unidade)
                this.valor = el.valor
            }
            }
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
        incluir() {
            if(!this.descricao || !this.quant || !this.valor){
                return
            }
            const sub = parseFloat(this.quant) * parseFloat(this.valor)
            const obj = {
                descricao: this.descricao,
                quant: this.quant,
                valor: parseFloat(this.valor).toFixed(2),
                subtotal: parseFloat(sub).toFixed(2)
            }
            this.linhas.push(obj)
            this.setTotal()
            this.fechar()
        },
        setTotal() {
            if(this.linhas.length > 0){
                let tt = 0
                for (let i = 0; i < this.linhas.length; i++) {
                    const el = this.linhas[i];
                    tt += parseFloat(el.subtotal)
                }
                this.total = tt
            } else {
                this.total = 0.0
            }
        },
        salvar() {
            if(!this.cliente || this.total <= 0){
                return
            }
            const obj = {
                cliente: this.cliente,
                contato: this.contato,
                data: this.data,
                linhas: this.linhas,
                total: this.total
            }
            this.$store.dispatch('saveOrcamento', obj)
            this.$store.dispatch('loadOrcamentos')
            this.$router.push('/orcamento')
        },
        fechar() {
            this.dialog = false
            this.limpar()
        },
        limpar() {
            this.item = ""
            this.descricao = ""
            this.quant = ""
            this.unidade = ""
            this.valor = 0.0
        }
    },
}
</script>
