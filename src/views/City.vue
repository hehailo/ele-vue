<template>
  <div>
    city
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'City',
  data () {
    return {
      msg: ''
    }
  },
  computed: {
    ...mapState([''])
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    ...mapMutations([''])
  },
  filters: {
  },
  components: {
  }
}
</script>

<style scoped>
</style>
