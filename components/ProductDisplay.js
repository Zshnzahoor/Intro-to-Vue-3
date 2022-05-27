app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :class="{ 'out-of-stock-img': !inStock }" v-bind:src="image" />
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>{{ sale }}</p>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>Shipping:{{shipping}}</p>
        <ul>
          <li v-for="detail in details">{{detail}}</li>
        </ul>
        <p style="margin-bottom: -1px">Colors:</p>
        <div
          v-for="(variant, index) in variants"
          style="margin-left: 50px"
          :style="{ backgroundColor:variant.color}"
          :key="variant.id"
          @mouseover="updateVariant(index)"
          class="color-circle"
        ></div>
        <p style="margin-bottom: -1px">Sizes:</p>
        <ul>
          <li v-for="size in sizes">{{size.toUpperCase()}}</li>
        </ul>
        <button
          :class="{disabledButton:!inStock}"
          :disabled="!inStock"
          class="button"
          v-on:click="addToCart"
        >
          Add to cart
        </button>
        <button
          class="button"
          :disabled="!inStock"
          :class="{disabledButton:!inStock}"
          v-on:click="removeFromCart"
        >
          Remove Item
        </button>
      </div>
    </div>
  </div>`,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      //   image: "./assets/images/socks_blue.jpg",
      //   inStock: true,
      onSale: true,
      selectedVariant: 0,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 1,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 50,
        },
        {
          id: 2,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 0,
        },
      ],
      sizes: ["small", "medium", "large", "x-large"],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);

      console.log("cart"); //   this.cart += 1;
    },
    removeFromCart() {
      //   if (this.cart.length > 0) {
      this.$emit("remove-from-cart", this.variants[this.selectedVariant].id);

      console.log("cartrrr");
      //     this.cart -= 1;
      //   }
    },
    // updateImage(variantImage) {
    //   this.image = variantImage;
    // },
    updateVariant(index) {
      this.selectedVariant = index;
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    sale() {
      if (this.onSale) {
        return this.brand + " " + this.product + " is on sale.";
      }
      return "";
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      //   return "2.99 $";
    },
  },
});
