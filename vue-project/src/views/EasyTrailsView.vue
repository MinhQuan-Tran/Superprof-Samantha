<script setup>
import '@shoelace-style/shoelace/dist/components/carousel/carousel.js';
import '@shoelace-style/shoelace/dist/components/carousel-item/carousel-item.js';

import TrailCard from '@/components/TrailCard.vue';

import { ref } from 'vue';

const trails = ref([
    {
        openDetails: false,
        name: 'Skull Rock',
        level: 'Easy',
        length: '2.7km',
        elevation: '45m',
        amenities: [
            'Children friendly'
        ],
        notes: [
            'This popular trail can be busy',
            'No shade',
            'Fee to enter',
            'No dogs'
        ],
        time: '2 hours',
        descriptions: [
            'Discover more than just a roadside view at Skull Rock. This nature trail loop guides you through boulder piles, desert washes and the iconic Skull Rock itself. Note that the trail includes a few steep, narrow sections. Access it across from the Jumbo Rocks Campground entrance or within the campground near the amphitheatre.',
            'The distinct hollowed-out eye sockets on the giant granite boulder, Skull Rock, were shaped by water erosion over time. Hike this trail year-round, with a suggestion to start before 9 AM in the summer for a cooler experience.'
        ]
    },
    {
        openDetails: false,
        name: 'Split Rock',
        level: 'Easy',
        length: '3.9km',
        elevation: '84m',
        amenities: [
            'Children friendly'
        ],
        notes: [
            'Rocky terrain',
            'Hiking footwear advised',
            'No shade',
            'Fee to enter',
            'No dogs'
        ],
        time: '58 minutes',
        descriptions: [
            'This loop offers a blend of rock formations, wildlife, and stunning desert landscapes, making it a comprehensive hiking experience. Choose your direction but don\'t miss the side trip to Face Rock and Split Rock.',
            'Optimal for winter hikes, exercise caution during summer due to desert heat. Begin early (before 9 AM), pack sufficient water, salty snacks, and sun protection. Download the map in advance as there is no reliable cell service in the park. Immerse yourself in the diverse beauty of this trail.'
        ]
    },
    {
        openDetails: false,
        name: 'Barker Dam',
        level: 'Easy',
        length: '2.1km',
        elevation: '18m',
        amenities: [
            'Children friendly',
            'Historic site',
            'Toilet at the trailhead'
        ],
        notes: [
            'Rocky terrain',
            'Hiking footwear advised',
            'No shade',
            'Fee to enter',
            'No dogs'
        ],
        time: '26 minutes',
        descriptions: [
            'Explore this family-friendly hike, mostly flat with rocky and sandy sections, leading to Barker Dam, a rock art site, and iconic boulders. Wear appropriate footwear for optional rock scrambling. Enjoy Joshua trees, creosote bushes, and granite rock formations where climbers may be spotted.',
            'While the dam is usually dry, rains can bring wildlife like bighorn sheep. Interpretive signs share the dam\'s history, and a rock art site offers a glimpse into the desert\'s past—view respectfully.'
        ]
    },
    {
        openDetails: false,
        name: 'Hidden Valley',
        level: 'Easy',
        length: '1.6km',
        elevation: '36m',
        amenities: [
            'Children friendly',
            'Historic site',
            'Toilet at the trailhead'
        ],
        notes: [
            'No shade',
            'Fee to enter',
            'No dogs'
        ],
        time: '24 minutes',
        descriptions: [
            'Experience the essence of Joshua Tree National Park on the Hidden Valley nature trail loop, situated in the heart of the park just off Park Boulevard. If you have time for just one short hike, Hidden Valley is a stellar choice. Enclosed by the iconic golden rock formations, this rock valley was reputedly used by 19th-century cattle rustlers as a hidden shelter for their herds.',
            'The nature trail features interpretive panels, offering insights into the area\'s rich biodiversity, cultural history, and geology.As you explore, keep an eye out for rock climbers on technical routes adjacent to the trail, adding an adventurous touch to your nature immersion.'
        ]
    },
    {
        openDetails: false,
        name: 'Hall of Horrors',
        level: 'Easy',
        length: '1km',
        elevation: '8m',
        amenities: [
            'Children friendly',
            'Historic site',
            'Toilet at the trailhead'
        ],
        notes: [
            'Rocky terrain',
            'Scramble',
            'Hiking footwear advised',
            'Fee to enter',
            'No dogs'
        ],
        time: '18 minutes',
        descriptions: [
            'Explore the Hall of Horrors, named for its intriguing rock formations, on this popular route between Ryan Campground and Sheep Pass Group Campground. The mapped hike takes you through main rock clusters with opportunities for scrambling and side explorations. Great for family outings, this area offers scenic views surrounded by mountains. Stick to existing paths to minimise ecological impact.',
            'While the Hall of Horrors is known for technical rock climbing, this route itself is non-technical. Exercise caution around climbers, giving them space for safe ascents. Immerse yourself in the geological wonders of the Hall of Horrors.'
        ]
    },
    {
        name: 'Mastodon Peak',
        level: 'Easy',
        length: '3.9km',
        elevation: '124m',
        amenities: [
            'Children friendly',
        ],
        notes: [
            'Rocky terrain',
            'Scramble',
            'Hiking footwear advised',
            'Fee to enter',
            'No dogs'
        ],
        time: '59 minutes',
        descriptions: [
            'Embark on this loop leading to the base of Mastodon Peak summit. For the craggy granite peak\'s summit, a brief scramble is required.Post - summit, the route passes an old gold mine, showcasing a variety of desert plants.On clear days, catch glimpses of the Salton Sea!',
            'Best explored in winter, exercise caution during summer due to desert heat. Start early (before 9 AM), and equip yourself with ample water, salty snacks, and sun protection. Download the map in advance, considering the absence of reliable cell service in the park. Immerse yourself in the unique beauty of this trail.'
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
    <main id="easy-trails">
        <div class="content">
            <h1>Easy Trails</h1>
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
