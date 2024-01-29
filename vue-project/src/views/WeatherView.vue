<script setup>
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted, reactive } from 'vue';

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

function weatherIconURL(is_day, weather_code) {
  if (is_day) {
    switch (weather_code) {
      case 0:
        return '3D Ico_33.svg';
      case 1:
        return '3D Ico_04.svg';
      case 2:
        return '3D Ico_04.svg';
      case 3:
        return '3D Ico_01.svg';
    }
  }

  return null;
};

function formatTemp(temp_C) {
  const temp = weather.temp_unit_C ? temp_C : ((temp_C * 9 / 5) + 32);
  return Math.round(temp);
}

onMounted(() => {
  gsap.to('.background', {
    scrollTrigger: {
      trigger: '.background',
      scrub: 1,
      start: 'top top',
      end: 'bottom bottom',
    },
    rotation: 360,
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(() => {
      fetch(`https://api.open-meteo.com/v1/forecast?` +
        `latitude=33.873415&` +
        `longitude=-115.9009923&` +
        `current=temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m,weather_code,is_day&` +
        `daily=weather_code,temperature_2m_max,temperature_2m_min&` +
        `timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`).then((response) => {
          return response.json();
        }).then((data) => {
          console.log(data);

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

  } else {
    console.log("Geolocation is not supported by this browser.");
  }

});
</script>

<template>
  <main>
    <div class="content">
      <div class="background">
        <img style="--order: 1" src="@/assets/blob.svg" alt="blob">
        <img style="--order: 2" src="@/assets/blob.svg" alt="blob">
        <img style="--order: 3" src="@/assets/blob.svg" alt="blob">
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
          <img :src="'/Weather Icons/' + weatherIconURL(weather.is_day, weather.weather_code)" alt="">
          <span>Precipitation: {{ weather.precipitation }}%</span>
          <span>Humidity: {{ weather.humidity }}%</span>
          <span>Wind: {{ weather.wind_speed }} km/h</span>
        </div>
      </div>

      <div class="daily-weather">
        <div v-for="(day, index) in weather.daily" :key="index" class="weather">
          <span class="day">{{ day.date.toLocaleDateString(undefined, { weekday: 'short' }) }}</span>
          <img :src="'/Weather Icons/' + weatherIconURL(true, day.weather_code)" alt="">
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
main {
  position: relative;
}

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

.background {
  z-index: -1;
}

.background img {
  filter: sepia(calc(100% / var(--order)));
  position: absolute;
  top: 0;
  left: 0;
  object-fit: contain;
  z-index: -1;
  transform-origin: center center;
  animation: rotate calc(60s * var(--order)) linear infinite;
}

@keyframes rotate {
  0% {
    transform: scale(3.5) rotate(calc(var(--order) * 90deg));
  }

  100% {
    transform: scale(3.5) rotate(calc(1turn * var(--order)));
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
