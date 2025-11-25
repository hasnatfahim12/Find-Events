<template>
  <div class="mx-4 lg:mx-16 py-8">
    <EventFilter 
      :unique-cities="uniqueCities"
      :unique-categories="uniqueCategories"
      :unique-tags="uniqueTags"
      :city-filter="cityFilter"
      :category-filter = "categoryFilter"
      :tag-filter="tagFilter"
      :show-city-options="showCityOptions"
      :show-category-options="showCategoryOptions"
      :show-tag-options="showTagOptions" 
      @update-city-filter="updateCityFilter"
      @update-category-filter="updateCategoryFilter"
      @update-tag-filter="updateTagFilter"
      @toggle="toggleOptions"
    />  
      <div data-cy="event-card" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        <EventCard 
          v-for="event in filteredEvents" 
          :key="event.id" 
          :event="event" 
        />
      </div>
    </div>
  </template>
  
<script>
import { computed, ref, defineComponent, onMounted, useRouter, useRoute } from '@nuxtjs/composition-api'
import { useEventStore } from '@/store/events'

export default defineComponent({
  setup() {
    const eventStore = useEventStore()
    const cityFilter = ref([])
    const categoryFilter = ref([])
    const tagFilter = ref([])
    const showCityOptions = ref(false)
    const showCategoryOptions = ref(false)
    const showTagOptions = ref(false)
    const router = useRouter()
    const route = useRoute()

    

    onMounted(async () => {

      await eventStore.fetchEvents()
      if (route.value.query.city) cityFilter.value = route.value.query.city.split(',')
      if (route.value.query.category) categoryFilter.value = route.value.query.category.split(',')
      if (route.value.query.tag) tagFilter.value = route.value.query.tag.split(',')
      await getFilteredEvents()
    })

    const getFilteredEvents = async () => {
      await eventStore.filterEvents({cityFilter: cityFilter.value, categoryFilter: categoryFilter.value, tagFilter: tagFilter.value})
      updateQueryParameters()
    }
    const uniqueCities = computed(() => {
      return [...new Set(eventStore.eventsList.map(event => event.city))]
    })

    const uniqueCategories = computed(() => {
      const categories = []

      eventStore.eventsList.forEach(event => {
        event.categories.forEach(category => {
          category.formatted = category.slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
          
          if (!categories.includes(category.formatted)) {
            categories.push(category.formatted)
          }
        })
      })

      return categories
    })

    const uniqueTags = computed(() => {
      const tags = []
      eventStore.eventsList.forEach(event => {
        event?.tags && event.tags.forEach(tag => {
          
          if(!tags.includes(tag.slug)) tags.push(tag.slug)
        })
      })
      return tags
    })

    const filteredEvents = computed(() => {
      return eventStore.filteredEvents      
    })

    const toggleOptions = source => {
      if (source === 'city') {
        showCityOptions.value = !showCityOptions.value
        showCategoryOptions.value = false
        showTagOptions.value = false
      }
      if (source === 'category') {
        showCityOptions.value = false
        showCategoryOptions.value = !showCategoryOptions.value
        showTagOptions.value = false
      }

      if(source === 'tag') {
        showTagOptions.value = !showTagOptions.value
        showCityOptions.value = false
        showCategoryOptions.value = false
      } 

    }

    const updateCityFilter = selectedCity => {
      const temp = [...cityFilter.value] 

      if (temp.includes(selectedCity)) {
        cityFilter.value = temp.filter(city => city !== selectedCity)
      } else {
        cityFilter.value = [...temp, selectedCity]
      }
      getFilteredEvents()
    }

    const updateCategoryFilter = selectedCategory => {
      const temp = [...categoryFilter.value]

      if (temp.includes(selectedCategory)) {
        categoryFilter.value = temp.filter(category => category !== selectedCategory)
      } else {
        categoryFilter.value = [...temp, selectedCategory]
      }

      getFilteredEvents()
    }

    const updateTagFilter = selectedTag => {
      const temp = [...tagFilter.value]

      if(temp.includes(selectedTag)) tagFilter.value = temp.filter(tag => tag !== selectedTag)
      else tagFilter.value = [...temp, selectedTag]
      
      getFilteredEvents()
    }

    const updateQueryParameters = () => {
      const query = {}

      if (cityFilter.value.length > 0) query.city = cityFilter.value.join(',')
      if (categoryFilter.value.length > 0) query.category = categoryFilter.value.join(',')
      if (tagFilter.value.length > 0) query.tag = tagFilter.value.join(',')

      router.replace({ path: router.path, query }).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          logError(err);
        }
      })
    }

    return {
      uniqueCities,
      uniqueCategories,
      uniqueTags,
      filteredEvents,
      cityFilter,
      categoryFilter,
      tagFilter,
      showCityOptions,
      showCategoryOptions,
      showTagOptions,
      toggleOptions,
      updateCityFilter,
      updateCategoryFilter,
      updateTagFilter
    }
  }
})

</script>