'use strict';

// navbar
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
console.log(`"navbar.getBoundingClientRect()...`, navbar.getBoundingClientRect());

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
   console.log(`navbarMenu...class remove - open`, navbarMenu);
   navbarMenu.classList.remove('open'); //????
   console.log(`calling scrollIntoView...link - `,link );
   scrollIntoView(link);
})

   // toggle hamburger bar
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', ()=>{
   navbarMenu.classList.toggle('open');

})

// home contact!




// projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e)=>{
   const filter = e.target.dataset.filter || e.currentTarget.parentNode.dataset.filter;
   // console.log(`filter...`, filter); // : data-filter => backend
   if(filter == null){
      return;
   }

   const active = document.querySelector('.category__btn.selected');
   active.classList.remove('selected');
   
   // console.log(`e.target...`, e.target); //selected tag... <button class=~ ></button>
   // console.log(`e.target.nodeName:`, e.target.nodeName); //BUTTON
   const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
   target.classList.add('selected');
   projectContainer.classList.add('anim-out');

   setTimeout(()=>{
      projects.forEach((project)=>{
         // category btn... data-filter = "back-end"
         // project... data-type = "back-end"
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
const linkedInBtn = document.querySelector('.linked-in');
const emailBtn = document.querySelector('.email');

   // Section - Contact, linked-in not yet message
linkedInBtn.addEventListener('click', ()=>{
   alert("To be prepared soon..!")
})

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
   '#skills',
   '#work',
   '#testimonials',
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
   console.log(`function scrollIntoView selector..`,selector );
   // selector like #home
   // scrollTo - <li class="navbar__menu__item" data-link="#home"...>
   const scrollTo = document.querySelector(selector);
   console.log(`scrollTo...`, scrollTo);
   // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
   scrollTo.scrollIntoView({behavior: "smooth"});

}



function getIdx(){
   const section = document
      .elementFromPoint(window.innerWidth /2, window.innerHeight * (2/3))
      .closest('section');
   // console.log(`inside getIdx - document...`, document.elementFromPoint(window.innerWidth /2, window.innerHeight * (2/3)));
   // console.log(`closest... section?`, section);
   const idx = sectionIds.indexOf(`#${section.id}`);
   return idx;
}

// window.addEventListener('load', ()=>{
//    selectNavItem(navItems[selectedNavIndex]);
// })