<template>
  <div>
    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="false"
      :paginate-elements-by-height="1400"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="800px"
      :html-to-pdf-options="{margin: [15, 20], filename: fileName()}"
      @hasDownloaded="setLoad()"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <!-- Seu conteúdo HTML aqui -->
            <div id="imprimir">
                <div class="logo">
                  <img width="540" src="../assets/cic-logo-end.png" alt="logo" title="Convicções Incontestáveis" />
                </div>
                <p class="nome"><span class="mr-2">Cliente: </span><strong> {{ orcamento.cliente }}</strong></p>
                <p>{{ orcamento.data }} - Contato: {{ orcamento.contato }}</p>
                <p></p>
                    <table class="tabela">
                        <tr>
                            <th colspan="2" class="col1">Descrição</th>
                            <th>Valor</th>
                            <th>Subtotal</th>
                        </tr>
                        <tr v-for="item in orcamento.linhas" :key="item.id">
                            <td colspan="2" class="coll">{{ item.descricao }}</td>
                            <td class="colr">{{ item.valor }}</td>
                            <td class="colr">{{ item.subtotal }}</td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="colc"><strong>SUBTOTAL</strong></td>
                            <td class="colr">{{ orcamento.subtotal ? parseFloat(orcamento.subtotal).toFixed(2) : '' }}</td>
                        </tr>
                        <tr>
                          <td class="colc"></td>
                          <td class="colc"><strong>DESC.</strong></td>
                          <td class="colc">{{ orcamento.desc ? parseFloat(orcamento.desc).toFixed(2) : '' }}%</td>
                          <td class="cold">{{ valorDesc(orcamento.subtotal, orcamento.desc) }}</td>
                      </tr>
                      <tr>
                          <td class="colc"></td>
                          <td class="colc"><strong>IVA</strong></td>
                          <td class="colc">{{ orcamento.iva ? parseFloat(orcamento.iva).toFixed(2) : '' }}%</td>
                          <td class="colr">{{ valorIVA(orcamento.iva) }}</td>
                      </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="colc"><strong>TOTAL</strong></td>
                            <td class="colr"><strong>{{ parseFloat(orcamento.total).toFixed(2) }}</strong></td>
                        </tr>
                    </table>
            </div>
            <div class="obs">
              <p>
                <strong>Observações:</strong>
              </p>
              <p>
                <span>{{ orcamento.obs }}</span>
              </p>
            </div>
      </section>
    </vue-html2pdf>

    <v-row class="ma-4">
        <v-col cols="12">
    <div id="imprimir">
      <v-row class="mt-0">
        <v-btn icon color="success" class="ml-4" @click="voltar(0)"><v-icon>mdi-arrow-left</v-icon></v-btn>
        <v-btn icon color="primary" class="ml-4" @click="voltar(1)"><v-icon>mdi-home</v-icon></v-btn>
      </v-row>
        <v-row class="justify-start mb-1 ml-2">
          <img width="540" src="../assets/cic-logo-end.png" alt="logo" title="Convicções Incontestáveis" />
        </v-row>
        <p class="nome"><span class="mr-2">Cliente: </span><strong> {{ orcamento.cliente }}</strong></p>
        <p>{{ orcamento.data }} - Contato: {{ orcamento.contato }}</p>
        <p></p>
          <v-row class="justify-center mb-2">
            <table class="tabela">
                <tr>
                    <th colspan="2" class="col1">Descrição</th>
                    <th>Valor</th>
                    <th>Subtotal</th>
                </tr>
                <tr v-for="item in orcamento.linhas" :key="item.id">
                    <td colspan="2" class="coll">{{ item.descricao }}</td>
                    <td class="colr">{{ item.valor }}</td>
                    <td class="colr">{{ item.subtotal }}</td>
                </tr>
                <tr>
                    <td colspan="2"></td>
                    <td class="colc"><strong>SUBTOTAL</strong></td>
                    <td class="colr">{{ orcamento.subtotal ? parseFloat(orcamento.subtotal).toFixed(2) : '' }}</td>
                </tr>
                <tr>
                    <td class="colc"></td>
                    <td class="colc"><strong>DESC.</strong></td>
                    <td class="colc">{{ orcamento.desc ? parseFloat(orcamento.desc).toFixed(2) : '' }}%</td>
                    <td class="cold">{{ valorDesc(orcamento.subtotal, orcamento.desc) }}</td>
                </tr>
                <tr>
                    <td class="colc"></td>
                    <td class="colc"><strong>IVA</strong></td>
                    <td class="colc">{{ orcamento.iva ? parseFloat(orcamento.iva).toFixed(2) : '' }}%</td>
                    <td class="colr">{{ valorIVA(orcamento.iva) }}</td>
                </tr>
                <tr>
                    <td colspan="2"></td>
                    <td class="colc"><strong>TOTAL</strong></td>
                    <td class="colr"><strong>{{ parseFloat(orcamento.total).toFixed(2) }}</strong></td>
                </tr>
            </table>
          </v-row>
          <div class="pa-4">
            <v-row>
              <strong>Observações:</strong>
            </v-row>
            <v-row>
              <span>{{ orcamento.obs }}</span>
            </v-row>
          </div>
    </div>
      <div class="rodape">
        <v-row class="mt-4">
            <v-spacer></v-spacer>
            <v-btn tile color="warning" class="mr-4" @click="editar()">editar</v-btn>
            <v-btn tile :loading="loading" :disabled="loading" color="primary" class="mr-4" @click="generateReport()">Gerar PDF</v-btn>
        </v-row>
      </div>
    </v-col>
    </v-row>
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";

export default {
  name: "view-page",
  computed: {
    orcamento() {
      return this.$store.getters.orcamento;
    },
  },
  components: {
    VueHtml2pdf,
  },
  data() {
    return {
      loading: false,
      comDesc: 0
    }
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
    valorDesc(st, desc){
      if (parseFloat(desc) > 0) {
        let valor = (parseFloat(st) * parseFloat(desc)) / 100
        valor = valor * -1
        this.comDesc = parseFloat(st) - valor
        return parseFloat(valor).toFixed(2)
      } else {
        this.comDesc = parseFloat(st)
        return '0.0'
      }
    },
    valorIVA(iva){
      if (parseFloat(iva) > 0) {
        let st = this.comDesc
        let valor = (parseFloat(st) * parseFloat(iva)) / 100
        return parseFloat(valor).toFixed(2)
      } else {
        return '0.0'
      }
    },
    editar() {
      this.$store.dispatch('selItem', this.orcamento)
      this.$router.push('/calc')
    },
    generateReport() {
      this.loading = true
      this.$refs.html2Pdf.generatePdf()
    },
    setLoad() {
      console.log('loading')
      this.loading = false
    },
    fileName() {
        let dt = this.orcamento.data
        let part = dt.split('/')
        const data = part[2] + part[1] + part[0] + "_"
        let nome = this.orcamento.cliente
        const cliente = nome.replace(/\s+/g, "-")
        return data + cliente + ".pdf"
    }
  },
};
</script>

<style scoped>
    #imprimir {
        font-family: 'Arial';
        margin-bottom: 16px;
    }
    .logo {
      margin-top: 0px;
      margin-bottom: 0px;
    }
    .nome {
        border-top: solid 4px #CCC;
        font-size: 20pt;
        padding-top: 4px;
        margin-top: 10px;
        margin-bottom: 5px;
    }
    .rodape {
      border-top: solid 4px #CCC;
    }
    .obs {
      margin: 10px 0px;
      padding: 8px 0px;
    }
    table {
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .tabela, th, td {
        border: 1px solid #AAA;
        width: 640px;
        border-collapse: collapse;
    }
    td {
        height: 22px;
    }
    .col1 {
        width: 50%;
    }
    .coll {
        width: 40%;
        text-align: left;
        padding-left: 4px;
    }
    .colc {
        text-align: center;
    }
    .colr {
        text-align: right;
        padding-right: 4px;
    }
    .cold {
        text-align: right;
        padding-right: 4px;
        color: red;
    }
    tr {
        padding-top: 6px;
        padding-bottom: 6px;
    }
</style>