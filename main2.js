'use strict';

// sticky navbar
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

// https://stackoverflow.com/questions/41576287/why-window-scrolly-element-getboundingclientrect-top-is-not-equal-to-element
document.addEventListener('scroll', ()=>{
   if(window.scrollY > navbarHeight){
      navbar.classList.add('navbar--dark');
   } else {
      navbar.classList.remove('navbar--dark');
   }
});

const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e)=>{
   const target = e.target;
   const link = target.dataset.link; // data-link="#home"
   if(link == null){
      return;
   }
   navbarMenu.classList.remove('open'); //????
   scrollIntoView(link);
})

// Make 'home' slowly fade in to transtearetn as the window bar scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', ()=> {
   home.style.opacity = 1 - window.scrollY / homeHeight;
});

   // toggle hamburger bar
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', ()=>{
   navbarMenu.classList.toggle('open');

})

// home contact!
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', ()=>{
   scrollIntoView('#contact');
})



// projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e)=>{
   const filter = e.target.dataset.filter || e.currentTarget.parentNode.dataset.filter;
   if(filter == null){
      return;
   }

   const active = document.querySelector('.category__btn.selected');
   active.classList.remove('selected');
   
   const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
   target.classList.add('selected');
   projectContainer.classList.add('anim-out');

   setTimeout(()=>{
      projects.forEach((project)=>{
         if (filter === '*' || filter === project.dataset.type) { 
            project.classList.remove('invisible');
         } else {
            project.classList.add('invisible');
         }
      });

      projectContainer.classList.remove('anim-out');
   }, 300);

})



// contact
// const linkedInBtn = document.querySelector('.linked-in');
const emailBtn = document.querySelector('.email');

   // Section - Contact, email copy button
emailBtn.addEventListener('click', ()=> {
   const targetEmail = 'leeyumi415@gmail.com'
   navigator.clipboard.writeText(targetEmail)
   .then(()=>{
      alert("Successfuly copied to clipboard!")
   })
   .catch(()=>{
      alert("Copying failed..!")
   })
})


// scrolling - menu sync
const sectionIds = [
   '#home',
   '#about',
   '#work',
   '#contact',
];

const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.navbar__menu__item');

let selectedNavIndex = getIdx();
let selectedNavItem = navItems[selectedNavIndex];

function selectNavItem(selected) {
   selectedNavItem.classList.remove('active');
   selectedNavItem = selected;
   selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
   const scrollTo = document.querySelector(selector);
   console.log(`scrollTo...`, scrollTo);
   // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
   scrollTo.scrollIntoView({behavior: "smooth"});

}


// intersection observer start - to check if the target element is exposed on the screen
// below code is for checking section 1~2's exposure (total 0,1,2,3) to make corresponding menu__bar__item active
// https://pks2974.medium.com/intersection-observer-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-fc24789799a3
// https://heropy.blog/2019/10/27/intersection-observer/
const observerOption = {
   root: null,
   rootMargin: '0px',
   threshold: 0.3,
};

//changing selectedNavIndex by scrolling
const observerCallback = (entries, observer) => {
   entries.forEach((entry)=>{
      if (!entry.isIntersecting && entry.intersectionRatio > 0 ) {
         const index = sectionIds.indexOf(`#${entry.target.id}`);
         if (entry.boundingClientRect.y < 0 ){
            selectedNavIndex = index + 1;
         } else {
            selectedNavIndex = index -1;

         }
      }
   })
}

const observer = new IntersectionObserver(observerCallback, observerOption);
sections.forEach((section)=> observer.observe(section));
// end

window.addEventListener('scroll', ()=>{
   if (window.scrollY ===0) {
      selectedNavIndex = 0;
   } else if(
      Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight){
         selectedNavIndex = navItems.length-1;
      }
   selectNavItem(navItems[selectedNavIndex]);
})

function getIdx(){
   const section = document
      .elementFromPoint(window.innerWidth /2, window.innerHeight * (2/3))
      .closest('section');
   const idx = sectionIds.indexOf(`#${section.id}`);
   return idx;
}

window.addEventListener('load', ()=>{
   selectNavItem(navItems[selectedNavIndex]);
})
//0 home
//1 about
//2 work
//3 contact


// Show arrow-up button
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', ()=>{
   if(window.scrollY > window.innerHeight/2){
      arrowUp.classList.add('visible');
   } else {
      arrowUp.classList.remove('visible');
   }
})

arrowUp.addEventListener('click', ()=>{
   scrollIntoView('#home');
})