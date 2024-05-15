<template>
  <v-container>
    <v-row justify="center">
      <v-card class="custom-card">
        <v-card-title> 将链接通过十一维进行空间移动！ </v-card-title>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col cols="10">
                <v-form ref="form">
                  <v-text-field
                    label="url"
                    :loading="loading"
                    variant="outlined"
                    clear-icon="mdi-close-circle"
                    v-model="originLink"
                    hint="Here to put the link you want to short"
                    @keydown.enter="shortLink"
                    :rules="[rules.required, rules.urllink]"
                    clearable
                  >
                  </v-text-field>
                  <v-text-field v-show="false"
                    >https://github.com/vuetifyjs/vuetify/issues/4302</v-text-field
                  >
                </v-form>
              </v-col>
              <v-col cols="2">
                <v-btn
                  color="primary"
                  size="x-large"
                  variant="flat"
                  block
                  @click="shortLink"
                  >空间移动</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row justify="center">
      <v-card v-if="shortedList.length > 0" class="custom-card">
        <v-alert
          v-model="alert"
          text="Link has been copied to clipboard!"
        ></v-alert>
        <v-slide-y-transition class="py-0" tag="v-list" group>
          <template v-for="(shorted, index) in shortedList" :key="index">
            <v-divider v-if="index !== 0" :key="`${index}-divider`"></v-divider>
            <v-list-item>
              <template v-slot:prepend>
                <v-btn variant="text" icon @click="copyToClipboard(shorted)">
                  <v-icon> mdi-clipboard-text-multiple-outline </v-icon>
                </v-btn>
              </template>
              <v-list-item-title>
                <span>{{ shorted }}</span>
              </v-list-item-title>
              <template v-slot:append>
                <v-expand-x-transition>
                  <v-btn variant="text" icon @click="deleteLink(index)">
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-btn>
                </v-expand-x-transition>
              </template>
            </v-list-item>
          </template>
        </v-slide-y-transition>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      originLink: "",
      shortedList: ["https://baidu.com/", "https://map.baidu.com/"],
      loading: false,
      alert: false,
      rules: {
        required: (value) => !!value || "Field is required",
        urllink: (v) => !v || this.validateUrllink(v) || "Not a valid url",
      },
    };
  },
  methods: {
    shortLink() {
      this.$refs.form.validate().then((status) => {
        if (status.valid) {
          this.loading = true;

          setTimeout(() => {
            this.loading = false;
          }, 800);

          this.shortedList.push(this.originLink);

          // TODO
          console.log("TODO send link");
        } else {
          // do nothing
          return;
        }
      });
    },
    validateUrllink(urllink) {
      if (
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g.test(
          urllink
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(
        function () {
          console.log("Async: Copying to clipboard was successful!");
        },
        function (err) {
          console.error("Async: Could not copy text: ", err);
          return;
        }
      );
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 800);
    },
    deleteLink(index) {
      let newList = [];
      for (let i = 0; i < this.shortedList.length; i++) {
        if (i != index) {
          newList.push(this.shortedList[i]);
        }
      }
      this.shortedList = newList;
    },
  },
};
</script>

<style>
.custom-card {
  max-width: 1024px;
  width: 60%;
  margin-top: 32px;
}
</style>
