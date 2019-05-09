<template>
  <section>
    <div
      id="myCarousel"
      class="carousel slide"
    >
      <div class="carousel-inner">
        <div
          v-for="(img, index) in imgs"
          v-bind:class=" {active: index==0, 'carousel-item': true}"
          :key='img.id'
        >
          <img :src=img.route>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#myCarousel"
        role="button"
        data-slide="prev"
      >
        <span
          class="carousel-control-prev-icon"
          aria-hidden="true"
        ></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#myCarousel"
        role="button"
        data-slide="next"
      >
        <span
          class="carousel-control-next-icon"
          aria-hidden="true"
        ></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <div class="container marketing">
      <div class="row">
        <div
          v-for="data in rect_data"
          class="col-lg-4"
          :key='data.id'
        >
          <svg
            class="bd-placeholder-img rounded-circle"
            width="140"
            height="140"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
            aria-label="Placeholder: 140x140"
          >
            <title>Placeholder</title>
            <rect
              :style='{ fill: data.rect_color }'
              width="100%"
              height="100%"
            />
          </svg>
          <hr>
          <h2>{{ data.heading }}</h2>
          <p>{{ data.paragraph }}</p>
          <p><a
              @click="backTop"
              class="btn btn-secondary"
              href="#"
              role="button"
            >View details &raquo;</a></p>
        </div>
      </div>

      <div
        v-for="(futurette, index) in featurettes"
        :key='futurette.id'
      >
        <hr class="featurette-divider">
        <div class="row featurette">
          <div :class=" {'col-md-7': true, 'order-md-2': index%2 != 0}">
            <h2 class=featurette-heading>{{ futurette.title }} {{ index }}</h2>
            <p class="lead"> {{ futurette.content }} </p>
          </div>
          <div :class=" {'col-md-5': true, 'order-md-1': index%2 != 0}">
            <img
              :src=futurette.img
              alt="抱歉 圖片整修中"
              class="img-fluid featurette-image d-block mx-auto"
            >
          </div>
        </div>
      </div>
      <br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      imgs: [{ route: require('../assets/home/chinfa.jpg') }, { route: require('../assets/home/chinfa2.jpg') }, { route: require('../assets/home/chinfa3.jpg') }],
      rect_data: [{
        heading: '新鮮',
        paragraph: '蔬果皆由全台最棒產地西螺, 新鮮直送',
        rect_color: 'rgb(17, 114, 20)',
        answer: 0
      },
      {
        heading: '方便',
        paragraph: '東勢山城地區滿額皆可外送, 線上即可下單, 家庭餐廳不必每天自己來取貨, 幫您免費送到府',
        rect_color: 'rgb(235, 249, 90)',
        answer: 0
      },
      {
        heading: '服務好',
        paragraph: '顧客至上, 我們不僅要求蔬果品質, 服務也必須到位!',
        rect_color: 'rgb(225, 98, 96)',
        answer: 0
      }
      ],
      featurettes: [
        {
          title: '我是標題111',
          content: '標題1內容！！！！！！！！ hahahahhaha',
          img: require('../assets/home/chinfa.jpg')
        },
        {
          title: '我是標題222',
          content: '標題2內容！！！！！！！！ hahahahhaha',
          img: require('../assets/home/chinfa2.jpg')
        },
        {
          title: '我是標題33333',
          content: '標題3內容！！！！！！！！ hahahahhaha',
          img: require('../assets/home/chinfa3.jpg')
        }
      ]
    }
  },
  methods: {
    backTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/styles/variables.scss";

/* CUSTOMIZE THE CAROUSEL
  -------------------------------------------------- */

/* Carousel base class */

.carousel {
  margin-bottom: 4rem;
}

.carousel-item {
  height: 50rem;
}

.carousel-item > img {
  position: absolute;
  z-index: -1000;
  top: 50px;
  left: 0;
  min-width: 100%;
  height: 40rem;
}

/* MARKETING CONTENT
  -------------------------------------------------- */

/* Center align the text within the three columns below the carousel */

.marketing .col-lg-4 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.marketing h2 {
  font-weight: 400;
}

.marketing .col-lg-4 p {
  margin-right: 0.75rem;
  margin-left: 0.75rem;
}

/* Featurettes
  ------------------------- */

.featurette-divider {
  margin: 5rem 0;
  /* Space out the Bootstrap <hr> more */
}
.featurette-divider-bottle {
  margin: 5rem 0 8rem 0;
}

/* Thin out the marketing headings */

.featurette-heading {
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.05rem;
}

/* RESPONSIVE CSS
  -------------------------------------------------- */

@media (min-width: 40em) {
  /* Bump up size of carousel content */
  .featurette-heading {
    font-size: 50px;
  }
}

@media (min-width: 62em) {
  .featurette-heading {
    margin-top: 7rem;
  }
}

@media only screen and (max-width: 992px) {
  .carousel .carousel-item > img {
    max-width: 100%;
    max-height: 70%;
  }
}
</style>
