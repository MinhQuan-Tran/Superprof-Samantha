<script setup>
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted, watch, reactive } from 'vue';

gsap.registerPlugin(ScrollTrigger);

const weather = reactive({
  temp: 0,
  temp_unit_C: true,
  precipitation: 0,
  humidity: 0,
  wind_speed: 0,
  weather_code: 0,
  is_day: true,
  daily: [],
});

const props = defineProps({
  containerAnimation: {
    type: Object,
    required: true,
  },
});

function weatherIconURL(is_day, weather_code) {
  // if (is_day) {
  //   switch (weather_code) {
  //     case 0: // Clear sky
  //       return 'Ellipse 30.svg';
  //     case 1: // Mainly clear
  //       return 'Group 1-1.svg';
  //     case 2: // Partly cloudy
  //       return 'Group 2.svg';
  //     case 3: // Overcast
  //       return 'Group 1.svg';
  //     case 45: // Fog
  //     case 48:
  //       return 'Group 1233.svg';
  //     case 51: // Drizzle
  //     case 53:
  //     case 55:
  //       return 'Group 12.svg';
  //     case 56: // Freezing Drizzle
  //     case 57:
  //       return 'Group 12-1.svg';
  //     case 61: // Rain
  //     case 63:
  //     case 65:
  //       return "Group 14.svg";
  //     case 66: // Freezing Rain
  //     case 67:
  //       return "Group 14-1.svg";
  //     case 71: // Snow
  //     case 73:
  //     case 75:
  //     case 77: // Snow Grains
  //       return "snow.svg";
  //     case 80: // Rain showers
  //     case 81:
  //     case 82:
  //       return "Group 11-1.svg";
  //     case 85: // Snow showers
  //     case 86:
  //       return "Group 7.svg";
  //     case 95: // Thunderstorm
  //       return "Vector 15.svg";
  //   }
  // } else {
  //   switch (weather_code) {
  //     case 0: // Clear sky
  //       return 'Group 1214.svg';
  //     case 1: // Mainly clear
  //       return 'Group 2-2.svg';
  //     case 2: // Partly cloudy
  //       return 'Group 6.svg';
  //     case 3: // Overcast
  //       return 'Group 1.svg';
  //     case 45: // Fog
  //     case 48:
  //       return 'Group 1234.svg';
  //     case 51: // Drizzle
  //     case 53:
  //     case 55:
  //       return 'Group 12.svg';
  //     case 56: // Freezing Drizzle
  //     case 57:
  //       return 'Group 12-1.svg';
  //     case 61: // Rain
  //     case 63:
  //     case 65:
  //       return "Group 14.svg";
  //     case 66: // Freezing Rain
  //     case 67:
  //       return "Group 14-1.svg";
  //     case 71: // Snow
  //     case 73:
  //     case 75:
  //     case 77: // Snow Grains
  //       return "snow.svg";
  //     case 80: // Rain showers
  //     case 81:
  //     case 82:
  //       return "Group 11-1.svg";
  //     case 85: // Snow showers
  //     case 86:
  //       return "Group 7.svg";
  //     case 95: // Thunderstorm
  //       return "Vector 15.svg";
  //   }
  // }

  if (is_day) {
    switch (weather_code) {
      case 0: // Clear sky
        return 'clear-day.svg';
      case 1: // Mainly clear
        return 'cloudy-1-day.svg';
      case 2: // Partly cloudy
        return 'cloudy-2-day.svg';
      case 3: // Overcast
        return 'cloudy-3-day.svg';
      case 45: // Fog
      case 48:
        return 'fog-day.svg';
      case 51: // Drizzle
      case 53:
      case 55:
        return 'rainy-1-day.svg';
      case 56: // Freezing Drizzle
      case 57:
        return 'rainy-1-day.svg';
      case 61: // Rain
      case 63:
      case 65:
        return 'rainy-2-day.svg';
      case 66: // Freezing Rain
      case 67:
        return 'rainy-2-day.svg';
      case 71: // Snow
      case 73:
      case 75:
      case 77: // Snow Grains
        return "snowy-1-day.svg";
      case 80: // Rain showers
      case 81:
      case 82:
        return 'rainy-3-day.svg';
      case 85: // Snow showers
      case 86:
        return "snowy-3-day.svg";
      case 95: // Thunderstorm
        return "scattered-thunderstorms-day.svg";
    }
  } else {
    switch (weather_code) {
      case 0: // Clear sky
        return 'clear-night.svg';
      case 1: // Mainly clear
        return 'cloudy-1-night.svg';
      case 2: // Partly cloudy
        return 'cloudy-2-night.svg';
      case 3: // Overcast
        return 'cloudy-3-night.svg';
      case 45: // Fog
      case 48:
        return 'fog-night.svg';
      case 51: // Drizzle
      case 53:
      case 55:
        return 'rainy-1-night.svg';
      case 56: // Freezing Drizzle
      case 57:
        return 'rainy-1-night.svg';
      case 61: // Rain
      case 63:
      case 65:
        return 'rainy-2-night.svg';
      case 66: // Freezing Rain
      case 67:
        return 'rainy-2-night.svg';
      case 71: // Snow
      case 73:
      case 75:
      case 77: // Snow Grains
        return "snowy-1-night.svg";
      case 80: // Rain showers
      case 81:
      case 82:
        return 'rainy-3-night.svg';
      case 85: // Snow showers
      case 86:
        return "snowy-3-night.svg";
      case 95: // Thunderstorm
        return "scattered-thunderstorms-night.svg";
    }
  }

  return null;
};

function formatTemp(temp_C) {
  const temp = weather.temp_unit_C ? temp_C : ((temp_C * 9 / 5) + 32);
  return Math.round(temp);
}

watch(() => props.containerAnimation, (scrollTween) => {
  gsap.set('#weather .blobs', {
    rotation: 0,
    xPercent: -50,
    yPercent: -50,
  });
  gsap.to('#weather .blobs', {
    scrollTrigger: {
      trigger: '#weather .blobs',
      scrub: 1,
      containerAnimation: scrollTween,
      start: 'center 200%',
      end: 'center -100%',
      // markers: true,
    },
    rotation: 360,
  });
});

onMounted(() => {
  fetch(`https://api.open-meteo.com/v1/forecast?` +
    `latitude=33.873415&` +
    `longitude=-115.9009923&` +
    `current=temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m,weather_code,is_day&` +
    `daily=weather_code,temperature_2m_max,temperature_2m_min&` +
    `timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`).then((response) => {
      return response.json();
    }).then((data) => {
      weather.temp = data.current.temperature_2m;
      weather.precipitation = data.current.precipitation;
      weather.humidity = data.current.relative_humidity_2m;
      weather.wind_speed = data.current.wind_speed_10m;
      weather.weather_code = data.current.weather_code;
      weather.is_day = data.current.is_day;

      for (let i = 0; i < data.daily.time.length; i++) {
        const day = {
          date: new Date(data.daily.time[i]),
          weather_code: data.daily.weather_code[i],
          temp_max: data.daily.temperature_2m_max[i],
          temp_min: data.daily.temperature_2m_min[i]
        };

        weather.daily.push(day);
      }
    });

});
</script>

<template>
  <main id="weather">
    <div class="content">
      <div class="blobs">
        <img style="--order: 1; --filter: opacity(0.7);" src="@/assets/blob.svg" alt="blob">
        <img style="--order: 2; --filter: opacity(0.3);" src="@/assets/blob.svg" alt="blob">
        <img style="--order: 3;" src="@/assets/blob.svg" alt="blob">
        <div></div>
      </div>

      <h1 class="title">Joshua Tree National Park</h1>
      <time datetime="2024-01-15">Monday 15 January, 2024</time>

      <div class="current-weather">
        <div class="temp">
          <span class="value">{{ formatTemp(weather.temp) }}</span>
          ℃
          <sl-switch @sl-change="weather.temp_unit_C = !weather.temp_unit_C">℉</sl-switch>
        </div>

        <div class="others">
          <img :src="'/weather-icons/animated/' + weatherIconURL(weather.is_day, weather.weather_code)" alt="">
          <span>Precipitation: {{ weather.precipitation }}%</span>
          <span>Humidity: {{ weather.humidity }}%</span>
          <span>Wind: {{ weather.wind_speed }} km/h</span>
        </div>
      </div>

      <div class="daily-weather">
        <div v-for="(day, index) in weather.daily" :key="index" class="weather">
          <span class="day">{{ day.date.toLocaleDateString(undefined, { weekday: 'short' }) }}</span>
          <img :src="'/weather-icons/animated/' + weatherIconURL(true, day.weather_code)" alt="">
          <div class="temp">
            <span class="max">{{ formatTemp(day.temp_max) }}º</span>
            <span class="min">{{ formatTemp(day.temp_min) }}º</span>
          </div>
        </div>
      </div>
      <sl-button>Monthly Forecast</sl-button>
    </div>
  </main>
</template>

<style scoped>
.content {
  width: fit-content;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.content>* {
  flex: 1;
}

.blobs {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  will-change: transform;
  transform-origin: center center;
}

.blobs img {
  filter: var(--filter);
  position: absolute;
  top: 50%;
  left: 50%;
  height: 200vh;
  width: 200vh;
  object-fit: contain;
  z-index: -1;
  transform-origin: center center;
  animation: rotate 60s linear infinite;
}

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(calc(var(--order) * 90deg));
  }

  100% {
    transform: translate(-50%, -50%) rotate(1.5turn);
  }
}

.title {
  color: white;
  margin: 0;
  font-weight: lighter;
}

.current-weather {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.current-weather img,
.daily-weather img {
  width: 100%;
  height: 100%;
}

.temp {
  display: flex;
  flex-direction: row;
  align-items: start;
}

.temp .value {
  font-size: 2rem;
  line-height: 1em;
  height: fit-content;
}

.current-weather {
  padding: 2rem 0;
}

.current-weather .others {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0 1rem;
  letter-spacing: 1px;
}

.current-weather .others img {
  grid-column: 1;
  grid-row: 1 / span 3;
  object-fit: contain;
}

.daily-weather {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.daily-weather .weather {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.daily-weather .weather img {
  width: 3rem;
}

.daily-weather .temp {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.3rem;
}

.daily-weather .temp .min {
  opacity: 0.8;
  font-size: 0.8em;
}

sl-button {
  padding-top: 1rem;
  align-self: center;
}

sl-button::part(base) {
  border-radius: 0.5em;
  --sl-input-height-medium: 2.5em;
  width: fit-content;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  font-family: inherit;
  font-weight: bolder;
}
</style>
