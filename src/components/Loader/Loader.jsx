import { RotatingLines } from 'react-loader-spinner';
import { StyledLoader } from './Loader.styled';

export const Loader = () => {
  return (
    <StyledLoader>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </StyledLoader>
  );
};
