import Highway from '@dogstudio/highway';
import AOS from 'aos';

class AboutRenderer extends Highway.Renderer {
  onEnterCompleted() { 
    
    AOS.init();
    const body = document.querySelector('body');
    body.style ='overflow: scroll !important;';
    const animateSkillBars = () => {
      const skills = [{
        skill:document.querySelector('#html'),
        level: 95
      },
      {
        skill:document.querySelector('#css'),
        level: 87
      },
      {
        skill:document.querySelector('#javascript'),
        level: 80
      },
      {
        skill:document.querySelector('#angular'),
        level: 73
      },
      {
        skill:document.querySelector('#asp'),
        level: 87
      },
      ]
      skills.forEach(element => {
        const level = element.skill.querySelector(".full-rectangle");
        const blankLevel = element.skill.querySelector(".empty-rectangle");
        console.log(blankLevel.offsetWidth)
        let computedWidth = (blankLevel.offsetWidth * element.level) / 100;
        level.style.width = computedWidth+'px';
      });
      const AnimateDescription = () =>{
        const levels = document.querySelectorAll('.skill .level');

        levels.forEach(level => {
          const button = level.querySelector('button');
          let isHidden = true;
          button.addEventListener('click', ()=>{
            const description = level.querySelector('.description');
            if(isHidden){
              description.style.maxHeight = '30vh';
              setTimeout(() => {
                description.scrollIntoView({behavior: 'smooth', block: 'center'});
              },200)
            }
            else
              description.style.maxHeight = '0vh';
            isHidden = !isHidden;
          })
        })
      }
      AnimateDescription();
    }
    const RemoveScrollDelay = () => {
      const animatedElements = document.querySelectorAll('[data-aos-delay]');
      animatedElements.forEach(element => {
        element.removeAttribute('data-aos-delay');
      })
    }
    setTimeout(RemoveScrollDelay,5000);
    setTimeout(animateSkillBars,500);
    console.log('hit')
  }
}

// Don`t forget to export your renderer
export default AboutRenderer