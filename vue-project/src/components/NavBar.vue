<script setup>
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';
import { RouterLink } from 'vue-router';
</script>

<template>
    <nav>
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/weather">Weather</RouterLink>
        <RouterLink to="/family-friendly-trails">Family-friendly Trails</RouterLink>
        <RouterLink to="/easy-trails">Easy Trails</RouterLink>
        <RouterLink to="/moderate-trails">Moderate Trails</RouterLink>
        <RouterLink to="/expert-trails">Expert Trails</RouterLink>
        <RouterLink to="/gallery">Gallery</RouterLink>
        <RouterLink to="/about-us">About Us</RouterLink>
    </nav>
</template>

<style scoped>
nav {
    position: fixed;
    bottom: 0;
    width: 100dvw;
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 4rem;
    font-weight: lighter;
}

nav a {
    text-decoration: none;
    color: black;
    position: relative;
    text-transform: uppercase;
}

nav a.router-link-exact-active::after {
    --dot-size: 6px;
    content: '';
    position: absolute;
    bottom: calc(-1 * (var(--dot-size) + 6px));
    left: 50%;
    transform: translate(-50%, -50%);
    width: var(--dot-size);
    height: var(--dot-size);
    background-color: black;
    border-radius: calc(var(--dot-size) / 2);
}
</style>
