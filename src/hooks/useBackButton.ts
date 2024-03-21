import { useBackButton as useBackButtonComponent } from '@tma.js/sdk-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMount } from './useMount';

export const useBackButton = (onClick?: () => void) => {
  const navigate = useNavigate();
  const backButton = useBackButtonComponent();

  const handleBackButtonClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useMount(() => {
    backButton.on('click', onClick ?? handleBackButtonClick);
    backButton.show();

    return () => {
      backButton.hide();
      backButton.off('click', onClick ?? handleBackButtonClick);
    };
  });
};
