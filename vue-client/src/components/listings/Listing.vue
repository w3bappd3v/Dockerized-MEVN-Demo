<script>
  export default {
    props: ['listing']
  }
</script>

<template>
    <div class="listing">
      <div class="remove-listing-row">
        <div class="remove-listing" v-on:click="$emit('remove-listing')">X</div>
      </div>
      <img :src="require('../../assets/listing-images/' + listing.image +'.jpg')">
      <ul class="info">
          <li class="address">{{ listing.address }}</li>
          <li>{{ listing.neighborhood }}</li>
          <li>${{ listing.price }}</li>
          <li>{{ listing.summary }}</li>
      </ul>
    </div>
</template>

<style scoped lang="scss">
  .listing {
    width: 200px;
    height: fit-content;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    margin: 20px 10px;
    padding: 5px 10px;
    box-shadow: 1px 1px 12px 3px $box-shadow-color;
    background: #f7f7f7;

    img {
      width:200px;
      height: 200px;
    }

    ul {
      padding: 0;
      list-style: none;
      text-align: left;
    }
    .address {
      font-size: 1.25em;
      color: #000;
    }
    li {
      font-size: .75em;
      color: #8b8b8b;
    }
    .remove-listing-row {
      display: flex;
      justify-content: flex-end;
      font-weight: bold;
      .remove-listing {
        cursor: pointer;
        padding: 3px;
        font-size: 1.1em;
      }
      .remove-listing:hover {
        color: #c00000;
      }
    }
  }
</style>
