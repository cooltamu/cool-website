import Vue from 'vue'
import * as VeeValidate from 'vee-validate'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import en from '../locales/en'
import es from '../locales/es'
import cn from '../locales/cn'
import { localize, extend } from 'vee-validate'
import {
  required,
  email,
  min,
  confirmed,
  numeric
} from 'vee-validate/dist/rules'

// The types of validators used in the project
extend('required', required)
extend('confirmed', confirmed)
extend('email', email)
extend('numeric', numeric)
extend('min', min)
extend('url', {
  validate: (str) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ) // fragment locator
    return !!pattern.test(str)
  }
})
extend('decimal', {
  validate: (value, { decimals = '*', separator = '.' } = {}) => {
    if (value === null || value === undefined || value === '') {
      return {
        valid: false
      }
    }
    if (Number(decimals) === 0) {
      return {
        valid: /^-?\d*$/.test(value)
      }
    }
    const regexPart = decimals === '*' ? '+' : `{1,${decimals}}`
    const regex = new RegExp(
      `^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`
    )

    return {
      valid: regex.test(value)
    }
  },
  message: 'The {_field_} field must contain only decimal values'
})

localize({
  en,
  es,
  cn
})

Vue.use(VeeValidate)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
export default VeeValidate
