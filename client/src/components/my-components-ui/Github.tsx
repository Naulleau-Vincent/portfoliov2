import IcGithub from '../../images/icon-github.svg';
import type { IGithub } from '../../shared/models/github-models';

const Github = ({ className }: IGithub) => {
  return (
    <div className={className}>
      <img src={IcGithub} alt='GitHub icon'/>
    </div>
  )
}
  
export default Github