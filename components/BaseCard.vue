<template>
    <div 
      class="flex justify-center rounded-md relative bg-[#F2F2F2]"
      :class="[extraClass?? '']"
    >
        <slot />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      extraClass: {
        type: String,
        default: () => ''
      }
    },
  }
  </script>