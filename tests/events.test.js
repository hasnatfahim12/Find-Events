import { setActivePinia, createPinia } from 'pinia'
import { useEventStore } from '@/store/events'
import events from '@/data/events.json';

describe('EventStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetches events correctly', () => {
    const eventStore = useEventStore()
    eventStore.fetchEvents()
    expect(eventStore.eventsList).toHaveLength(events.length)
  })

  it('fetches event details correctly', () => {
    const eventStore = useEventStore()
    eventStore.fetchEvents()
    const permalink = 'intuitive-art-workshop-in-berlin-yz71pz'
    eventStore.fetchEventDetails(permalink)
    const event = events.find(event => event.permalink === permalink)
    expect(eventStore.eventDetails).toEqual(event)
  })

  it('filters events correctly', () => {
    const eventStore = useEventStore()
    eventStore.fetchEvents()
    const cityFilter = ['Köln']
    const categoryFilter = ['Essen Trinken']
    const tagFilter = ['teamevent-koeln']
    eventStore.filterEvents({ cityFilter, categoryFilter, tagFilter })
    const filteredEvents = eventStore.filteredEvents
    expect(filteredEvents.every(event => cityFilter.includes(event.city))).toBe(true)
    expect(filteredEvents.every(event => event.categories.some(category => categoryFilter.includes(category.slug)))).toBe(true)
    expect(filteredEvents.every(event => event?.tags && event.tags.some(tag => tagFilter.includes(tag.slug)))).toBe(true)
  })

  it('fetches supplier events correctly', () => {
    const eventStore = useEventStore()
    eventStore.fetchEvents()
    const supplier = 'die Krake'
    eventStore.fetchSupplierEvents(supplier)
    const supplierEvents = eventStore.supplierEvents
    expect(supplierEvents.every(event => event.supplier === supplier)).toBe(true)
    
  })

  it('fetches events by tags correctly', () => {
    const eventStore = useEventStore()
    eventStore.fetchEvents()
    const tags = [
      { 
        name:	'Teamevent Frankfurt am Main',
        slug:	'teamevent-frankfurt-am-main'
      },
      { 
        name	:	'Weihnachtsfeier',
        slug	:	'weihnachtsfeier'
      }
    ]
    eventStore.fetchEventsbyTags(tags)
    const eventsByTags = eventStore.eventsByTags
    expect(eventsByTags.every(event => event?.tags && event.tags.some(tag => tags.map(t => t.slug).includes(tag.slug)))).toBe(true)
  })

})