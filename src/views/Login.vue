<template>
  <div>
      <v-col cols="12">
        <v-row class="justify-center">
          <v-form ref="form" v-model="formValid">
            <v-card
              max-width="400"
              min-width="300"
              elevation="0"
              class="my-4"
            >
              <v-card-title class="primary--text" primary-title>
                LOGIN
              </v-card-title>
              <v-col>
                <v-text-field
                  dark
                  dense
                  filled
                  hide-details="auto"
                  email
                  :rules="ruleEmail"
                  v-model="email"
                  label="Email"
                  class="accent mb-4"
                  @input="validateField('email')"
                ></v-text-field>
                <v-text-field
                  dark
                  dense
                  filled
                  hide-details="auto"
                  type="password"
                  :rules="rulePass"
                  v-model="pass"
                  label="Senha"
                  class="accent mb-4"
                  @input="validateField('pass')"
                ></v-text-field>
                <v-row class="justify-center my-2">
                  <v-btn
                    :disabled="disabled"
                    :loading="logging"
                    color="primary"
                    @click="entrarEmailPass()"
                    >Entrar</v-btn
                  >
                </v-row>
              </v-col>
            </v-card>
          </v-form>
        </v-row>

        <v-snackbar v-model="alert" multi-line color="warning" :timeout="3000">
          {{ error }}
          <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="alert = false">
              X
            </v-btn>
          </template>
        </v-snackbar>

      </v-col>
  </div>
</template>

<script>
export default {
  name: "Login-page",
  computed: {
    logado() {
      return this.$store.getters.logado;
    },
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    logado(l) {
        console.log(l)
      if (l) {
        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
      }
    },
    error(e) {
      if (e !== ""){
        this.alert = true;
        this.disabled = false;
        this.logging = false;
      }
    }
  },
  created() {
    this.$store.dispatch("setError", "")
  },
  mounted() {
      this.$store.dispatch("onChanged").then((res) => {
      if (res) {
        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
      }
      })
  },
  data() {
    return {
      alert: false,
      hoje: new Date().toLocaleDateString("pt-BR"),
      disabled: true,
      logging: false,
      email: "admin@cic-calc.web.app",
      pass: "",
      formValid: false,
      rulePass: [
        (value) => !!value || "Obrigatório.",
        (value) => value.length >= 6 || "Mín. 6 caracteres",
      ],
      ruleEmail: [
        (value) => !!value || "Obrigatório.",
        (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail inválido";
        },
      ],
    };
  },
  methods: {
    entrarEmailPass() {
      if (!this.pass || !this.email) {
        return;
      }
      this.disabled = true;
      this.logging = true;
      this.msg = "";
      const obj = { email: this.email, pass: this.pass };
      this.$store.dispatch("loginEmailPass", obj)
      if (this.error) {
        if (this.error !== "") {
          console.log("ERROR", this.error)
          this.alert = true;
          this.disabled = false;
          this.logging = false;
        }
      }
    },
    validateField() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  },
};
</script>
