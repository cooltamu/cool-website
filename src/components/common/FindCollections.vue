<template>
  <v-combobox
    :label="label"
    v-model="collectionValue"
    :items="mappedItems"
    multiple
    small-chips
    deletable-chips
  >
  </v-combobox>
</template>

<script>
// import * as types from '@/store/mutation-types'
import { mapActions } from 'vuex'

export default {
  name: 'FindCollection',
  props: ['storeName', 'storeItem', 'getterFunction', 'value', 'label', 'text'],
  data() {
    return { collectionValue: [...this.value] }
  },
  computed: {
    items() {
      try {
        return this.$store.state[this.storeName][this.storeItem]
      } catch (error) {
        console.log(error)
      }
      return []
    },
    mappedItems() {
      let ret = []
      ret = this.items.map((item) => {
        return { text: item[this.text], value: item[this.text] }
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
    ...mapActions(['getUsers', 'getBooks', 'getLibraries'])
  },
  watch: {
    collectionValue(newVal) {
      console.log(newVal)
      newVal = newVal.map(
        (val) =>
          this.items.filter((mapVal) => val.value === mapVal[this.text])[0]._id
      )
      this.$emit('input', newVal)
    }
  },
  async created() {
    // await this[this.getterFunction]
    if (this.value.length === 0) {
      this.collectionValue = []
    } else {
      this.collectionValue = this.value
    }
    await this[this.getterFunction]({ pagination: false })
    this.collectionValue = this.collectionValue.map(
      (val) => this.items.filter((mapVal) => val === mapVal._id)[0][this.text]
    )
  }
}
</script>
