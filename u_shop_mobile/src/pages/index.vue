<template>
 <div>
     <transition>
         <router-view/>
     </transition>
     <v-nav></v-nav>
     <!-- <header-title></header-title> -->
 </div>
</template>

<script>
import vNav from '../components/vNav'
// import headerTitle from '../common/headerTitle'
export default {
 data() {
 return {};
 },
 components:{
     vNav,
    
 }
};
</script>

<style lang="" scoped>

</style>
