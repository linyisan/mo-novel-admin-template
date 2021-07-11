<template>
  <div />
</template>

<script>
import { countSta } from '@/api/stat'

export default {
  data() {
    return {
      userCount: 0,
      bookCount: 0
    }
  },
  created() {
    countSta().then(res => {
      this.userCount = res.data.userCount
      this.bookCount = res.data.bookCount
    })
  }
}
</script>
