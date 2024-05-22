<template>
  <v-container class="d-flex justify-space-between">
    <v-row justify="center" class="mt-16">
      <v-col cols="12" md="6">
        <v-card class="elevation-12 rounded-xl pa-12">
          <v-row justify="center">
            <v-col cols="6">
              <v-img
                height="260"
                src="../assets/kuroko.png"
                aspect-ratio="1/1"
                alt="Kuroko"
                cover
                class="rounded-xl"
              ></v-img>
            </v-col>
          </v-row>
          <v-card-title class="text-center text-h5">
            Kuroko 短链接
          </v-card-title>
          <v-card-subtitle class="text-center text-h6">
            将链接通过十一维进行空间移动！
          </v-card-subtitle>
          <v-card-actions>
            <v-container>
              <v-row>
                <v-col cols="10">
                  <v-form ref="form">
                    <v-text-field
                      label="你的长链接"
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
                    <v-text-field v-show="false">
                      https://github.com/vuetifyjs/vuetify/issues/4302
                    </v-text-field>
                  </v-form>
                </v-col>
                <v-col cols="2">
                  <v-btn
                    color="primary"
                    size="x-large"
                    variant="flat"
                    min-width="80px"
                    block
                    @click="shortLink"
                    >空间移动
                  </v-btn>
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
                    <v-btn
                      variant="text"
                      icon
                      @click="copyToClipboard(shorted.url)"
                    >
                      <v-icon> mdi-clipboard-text-multiple-outline </v-icon>
                    </v-btn>
                  </template>
                  <v-list-item-title>
                    <v-tooltip :text="shorted.ori">
                      <template v-slot:activator="{ props }">
                        <span v-bind="props"> {{ shorted.url }}</span>
                      </template>
                    </v-tooltip>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
            .post("", bodyFormData)
            .then((res) => {
              if (res.data.code === 0) {
                this.shortedList.push({
                  ori: this.originLink,
                  url: res.data.data,
                });
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
};
</script>
