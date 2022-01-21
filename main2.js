const toggleBtn = document.querySelector('.navbar__toggleBtn');
const menu = document.querySelector('.navbar__menu');

const linkedInBtn = document.querySelector('.linked-in');
const emailBtn = document.querySelector('.email');

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