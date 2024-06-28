<template>
    <div>
        <v-row class="ma-2 align-center">
            <v-btn icon route color="warning" to="/" class="ml-4"><v-icon>mdi-arrow-left</v-icon></v-btn>
            <v-spacer></v-spacer>
            <strong>ADMIN</strong>
            <v-spacer></v-spacer>
        </v-row>
        <v-row>
        <v-col cols="12" md="6">
            <v-row class="justify-center mx-4">
                <v-select
                    :items="categorias"
                    v-model="categoria"
                    item-text="nome"
                    item-value="id"
                    label="Categorias"
                    @change="editar()"
                ></v-select>
            </v-row>
            <v-row class="justify-center mx-4">
                <v-text-field
                    color="success"
                    v-model="nomeCategoria"
                    maxLength="100"
                    label="Categoria"
                ></v-text-field>
            </v-row>
            <v-row class="justify-center mb-6 mx-4">
                <v-btn :disabled="disabled" outlined color="warning" @click="limpar()">limpar</v-btn>
                <v-spacer></v-spacer>
                <v-btn :disabled="disabled" outlined color="red" @click="delCategoria()">excluir</v-btn>
                <v-spacer></v-spacer>
                <v-btn outlined color="success" @click="salvar(fazer)">{{ fazer }}</v-btn>
            </v-row>
        </v-col>

        <v-col cols="12" md="6">
            <v-row class="justify-center mx-4">
                <v-select
                    :items="unidades"
                    v-model="unidade"
                    item-text="nome"
                    item-value="id"
                    label="Unidades"
                    @change="editarUnid()"
                ></v-select>
            </v-row>
            <v-row class="justify-center mx-4">
                <v-text-field
                    color="success"
                    v-model="nomeUnidade"
                    maxLength="100"
                    label="Unidade"
                ></v-text-field>
                <v-text-field
                    color="success"
                    class="ml-4"
                    v-model="abreviatura"
                    maxLength="10"
                    label="Abreviatura"
                ></v-text-field>
            </v-row>
            <v-row class="justify-center mx-4">
                <v-btn :disabled="disabledu" outlined color="warning" @click="limparUnid()">limpar</v-btn>
                <v-spacer></v-spacer>
                <v-btn :disabled="disabledu" outlined color="red" @click="delUnidade()">excluir</v-btn>
                <v-spacer></v-spacer>
                <v-btn outlined color="success" @click="salvarUnid(todo)">{{ todo }}</v-btn>
            </v-row>
        </v-col>
    </v-row>
    </div>
</template>
<script>
export default {
    name: "adm-config",
    computed: {
        disabled() {
            if(this.categoria) {
                return false
            } else {
                return true
            }
        },
        disabledu() {
            if(this.unidade) {
                return false
            } else {
                return true
            }
        },
        categorias() {
            return this.$store.getters.categorias
        },
        unidades() {
            return this.$store.getters.unidades
        }
    },
    data() {
        return {
            categoria: "",
            unidade: "",
            abreviatura: "",
            nomeCategoria: "",
            nomeUnidade: "",
            fazer: "salvar",
            todo: "salvar",
        }
    },
    methods: {
        editar() {
            this.fazer = "editar"
            const id = this.categoria
            const cs = this.categorias
            for (let i = 0; i < cs.length; i++) {
                const el = cs[i];
                if(el.id === id){
                    this.nomeCategoria = el.nome
                }
            }
        },
        editarUnid() {
            this.todo = "editar"
            const id = this.unidade
            console.log(id)
            const un = this.unidades
            for (let i = 0; i < un.length; i++) {
                const el = un[i];
                if(el.id === id){
                    let part = el.nome.split("-")
                    this.nomeUnidade = part[0]
                    this.abreviatura = part[1]
                }
            }
        },
        salvar(f) {
            if(f === "editar") {
                this.editCategoria()
            } else {
                this.saveCategoria()
            }
        },
        salvarUnid(f) {
            if(f === "editar") {
                this.editUnidade()
            } else {
                this.saveUnidade()
            }
        },
        editCategoria() {
            if(!this.categoria){
                return
            }
            const obj = {
                id: this.categoria,
                nome: this.nomeCategoria
            }
            this.$store.dispatch('updateCategoria', obj)
            this.$store.dispatch('loadCategorias')
            this.limpar()
        },
        editUnidade() {
            if(!this.unidade || !this.abreviatura){
                return
            }
            const nomeabv = this.nomeUnidade + '-' + this.abreviatura
            const obj = {
                id: this.unidade,
                nome: nomeabv
            }
            this.$store.dispatch('updateUnidade', obj)
            this.$store.dispatch('loadUnidades')
            this.limparUnid()
        },
        limpar(){
            this.categoria = ""
            this.nomeCategoria = ""
            this.fazer = "salvar"
        },
        limparUnid(){
            this.unidade = ""
            this.nomeUnidade = ""
            this.abreviatura = ""
            this.todo = "salvar"
        },
        saveCategoria(){
            if(!this.nomeCategoria){
                return
            }
            const obj = {
                nome: this.nomeCategoria
            }
            this.$store.dispatch('saveCategoria', obj)
            this.$store.dispatch('loadCategorias')
            this.limpar()
        },
        saveUnidade(){
            if(!this.nomeUnidade || !this.abreviatura){
                return
            }
            const nomeabv = this.nomeUnidade + '-' + this.abreviatura
            const obj = {
                nome: nomeabv
            }
            this.$store.dispatch('saveUnidade', obj)
            this.$store.dispatch('loadUnidades')
            this.limparUnid()
        },
        delCategoria() {
            if(!this.categoria){
                return
            }
            const id = this.categoria
            this.$store.dispatch('deleteCategoria', id)
            this.$store.dispatch('loadCategorias')
            this.limpar()
        },
        delUnidade() {
            if(!this.unidade){
                return
            }
            const id = this.unidade
            this.$store.dispatch('deleteUnidade', id)
            this.$store.dispatch('loadUnidades')
            this.limparUnid()
        }
    },
}
</script>
