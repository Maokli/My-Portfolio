import Highway from '@dogstudio/highway';
import AOS from 'aos';

class ContactsRenderer extends Highway.Renderer {
  onEnterCompleted() { 
    
    AOS.init();
    let scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
      if(script.src.includes('/index.js')){
        script.remove();
        console.log(script);
      }
      console.log(script.src);
    });
        
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
    setTimeout(scrollAnimations,1000);
  }
}

// Don`t forget to export your renderer
export default ContactsRenderer;