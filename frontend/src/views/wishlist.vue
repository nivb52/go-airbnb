<template>
  <div class="wishlist detailsContainer" v-if="userStays.length">
    <h1 class="title">Wishlists</h1>
    <div class="flexContainer">
      <div v-for="stay in userStays" :key="stay._id">
        <stay-preview  :stay="stay"></stay-preview>
      </div>
    </div>
  </div>
  <div v-else class="wishlist detailsContainer">
    <h1 class="title">Wishlists</h1>
    <div>No stays yet</div>
  </div>
</template>
<script>
import { eventBus } from '../services/event-bus.service';
import stayPreview from '../cmps/stay-preview.vue';
export default {
  data() {
    return {
      wishlist: null,
      userStays:[]
    }
  },
   created() {
    eventBus.emit('toggleLayout', true)
    this.setWishlist()
  },
  mounted(){
    window.scrollTo(0, 0);
  },
  methods: {
    setWishlist(){
      let user = {...this.currUser}
      this.userStays = user.wishList
    }
  },
  computed: {
    currUser() {
      return this.$store.getters.loggedinUser
    }
  },
  components:{
    stayPreview
  }
}
</script>
