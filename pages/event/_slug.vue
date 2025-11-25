<template>
  
  <div v-if="event" class="mx-4 lg:mx-16 py-8 space-y-6 pl-1 ">
    <NuxtLink :to="`/eventsList`" class="flex items-center h-full"> 
      <div class="rounded-full w-5 h-5 shadow-sm border border-black flex items-center justify-center mr-2">
      ← 
      </div> 
      Back to event listing page
    </NuxtLink>
    <div class="flex gap-4">
      <div class="w-full h-96 grid grid-cols-5 gap-2">
        <div class=" col-span-5 row-span-2 md:row-span-3 md:col-span-3 h-full py-1">
          <div class="bg-slate-200 rounded-md h-full w-full relative">
            <img :src="sortedImages[0]?.thumb" class="h-full w-full absolute rounded-md object-cover " />
          </div>
        </div>
        <div class="col-span-5 row-span-1 md:row-span-3 md:col-span-2 flex flex-wrap">
          <div 
            v-for="num in Array.from({ length: 4 }, (_, index) => index + 1)" 
            :key="num" 
            class="rounded-md h-full w-1/4 md:h-1/2 md:w-1/2 p-1"
          >
            <div class="bg-slate-200 h-full w-full rounded-md relative">
              <img v-if="sortedImages.length > num " :src="sortedImages[num].thumb" class="h-full w-full absolute rounded-md object-cover " />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0 pr-1">
    
      <BaseCard extra-class="w-full md:w-3/4  flex-col p-4 space-y-12">
        <div class="flex flex-col gap-2"> 
          <span class="text-3xl font-bold ">
            {{ event.title }}
          </span>
          <span class="text-base font-normal">
            {{ event.subtitle }}
          </span>
        </div>
        <div class="flex flex-col">
          <span class=" text-sm" >
            Provider
          </span>
          <span class="text-xl font-medium" >
            {{ event.supplier }}
          </span>
        </div>
      </BaseCard>
      <BaseCard extra-class=" w-full md:w-1/4  xs:space-y-0 space-y-4 md:space-y-4 py-4 md:py-0 flex-row justify-around flex-col xs:flex-row  md:flex-col items-center">
        <div class="space-y-4 flex flex-col items-center"> 
          <span class=" text-4xl font-bold">
            {{ event.default_price.formatted }}
          </span>
          <span class="text-lg">
            {{ event.rating ? event.rating + ' / 5' : 'New' }} {{ event.rating? '(' + event.totalRating + ')' : '' }}
          </span>
        </div>
        <div class="flex items-center">
          <button class="border-2 border-black py-2 hover:bg-black hover:text-white px-6 rounded-md bg-white">
            Book this event
          </button>
        </div>
      </BaseCard>
    </div>
    <div class="flex flex-col md:flex-row space-x-0 space-y-4 md:space-y-0 md:space-x-4 pr-1">
      <div class="flex flex-col w-full md:w-3/5 space-y-6">
        <div class="flex space-x-4"> 
          <BaseCard extra-class=" w-1/3 items-start">
            <div class="flex flex-col p-4 w-full">
              <span class="font-semibold">Duration</span>
              <span>{{ event.default_duration }} mins</span>
            </div>
          </BaseCard>
          <BaseCard extra-class=" w-1/3 items-start">
            <div class="flex flex-col p-4 w-full">
              <span class="font-semibold">Is online?</span>
              <span>{{ event.is_online? 'Yes': 'No' }}</span>
            </div>
          </BaseCard>
          <BaseCard extra-class="  w-1/3 items-start">
            <div class="flex flex-col p-4 w-full">
              <span class="font-semibold">Location</span>
              <span>{{ event.city }}, {{ event.country }} </span>
            </div>
          </BaseCard>
        </div>
        <div class="flex flex-col space-y-4"> 
          <span class="font-semibold text-xl"> Available Dates </span>
          <div class="flex space-x-4 overflow-scroll">                       
            <BaseCard 
              v-for="(date, index) in event.dates_ts" 
              :key="index" 
              extra-class="flex-col  justify-between items-start min-h-40 p-4 pr-16"
            >
              <div class="flex flex-col"> 
                <span class=" font-semibold text-lg whitespace-nowrap">
                  {{ 
                    new Date(date * 1000).toLocaleString('en', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: '2-digit'
                    }) 
                  }}
                </span>
                <span class=" font-semibold text-lg whitespace-nowrap">
                  {{ 
                    new Date(date * 1000).toLocaleString('en', { 
                      hour: 'numeric', 
                      minute: '2-digit', 
                      hour12: true
                    })  
                  }}
                </span>
              </div>
              <span>
                {{ event.default_price.formatted }}
              </span>
            </BaseCard>
          </div>
        </div>
        <div class="flex flex-col space-y-4"> 
          <span class="font-semibold text-xl"> Category </span>
          <div class="flex space-x-4 overflow-scroll"> 
            <div 
              v-for="(category, index) in event.categories" 
              :key="index" 
              class="flex flex-col bg-[#F2F2F2] rounded-3xl justify-center items-center h-10 px-4"
            >
              <span>
                {{ category.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') }}
              </span>
            </div>
          </div>
        </div>
        <div v-if="event?.tags && event.tags.length > 0" class="flex flex-col space-y-4"> 
          <span class="font-semibold text-xl"> Tags </span>
          <div class="flex space-x-4 overflow-scroll"> 
            
            <div 
              v-for="(tag, index) in event.tags" 
              :key="index" 
            >
            <NuxtLink 
              :to="`/eventsList?tag=${tag.slug}`" 
              class="flex bg-[#F2F2F2] rounded-3xl justify-center items-center h-10 px-4 cursor-pointer"
            >
              <span class="font-semibold">
                #{{ tag.slug }}
              </span>
            </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full min-h-60 md:w-2/5"> 
        <BaseCard extra-class="h-full w-full p-4 flex-col space-y-4">
            <div
              id="map"
              class=" w-full h-full min-h-80 border border-black rounded-md shadow-sm"
            />
          <div class="flex flex-col">
            <span class="font-semibold text-xl"> Address </span>
            <span class="text-sm h-1/12">
              {{ event.address.formatted }} 
            </span>
          </div>
        </BaseCard>
      </div>
    </div>
    <div v-if="supplierEvents.length > 0" class="flex flex-col space-y-4 pt-8 pr-1">
      <span class="font-semibold text-xl"> More events by the same provider </span>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        <EventCard 
          v-for="event in supplierEvents" 
          :key="event.id" 
          :event="event" 
        />
      </div>
    </div>
    <div v-if="eventsByTags.length > 0" class="flex flex-col space-y-4 pt-8 pr-1">
      <span class="font-semibold text-xl"> Checkout similar events </span>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        <EventCard 
          v-for="event in eventsByTags" 
          :key="event.id" 
          :event="event" 
        />
      </div>
    </div>
  </div>
</template>
  
<script>

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { computed, ref, nextTick, reactive, defineComponent, onMounted, useRoute } from '@nuxtjs/composition-api'
import { useEventStore } from '@/store/events'


export default defineComponent({
  setup() {
    const eventStore = useEventStore()
    const permalink = ref('')
    const route = useRoute()
    const map = reactive({})
    const mapClicked = ref(false)

    onMounted(async () => {
      permalink.value = route.value.params.slug
      eventStore.fetchEventDetails(permalink.value)
      await nextTick()
      createMap()
      eventStore.fetchSupplierEvents(eventStore.eventDetails.supplier)
      eventStore.fetchEventsbyTags(eventStore.eventDetails.tags)
    })



    const event = computed(() => {
      return eventStore.eventDetails
    })

    const supplierEvents = computed(() => {
      return eventStore.supplierEvents.filter(event => event.hashed_id !== eventStore.eventDetails.hashed_id)
    })

    const eventsByTags = computed(() => {
      return eventStore.eventsByTags.filter(event => event.hashed_id !== eventStore.eventDetails.hashed_id)
    })
    
    const sortedImages = computed( () => {
      const temp = [...eventStore.eventDetails.images]
      temp.sort((a, b) => (a.isPrincipal === b.isPrincipal) ? 0 : a.isPrincipal ? -1 : 1)
      return temp
    })

    const createMap = () => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiaGFzbmF0ZmFoaW0xMiIsImEiOiJjbHY2azZkcTIwMDM4MmlvYXpibmI2ODVpIn0.XDlPh6YlDBMqJFkxI7pPag'
      const generatedMap = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [eventStore.eventDetails._geoloc.lng, eventStore.eventDetails._geoloc.lat],
        zoom: 15,
        scrollZoom: false,
      })
      
      map.value = generatedMap
      map.value.on('click', () => {
        mapClicked.value = !mapClicked.value
        if(mapClicked.value) map.value.scrollZoom.enable()
        else map.value.scrollZoom.disable()
      })
      new mapboxgl.Marker().setLngLat([eventStore.eventDetails._geoloc.lng, eventStore.eventDetails._geoloc.lat]).addTo(map.value)
      
    }



    return {
      permalink,
      event,
      sortedImages,
      supplierEvents,
      eventsByTags,
      map  
    }
  }
})

</script>