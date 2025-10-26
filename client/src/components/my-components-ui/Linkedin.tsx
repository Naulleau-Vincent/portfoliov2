import IcLinkedin from '../../images/icon-linkedin.svg';
import type { ILinkedin } from '../../shared/models/linkedin-models';

const Linkedin = ({ className }: ILinkedin) => {
  return (
    <div className={className}>
      <img src={IcLinkedin} alt='Linkedin'/>
    </div>
  )
}
  
export default Linkedin