<script setup>
import '@shoelace-style/shoelace/dist/components/details/details.js';

import { ref, watch } from 'vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    trail: {
        type: Object,
        // {
        //     openDetails: Boolean,
        //     name: String,
        //     level: String,
        //     length: String,
        //     elevation: String,
        //     amenities: Array,
        //     notes: Array,
        //     time: String,
        //     descriptions: Array
        // },
        required: true
    }
});

watch(props.trail, async (newValue, oldValue) => {
    if (newValue.openDetails == true) {
        details.value.setAttribute('open', true);
    } else {
        details.value.removeAttribute('open');
    }
});

const details = ref(null);

const emit = defineEmits(['closeDetails', 'open']);

function closeDetails() {
    details.value.removeAttribute('open');
}

emit('closeDetails', closeDetails);

function isUrl(description) {
    let url;

    try {
        url = new URL(description);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}
</script>

<template>
    <sl-details ref="details" @sl-show="$emit('open')">
        <img slot="summary" :alt="trail.name" :src="`/images/${trail.name}.png`" />

        <!-- Empty icons -->
        <div slot="expand-icon"></div>
        <div slot="collapse-icon"></div>

        <img class="close-btn" @click="closeDetails" src="https://img.icons8.com/sf-regular/48/1A1A1A/delete-sign.png"
            alt="delete-sign" />

        <h2 class="name">{{ trail.name }}</h2>

        <div class="info">
            <h3>Trail Information:</h3>
            <ul>
                <li class="level">Level: {{ trail.level }}</li>
                <li class="length">Length: {{ trail.length }}</li>
                <li class="elevation">Elevation {{ trail.elevation }}</li>
            </ul>
        </div>

        <div class="amenities">
            <h3>Amenities:</h3>
            <ul v-for="(amenity, index) in trail.amenities" :key="index">
                <li>{{ amenity }}</li>
            </ul>
        </div>

        <div class="notes">
            <h3>Important Notes:</h3>
            <ul v-for="(note, index) in trail.notes" :key="index">
                <li>{{ note }}</li>
            </ul>
        </div>

        <div class="time-to-complete">
            <h3>Average Time to Complete:</h3>
            <ul>
                <li class="time">{{ trail.time }}</li>
            </ul>
        </div>

        <div class="description">
            <h3>Description:</h3>
            <template v-for="(description, index) in trail.descriptions" :key="index">
                <a v-if="isUrl(description)" :href="description">{{ description }}</a>
                <p v-else>{{ description }}</p>
            </template>
        </div>
    </sl-details>
</template>

<style scoped>
sl-details {
    height: 80%;
    width: 100px;
    padding-right: 0;
    box-sizing: content-box;
    transition: height 0.3s 0.3s, width 0.3s, padding 0.3s;
    /* transition when closing */
    overflow: hidden;
}

sl-details::part(base) {
    position: relative;
    height: 100%;
    width: 100%;
    border: none;
}

sl-details::part(header),
sl-details::part(summary) {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0;
}

sl-details img[slot="summary"] {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    cursor: pointer;
}


sl-details::part(content) {
    position: absolute;
    top: 0;
    left: 100%;
    /* Make content expand to the right */
    width: 30rem;
    padding: 1rem;
    height: 100%;
    background-color: #b39685;
    box-sizing: border-box;
    scrollbar-width: thin;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 1rem;
    line-height: 1.5em;
    transition: all 0.2s 0.2s allow-discrete;
    overflow-y: auto;
    overflow-x: hidden;
}


sl-details[open] {
    height: 100%;
    width: 40%;
    padding-right: 30rem;
    transition: height 0.3s, width 0.3s, padding 0.3s 0.3s;
    /* transition when opening */
}

.close-btn {
    align-self: flex-end;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
    object-fit: contain;
}

h2,
h3 {
    margin: 0;
    text-transform: uppercase;
}

h2 {
    letter-spacing: 10px;
    margin-bottom: 0.5rem;
}

h3 {
    letter-spacing: 2px;
}

.info {
    display: flex;
    flex-direction: column;
}

.description p {
    margin: 0;
}
</style>