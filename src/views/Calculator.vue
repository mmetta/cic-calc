<template>
    <div>
        <v-row class="ma-2 align-center">
            <v-btn icon color="success" class="ml-4" @click="voltar(0)"><v-icon>mdi-arrow-left</v-icon></v-btn>
            <v-btn icon color="primary" class="ml-4" @click="voltar(1)"><v-icon>mdi-home</v-icon></v-btn>
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
                    text
                    color="red"
                    @click="processSelectedRows()"
                >excluir
                </v-btn>
                <v-btn
                    class="mx-3"
                    color="primary"
                    text
                    @click="manual()"
                ><v-icon class="mr-2">mdi-plus</v-icon>
                    manual
                </v-btn>
                <v-btn
                    color="success"
                    text
                    @click="novo()"
                ><v-icon class="mr-2">mdi-plus</v-icon>
                    novo
                </v-btn>
            </v-row>
            <v-row class="justify-center">
                <v-data-table
                    dense
                    v-model="selected"
                    item-key="descricao"
                    :headers="headers"
                    :items="linhas"
                    class="elevation-0"
                    hide-default-footer
                    show-select
                    single-select
                >
                    <!-- <template v-slot:top>
                        <v-switch
                        v-model="singleSelect"
                        label="Single select"
                        class="pa-3"
                        ></v-switch>
                    </template> -->
                </v-data-table>
            </v-row>
            <v-row class="justify-center mx-4">
                <v-textarea
                outlined
                rows="2"
                v-model="obs"
                label="Observações"
                ></v-textarea>
            </v-row>
            <v-row class="justify-end mx-4">
                <h4>{{ subtotal ? parseFloat(subtotal).toFixed(2) : '0.00' }}</h4>
            </v-row>
           
            <v-row class="justify-end mx-4">
                <div width="120">
                    <v-text-field
                        type="number"
                        label="% Desconto"
                        max="100"
                        min="0"
                        step="0.01"
                        v-model="desc"
                        @input="calcPerc()"
                    ></v-text-field>
                </div>
            </v-row>
            <v-row class="justify-end mx-4">
                <div width="120">
                    <v-text-field
                        type="number"
                        label="% IVA"
                        max="100"
                        min="0"
                        step="0.01"
                        v-model="iva"
                        @input="calcPerc()"
                    ></v-text-field>
                </div>
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

  <v-dialog
    v-model="dialog3"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title primary-title>Inserir item</v-card-title>
      <v-card-subtitle>
        Descreva o item, selecione a unidade, coloque o preço e a quantidade
      </v-card-subtitle>
      <v-card-text>
        <v-col cols="12">
          <v-row>
            <v-select
                :items="unidades"
                v-model="unidade"
                item-text="nome"
                item-value="id"
                label="Unidade"
            ></v-select>
          </v-row>
          <v-row class="align-center">
            <v-text-field
              color="success"
              v-model="descricao"
              maxLength="150"
              label="Descrição"
            ></v-text-field>
          </v-row>
          <v-row class="align-center">
            <v-col cols="6">
                <v-text-field
                type="number"
                color="success"
                v-model="valor"
                maxLength="50"
                label="Valor"
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field
                type="number"
                color="success"
                v-model="quant"
                maxLength="50"
                label="Quantidade"
                ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <span>Valor por {{ setUnidade(unidade) }}:</span> <strong class="ml-2">{{ parseFloat(valor).toFixed(2) }}</strong>
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
          @click="incluirManual()"
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
        orcamento() {
            return this.$store.getters.orcamento
        },
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
            console.log(orc.id)
            this.cliente = orc.cliente
            this.contato = orc.contato
            this.linhas = orc.linhas
            this.subtotal = orc.subtotal
            this.desc = orc.desc ? parseFloat(orc.desc) : 0
            this.iva = orc.iva ? parseFloat(orc.iva) : 0
            this.total = orc.total
            this.obs = orc.obs
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
        dialog3: false,
        id: "",
        data: new Date().toLocaleDateString("pt-BR"),
        cliente: "",
        contato: "",
        linhas: [],
        item: "",
        obs: "",
        subtotal: "0.0",
        total: "0.0",
        desc: 0,
        iva: 0,
        descricao: "",
        quant: "",
        unidade: "",
        valor: 0.0,
        selected: [],
        headers: [
          { text: 'Descrição', value: 'descricao' },
          { text: 'Quant', align: 'center', value: 'quant' },
          { text: 'Valor', align: 'end', value: 'valor' },
          { text: 'Subtotal', align: 'end', value: 'subtotal' }
        ],
      };
    },
    methods: {
        voltar(r) {
            this.$store.dispatch('selItem', {})
            if(r === 0) {
                this.$router.push('/orcamento')
            }else{
                this.$router.push('/')
            }
        },
        novo() {
            this.limpar()
            this.dialog = true
        },
        manual() {
            this.limpar()
            this.dialog3 = true
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
        processSelectedRows() {
            if(this.selected.length <= 0) {
                return
            }
            let linhas = this.linhas
            const sel = this.selected[0]
            let arr = []
            for (let i = 0; i < linhas.length; i++) {
                const el = linhas[i];
                if(el !== sel) {
                    arr.push(el)
                }
            }
            this.linhas = arr
            this.setTotal()
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
        incluirManual(){
            if(!this.descricao || !this.unidade || !this.valor || !this.quant){
                return
            }
            this.incluir()
        },
        setTotal() {
            if(this.linhas.length > 0){
                let tt = 0
                for (let i = 0; i < this.linhas.length; i++) {
                    const el = this.linhas[i];
                    tt += parseFloat(el.subtotal)
                }
                this.subtotal = tt
            } else {
                this.subtotal = 0.0
            }
            this.calcPerc()
        },
        calcPerc() {
            const st = this.subtotal
            if(this.desc <= 0 && this.iva <= 0) {
                this.total = parseFloat(st)
            } else {
                let tt = this.subtotal
                if(this.desc > 0) {
                    let i = parseFloat(this.desc)
                    let v1 = (parseFloat(st) * i) / 100
                    tt = parseFloat(st) - v1
                }
                if(this.iva > 0) {
                    let d = parseFloat(this.iva)
                    let v2 = (parseFloat(tt) * d) / 100
                    tt = parseFloat(tt) + v2
                }
                this.total = parseFloat(tt).toFixed(2)
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
                obs: this.obs,
                subtotal: this.subtotal,
                desc: this.desc,
                iva: this.iva,
                total: this.total
            }
            if(this.fazer === "editar") {
                obj.id = this.orcamento.id
                console.log(obj.id)
                this.updateOrcamento(obj)
            } else {
                this.saveOrcamento(obj)
            }
        },
        saveOrcamento(obj) {
            this.$store.dispatch('saveOrcamento', obj)
            this.$store.dispatch('loadOrcamentos')
            this.fechar()
            this.$router.push('/orcamento')
        },
        updateOrcamento(obj) {
            this.$store.dispatch('updateOrcamento', obj)
            this.$store.dispatch('loadOrcamentos')
            this.fechar()
            this.$store.dispatch('selItem', {})
            this.$router.push('/orcamento')
        },
        fechar() {
            this.dialog = false
            this.dialog3 = false
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
