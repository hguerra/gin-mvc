import { Component } from 'vue'
import template from './template.html'
import './style.css'

export default {
  template,
  data() {
    return { message: 'Hello Vue', count: 0 }
  },
  methods: {
    plus() {
      this.count++
    },
  },
} as Component
