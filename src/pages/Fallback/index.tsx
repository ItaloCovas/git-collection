import Loader from '../../components/Loader';

import './styles.scss';

const Fallback: React.FC = () => {
  return (
    <div className="fallback">
      <Loader />
    </div>
  );
};

export default Fallback;
