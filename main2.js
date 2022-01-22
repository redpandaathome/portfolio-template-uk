const toggleBtn = document.querySelector('.navbar__toggleBtn');
const menu = document.querySelector('.navbar__menu');

const linkedInBtn = document.querySelector('.linked-in');
const emailBtn = document.querySelector('.email');

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



// NavBar - toggle hamburger bar
toggleBtn.addEventListener('click', ()=>{
   menu.classList.toggle('active');
})

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