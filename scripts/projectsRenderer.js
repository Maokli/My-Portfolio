import Highway from '@dogstudio/highway';
import AOS from 'aos';
import StoryblokClient from 'storyblok-js-client'

class ProjectsRenderer extends Highway.Renderer {
  onEnter() { 
    AOS.init();
    const body = document.querySelector('body');
    body.style ='overflow: visible !important;'
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
        let projectsContainer = document.querySelector('.projects');
        projects.forEach(project => {
          let projectCard = `<div class="project"><img src="${project.imageUrl}" alt=""><h3>${project.title}</h3><p>${project.intro}</p><a href="${project.link}" target="_blank" >View More</a></div>`
          projectsContainer.innerHTML += projectCard;
        });
      }
    }
    GetProjects();
   }
   onEnterCompleted() {
     const projects = document.querySelectorAll('.project');
     projects.forEach(project => {
       project.addEventListener('click', ()=>{
         let projectLink = project.querySelector('a').getAttribute('href');
         window.open(projectLink);
       }
       )
       
     });
     const ProjectsAnimation = () => {
      projects.forEach(project => {
        console.log(project)
        project.addEventListener('mouseover', ()=>{
          projects.forEach(project => {
            project.classList.add('project-hovered')
          })
          project.classList.add('project-selected')
        }
        )
      })
      projects.forEach(project => {
        project.addEventListener('mouseout', ()=>{
          projects.forEach(project => {
            project.classList.remove('project-hovered')
            project.classList.remove('project-selected')
          })
        }
        )
      })
    }
    
    const RemoveScrollDelay = () => {
      const animatedElements = document.querySelectorAll('[data-aos-delay]');
      animatedElements.forEach(element => {
        element.removeAttribute('data-aos-delay');
      })
    }
    setTimeout(RemoveScrollDelay,5000);
    ProjectsAnimation();
   }
}

export default ProjectsRenderer;