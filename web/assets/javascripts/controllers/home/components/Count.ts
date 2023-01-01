export default {
  data() {
    return { message: 'Hello Vue', count: 0 }
  },
  methods: {
    plus() {
      this.count++
    },
  },
  template: `<div>
<p class="color-red">{{message}}</p>

<button @click="plus">
  Count is: {{count}}
</button>

</div>`,
}
