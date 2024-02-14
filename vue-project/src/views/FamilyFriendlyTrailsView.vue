<script setup>
import '@shoelace-style/shoelace/dist/components/carousel/carousel.js';
import '@shoelace-style/shoelace/dist/components/carousel-item/carousel-item.js';

import TrailCard from '@/components/TrailCard.vue';

import { ref } from 'vue';

const trails = ref([
    {
        openDetails: false,
        name: 'Arch Rock',
        level: 'Family-Friendly',
        length: '1.9km',
        elevation: '27m',
        amenities: [
            'Wheelchair friendly',
            'Stroller friendly',
            'Children friendly'
        ],
        notes: [
            'No shade',
            'Fee to enter park',
            'No dogs'
        ],
        time: '26 minutes',
        descriptions: ['Experience this 1.9-km out-and-back trail, perfect for families. The trail is considered easy, with an average completion time of 26 minutes. This popular route is wheelchair, stroller, and children-friendly. Please note there is no shade, and there is a park entrance fee. It\'s a beautiful year- round trail, but unfortunately, dogs are not allowed.Be prepared to encounter other enthusiasts while enjoying this scenic hike.']
    },
    {
        openDetails: false,
        name: 'Cholla Cactus Garden',
        level: 'Family-Friendly',
        length: '0.3km',
        elevation: '3m',
        amenities: [
            'Wheelchair friendly',
            'Stroller friendly',
            'Children friendly',
            'Partially paved'
        ],
        notes: [
            'All-terrain tires or motorised equipment is recommended due to the unpaved surfaces and unevenness',
            'Exercise caution around the cholla cacti to avoid attaching segments',
            'Stay on the designated trail and wear closed-toed shoes',
            'Fee to enter park',
            'No dogs'
        ],
        time: '4 minutes',
        descriptions: [
            'Embark on the Cholla Cactus Garden Trail, a charming out-and-back route suitable for families and individuals of all ability levels. As a favoured spot for birding, hiking, and walking, expect to share the trail with fellow nature enthusiasts. Exercise caution around the "jumping" cholla, and keep to the designated path, wearing closed-toed shoes for added safety.',
            'This well-liked trail remains accessible year-round, offering scenic beauty despite the absence of specified shade. Please be aware that dogs are not permitted on this trail. Conveniently situated along the Pinto Basin Road, the trailhead features a small paved parking lot, including one designated accessible space.'
        ]
    },
    {
        openDetails: false,
        name: 'Keys View',
        level: 'Family-Friendly',
        length: '0.2km',
        elevation: '4m',
        amenities: [
            'Wheelchair friendly',
            'Stroller friendly',
            'Children friendly',
            'Paved'
        ],
        notes: [
            'No shade',
            'Fee to enter park',
            'No dogs'
        ],
        time: '2 minutes',
        descriptions: [
            'Experience stunning vistas of the San Andreas Fault, Mount San Jacinto, Mount San Gorgonio, and the Salton Sea on this scenic trail. Interpretive signs provide insights along the way. The year-round hike is cautioned for potential winter chill and summer heat. Bring water and download the map in advance due to unreliable cell service. Two accessible spaces are available in the paved parking lot, offering a smooth, wheelchair-friendly trail with gentle grades.'
        ]
    },
    {
        openDetails: false,
        name: 'Oasis of Mara',
        level: 'Family-Friendly',
        length: '0.8km',
        elevation: '4m',
        amenities: [
            'Wheelchair friendly',
            'Stroller friendly',
            'Children friendly',
            'Paved',
            'Dogs on leash'
        ],
        notes: [
            'Dogs are welcome, but must be on a leash',
            'Fee to enter park'
        ],
        time: '9 minutes',
        descriptions: [
            'Explore the Oasis of Mara on this loop trail, featuring interpretative signs highlighting its wildlife and historical significance. Recommended year-round, bring water, snacks, and sun protection. Two accessible spaces are available in the paved parking lot off Utah Trail. The smooth, 4-foot-wide concrete trail is gentle, suitable for wheelchairs and strollers, with benches for resting. The visitor centre is wheelchair-accessible, as confirmed by the park website.'
        ]
    },
    {
        openDetails: false,
        name: 'Jumbo Rocks Campground',
        level: 'Family-Friendly',
        length: '2.6km',
        elevation: '27m',
        amenities: [
            'Wheelchair friendly',
            'Stroller friendly',
            'Children friendly',
            'Paved',
            'Dogs on leash'
        ],
        notes: [
            'Dogs are welcome but not allowed off of the developed road into the boulders',
            'Be cautious of vehicles since this walk is entirely on the campground road',
            'Fee to enter'
        ],
        time: '33 minutes',
        descriptions: [
            'Embark on a scenic loop through Jumbo Rocks Campground on this accessible trail, perfect for those using wheelchairs, mobility equipment, or strollers. If you\'re camping at the Jumbo Rocks Campground, this loop offers a fun exploration opportunity.Additionally, feel free to take optional side adventures to scramble on nearby boulders, enhancing your outdoor experience.'
        ]
    }
]);

const trailGroup = ref(null);

function openDetails(index) {
    this.trails.map((trail) => {
        trail.openDetails = false;
    });

    this.trails[index].openDetails = true;
}

</script>

<template>
    <main id="family-friendly-trails">
        <div class="content">
            <h1>Family-Friendly Trails</h1>
            <div class="group">
                <TrailCard ref="trailGroup" v-for="(trail, index) in trails" :key="index" :trail="trail"
                    @open="openDetails(index)" />
            </div>
        </div>
    </main>
</template>

<style scoped>
.content {
    height: calc(100% - 4rem);
    /* 4rem is navbar height */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.group {
    flex: 1;
    height: 50%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}
</style>
