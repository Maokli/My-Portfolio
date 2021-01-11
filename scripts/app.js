import Highway from '@dogstudio/highway';
import Fade from './transition'
import HomeRenderer from './homeRenderer'
import AboutRenderer from './aboutRenderer'
import ProjectsRenderer from './projectsRenderer';
import ContactsRenderer from './contactsRenderer';


const linksHighlighting =() =>{
  const links = document.querySelectorAll('.links a')
  links.forEach(link => {
    link.addEventListener('click',() =>{
      links.forEach(link => {
        link.classList = []
      });
      link.classList.add('selected');
    })
  });
  const logo = document.querySelector('.logo a');
  logo.addEventListener('click' ,()=>{
    links.forEach(link => {
      link.classList = []
    });
  })
}
linksHighlighting();

const mobileNavFunc = () =>{
  const navButton = document.querySelector('.nav-button');
  let isClicked = false;
  navButton.addEventListener('click', ()=>{
    const MobileLinks = document.querySelector('.mobile-links');
    console.log(MobileLinks);
    isClicked = !isClicked;
    if(isClicked)
      MobileLinks.style.maxHeight = '30vh';
    else
     MobileLinks.style.maxHeight = '0vh';
    const links = MobileLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click',()=>{
        MobileLinks.style.maxHeight = '0vh';
        isClicked = false;
      })
    });
  })
}
mobileNavFunc();
const scrollAnimations =() => {
  const links = document.querySelectorAll("a");
  console.log(links);
  links.forEach(link => {
    link.removeAttribute("data-aos");
  });
}


const H = new Highway.Core({
  transitions: {
      default: Fade
  },
  renderers: {
    'home': HomeRenderer,
    'projects': ProjectsRenderer,
    'about': AboutRenderer,
    'contact': ContactsRenderer,
  }
});
setTimeout(scrollAnimations,5000);



