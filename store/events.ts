import { defineStore } from 'pinia';
import events from '@/data/events.json';

interface GeolocationData {
  lat: number;
  lng: number;
}

interface AddressData {
  formatted: string;
  zipcode: string;
}

interface Category {
  slug: string;
}

interface Tag {
  name: string; 
  slug: string  
}
interface PriceData {
  amount: number;
  currency: string;
  formatted: string;
}

interface Image {
  alt: string;
  id: number;
  isFeatured: boolean;
  isPrincipal: boolean;
  thumb: string;
}

interface EventData {
  _geoloc: GeolocationData;
  address: AddressData;
  categories: Category[];
  dates_ts: number[];
  default_duration: number;
  default_price: PriceData;
  focus: string;
  has_events: boolean;
  hashed_id: string;
  images: Image[];
  is_online: boolean;
  max_date: number;
  min_date: number;
  objectID: string;
  permalink: string;
  rating: number;
  subtitle: string;
  supplier: string;
  supplier_alias: string;
  tags: Tag[];
  title: string;
  totalRating: number;
}

interface FilterOptions {
  cityFilter?: string[];
  categoryFilter?: string[];
  tagFilter?: string[];
}
interface EventStoreState {
  eventsList: EventData[];
  eventDetails: EventData | null;
  filteredEvents: EventData[];
  supplierEvents: EventData[];
  eventsByTags: EventData[];
}


export const useEventStore = defineStore('eventStore', {
  state: (): EventStoreState => ({
    eventsList: [],
    eventDetails: null,
    filteredEvents: [],
    supplierEvents: [],
    eventsByTags: []
  }),
  actions: {
    fetchEvents(this: any) {
      this.eventsList = events as EventData[];
    },
    fetchEventDetails(this: any, permalink: string) {
      const event = events.find(event => event.permalink === permalink)
      this.eventDetails = event || null;
    },
    filterEvents(this: any, filter: FilterOptions = {}) {
      let tempEvents = [...this.eventsList]
      
      const { cityFilter = [], categoryFilter = [], tagFilter = [] } = filter;
      
      if (cityFilter.length > 0) {
        tempEvents = tempEvents.filter(event => cityFilter.includes(event.city))
      }

      if (categoryFilter.length > 0) {
        tempEvents = tempEvents.filter(event =>
          event.categories.some((category: Category) =>
            categoryFilter.includes(category.slug
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' ')
            )
          )
        )
      }
      
      if (tagFilter.length > 0) {
        tempEvents = tempEvents.filter((event: EventData) => {
          if(event?.tags && event?.tags.length > 0) {
            return event.tags.some((tag: Tag) => tagFilter.includes(tag.slug))
          }
          return null 
        }
        )
      }


      this.filteredEvents = tempEvents

    },
    fetchSupplierEvents(this: any, supplier: String) {
      if(this.eventsList.length === 0) this.fetchEvents()
      let tempEvents = [...this.eventsList]
      tempEvents = tempEvents.filter(event => event.supplier === supplier)
      this.supplierEvents = tempEvents.slice(0,10)
    },
    fetchEventsbyTags(this: any, tags: Tag[]) {
      if(this.eventsList.length === 0) this.fetchEvents()
      let tempEvents = []
      if(tags && tags.length > 0) {
        tempEvents = this.eventsList.filter((event: EventData) => event?.tags && event?.tags.map((tag: Tag)=> tags.includes(tag)))
      }


      this.eventsByTags = tempEvents.slice(0,10)
    }

  },
});