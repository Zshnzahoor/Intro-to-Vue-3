app.component("product-details", {
  props: {
    details: {
      type: array,
      required: true,
    },
  },
  template:
    /*html*/
    `<ul>
    <li v-for="detail in details">
    {{detail}}
    </li></ul>`,
});
