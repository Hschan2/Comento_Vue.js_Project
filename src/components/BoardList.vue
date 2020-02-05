<template>
  <div class="hello">

    <button v-on:click="getBoard">get data</button>
      <div class="option-box">
        <b-button class="fillterBtn">필터</b-button>
        <div class="sort-box">
          <h6 v-on:click="toggleOrd" :class="{active: ord=='asc'}">오름차순</h6>
          <h6 v-on:click="toggleOrd" :class="{active: ord=='desc'}">내림차순</h6>
        </div>
      </div>

    <div v-infinite-scroll="moreBoard" infinite-scroll-distance="pageLoading" infinite-scroll-disabled="loading">
      <div v-for="(list, index) in lists" :key="index">
        <div class="card">
          <div id="card-header" class="card-header">
            <span>카테고리 : {{categorys[list.category_id].name}}</span> <span>글번호 : {{list.id}}</span>
          </div>
          <div class="card-body">
            <p class="card-title">{{list.user_id}} | {{list.created_at}}</p>
            <router-link :to="{ path: '/detail/'+list.id}">
              <h5 class="card-title post-title">{{list.title}}</h5>
              <p class="card-text post-body">{{list.contents}}</p>
            </router-link>
          </div>
        </div>
        <!-- index % 4 === 3의 이유는 index는 0부터 시작하기 때문에 -->
        <!-- 0 1 2 3 / 4 5 6 7... 4로 나눈 나머지가 3일 때가 게시물 4개 마다 광고 하나 -->
        <div v-if="index % 4 === 3">
          <div class="card-ads">
            <b-card :img-src="adsimage+ads.img" img-right class="picture">
              <div class="card-ads-box">
                  <h3 class="card-ads-title">{{ads.title}}</h3>
                  <div class="card-ads-contents">
                      {{ads.contents}}
                  </div>
              </div>
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ads from './ads'

const Apiurl = 'https://1rcwozojf0.execute-api.ap-northeast-2.amazonaws.com/production'

export default {
  name: 'list',
  props: {
    board : Object,
    category :Array,
  },
  components: {
    ads
  },
  data () {
    return {
      lists: [],
      categorys: [],
      ads: {},
      adsimage: 'https://cdn.comento.kr/assignment/',
      pages: 10,
      loading: false,
      categoryCount: [1,2,3],
      ord: 'asc'
    }
  },
  created() {
    this.getCategory();
    this.getAds();
  },
  mounted() {
    this.getBoard();
  },
  watch: {
    pages() {
      this.getBoard();
    },
    ord() {
      this.pages = 10;
      this.lists = [];
      this.getBoard();
    },
  },
  methods: {
    getBoard() {
      var self = this;

      this.loading = true;
      axios.get(Apiurl + '/api/list', {
        params: {
          page: 1,
          ord: this.ord,
          category: this.categoryCount,
          limit: this.pages
        }
      })
      .then((result) => {
        self.lists = result.data.list.data
        self.loading = false;
        console.log(result.data)
      })
      .catch((err) => {
        self.loading = false;
        console.log(err.message)
      })
    },
    moreBoard() {
      this.pages += 10;
    },
    getCategory() {
      var self = this;

      axios.get(Apiurl + '/api/category')
      .then((result) => {
        self.categorys = result.data.list
        console.log(result.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
    },
    getAds() {
      var self = this;

      axios.get(Apiurl + '/api/ads', {
        params: {
          page: 4,
          limit: 1
        }
      })
      .then((result) => {
        self.ads = result.data.list.data[0]
        console.log(result.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
    },
    toggleOrd(e) {
      var self = this;
      if(e.target.textContent === "오름차순") {
        self.ord = 'asc';
      } else if(e.target.textContent === "내림차순") {
        self.ord = 'desc';
      }
    },
    getCategoryName() {
      const categoryName = this.category.filter(
        list => list.id === this.board.category_id
      );
      return categoryName[0].name;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#post-list {
    margin: 30px;
}
.card {
    margin-bottom: 20px;
}
#card-header {
    display: flex;
    justify-content: space-between;
}
.card-body {
    text-align: left;
    a {
        color: #000000;
        text-decoration: none;
        &.router-link-exact-active {
          color: #000000;
        }
      }
      a:hover {
        color: grey
      }
}
.post-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

}

.post-body {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.2;
    height: 3.6em;

}
.ad-title {
    margin: 10px;
    text-align: left;
    font-size: 20px;
}
.ad-img {
    max-width: 100%;
    height: auto;
}
@red : red ;

.option-box {
    display: flex;
    justify-content: space-between;
    align-items:center;
}
.fillterBtn {
  margin-bottom: 5px;
}

.sort-box {
    .option-box;

    h6 {
        padding-right : 5px;
        cursor: pointer;
    }

    h6.active {
        color : @red;
    }
}

.card-ads {
  .card-body {
      width : 33%;
      border: solid 1px;
      border-radius: 5px;
    }
    img {
      width: 250px;
      height: 200px;
    }
    .card-ads-box {
      display: inline-block;
      width : 100%;
    }
    .card-ads-title {
      display: inline-block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
      font-weight: bold;
    }
    .card-ads-contents {
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
      margin-top : 20px;
      white-space: normal;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      font-size: 15px;
    }
}
</style>
