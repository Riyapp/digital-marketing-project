

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()


// 
"use strict";

const testimonials = [
  {
    name: "Steve Miller", 
    
   work: "Actor at Hollywood Films Studio",
   
    photoUrl:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=ali-morshedlou-WMD64tMfc4k-unsplash.jpg",
    
    text: "sosanya Upholsteries and furnitures is a life saver! I just started a company, so there's no time to search for furnitures. too much paper works to go through and interiors to design.They took care of it all!"
  },
  {
    name: " David Carter ", 
    
   work: "Lawyer at Smith & Associates Law Firm",
   
    photoUrl:"https://images.unsplash.com/photo-1504791635568-fa4993808e0a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=royal-anwar-u5T5b3lNYw8-unsplash.jpg",
    
    text: "I recently purchased furniture from Sosanya Upholsteries and Furnitures and I am extremely satisfied. The staff was helpful and the furniture is beautiful !"
  },
  {
    name: "Olivia Davis ", 
    
   work: "Graphic Designer at google",
   
    photoUrl:"https://images.unsplash.com/photo-1543132220-4bf3de6e10ae?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=redd-f-v6771a4avV4-unsplash.jpg",
    
    text: "Sosanya Upholsteries and Furnitures exceeded my expectations. Their furniture is top-notch in terms of quality and design. I highly recommend them!",
  },
  {
      name: "Benjamin Wilson ", 
    
   work: "Accountant at ABC Accounting Services",
   
    photoUrl:"https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=gregory-hayes-h5cd51KXmRQ-unsplash.jpg",
    
    text: "Sosanya Upholsteries and Furnitures offers excellent furniture options. I am impressed with the craftsmanship and attention to detail. Highly recommended!"  },
];

const imgEl = document.querySelector("#testimonial-img");

const workEl = document.querySelector(".testimonial-job");
const textEl = document.querySelector(".testimonial-text");
const usernameEl = document.querySelector("#testimonial-name");

const btnRight = document.querySelector('.btn-right');

const btnLeft = document.querySelector('.btn-left');

const carouselBtn = document.querySelectorAll('.btn-dot')





let idx = 0;

const updateTestimonial= ()=> {
  const { name, work, photoUrl, text } = testimonials[idx];

  imgEl.src = photoUrl;
  textEl.innerText = text;
  usernameEl.innerText = name;
  workEl.innerText = work;
  
  carouselBtn.forEach(btn=>btn.classList.remove('btn-dot-active'))
    
 
    carouselBtn[idx].classList.add('btn-dot-active')

}


const stopSlideshow = () =>
  clearInterval(intervalId);


  let intervalId;

const startSlideshow = () => intervalId = setInterval(nextTestimonial, 4000);




const nextTestimonial = () => {
  idx++;
  if (idx === testimonials.length) {
    idx = 0;
  }
  updateTestimonial();
  stopSlideshow()
  startSlideshow();
  
  }
  
  const previousTestimonial = () => {
  idx--;
  if (idx < 0) {
    idx = testimonials.length - 1;
  }
  updateTestimonial();
  stopSlideshow()
  startSlideshow();
}


btnRight.addEventListener('click', nextTestimonial);
btnLeft.addEventListener('click', previousTestimonial);




updateTestimonial();
startSlideshow();


carouselBtn.forEach((btn,i) =>{
    
    btn.addEventListener('click',function(){
    carouselBtn.forEach(btn=>btn.classList.remove('btn-dot-active'))
    
    idx = i;
    btn.classList.add('btn-dot-active')
   updateTestimonial();
  stopSlideshow()
  startSlideshow();
    }) })
F