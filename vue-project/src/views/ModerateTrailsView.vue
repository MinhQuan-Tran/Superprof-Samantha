<script setup>
import '@shoelace-style/shoelace/dist/components/carousel/carousel.js';
import '@shoelace-style/shoelace/dist/components/carousel-item/carousel-item.js';

import TrailCard from '@/components/TrailCard.vue';

import { ref } from 'vue';

const trails = ref([
    {
        openDetails: false,
        name: 'Ryan  Mountain',
        level: 'Moderate',
        length: '4.7km',
        elevation: '324m',
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
        time: '2 hours',
        descriptions: [
            'Discover the allure of Ryan Mountain, a Joshua Tree gem! Renowned for awe-inspiring rock formations and breathtaking panoramic views, this hike is a must-visit, especially for a memorable sunset experience.',
            'The climb to the summit involves a considerable elevation gain, so pack plentiful water, salty snacks, and sun protection. Given the intense summer heat, it\'s advisable to avoid this trail between May and October for a more enjoyable hiking experience.'
        ]
    },
    {
        openDetails: false,
        name: 'Fortynine Palms Oasis',
        level: 'Moderate',
        length: '5km',
        elevation: '194m',
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
        time: '1 hour 33 minutes',
        descriptions: [
            'Discover diverse landscapes, from rocky ridges to sandy washes, on this hike with stunning views. Explore a canyon leading to a fan palm oasis, navigating steep sections. Look out for barrel cactus atop ridges.',
            'Accessed off Twentynine Palms Highway, follow a small dirt road to the trailhead. The oasis, crucial for wildlife, is closed for protection. Limited shade and unreliable cell service characterise the trail. Avoid hiking between May-October or in hot weather. Carry water, snacks, and sun protection. Download a map beforehand and check the weather for a rewarding adventure!'
        ]
    },
    {
        openDetails: false,
        name: 'Willow Hole',
        level: 'Moderate',
        length: '10.9km',
        elevation: '74m',
        amenities: [
            'Toilet at the trailhead',
        ],
        notes: [
            'No shade',
            'Fee to enter',
            'No dogs'
        ],
        time: '2 hours 11 minutes',
        descriptions: [
            'Embark on a trail along the Wonderland of Rocks, venturing through Joshua tree forests, captivating boulders, rock formations, and sandy washes. The journey concludes at Willow Hole, a marshy area surrounded by willow trees.',
            'With limited shade and unreliable cell service, it\'s advisable to avoid hiking this trail between May - October or in hot weather.Ensure you carry ample water, snacks, and sun protection, even in winter.Download a map in advance and stay informed about the weather for a safe and enjoyable experience.'
        ]
    },
    {
        openDetails: false,
        name: 'Warren Peak',
        level: 'Moderate',
        length: '9km',
        elevation: '337m',
        amenities: [
            'Toilet at the trailhead'
        ],
        notes: [
            'Horseback riding',
            'No shade',
            'Fee to enter',
            'No dogs'
        ],
        time: '2 hours 46 minutes',
        descriptions: [
            'Ascend to the summit of Warren Peak via the Black Rock Canyon Trail, commencing at the Black Rock Canyon backcountry board and trailhead. Experience panoramic views of the serene western part of Joshua Tree National Park.',
            'Given limited shade and unreliable cell service, it\'s not recommended to hike this trail between May - October or in hot weather. Ensure you carry ample water, snacks, and sun protection, even in winter. Download a map beforehand and check the weather for a safe and enjoyable hike.'
        ]
    },
    {
        openDetails: false,
        name: 'Lost Horse Mine',
        level: 'Moderate',
        length: '6.6km',
        elevation: '161m',
        amenities: [
            'Toilet at the trailhead'
        ],
        notes: [
            'Rocky terrain',
            'Hiking footwear advised',
            'Historic site',
            'No shade',
            'Fee to enter',
            'No dogs'
        ],
        time: '1 hour 43 minutes',
        descriptions: [
            'Follow the old mine wagon road to explore the renowned Lost Horse Mine, one of the park\'s most successful gold mines. The trailhead is at the end of Lost Horse Mine Road off Keys View Road. The mostly flat trail with rocky sections offers a rewarding view of the Pinto Basin. Please respect the historic site by staying outside the fenced area.',
            'Optimal for winter hikes, exercise caution during summer due to desert heat. Begin early (before 9 AM), and equip yourself with ample water, salty snacks, and sun protection. Download a map in advance due to no reliable cell service in the park.'
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
    <main id="moderate-trails">
        <div class="content">
            <h1>Moderate Trails</h1>
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
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}
</style>
