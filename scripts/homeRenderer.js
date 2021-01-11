import Highway from '@dogstudio/highway';
import Typed from '../node_modules/typed.js/src/typed.js';
import AOS from 'aos';
import StoryblokClient from 'storyblok-js-client'

class HomeRenderer extends Highway.Renderer {
  onEnterCompleted() { 
    
    AOS.init();
    const body = document.querySelector('body');
    if(window.screen.width > 768)
      body.style ='overflow: hidden !important;';
    const typingAnimation = () => {
      var optionsh1 = {
        strings: ['Hi, <br> I’m Louay'],
        typeSpeed: 40,
        showCursor: false,
      };
      var optionsp = {
        strings: ['Full-Stack Web Developer<span class="typed-cursor typed-cursor--blink">|</span>'],
        typeSpeed: 40,
        showCursor: true,
        cursorChar: '',
        startDelay:1500,
      };
      var optionsMobilep1 = {
        strings: ['Full-Stack Web'],
        typeSpeed: 40,
        showCursor: true,
        cursorChar: '',
        startDelay:1500,
      }
      var optionsMobilep2 = {
        strings: ['Developer<span class="typed-cursor typed-cursor--blink">|</span>'],
        typeSpeed: 40,
        showCursor: true,
        cursorChar: '',
        startDelay:2500,
      }
      if(window.screen.width > 768){
        var typed = new Typed('.introduction h1', optionsh1);
        var typed2 = new Typed('.introduction p',optionsp);
      }
      else {
        var typed = new Typed('.introduction h1', optionsh1);
        var typed2 = new Typed('.introduction p',optionsMobilep1);
        var typed2 = new Typed('.introduction #developper',optionsMobilep2);
      }
    }
    typingAnimation();

    const highlightedWork = () =>{
      const GetProjects = () =>{
        console.log('hit')
        // init with access token
        const Storyblok = new StoryblokClient({
          accessToken: process.env.API_KEY,
          cache: {
            clear: 'auto',
            type: 'memory'
          }
        })
        Storyblok.get('cdn/stories',{})
        .then(response => {
          console.log(response);
          fetchResponse(response);
        }).catch(error => { 
          console.log(error)
        })
      
        const fetchResponse = (response) => {
          let projects = response.data.stories;
          let simplifiedProjects = [];
          projects.forEach(project => {
            let simplifiedProject = {
              imageUrl: project.content.image,
              title: project.content.title,
              intro: project.content.intro,
              link: project.content.link,
            }
            simplifiedProjects.push(simplifiedProject);
          });
          console.log(simplifiedProjects);
          bindData(simplifiedProjects);
        }
        const bindData = (projects) => {
          let projectsContainer = document.querySelector('.carousel');
          projects.forEach(project => {
            let projectCard = `<div class="project"><img src="${project.imageUrl}" alt=""></div>`
            projectsContainer.innerHTML += projectCard;
          });
          let scrollSpace = '<div class="scroll-space"></div>'
          projectsContainer.innerHTML += scrollSpace;
        }
      }
      GetProjects();
    }
    highlightedWork();
    const scrollAnimations =() => {
      const links = document.querySelectorAll("a");
      links.forEach(link => {
        link.removeAttribute("data-aos");
      });
    }
    
    const RemoveScrollDelay = () => {
      const animatedElements = document.querySelectorAll('[data-aos-delay]');
      animatedElements.forEach(element => {
        element.removeAttribute('data-aos-delay');
      })
    }
    setTimeout(RemoveScrollDelay,5000);
    setTimeout(scrollAnimations,5000);
   }
}

// Don`t forget to export your renderer
export default HomeRenderer;