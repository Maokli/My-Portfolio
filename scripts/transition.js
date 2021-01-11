import Highway from '@dogstudio/highway';

// GSAP Library
import Tween from 'gsap';

// Fade
class Fade extends Highway.Transition {
  in({ from, to, done }) {
    // Reset Scroll
    window.scrollTo(0, 0);

    // Remove Old View
    from.remove();

    // Animation
    Tween.fromTo(to, 
      { marginBottom: '100%' },
      {
        bottom: 0,
        onComplete: done,
        duration: .5
      }
    );
  }

  out({ from, done }) {
    // Animation
    Tween.fromTo(from, 
      { marginTop: '100%' },
      {
        top: 0,
        onComplete: done,
        duration: .5
      }
    );
  }
}

export default Fade;