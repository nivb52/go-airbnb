<template>
  <images-carousel :stay="stay" :images="stay.imgUrls" :loop="false" class="details-carousel"></images-carousel>
  <div v-if="stay">
    <h2 class="stay-details-name">{{ stay.name }}</h2>
    <div class="headerFlex flex-box">
      <div class="stay-details-basicInfo">
        <p><img class="star" src="../assets/svg/review-start-svg.svg"><span class="rating">{{ rating }}</span> <span
            class="bullet1">•</span></p>
        <p class="reviews">{{ reviews }}</p>
        <p class="Superhost" v-if="isSuperHost"><span class="bullet">•</span> Superhost</p>
        <p class="location"><span class="bullet">•</span> 
          <span>{{ stay.loc.address }}</span></p>
      </div>
      <div class="saveShare flex-box">
        <p><share-svg></share-svg> <span>Share</span></p>
        <p @click="saveStay"><save-svg></save-svg> <span>Save</span></p>
      </div>
    </div>
    <div class="stay-details-imgs-container scroll-trigger">
      <img v-for="(img, idx) in imgsToRender" :src="img" :key="img + idx" :class="'stay-details-img' + idx" />
    </div>
  </div>
</template>
<script>
import shareSvg from '../side-cmps/shareSvg.vue'
import saveSvg from '../side-cmps/saveSvg.vue'
import imagesCarousel from '../cmps/images-carusel.vue'
export default {
  props: {
    stay: Object
  },
  data() {
    return {
      isSuperHost: false,
    }
  },
  created() {
    this.isSuperHost = this.isSuper()
  },
  methods: {
    saveStay(e) {
      e.stopPropagation()
      const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser))
      user.wishList.push(this.stay._id)
      this.$store.dispatch({ type: "updateUser", user })
      showSuccessMsg('Added stay to wishlist')
    },
    isSuper() {
      let ratingSum = 0
      this.stay.reviews.forEach(review => {
        ratingSum += review.rate
      })
      const average = (ratingSum / this.stay.reviews.length).toString().substring(0, 3)
      if (average > 4) return true
      else return false
    }
  },
  computed: {
    beds() {
      return this.stay.capacity.bedrooms * 2
    },
    imgsToRender() {
      return this.stay.imgUrls.slice(0, 5)
    },
    reviews() {
      if (this.stay.reviews.length === 1) return '1 review'
      else return `${this.stay.reviews.length} reviews`
    },
    rating() {
      let ratingSum = 0
      this.stay.reviews.forEach(review => {
        ratingSum += review.rate
      })
      const average = (ratingSum / this.stay.reviews.length).toString().slice(0, 3)
      if (average === 4 || average === 5 || average === 3) return average + '.0'
      else return average
    }
  },
  components: {
    saveSvg,
    shareSvg,
    imagesCarousel
  }
}
</script>
<style>

</style>