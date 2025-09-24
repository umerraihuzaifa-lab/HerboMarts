/* script.js */
document.addEventListener('DOMContentLoaded', function(){
  /* MAIN SLIDER */
  const sliderWrap = document.getElementById('mainSlider');
  const slidesContainer = sliderWrap.querySelector('.slides');
  const slides = Array.from(slidesContainer.children);
  const prevBtn = sliderWrap.querySelector('.prev');
  const nextBtn = sliderWrap.querySelector('.next');
  const dotsWrap = sliderWrap.querySelector('.dots');

  let currentIndex = 0;
  let slideInterval = null;
  const slideTime = 4000;

  function createDots(){
    slides.forEach((s, idx)=>{
      const btn = document.createElement('button');
      btn.setAttribute('aria-label','Go to slide '+(idx+1));
      if(idx===0) btn.classList.add('active');
      btn.addEventListener('click', ()=> goToSlide(idx));
      dotsWrap.appendChild(btn);
    });
  }

  function updateSlide(){
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    const dots = Array.from(dotsWrap.children);
    dots.forEach((d,i)=> d.classList.toggle('active', i===currentIndex));
  }

  function goToSlide(i){
    currentIndex = (i + slides.length) % slides.length;
    updateSlide();
    restartInterval();
  }

  prevBtn.addEventListener('click', ()=> { goToSlide(currentIndex-1); });
  nextBtn.addEventListener('click', ()=> { goToSlide(currentIndex+1); });

  function startInterval(){
    slideInterval = setInterval(()=> goToSlide(currentIndex+1), slideTime);
  }
  function stopInterval(){ clearInterval(slideInterval); slideInterval = null; }
  function restartInterval(){ stopInterval(); startInterval(); }

  sliderWrap.addEventListener('mouseenter', stopInterval);
  sliderWrap.addEventListener('mouseleave', startInterval);

  createDots();
  updateSlide();
  startInterval();

  /* PRODUCT CAROUSEL - auto scroll horizontally */
  const productCarousel = document.querySelector('.product-carousel');
  let pTimer;
  function startProductAutoScroll(){
    stopProductAutoScroll();
    pTimer = setInterval(()=>{
      const scrollAmount = productCarousel.clientWidth; // scroll one visible width
      // smooth scroll next
      const maxScroll = productCarousel.scrollWidth - productCarousel.clientWidth;
      if(productCarousel.scrollLeft >= maxScroll - 5) {
        productCarousel.scrollTo({left:0, behavior:'smooth'});
      } else {
        productCarousel.scrollBy({left:scrollAmount/2, behavior:'smooth'});
      }
    }, 2800);
  }
  function stopProductAutoScroll(){ if(pTimer) clearInterval(pTimer); }
  productCarousel.addEventListener('mouseenter', stopProductAutoScroll);
  productCarousel.addEventListener('mouseleave', startProductAutoScroll);
  startProductAutoScroll();

  /* VIEW MORE BUTTONS -> Save product info in localStorage and open checkout.html */
  const viewButtons = document.querySelectorAll('.product button');
  viewButtons.forEach((btn, idx)=>{
    btn.addEventListener('click', (e)=>{
      const product = e.target.closest('.product');
      const img = product.querySelector('img').getAttribute('src');
      const title = product.querySelector('h3').innerText;
      const price = product.querySelector('p').innerText;
      // Save a simple object
      const productObj = {img, title, price, id: Date.now()+idx};
      localStorage.setItem('selectedProduct', JSON.stringify(productObj));
      // open checkout page
      window.location.href = 'checkout.html';
    });
  });
  const navbar = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if(window.scrollY > 20){
    navbar.classList.add('shrink');
  } else {
    navbar.classList.remove('shrink');
  }
});
  /* GALLERY VIEW MORE BUTTONS */
  const galleryButtons = document.querySelectorAll('.gallery-item button');
  galleryButtons.forEach((btn, idx)=>{
    btn.addEventListener('click', (e)=>{
      const item = e.target.closest('.gallery-item');
      const img = item.querySelector('img').getAttribute('src');
      const title = item.querySelector('h3').innerText;
      const price = item.querySelector('p').innerText;
      const productObj = {img, title, price, id: Date.now()+idx};
      localStorage.setItem('selectedProduct', JSON.stringify(productObj));
      window.location.href = 'checkout.html';
    });
  });


  /* ALSO make slider caption buttons act as 'view' for first slide's product behavior (optional) */
  // if you want slide CTA to open shop - it can be wired here.

});

