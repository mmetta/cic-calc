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
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <!-- Seu conteúdo HTML aqui -->
            <div id="imprimir">
                <div class="logo">
                        <p style="height: 100%;" class="text-center mt-5">
                          Convicções Incontestáveis Construções
                        </p>
                </div>
                <p class="nome"><span class="mr-2">Cliente: </span><strong> {{ orcamento.cliente }}!!</strong></p>
                <p>{{ orcamento.data }} - Contato: {{ orcamento.contato }}</p>
                <p></p>
                    <table class="tabela">
                        <tr>
                            <th class="col1">Descrição</th>
                            <th>Quant</th>
                            <th>Valor</th>
                            <th>Subtotal</th>
                        </tr>
                        <tr v-for="item in orcamento.linhas" :key="item.id">
                            <td class="coll">{{ item.descricao }}</td>
                            <td class="colc">{{ item.quant }}</td>
                            <td class="colr">{{ item.valor }}</td>
                            <td class="colr">{{ item.subtotal }}</td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td class="colc"><strong>TOTAL</strong></td>
                            <td class="colr">{{ parseFloat(orcamento.total).toFixed(2) }}</td>
                        </tr>
                    </table>
            </div>
      </section>
    </vue-html2pdf>

    <v-row class="justify-center ma-4">
        <v-col cols="12">
    <div id="imprimir">
        <div class="primary white--text justify-center align-center" style="width: 240px; height: 100px">
            <p style="height: 100%;" class="text-center">
              Convicções Incontestáveis Construções
            </p>
          </div>
        <p class="nome"><span class="mr-2">Cliente: </span><strong> {{ orcamento.cliente }}!!</strong></p>
        <p>{{ orcamento.data }} - Contato: {{ orcamento.contato }}</p>
        <p></p>
            <table class="tabela">
                <tr>
                    <th class="col1">Descrição</th>
                    <th>Quant</th>
                    <th>Valor</th>
                    <th>Subtotal</th>
                </tr>
                <tr v-for="item in orcamento.linhas" :key="item.id">
                    <td class="coll">{{ item.descricao }}</td>
                    <td class="colc">{{ item.quant }}</td>
                    <td class="colr">{{ item.valor }}</td>
                    <td class="colr">{{ item.subtotal }}</td>
                </tr>
                <tr>
                    <td colspan="2"></td>
                    <td class="colc"><strong>TOTAL</strong></td>
                    <td class="colr">{{ parseFloat(orcamento.total).toFixed(2) }}</td>
                </tr>
            </table>
    </div>
        <v-row class="justify-center mt-8">
            <v-btn tile color="primary" @click="generateReport()">Gerar PDF</v-btn>
        </v-row>
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
  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
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
    }
    .logo {
        color: white;
        font-size: 14pt;
        background-color: blue;
        width: 240px;
        height: 100px;
        text-align: center;
        padding-top: 10px;
    }
    .nome {
        border-top: solid 4px #CCC;
        font-size: 20pt;
        padding-top: 4px;
        margin-top: 10px;
        margin-bottom: 5px;
    }
    table {
        margin-top: 20px;
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
        width: 40%;
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
    tr {
        padding-top: 6px;
        padding-bottom: 6px;
    }
</style>