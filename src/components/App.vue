<template>
  <!-- <h1>Kuroko 短链接</h1> -->
  <v-container>
    <v-row justify="center">
      <v-card class="custom-card">
        <v-card-title>
          将链接通过十一维进行空间移动！
        </v-card-title>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col cols="10">
                <v-form ref="form">
                  <v-text-field label="url" variant="outlined" clear-icon="mdi-close-circle"
                    hint="Here to put the link you want to short" :rules="[rules.required, rules.urllink]" clearable>
                  </v-text-field>
                </v-form>
              </v-col>
              <v-col cols="2">
                <v-btn color="primary" size="x-large" variant="flat" block @click="shortLink">空间移动</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row justify="center">
      <v-card class="custom-card">
        asdfasd
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        required: value => !!value || 'Field is required',
        urllink: (v) => !v || this.validateUrllink(v) || "Not a valid url",
      },
    }
  },
  methods: {
    shortLink() {
      this.$refs.form.validate().then((status) => {
        if (status.valid) {
          // TODO
          console.log("TODO send link")
        } else {
          // do nothing
          return;
        }
      });
    },
    validateUrllink(urllink) {
      if (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(urllink)) {
        return true;
      } else {
        return false;
      }
    },
  }
}
</script>

<style>
.custom-card {
  max-width: 1024px;
  width: 60%;
  margin-top: 32px;
}
</style>
