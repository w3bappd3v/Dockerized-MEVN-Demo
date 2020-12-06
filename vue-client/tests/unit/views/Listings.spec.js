import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import sinon from 'sinon'
import Listings from '@/views/Listings.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Listings.vue', () => {
  let actions
  let store
 
  const config = {
    computed: {
      listings () {
        return [
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
          }
  
        ]
      }
    }
  }

  beforeEach(() => {
    sinon.stub(Listings, 'mounted')

    actions = {
      addListing: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })

  afterEach(() => {
    Listings.mounted.restore()
  })

  it('renders a Listing', () => {
    const wrapper = shallowMount(Listings, config)  
    const listing = wrapper.find('listing-stub')
    
    expect(listing.exists()).toBe(true)
  })

  it('filters Listings based on input', async () => {
    const wrapper = shallowMount(Listings, config)
    const filterInput = wrapper.find('input')
    const divArr = wrapper.findAll('listing-stub')

    expect(wrapper.vm.filteredListings.length).toBe(2)

    filterInput.setValue('First ');
    wrapper.vm.filterListings()

    expect(wrapper.vm.filteredListings.length).toBe(1)

  })

  // it('dispatches addListing', async () => {
  //   const wrapper = shallowMount(Listings, { store, localVue })
  
  //   await wrapper.find('button').trigger('click')
  //   expect(actions.addListing).toHaveBeenCalled()
  // })
})