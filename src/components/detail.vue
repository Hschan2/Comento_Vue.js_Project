<template>
    <div class="main">
      <div class="top">
        <div class="header">
          <div class="back">
            <router-link :to="{ path: '/'}">
              <h5>뒤로</h5>
            </router-link>
          </div>
          <div class="number">
            <span>글번호 : {{details.id}}</span>
          </div>
          <div class="email">
            <span>이메일 : {{details.user.email}}</span>
          </div>
          <div class="updated">
            <span>등록 날짜 : {{details.updated_at}}</span>
          </div>
        </div>

        <div class="title">
          <h4>제목</h4>
          <div class="titles">
            {{details.title}}
          </div>
        </div>

        <div class="contents">
          <h5>내용</h5>
          <div class="content">
            {{details.contents}}
          </div>
        </div>
      </div>
      <div class="bottom">
        <div v-if="replys">
          <span class="c-header">댓글</span>
          <div v-for="reply in replys" :key="reply.no" class="c-for">
            <div class="c-title">
              <small>ID : {{reply.id}}</small>
              <h5>{{reply.user.email}}</h5>
              <p>{{reply.updated_at}}</p>
              <p>{{reply.contents}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

const Apiurl = 'https://1rcwozojf0.execute-api.ap-northeast-2.amazonaws.com/production'

export default {
  name: 'detail',
  data() {
    return {
      details: {},
      categorys: [],
      replys: [],
    }
  },
  created() {
    this.getDetail();
  },
  watch: {
    details() {
      this.replys = this.details.reply;
    }
  },
  methods: {
    getDetail() {
      var self = this;
      axios.get(Apiurl + '/api/view', {
        params: {
          id: self.$route.params.id
        }
      })
      .then((result) => {
        self.details = result.data.info;
      })
      .catch((error) => {
        console.log("error : " + error);
      })
    },

  }
}
</script>
<style lang="less">
.main {
  background-color: #ffffff;
  margin: 5px;
  margin-top: -50px;

    .top {
      padding: 5px;
      border: solid 1px;
      border-radius: 5px;
    }

    .bottom {
      margin-top: 5px;
      padding: 5px;
      border: solid 1px;
      border-radius: 5px;
    }

    .title {
      margin-top: 20px;
      margin-bottom : 20px;
    }

    .title h4 {
      font-size: 20px;
      width : 100%;
      display: inline-flex;
      font-weight: bold;
    }

    .title .titles {
      font-size: 15px;
    }

    .contents {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .contents h5 {
      font-size: 20px;
      width : 100%;
      display: inline-flex;
      font-weight: bold;
    }

    .contents .content {
      font-size: 15px;
    }

    .header {
      width : 100%;
      margin-top: 10px;
    }

    .header .number {
      width: 100%;
      display: inline-flex;
      align-items: left;
    }

    .header .email {
      width: 100%;
      display: inline-flex;
      align-items: left;
    }

    .header .updated {
      width: 100%;
      display: inline-flex;
      align-items: left;
    }

    .header .back h5 {
      width: 100%;
      display: inline-flex;
      align-items: left;
      color: grey;
    }

    .c-header {
      width: 100%;
      display: inline-flex;
      align-items: left;
      margin-top : 10px;
      margin-bottom : 10px;
      font-size : 20px;
      font-weight: bold;
      color: #CC3D3D;
    }

    .c-title {
      width: 100%;
    }

    .c-title h5 {
      font-size: 15px;
      width: 100%;
      display: inline-flex;
      align-items: left;
    }

    .c-title small {
      font-size: 15px;
      width: 100%;
      display: inline-flex;
      align-items: left;
    }

    .c-title p {
      font-size: 15px;
      width: 100%;
      display: inline-flex;
      align-items: left;
    }
}
</style>
