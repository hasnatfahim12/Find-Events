<template>
  <div class="relative">
    <button
      class="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
      @click="$emit('toggle')"
    >
      <slot />
      <svg
        class="w-4 h-4 ml-2"
        :class="{ 'transform rotate-180': showOptions }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M6.293 7.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

        <!-- Dropdown menu for options -->
    <div
      v-if="showOptions"
      data-cy="options"
      class="absolute z-10 w-60 mt-2 origin-top-left bg-white border border-gray-300 rounded-md shadow-lg h-60 overflow-scroll"
    >
  
      <div
        v-for="(option, index) in options"
        :key="index"
        class="px-4 py-2 hover:bg-gray-100"
        @click="$emit('update-filter', option)"
      >
        <div class="flex items-center">
          <input
            type="checkbox"
            :checked="filter.includes(option)"
            class="form-checkbox h-5 w-5 text-blue-500"
          />
          <span class="ml-2">{{ option }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    filter: {
      type: Array,
      default: () => []    
    },    
    showOptions: {
      type: Boolean,
      default: false
    }    
  }
}
</script>
