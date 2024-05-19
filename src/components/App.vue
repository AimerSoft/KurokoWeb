<template>
  <v-container class="flex-box">
    <v-row justify="center">
      <v-card :style="{ width: '60%' }">
        <v-toolbar>
          <v-toolbar-title>Kuroko 短链接</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="toggleTheme">
            <v-icon>mdi-brightness-6</v-icon>
          </v-btn>
        </v-toolbar>
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
                    hint="在这里输入需要缩短的链接"
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
        <v-divider v-if="shortedList.length > 0"></v-divider>
        <v-card v-if="shortedList.length > 0">
          <v-alert v-model="alert" text="短链接已被复制到剪切板！"></v-alert>
          <v-slide-y-transition class="py-0" tag="v-list" group>
            <template v-for="(shorted, index) in shortedList" :key="index">
              <v-divider
                v-if="index !== 0"
                :key="`${index}-divider`"
              ></v-divider>
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
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { useTheme } from "vuetify";
import { ref } from "vue";
import requests from "../utils/requests";

export default {
  data() {
    return {
      originLink: "",
      shortedList: [],
      loading: false,
      alert: false,
      rules: {
        required: (value) => !!value || "必须提供一个链接",
        urllink: (v) => !v || this.validateUrllink(v) || "url 格式错误",
      },
    };
  },
  methods: {
    shortLink() {
      this.$refs.form.validate().then((status) => {
        if (status.valid) {
          this.loading = true;
          var bodyFormData = new FormData();
          bodyFormData.append("url", this.originLink);
          bodyFormData.append("day", "7");
          requests
            .post("k", bodyFormData)
            .then((res) => {
              if (res.data.code === 0) {
                this.shortedList.push(res.data.data);
                this.loading = false;
              }
            })
            .catch((err) => {
              console.log(err);
              this.loading = false;
            });
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
  setup() {
    const theme = useTheme();
    const darkMode = ref(false);

    const toggleTheme = () => {
      darkMode.value = !darkMode.value;
      theme.global.name.value = darkMode.value ? "dark" : "light";
      // Optional: Get value of current theme
      console.log(`Current theme is dark? ${theme.global.current.value.dark}`);
    };

    return {
      darkMode,
      toggleTheme,
    };
  },
};
</script>

<style>
.flex-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
</style>
