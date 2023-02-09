<template>
<div>
  <h1>Geolocation</h1>
  <p>Your location is:</p>
  <p>Latitude: {{ loc.lat }}</p>
  <p>Longitude: {{ loc.long }}</p>

  <button @click="getCurrentPosition">
    Get Current Location
  </button>
</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Geolocation } from '@capacitor/geolocation';
export default defineComponent({
  setup() {
    const loc = ref<{
      lat: null | number;
      long: null | number;
    }>({
      lat: null,
      long: null,
    });

    const getCurrentPosition = async () => {
      const pos = await Geolocation.getCurrentPosition();
      loc.value = {
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      };
    };
    return { getCurrentPosition, loc };
  },
});
</script>