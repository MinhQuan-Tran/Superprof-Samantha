<script setup>
</script>

<template>
  <main>
    <img class="landing-img" src="/landing-page.png" alt="" />
    <RouterLink class="explore-btn" to="/weather">
      <span class="the-arrow -left">
        <span class="shaft"></span>
      </span>
      <span class="main">
        <span class="text"> Explore More </span>
        <span class="the-arrow -right">
          <span class="shaft"></span>
        </span>
      </span>
    </RouterLink>
  </main>
</template>

<style scoped>
main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
}

.landing-img {
  width: 300px;
}

.explore-btn {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  height: 2em;
  cursor: pointer;
  color: black;
  text-decoration: none;
}

.explore-btn .main {
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 0.2s;
}

.explore-btn .the-arrow {
  position: relative;
  width: 1px;
  transition: all 0.2s;
}

.explore-btn .the-arrow.-left>.shaft {
  background-color: #4c4c4c;
  display: block;
  width: 0;
  height: 1px;
  transition: all 0.2s;
}

.explore-btn .the-arrow.-left>.shaft:before,
.explore-btn .the-arrow.-left>.shaft:after {
  content: '';
  position: absolute;
  width: 0;
  background: #4c4c4c;
  transition: all 0.5s;
  transform: rotate(0deg);
}

.explore-btn .the-arrow.-right>.shaft {
  background-color: #4c4c4c;
  display: block;
  width: 1px;
  position: relative;
  transition: all 0.2s;
}

.explore-btn .the-arrow.-right>.shaft:before,
.explore-btn .the-arrow.-right>.shaft:after {
  content: '';
  position: absolute;
  display: block;
  top: 0;
  right: -8px;
  width: var(--arrow-width);
  height: 1px;
  background: #4c4c4c;
  transition: all 0.5s;
}

.explore-btn .the-arrow.-right>.shaft:before {
  transform: rotate(40deg);
  transform-origin: top right;
}

.explore-btn .the-arrow.-right>.shaft:after {
  transform: rotate(-40deg);
  transform-origin: bottom right;
}

.explore-btn:hover .the-arrow.-left {
  /* 6px is the space between the arrow and the text */
  width: calc(var(--left-shaft-width) + 6px);
}

.explore-btn:hover .the-arrow.-left>.shaft {
  width: var(--left-shaft-width);
  transition-delay: 0.1s;
}

.explore-btn:hover .the-arrow.-left>.shaft:before,
.explore-btn:hover .the-arrow.-left>.shaft:after {
  width: var(--arrow-width);
  height: 1px;
  transition-delay: 0.1s;
}

.explore-btn:hover .the-arrow.-left>.shaft:before {
  left: 56px;
  transform: rotate(40deg);
  transform-origin: top right;
}

.explore-btn:hover .the-arrow.-left>.shaft:after {
  left: 56px;
  transform: rotate(-40deg);
  transform-origin: bottom right;
}

.explore-btn:hover .the-arrow.-right>.shaft {
  width: 0;
  transform: translateX(200%);
}

.explore-btn:hover .the-arrow.-right>.shaft:before,
.explore-btn:hover .the-arrow.-right>.shaft:after {
  width: 0;
  transform: rotate(0);
}
</style>
