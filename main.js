gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = gsap.utils.toArray("section");

const scrollTween = gsap.to(sections, {
  scrollTrigger: {
    trigger: "#app",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector("#app").offsetWidth
  },
  xPercent: -100 * (sections.length - 1),
  ease: "none"
});

// https://gsap.com/community/forums/topic/31802-help-with-jumping-to-section-using-scrolltoplugin-in-fake-horizontal-scrolling-layout/?do=findComment&comment=159032
/*
Returns a FUNCTION that you can feed an element to get its scroll position.
- targets: selector text, element, or Array of elements 
- containerAnimation: the horizontal scrolling tween/timeline. Must have an ease of "none"/"linear".
- position: defaults to "left left" but can be anything like "center center", "100px 80%", etc. Same format as "start" and "end" ScrollTrigger values.
*/
function getScrollLookup(targets, containerAnimation, position) {
  let triggers = gsap.utils.toArray(targets).map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: position || "left left",
        containerAnimation: containerAnimation
      })
    ),
    st = containerAnimation.scrollTrigger;
  return (target) => {
    let t = gsap.utils.toArray(target)[0],
      i = triggers.length;
    while (i-- && triggers[i].trigger !== t) {}
    return i >= 0
      ? st.start +
          (triggers[i].start / containerAnimation.duration()) *
            (st.end - st.start)
      : console.warn("target not found", target);
  };
}

const getPosition = getScrollLookup("section", scrollTween, "center center");

gsap.utils.toArray("a[href^='#']").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();

    gsap.to(window, {
      scrollTo:
        getPosition(e.target.getAttribute("href")) +
        (window.scrollY > getPosition(e.target.getAttribute("href")) ? 1 : -1) *
          20,
      // Set the offset to 20px to prevent the scroll from being too close to the center of the section
      // This is to prevent the scroll from going to the next section if the scrolling is too fast
      overwrite: "auto",
      duration: 1
    });
  });
});

// Home
const divA = document.querySelector("#home .title");
const divB = document.querySelector("#home .joshua-tree");
const connector = document.querySelector("#home #connector");

// Draw the connector between the title and the Joshua Tree text
// https://stackoverflow.com/a/36995443
function drawConnector() {
  var posnA = {
    x: divA.offsetLeft + divA.offsetWidth,
    y: divA.offsetTop + divA.offsetHeight / 2
  };
  var posnB = {
    x: divB.offsetLeft,
    y: divB.offsetTop + divA.offsetHeight / 2
  };
  var dStr =
    "M" +
    posnA.x +
    "," +
    posnA.y +
    " " +
    "C" +
    (posnA.x + 200) +
    "," +
    posnA.y +
    " " +
    (posnB.x - 350) +
    "," +
    posnB.y +
    " " +
    posnB.x +
    "," +
    posnB.y;
  connector.setAttribute("d", dStr);
}

window.addEventListener("resize", drawConnector);

drawConnector();

// Weather
gsap.set("#weather .blobs", {
  rotation: 0,
  xPercent: -50,
  yPercent: -50
});
gsap.to("#weather .blobs", {
  scrollTrigger: {
    trigger: "#weather .blobs",
    scrub: 1,
    containerAnimation: scrollTween,
    start: "center 200%",
    end: "center -100%"
    // markers: true,
  },
  rotation: 360
});

const weather = {
  temp_C: 0,
  precipitation: 0,
  humidity: 0,
  wind_speed: 0,
  weather_code: 0,
  is_day: 0,
  daily: []
};

let temp_unit = "C";

fetch(
  `https://api.open-meteo.com/v1/forecast?` +
    `latitude=33.873415&` +
    `longitude=-115.9009923&` +
    `current=temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m,weather_code,is_day&` +
    `daily=weather_code,temperature_2m_max,temperature_2m_min&` +
    `timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    weather.temp_C = data.current.temperature_2m;
    weather.precipitation = data.current.precipitation;
    weather.humidity = data.current.relative_humidity_2m;
    weather.wind_speed = data.current.wind_speed_10m;
    weather.weather_code = data.current.weather_code;
    weather.is_day = data.current.is_day;

    for (let i = 0; i < data.daily.time.length; i++) {
      const day = {
        date: new Date(data.daily.time[i]),
        weather_code: data.daily.weather_code[i],
        temp_C_max: data.daily.temperature_2m_max[i],
        temp_C_min: data.daily.temperature_2m_min[i]
      };

      weather.daily.push(day);
    }

    updateWeather();
    updateWeatherDaily();
  });

document
  .querySelector("#weather #temp-toggle")
  .addEventListener("sl-change", () => {
    temp_unit = document.querySelector("#weather #temp-toggle").checked
      ? "F"
      : "C";
    updateWeather();
    updateWeatherDaily();
  });

function formatTemp(temp_C, unit = "C") {
  return Math.round(unit === "C" ? temp_C : (temp_C * 9) / 5 + 32);
}

function updateWeather() {
  document.querySelector("#weather #temp-value").textContent = formatTemp(
    weather.temp_C,
    temp_unit
  );
  document.querySelector("#weather #precipitation-value").textContent =
    weather.precipitation;
  document.querySelector("#weather #humidity-value").textContent =
    weather.humidity;
  document.querySelector("#weather #wind-speed-value").textContent =
    weather.wind_speed;
  document
    .querySelector("#weather #weather-icon")
    .setAttribute(
      "src",
      "/images/weather-icons/animated/" +
        weatherIconURL(weather.is_day, weather.weather_code)
    );
}

function updateWeatherDaily() {
  document.querySelector("#weather #daily-weather").innerHTML = "";

  for (let i = 0; i < weather.daily.length; i++) {
    const day = weather.daily[i];
    const dayElement = document.createElement("sl-tooltip");
    dayElement.setAttribute(
      "content",
      `Avg Temp: ${formatTemp(
        (day.temp_C_max + day.temp_C_min) / 2,
        temp_unit
      )}º${temp_unit}`
    );
    dayElement.classList.add("day");
    dayElement.innerHTML = `
            <div class="date">${day.date.toLocaleDateString(undefined, {
              weekday: "short"
            })}</div>
            <img class="weather-icon" src="/images/weather-icons/animated/${weatherIconURL(
              true,
              day.weather_code
            )}" alt="Weather icon">
            <div class="temp">
              <span class="max" id="daily-temp-max">
                ${formatTemp(day.temp_C_max, temp_unit)}º
              </span>
              <span class="min" id="daily-temp-min">
                ${formatTemp(day.temp_C_min, temp_unit)}º
              </span>
            </div>
        `;

    document.querySelector("#weather #daily-weather").appendChild(dayElement);
  }
}

function weatherIconURL(is_day, weather_code) {
  if (is_day) {
    switch (weather_code) {
      case 0: // Clear sky
        return "clear-day.svg";
      case 1: // Mainly clear
        return "cloudy-1-day.svg";
      case 2: // Partly cloudy
        return "cloudy-2-day.svg";
      case 3: // Overcast
        return "cloudy-3-day.svg";
      case 45: // Fog
      case 48:
        return "fog-day.svg";
      case 51: // Drizzle
      case 53:
      case 55:
        return "rainy-1-day.svg";
      case 56: // Freezing Drizzle
      case 57:
        return "rainy-1-day.svg";
      case 61: // Rain
      case 63:
      case 65:
        return "rainy-2-day.svg";
      case 66: // Freezing Rain
      case 67:
        return "rainy-2-day.svg";
      case 71: // Snow
      case 73:
      case 75:
      case 77: // Snow Grains
        return "snowy-1-day.svg";
      case 80: // Rain showers
      case 81:
      case 82:
        return "rainy-3-day.svg";
      case 85: // Snow showers
      case 86:
        return "snowy-3-day.svg";
      case 95: // Thunderstorm
        return "scattered-thunderstorms-day.svg";
    }
  } else {
    switch (weather_code) {
      case 0: // Clear sky
        return "clear-night.svg";
      case 1: // Mainly clear
        return "cloudy-1-night.svg";
      case 2: // Partly cloudy
        return "cloudy-2-night.svg";
      case 3: // Overcast
        return "cloudy-3-night.svg";
      case 45: // Fog
      case 48:
        return "fog-night.svg";
      case 51: // Drizzle
      case 53:
      case 55:
        return "rainy-1-night.svg";
      case 56: // Freezing Drizzle
      case 57:
        return "rainy-1-night.svg";
      case 61: // Rain
      case 63:
      case 65:
        return "rainy-2-night.svg";
      case 66: // Freezing Rain
      case 67:
        return "rainy-2-night.svg";
      case 71: // Snow
      case 73:
      case 75:
      case 77: // Snow Grains
        return "snowy-1-night.svg";
      case 80: // Rain showers
      case 81:
      case 82:
        return "rainy-3-night.svg";
      case 85: // Snow showers
      case 86:
        return "snowy-3-night.svg";
      case 95: // Thunderstorm
        return "scattered-thunderstorms-night.svg";
    }
  }

  return null;
}

function formatDate(date) {
  var month = "" + (date.getMonth() + 1),
    day = "" + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

document
  .querySelector("#weather #monthly-forecast-btn")
  .addEventListener("click", () => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    fetch(
      `https://api.open-meteo.com/v1/forecast?` +
        `latitude=33.873415&` +
        `longitude=-115.9009923&` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min&` +
        `start_date=${formatDate(startDate)}&` +
        `end_date=${formatDate(endDate)}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector("#weather #monthly-weather").innerHTML = "";

        document.querySelector("#weather #monthly-weather").setAttribute(
          "label",
          "Monthly Forecast - " +
            today.toLocaleString("default", {
              month: "long",
              year: "numeric"
            })
        );

        for (let i = 0; i < data.daily.time.length; i++) {
          const dayElement = document.createElement("sl-tooltip");
          dayElement.setAttribute(
            "content",
            `Avg Temp: ${formatTemp(
              (data.daily.temperature_2m_max[i] +
                data.daily.temperature_2m_min[i]) /
                2,
              temp_unit
            )}º${temp_unit}`
          );
          dayElement.classList.add("day");
          dayElement.innerHTML = `
            <div class="date">${new Date(data.daily.time[i]).toLocaleDateString(
              undefined,
              {
                weekday: "short",
                day: "2-digit"
              }
            )}</div>
            <img class="weather-icon" src="/images/weather-icons/animated/${weatherIconURL(
              true,
              data.daily.weather_code[i]
            )}" alt="Weather icon">
            <div class="temp">
              <span class="max" id="daily-temp-max">
                ${formatTemp(data.daily.temperature_2m_max[i], temp_unit)}º
              </span>
              <span class="min" id="daily-temp-min">
                ${formatTemp(data.daily.temperature_2m_min[i], temp_unit)}º
              </span>
            </div>
        `;

          document
            .querySelector("#weather #monthly-weather")
            .appendChild(dayElement);
        }
      });

    document.querySelector("#weather #monthly-weather").show();
  });

// Parallax scrolling transition
// Pin the parallax scrolling transition section for 3 screens (end after Family-Friendly Trails Page passed)
const parallax_tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#parallax-scrolling-transition",
    containerAnimation: scrollTween,
    scrub: 1,
    start: "left right",
    end: "+=" + window.innerWidth * 3
  }
});

// Pin the animation container for 1 screen (stop the texts moving right after meeting the Family-Friendly Trails Transition Page)
const fakePin = gsap.to("#parallax-scrolling-transition", {
  x: window.innerWidth,
  ease: "none"
});

ScrollTrigger.create({
  trigger: "#parallax-scrolling-transition",
  containerAnimation: scrollTween,
  start: "left left",
  end: "+=" + window.innerWidth,
  scrub: true,
  animation: fakePin
});

parallax_tl
  .fromTo(
    "#parallax-scrolling-transition #are-you",
    {
      transform: "translateY(-70vh) rotate(90deg)"
    },
    {
      transform: "translateY(85vh) rotate(90deg)",
      ease: "none"
    },
    0
  )
  .fromTo(
    "#parallax-scrolling-transition #ready-for-adventure",
    {
      transform: "translateX(80vw)"
    },
    {
      transform: "translateX(-90vw)",
      ease: "none"
    },
    0
  );

// Trails data
const trails = [
  {
    openDetails: false,
    name: "Arch Rock",
    level: "Family-Friendly",
    length: "1.9km",
    elevation: "27m",
    amenities: [
      "Wheelchair friendly",
      "Stroller friendly",
      "Children friendly"
    ],
    notes: ["No shade", "Fee to enter park", "No dogs"],
    time: "26 minutes",
    descriptions: [
      "Experience this 1.9-km out-and-back trail, perfect for families. The trail is considered easy, with an average completion time of 26 minutes. This popular route is wheelchair, stroller, and children-friendly. Please note there is no shade, and there is a park entrance fee. It's a beautiful year- round trail, but unfortunately, dogs are not allowed.Be prepared to encounter other enthusiasts while enjoying this scenic hike."
    ]
  },
  {
    openDetails: false,
    name: "Cholla Cactus Garden",
    level: "Family-Friendly",
    length: "0.3km",
    elevation: "3m",
    amenities: [
      "Wheelchair friendly",
      "Stroller friendly",
      "Children friendly",
      "Partially paved"
    ],
    notes: [
      "All-terrain tires or motorised equipment is recommended due to the unpaved surfaces and unevenness",
      "Exercise caution around the cholla cacti to avoid attaching segments",
      "Stay on the designated trail and wear closed-toed shoes",
      "Fee to enter park",
      "No dogs"
    ],
    time: "4 minutes",
    descriptions: [
      'Embark on the Cholla Cactus Garden Trail, a charming out-and-back route suitable for families and individuals of all ability levels. As a favoured spot for birding, hiking, and walking, expect to share the trail with fellow nature enthusiasts. Exercise caution around the "jumping" cholla, and keep to the designated path, wearing closed-toed shoes for added safety.',
      "This well-liked trail remains accessible year-round, offering scenic beauty despite the absence of specified shade. Please be aware that dogs are not permitted on this trail. Conveniently situated along the Pinto Basin Road, the trailhead features a small paved parking lot, including one designated accessible space."
    ]
  },
  {
    openDetails: false,
    name: "Keys View",
    level: "Family-Friendly",
    length: "0.2km",
    elevation: "4m",
    amenities: [
      "Wheelchair friendly",
      "Stroller friendly",
      "Children friendly",
      "Paved"
    ],
    notes: ["No shade", "Fee to enter park", "No dogs"],
    time: "2 minutes",
    descriptions: [
      "Experience stunning vistas of the San Andreas Fault, Mount San Jacinto, Mount San Gorgonio, and the Salton Sea on this scenic trail. Interpretive signs provide insights along the way. The year-round hike is cautioned for potential winter chill and summer heat. Bring water and download the map in advance due to unreliable cell service. Two accessible spaces are available in the paved parking lot, offering a smooth, wheelchair-friendly trail with gentle grades."
    ]
  },
  {
    openDetails: false,
    name: "Oasis of Mara",
    level: "Family-Friendly",
    length: "0.8km",
    elevation: "4m",
    amenities: [
      "Wheelchair friendly",
      "Stroller friendly",
      "Children friendly",
      "Paved",
      "Dogs on leash"
    ],
    notes: ["Dogs are welcome, but must be on a leash", "Fee to enter park"],
    time: "9 minutes",
    descriptions: [
      "Explore the Oasis of Mara on this loop trail, featuring interpretative signs highlighting its wildlife and historical significance. Recommended year-round, bring water, snacks, and sun protection. Two accessible spaces are available in the paved parking lot off Utah Trail. The smooth, 4-foot-wide concrete trail is gentle, suitable for wheelchairs and strollers, with benches for resting. The visitor centre is wheelchair-accessible, as confirmed by the park website."
    ]
  },
  {
    openDetails: false,
    name: "Jumbo Rocks Campground",
    level: "Family-Friendly",
    length: "2.6km",
    elevation: "27m",
    amenities: [
      "Wheelchair friendly",
      "Stroller friendly",
      "Children friendly",
      "Paved",
      "Dogs on leash"
    ],
    notes: [
      "Dogs are welcome but not allowed off of the developed road into the boulders",
      "Be cautious of vehicles since this walk is entirely on the campground road",
      "Fee to enter"
    ],
    time: "33 minutes",
    descriptions: [
      "Embark on a scenic loop through Jumbo Rocks Campground on this accessible trail, perfect for those using wheelchairs, mobility equipment, or strollers. If you're camping at the Jumbo Rocks Campground, this loop offers a fun exploration opportunity.Additionally, feel free to take optional side adventures to scramble on nearby boulders, enhancing your outdoor experience."
    ]
  },
  {
    openDetails: false,
    name: "Skull Rock",
    level: "Easy",
    length: "2.7km",
    elevation: "45m",
    amenities: ["Children friendly"],
    notes: [
      "This popular trail can be busy",
      "No shade",
      "Fee to enter",
      "No dogs"
    ],
    time: "2 hours",
    descriptions: [
      "Discover more than just a roadside view at Skull Rock. This nature trail loop guides you through boulder piles, desert washes and the iconic Skull Rock itself. Note that the trail includes a few steep, narrow sections. Access it across from the Jumbo Rocks Campground entrance or within the campground near the amphitheatre.",
      "The distinct hollowed-out eye sockets on the giant granite boulder, Skull Rock, were shaped by water erosion over time. Hike this trail year-round, with a suggestion to start before 9 AM in the summer for a cooler experience."
    ]
  },
  {
    openDetails: false,
    name: "Split Rock",
    level: "Easy",
    length: "3.9km",
    elevation: "84m",
    amenities: ["Children friendly"],
    notes: [
      "Rocky terrain",
      "Hiking footwear advised",
      "No shade",
      "Fee to enter",
      "No dogs"
    ],
    time: "58 minutes",
    descriptions: [
      "This loop offers a blend of rock formations, wildlife, and stunning desert landscapes, making it a comprehensive hiking experience. Choose your direction but don't miss the side trip to Face Rock and Split Rock.",
      "Optimal for winter hikes, exercise caution during summer due to desert heat. Begin early (before 9 AM), pack sufficient water, salty snacks, and sun protection. Download the map in advance as there is no reliable cell service in the park. Immerse yourself in the diverse beauty of this trail."
    ]
  },
  {
    openDetails: false,
    name: "Barker Dam",
    level: "Easy",
    length: "2.1km",
    elevation: "18m",
    amenities: [
      "Children friendly",
      "Historic site",
      "Toilet at the trailhead"
    ],
    notes: [
      "Rocky terrain",
      "Hiking footwear advised",
      "No shade",
      "Fee to enter",
      "No dogs"
    ],
    time: "26 minutes",
    descriptions: [
      "Explore this family-friendly hike, mostly flat with rocky and sandy sections, leading to Barker Dam, a rock art site, and iconic boulders. Wear appropriate footwear for optional rock scrambling. Enjoy Joshua trees, creosote bushes, and granite rock formations where climbers may be spotted.",
      "While the dam is usually dry, rains can bring wildlife like bighorn sheep. Interpretive signs share the dam's history, and a rock art site offers a glimpse into the desert's past—view respectfully."
    ]
  },
  {
    openDetails: false,
    name: "Hidden Valley",
    level: "Easy",
    length: "1.6km",
    elevation: "36m",
    amenities: [
      "Children friendly",
      "Historic site",
      "Toilet at the trailhead"
    ],
    notes: ["No shade", "Fee to enter", "No dogs"],
    time: "24 minutes",
    descriptions: [
      "Experience the essence of Joshua Tree National Park on the Hidden Valley nature trail loop, situated in the heart of the park just off Park Boulevard. If you have time for just one short hike, Hidden Valley is a stellar choice. Enclosed by the iconic golden rock formations, this rock valley was reputedly used by 19th-century cattle rustlers as a hidden shelter for their herds.",
      "The nature trail features interpretive panels, offering insights into the area's rich biodiversity, cultural history, and geology.As you explore, keep an eye out for rock climbers on technical routes adjacent to the trail, adding an adventurous touch to your nature immersion."
    ]
  },
  {
    openDetails: false,
    name: "Hall of Horrors",
    level: "Easy",
    length: "1km",
    elevation: "8m",
    amenities: [
      "Children friendly",
      "Historic site",
      "Toilet at the trailhead"
    ],
    notes: [
      "Rocky terrain",
      "Scramble",
      "Hiking footwear advised",
      "Fee to enter",
      "No dogs"
    ],
    time: "18 minutes",
    descriptions: [
      "Explore the Hall of Horrors, named for its intriguing rock formations, on this popular route between Ryan Campground and Sheep Pass Group Campground. The mapped hike takes you through main rock clusters with opportunities for scrambling and side explorations. Great for family outings, this area offers scenic views surrounded by mountains. Stick to existing paths to minimise ecological impact.",
      "While the Hall of Horrors is known for technical rock climbing, this route itself is non-technical. Exercise caution around climbers, giving them space for safe ascents. Immerse yourself in the geological wonders of the Hall of Horrors."
    ]
  },
  {
    name: "Mastodon Peak",
    level: "Easy",
    length: "3.9km",
    elevation: "124m",
    amenities: ["Children friendly"],
    notes: [
      "Rocky terrain",
      "Scramble",
      "Hiking footwear advised",
      "Fee to enter",
      "No dogs"
    ],
    time: "59 minutes",
    descriptions: [
      "Embark on this loop leading to the base of Mastodon Peak summit. For the craggy granite peak's summit, a brief scramble is required.Post - summit, the route passes an old gold mine, showcasing a variety of desert plants.On clear days, catch glimpses of the Salton Sea!",
      "Best explored in winter, exercise caution during summer due to desert heat. Start early (before 9 AM), and equip yourself with ample water, salty snacks, and sun protection. Download the map in advance, considering the absence of reliable cell service in the park. Immerse yourself in the unique beauty of this trail."
    ]
  },
  {
    openDetails: false,
    name: "Ryan Mountain",
    level: "Moderate",
    length: "4.7km",
    elevation: "324m",
    amenities: ["Toilet at the trailhead"],
    notes: [
      "Rocky terrain",
      "Hiking footwear advised",
      "No shade",
      "Fee to enter",
      "No dogs"
    ],
    time: "2 hours",
    descriptions: [
      "Discover the allure of Ryan Mountain, a Joshua Tree gem! Renowned for awe-inspiring rock formations and breathtaking panoramic views, this hike is a must-visit, especially for a memorable sunset experience.",
      "The climb to the summit involves a considerable elevation gain, so pack plentiful water, salty snacks, and sun protection. Given the intense summer heat, it's advisable to avoid this trail between May and October for a more enjoyable hiking experience."
    ]
  },
  {
    openDetails: false,
    name: "Fortynine Palms Oasis",
    level: "Moderate",
    length: "5km",
    elevation: "194m",
    amenities: ["Toilet at the trailhead"],
    notes: [
      "Rocky terrain",
      "Hiking footwear advised",
      "No shade",
      "Fee to enter",
      "No dogs"
    ],
    time: "1 hour 33 minutes",
    descriptions: [
      "Discover diverse landscapes, from rocky ridges to sandy washes, on this hike with stunning views. Explore a canyon leading to a fan palm oasis, navigating steep sections. Look out for barrel cactus atop ridges.",
      "Accessed off Twentynine Palms Highway, follow a small dirt road to the trailhead. The oasis, crucial for wildlife, is closed for protection. Limited shade and unreliable cell service characterise the trail. Avoid hiking between May-October or in hot weather. Carry water, snacks, and sun protection. Download a map beforehand and check the weather for a rewarding adventure!"
    ]
  },
  {
    openDetails: false,
    name: "Willow Hole",
    level: "Moderate",
    length: "10.9km",
    elevation: "74m",
    amenities: ["Toilet at the trailhead"],
    notes: ["No shade", "Fee to enter", "No dogs"],
    time: "2 hours 11 minutes",
    descriptions: [
      "Embark on a trail along the Wonderland of Rocks, venturing through Joshua tree forests, captivating boulders, rock formations, and sandy washes. The journey concludes at Willow Hole, a marshy area surrounded by willow trees.",
      "With limited shade and unreliable cell service, it's advisable to avoid hiking this trail between May - October or in hot weather.Ensure you carry ample water, snacks, and sun protection, even in winter.Download a map in advance and stay informed about the weather for a safe and enjoyable experience."
    ]
  },
  {
    openDetails: false,
    name: "Warren Peak",
    level: "Moderate",
    length: "9km",
    elevation: "337m",
    amenities: ["Toilet at the trailhead"],
    notes: ["Horseback riding", "No shade", "Fee to enter", "No dogs"],
    time: "2 hours 46 minutes",
    descriptions: [
      "Ascend to the summit of Warren Peak via the Black Rock Canyon Trail, commencing at the Black Rock Canyon backcountry board and trailhead. Experience panoramic views of the serene western part of Joshua Tree National Park.",
      "Given limited shade and unreliable cell service, it's not recommended to hike this trail between May - October or in hot weather. Ensure you carry ample water, snacks, and sun protection, even in winter. Download a map beforehand and check the weather for a safe and enjoyable hike."
    ]
  },
  {
    openDetails: false,
    name: "Lost Horse Mine",
    level: "Moderate",
    length: "6.6km",
    elevation: "161m",
    amenities: ["Toilet at the trailhead"],
    notes: [
      "Rocky terrain",
      "Hiking footwear advised",
      "Historic site",
      "No shade",
      "Fee to enter",
      "No dogs"
    ],
    time: "1 hour 43 minutes",
    descriptions: [
      "Follow the old mine wagon road to explore the renowned Lost Horse Mine, one of the park's most successful gold mines. The trailhead is at the end of Lost Horse Mine Road off Keys View Road. The mostly flat trail with rocky sections offers a rewarding view of the Pinto Basin. Please respect the historic site by staying outside the fenced area.",
      "Optimal for winter hikes, exercise caution during summer due to desert heat. Begin early (before 9 AM), and equip yourself with ample water, salty snacks, and sun protection. Download a map in advance due to no reliable cell service in the park."
    ]
  },
  {
    openDetails: false,
    name: "Rattlesnake Canyon",
    level: "Expert",
    length: "4.2km",
    elevation: "120m",
    amenities: ["Toilet at the trailhead"],
    notes: [
      "Off trail",
      "Rocky",
      "No shade",
      "Scramble",
      "Fee to enter",
      "No dogs"
    ],
    time: "1 hour 32 minutes",
    descriptions: [
      "Warning: Rattlesnake Canyon in Joshua Tree National Park is a technical route, potentially requiring rock climbing gear (Class 3 & Class 4 scrambling). This unmarked and unauthorised trail involves off-trail rock scrambling and wilderness exploration, posing risks. Exercise extreme caution, especially as the route is choose-your-own-adventure style.",
      "With limited shade and unreliable cell service, avoid hiking between May - October or in hot weather. Carry ample water, snacks, and sun protection, even in winter. Download offline maps and check the weather forecast before embarking on this challenging, off-trail hike."
    ]
  },
  {
    openDetails: false,
    name: "Old Dale Road 1",
    level: "Expert",
    length: "42.3km",
    elevation: "655m",
    amenities: ["Toilet at the trailhead"],
    notes: [
      "Rocky terrain",
      "Hiking footwear advised",
      "No shade",
      "Fee to enter",
      "No dogs"
    ],
    time: "12 hours 5 minutes",
    descriptions: [
      "Commencing from the same point as Black Eagle Mine Road, this route spans the initial 11 miles (17.8 km) across Pinto Basin—a flat, sandy, dry-lake bed. Following this, the road ascends a steep hill and traverses the park boundary. Numerous side roads branch off towards old mines and residences. The main road eventually connects to HWY 62, situated 15 miles (24.3 km) east of Twentynine Palms."
    ]
  },
  {
    openDetails: false,
    name: "California RIding and Hiking Trail",
    level: "Expert",
    length: "58.7km",
    elevation: "947m",
    amenities: ["Toilets can be accessed at nearby campgrounds"],
    notes: [
      "Point to point",
      "Horseback riding",
      "Camping",
      "Rocky terrain",
      "Hiking footwear advised",
      "No shade",
      "Fee to enter",
      "No dogs"
    ],
    time: "14 hours 13 minutes",
    descriptions: [
      "The California Riding and Hiking Trail (CRHT) offers a multi-day backpacking or horseback experience from Black Rock Canyon to the North Entrance of Joshua Tree National Park, showcasing Mojave desert scenery. Recommended for February-April for desert blooms. Water is not available on the trail, but caching is permitted for up to 14 days. Limited shade and unreliable cell service. Avoid May-October or hot weather. Obtain a permit for all overnight stays within designated zones. Plan water caches ahead and follow guidelines for permits:",
      "https://www.nps.gov/jotr/planyourvisit/backpacking.htm"
    ]
  },
  {
    openDetails: false,
    name: "The Wonderland Connection",
    level: "Expert",
    length: "8.9km",
    elevation: "48m",
    amenities: ["Toilet at the trailhead of Willow Hole"],
    notes: [
      "Off trail",
      "Rocky terrain",
      "Scramble",
      "Hiking footwear advised",
      "No shade",
      "Fee to enter",
      "No dogs"
    ],
    time: "7 hours 13 minutes",
    descriptions: [
      "Embark on a challenging and visually stunning hike through the Wonderland of Rocks, starting from the Boy Scout Trail to Willow Hole, transitioning to an off-trail route through Rattlesnake Canyon. Expect boulder scrambling, mazes, crevices, and steep drop-offs. Proficient off-trail navigation and rock scrambling skills are crucial. Travel with a buddy, and inform a friend of your itinerary.",
      "Note: Overnight parking is not allowed at the Wonderland of Rocks area. For backpacking, explore the recommended route:",
      "https://www.alltrails.com/explore/trail/us/california/boy-scout-trail--8"
    ]
  },
  {
    openDetails: false,
    name: "Pinkham Canyon Road",
    level: "Expert",
    length: "30.9km",
    elevation: "92m",
    amenities: ["Toilet at the trailhead"],
    notes: [
      "Rocky terrain",
      "Hiking footwear advised",
      "No shade",
      "Fee to enter",
      "Dogs on leash"
    ],
    time: "6 hours 27 minutes",
    descriptions: [
      "Embark on a challenging route from Cottonwood Visitor Center, requiring a 4WD and high-clearance vehicle. You can hike or bike parts of the route with your dog. Explore Smoke Tree Wash and Pinkham Canyon for an exciting journey.",
      "Carry emergency supplies, and be prepared for soft sand and rocky flood plains. Street-legal vehicles only; OHVs not allowed. Preserve the desert ecosystem by staying on established roads. Avoid summer hikes; pack extra water, salty snacks, and inform a friend of your plans for safety. Dogs are welcome, but must be on a leash."
    ]
  }
];

function isUrl(description) {
  let url;

  try {
    url = new URL(description);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

const familyFriendlyTrailsList = document.querySelector(
  "#family-friendly-trails .group"
);

const easyTrailsList = document.querySelector("#easy-trails .group");

const moderateTrailsList = document.querySelector("#moderate-trails .group");

const expertTrailsList = document.querySelector("#expert-trails .group");

// Trail Card
trails.forEach((trail) => {
  const trailElement = document.createElement("sl-details");
  trailElement.innerHTML =
    `
        <img slot="summary" alt="${trail.name}" src="/images/${trail.name}.png" loading="lazy"/>

        <!-- Empty icons -->
        <div slot="expand-icon"></div>
        <div slot="collapse-icon"></div>

        <img class="close-btn" src="https://img.icons8.com/sf-regular/48/1A1A1A/delete-sign.png"
            alt="delete-sign" />

        <h2 class="name">${trail.name}</h2>

        <div class="info">
            <h3>Trail Information:</h3>
            <ul>
                <li class="level">Level: ${trail.level}</li>
                <li class="length">Length: ${trail.length}</li>
                <li class="elevation">Elevation ${trail.elevation}</li>
            </ul>
        </div>

        <div class="amenities">
            <h3>Amenities:</h3>
            <ul>
                ` +
    trail.amenities.map((amenity) => `<li>${amenity}</li>`).join("") +
    `
            </ul>
        </div>

        <div class="notes">
            <h3>Important Notes:</h3>
            <ul>
                ` +
    trail.notes.map((note) => `<li>${note}</li>`).join("") +
    `
            </ul>
        </div>

        <div class="time-to-complete">
            <h3>Average Time to Complete:</h3>
            <ul>
                <li class="time">${trail.time}</li>
            </ul>
        </div>

        <div class="description">
            <h3>Description:</h3>
            ` +
    trail.descriptions
      .map((description) =>
        isUrl(description)
          ? `<a href='${description}'>${description}</a>`
          : `<p>${description}</p>`
      )
      .join("") +
    `
        </div>`;

  switch (trail.level) {
    case "Family-Friendly":
      familyFriendlyTrailsList.appendChild(trailElement);
      break;
    case "Easy":
      easyTrailsList.appendChild(trailElement);
      break;
    case "Moderate":
      moderateTrailsList.appendChild(trailElement);
      break;
    case "Expert":
      expertTrailsList.appendChild(trailElement);
      break;
  }
});

// Prevent multiple Trail Cards from being open at the same time
document.querySelectorAll(".group").forEach((group) => {
  group.addEventListener("sl-show", (event) => {
    if (event.target.localName === "sl-details") {
      [...group.querySelectorAll("sl-details")].map(
        (details) => (details.open = event.target === details)
      );
    }
  });
});

// Close Trail Card
document.querySelectorAll(".close-btn").forEach((closeBtn) =>
  closeBtn.addEventListener("click", () => {
    closeBtn.closest("sl-details").removeAttribute("open");
  })
);

// Trails Transition
const levels = ["family-friendly", "easy", "moderate", "expert"];

levels.forEach((level) => {
  const transition = `#${level}-trails-transition`;
  const text = `#${level}-trails-transition #${level}-text`;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: transition,
      containerAnimation: scrollTween,
      scrub: 1,
      start: "left right",
      end: "right left"
    }
  });

  tl.fromTo(
    text,
    {
      xPercent: 200
    },
    {
      xPercent: -300,
      ease: "none"
    }
  );
});
// Progress: 50%
// => xPercent: -50 (make element centered)
// => if start xPercent: 200
// => half distance from start to end: 200 - -50 = 250
// => full distance from start to end: 250 * 2 = 500
// => end xPercent: 200 - 500 = -300

// Gallery
const galleryList = document.querySelector("#gallery sl-carousel");

for (let i = 1; i <= 12; i++) {
  const slide = document.createElement("sl-carousel-item");
  slide.innerHTML = `
        <img
            src="/images/gallery/${i}.png"
            alt="${i}.png"
            loading="lazy"
        />
    `;
  galleryList.appendChild(slide);
}
