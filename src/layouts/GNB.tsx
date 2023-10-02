import ModalPortal from 'commons/ModalPortal';
import { useState } from 'react';
import CategoryModal, { CategoryModalProps } from 'commons/CategoryModal';
import { CategoryModalType } from 'components/molecules/VCategoryModalList';
import { useLocation } from 'react-router-dom';
import VGNB, { VGNBProps } from './VGNB';

const GNB = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [speciesOrRegion, setSpeciesOrRegion] =
    useState<CategoryModalType>('species');

  const handleCategoryButtonClick = () => {
    setIsModalOpen(true);
  };
  const handleModalCloseClick = () => {
    setIsModalOpen(false);
    setSpeciesOrRegion('species');
  };
  const handleModalOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
      setSpeciesOrRegion('species');
    }
  };

  const pathName = useLocation().pathname;

  const categoryModalProps: CategoryModalProps = {
    handleModalCloseClick,
    handleModalOutsideClick,
    speciesOrRegion,
    setSpeciesOrRegion,
  };

  const vGNBProps: VGNBProps = {
    handleCategoryButtonClick,
    isProfilePage: pathName === '/profile',
    isFindShelterPage: pathName === '/find-shelter',
    isRegisterPage: pathName === '/register',
  };

  return (
    <>
      <VGNB {...vGNBProps} />
      {isModalOpen && (
        <ModalPortal>
          <CategoryModal {...categoryModalProps} />
        </ModalPortal>
      )}
    </>
  );
};

export default GNB;
