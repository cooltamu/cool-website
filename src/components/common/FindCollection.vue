<template>
  <v-autocomplete :label="label" v-model="collectionValue" :items="mappedItems">
  </v-autocomplete>
</template>

<script>
// import * as types from '@/store/mutation-types'
import { mapActions } from 'vuex'

export default {
  name: 'FindCollection',
  props: ['storeName', 'storeItem', 'getterFunction', 'value', 'label', 'text'],
  data() {
    return { collectionValue: this.value }
  },
  computed: {
    items() {
      try {
        return this.$store.state[this.storeName][this.storeItem]
      } catch (error) {}
      return []
    },
    mappedItems() {
      let ret = []
      ret = this.items.map((item) => {
        return { text: item[this.text], value: item._id }
      })
      return ret
    },
    filterItemsText() {
      return this.items.filter((items) => items[this.text])
    },
    selectedObject() {
      return this.items.filter((items) => items._id === this.value)
    }
  },
  methods: {
    // I don't know how to do this without hardcoding it :/
    //  ...mapActions({
    //    someAction(dispatch, payload) {
    //      return dispatch(this.getterFunction, payload)
    //    }
    //  })
    ...mapActions(['getUsers', 'getBooks'])
  },
  watch: {
    collectionValue(newVal) {
      this.$emit('input', newVal)
    }
  },
  async created() {
    // await this[this.getterFunction]

    await this[this.getterFunction]({ pagination: false })
  }
}
</script>
