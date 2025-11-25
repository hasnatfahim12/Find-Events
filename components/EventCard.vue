<template>
  <div>
    <NuxtLink
      :to="`/event/${event.permalink}`"
      class="block h-full hover:bg-gray-200 p-2 rounded-lg hover:scale-105 transition-all duration-100 ease-in-out"
    >
      <div>
        <div class="w-full bg-slate-100 rounded-lg min-h-[13.5rem] relative border-2 border-black">
          <img
            class="w-full h-full rounded-md object-cover absolute inset-0"
            :src="event.images.filter(image => image.isPrincipal === true)[0]?.thumb"
            alt=""
            @error="e => (e.target.src = '/fallback_image.jpg')"
          />
        </div>
        <div class="pt-4">
          <h3 class="text-xl font-bold mb-2">{{ event.title }}</h3>
          <span class="text-lg font-bold">{{ event.default_price.formatted }}</span>
          <p class="text-gray-600 mb-2">Duration: {{ event.default_duration }} min</p>
          <p class="text-gray-600">
            Rating: {{ event.rating ?? "-" }} / 5
            <span>({{ event.totalRating ?? "0" }})</span>
          </p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
};
</script>
