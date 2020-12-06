<script>
  import store from '../store/modules/listings'
  import Listing from "../components/listings/Listing";
  
  export default {
    mounted() {
      store.dispatch("getListings");
    },
    computed: {
      listings () {
        return store.getters.listings;
      },
      filteredListings () {
        return this.filterListings()
      }
    },
    data() {
      return {
        searchStr: ''
      }
    }, 
    components: {
      listing: Listing
    },
    methods: {
      addListing () {
        //a bit of fun playing around with randomness to generate new list items  
        let listing = {};
        let listingsList = [];
        const listingImgs = ['listing-1', 'listing-2', 'listing-3']

        //get a random listing from existing list unless list is too small to give enough variance
        if (listingsList.length > 3) {
          //use existing listings
          listingsList = JSON.parse(JSON.stringify(this.listings));
          //get a random listing from existing listings  
          listing = listingsList[Math.floor(Math.random() * listingsList.length)];
          //set random image
          listing.image = listingImgs[Math.floor(Math.random() * 3)];
        } else {
          //use a minimum pool to generate a new unique listing 
          listingsList = [
            {
              id: 1,
              address: "123 First Street",
              neighborhood: "Beverly Hills",
              price: "2,000,000",
              summary: "2BD, 2BA, 1200SF, CONDO",
              image: "listing-1"
            },
            {
              id: 2,
              address: "321 2nd Ave",
              neighborhood: "Harlem",
              price: "100,000",
              summary: "2BD, 2BA, 900SF, SINGLE-FAMILY",
              image: "listing-2"
            },
            {
              id: 3,
              address: "456 Third Street",
              neighborhood: "Withering Heights",
              price: "100,000,000",
              summary: "3BD, 2BA, 1100SF, CO-OP",
              image: "listing-3"
            }
          ];
          //get a random listing from existing listings  
          listing = listingsList[Math.floor(Math.random() * listingsList.length)];
        }

        //give new listing a unique addres number
        const addressNumber = Math.floor(Math.random() * 99) + 75;
        const streets =['Cherry Lane', 'Oak Street', 'Sixth Ave', 'Main Street'];
        listing.address = addressNumber + ' ' + streets[Math.floor(Math.random() * streets.length)];

        //give listing a unique as needed here for demo purposes id
        listing.id = Date.now() + [Math.floor(Math.random() * 99)];

        store.dispatch('addListing', listing);  
      },
      removeListing (listing) {
        store.dispatch('removeListing', listing); 
      },
      filterListings () {
        let strToMatch = this.searchStr.toLowerCase();
        //if search chars are all number type need to to parseInt() for string includes()
        //otherwise ok they are coerced if mixed with string chars
        let numCount = 0;
        for(let i=1; i<strToMatch.length; i++){
          if(/^\d+$/.test(strToMatch[i])){
            numCount++;
          }
        }
        if(numCount == strToMatch.length-1 && strToMatch.length > 1){
          strToMatch = parseInt(strToMatch);
        }
        return this.listings.filter(x => x.address.toLowerCase().includes(strToMatch));
      }
    }
  }
</script>

<template>
  <div class="container">
    <h1>Listings</h1>
    <button @click="addListing()">Create New Listing</button>
    <input type="text" v-model="searchStr" placeholder="Filter By Address" />
    <div class="listings">
      <listing v-for="listing in filteredListings" :listing="listing" :key="listing.id" v-on:remove-listing="removeListing(listing.id)"></listing>
    </div>
  </div>
</template>

<style scoped lang="scss">
  h1 {
    margin-top: 5px;
  }
  input {
    border-radius: 3px;
    border: 1px solid #d4d4d4;
    height: 25px;
    width: 200px;
    font-size: 1.15em;
    padding: 5px;
    vertical-align: middle;
    color: #585858;
  }
  input:focus{
    outline-color: #a4dfb5;
  }
  .listings {
    margin: 0 auto;
    max-width: 773px;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    
  }
  button {
    margin-right: 10px;
  }
  @media screen and (max-width: 785px) {
    .listings {
      max-width: 485px;
    }
  }
    @media screen and (max-width: 543px) {
    .listings {
      max-width: 241px;
    }
    button {
      margin-bottom: 10px;
    }
  }
</style>