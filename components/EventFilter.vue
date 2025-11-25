<template>
    <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 space-x-0 justify-end mb-8 w-full">
      <div>
        <MultiSelect
          data-cy="city-filter" 
          :options="uniqueCities" 
          :filter="cityFilter"
          :show-options="showCityOptions"
          @toggle="$emit('toggle', 'city')"
          @update-filter="$emit('update-city-filter', $event)"
        >
          <span>Filter by city</span>
        </MultiSelect>
      </div>
      <div>
        <MultiSelect 
          data-cy="category-filter"
          :options="uniqueCategories" 
          :filter="categoryFilter"
          :show-options="showCategoryOptions"
          @toggle="$emit('toggle', 'category')"
          @update-filter="$emit('update-category-filter', $event)"
        >
          <span>Filter by categories</span>
        </MultiSelect>
      </div>
      <div>
        <MultiSelect 
          data-cy="tagFilter"
          :options="uniqueTags" 
          :filter="tagFilter"
          :show-options="showTagOptions"
          @toggle="$emit('toggle', 'tag')"
          @update-filter="$emit('update-tag-filter', $event)"
        >
          <span>Filter by tags</span>
        </MultiSelect>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      cityFilter: {
        type: Array,
        default: () => []
      },
      categoryFilter: {
        type: Array,
        default: () => []
      },
      tagFilter: {
        type: Array,
        default: () => []
      },
      uniqueCities: {
        type: Array,
        required: true
      },
      uniqueCategories: {
        type: Array,
        required: true
      },
      uniqueTags: {
        type: Array,
        required: true
      },
      showCityOptions: {
        type: Boolean,
        default: false
      },
      showCategoryOptions: {
        type: Boolean,
        default: false
      },
      showTagOptions: {
        type: Boolean,
        default: false
      }

    },
    emits: ['update-city-filter', 'update-category-filter', 'update-tag-filter']
  }
  </script>