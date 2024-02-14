<script setup>
import '@shoelace-style/shoelace/dist/components/carousel/carousel.js';
import '@shoelace-style/shoelace/dist/components/carousel-item/carousel-item.js';

import TrailCard from '@/components/TrailCard.vue';

import { ref } from 'vue';

const trails = ref([
    {
        openDetails: false,
        name: 'Rattlesnake Canyon',
        level: 'Expert',
        length: '4.2km',
        elevation: '120m',
        amenities: [
            'Toilet at the trailhead'
        ],
        notes: [
            'Off trail',
            'Rocky',
            'No shade',
            'Scramble',
            'Fee to enter',
            'No dogs'
        ],
        time: '1 hour 32 minutes',
        descriptions: [
            'Warning: Rattlesnake Canyon in Joshua Tree National Park is a technical route, potentially requiring rock climbing gear (Class 3 & Class 4 scrambling). This unmarked and unauthorised trail involves off-trail rock scrambling and wilderness exploration, posing risks. Exercise extreme caution, especially as the route is choose-your-own-adventure style.',
            'With limited shade and unreliable cell service, avoid hiking between May - October or in hot weather. Carry ample water, snacks, and sun protection, even in winter. Download offline maps and check the weather forecast before embarking on this challenging, off-trail hike.'
        ]
    },
    {
        openDetails: false,
        name: 'Old Dale Road 1',
        level: 'Expert',
        length: '42.3km',
        elevation: '655m',
        amenities: [
            'Toilet at the trailhead'
        ],
        notes: [
            'Rocky terrain',
            'Hiking footwear advised',
            'No shade',
            'Fee to enter',
            'No dogs'
        ],
        time: '12 hours 5 minutes',
        descriptions: [
            'Commencing from the same point as Black Eagle Mine Road, this route spans the initial 11 miles (17.8 km) across Pinto Basin—a flat, sandy, dry-lake bed. Following this, the road ascends a steep hill and traverses the park boundary. Numerous side roads branch off towards old mines and residences. The main road eventually connects to HWY 62, situated 15 miles (24.3 km) east of Twentynine Palms.'
        ]
    },
    {
        openDetails: false,
        name: 'California RIding and Hiking Trail',
        level: 'Expert',
        length: '58.7km',
        elevation: '947m',
        amenities: [
            'Toilets can be accessed at nearby campgrounds',
        ],
        notes: [
            'Point to point',
            'Horseback riding',
            'Camping',
            'Rocky terrain',
            'Hiking footwear advised',
            'No shade',
            'Fee to enter',
            'No dogs'
        ],
        time: '14 hours 13 minutes',
        descriptions: [
            'The California Riding and Hiking Trail (CRHT) offers a multi-day backpacking or horseback experience from Black Rock Canyon to the North Entrance of Joshua Tree National Park, showcasing Mojave desert scenery. Recommended for February-April for desert blooms. Water is not available on the trail, but caching is permitted for up to 14 days. Limited shade and unreliable cell service. Avoid May-October or hot weather. Obtain a permit for all overnight stays within designated zones. Plan water caches ahead and follow guidelines for permits:',
            'https://www.nps.gov/jotr/planyourvisit/backpacking.htm'
        ]
    },
    {
        openDetails: false,
        name: 'The Wonderland Connection',
        level: 'Expert',
        length: '8.9km',
        elevation: '48m',
        amenities: [
            'Toilet at the trailhead of Willow Hole'
        ],
        notes: [
            'Off trail',
            'Rocky terrain',
            'Scramble',
            'Hiking footwear advised',
            'No shade',
            'Fee to enter',
            'No dogs'
        ],
        time: '7 hours 13 minutes',
        descriptions: [
            'Embark on a challenging and visually stunning hike through the Wonderland of Rocks, starting from the Boy Scout Trail to Willow Hole, transitioning to an off-trail route through Rattlesnake Canyon. Expect boulder scrambling, mazes, crevices, and steep drop-offs. Proficient off-trail navigation and rock scrambling skills are crucial. Travel with a buddy, and inform a friend of your itinerary.',
            'Note: Overnight parking is not allowed at the Wonderland of Rocks area. For backpacking, explore the recommended route:',
            'https://www.alltrails.com/explore/trail/us/california/boy-scout-trail--8'
        ]
    },
    {
        openDetails: false,
        name: 'Pinkham Canyon Road',
        level: 'Expert',
        length: '30.9km',
        elevation: '92m',
        amenities: [
            'Toilet at the trailhead'
        ],
        notes: [
            'Rocky terrain',
            'Hiking footwear advised',
            'No shade',
            'Fee to enter',
            'Dogs on leash'
        ],
        time: '6 hours 27 minutes',
        descriptions: [
            'Embark on a challenging route from Cottonwood Visitor Center, requiring a 4WD and high-clearance vehicle. You can hike or bike parts of the route with your dog. Explore Smoke Tree Wash and Pinkham Canyon for an exciting journey.',
            'Carry emergency supplies, and be prepared for soft sand and rocky flood plains. Street-legal vehicles only; OHVs not allowed. Preserve the desert ecosystem by staying on established roads. Avoid summer hikes; pack extra water, salty snacks, and inform a friend of your plans for safety. Dogs are welcome, but must be on a leash.'
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
    <main id="expert-trails">
        <div class="content">
            <h1>Expert Trails</h1>
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
