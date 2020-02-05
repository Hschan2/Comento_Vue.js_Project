<template>
    <div v-if="isShow" class="sponsored-container">
        <h6 class="ads-title">중간 광고</h6>
        <b-card :img-src="adsimage+ads.img" img-alt="Card image" img-left class="rounded=0">
            <div class="ads-box">
                <h3 class="info-text">{{ads.title}}</h3>
                <div class="ads-contents">
                    {{ads.contents}}
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
export default {
  name:'ads',
  props: {
    index: Number,
    getAds: Function,
  },
  data() {
    return {
      adsimage: 'https://cdn.comento.kr/assignment/',
      ads: {
        title: "",
        img: "",
        contents: "",
      }
    }
  },
  created() {
    var self = this;
    if(self.index % 4 === 0) {
      self.getAds(self);
    }
  }
}
</script>
