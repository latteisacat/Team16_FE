import { useRecoilState } from 'recoil';
import regionState, { RegionType } from 'recoil/regionState';
import speciesState, { SpeciesType } from 'recoil/speciesState';
import CategoryModalList, {
  CategoryModalType,
  VCategoryModalListProps,
} from 'commons/modals/VCategoryModalList';
import { redirect, useNavigate } from 'react-router-dom';

export interface CategoryModalProps {
  handleModalCloseClick: () => void;
  handleModalOutsideClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  speciesOrRegion: CategoryModalType;
  setSpeciesOrRegion: (speciesOrRegion: CategoryModalType) => void;
}

const CategoryModal = ({
  handleModalCloseClick,
  handleModalOutsideClick,
  speciesOrRegion,
  setSpeciesOrRegion,
}: CategoryModalProps) => {
  const [species, setSpecies] = useRecoilState(speciesState);
  const [region, setRegion] = useRecoilState(regionState);
  const navigate = useNavigate();

  const speciesList: SpeciesType[] = ['강아지', '고양이', '기타', '전체'];
  const regionList: RegionType[] = [
    '전국',
    '서울',
    '경기',
    '인천',
    '제주특별자치도',
    '충북',
    '충남',
    '대전',
    '경북',
    '경남',
    '대구',
    '울산',
    '부산',
    '전북',
    '전남',
    '광주',
    '강원특별자치도',
    '세종특별자치시',
  ];

  const handleSpeciesClick = (speciess: SpeciesType) => {
    setSpecies(speciess);
    setSpeciesOrRegion('region');
  };
  const handleRegionClick = (regions: RegionType) => {
    setRegion(regions);
    handleModalCloseClick();
    navigate(`/`);
    // ?type=${species}?area=${region}?page=${1}
  };

  const categoryModalListProps: VCategoryModalListProps = {
    speciesOrRegion,
    speciesList,
    handleSpeciesClick,
    regionList,
    handleRegionClick,
  };

  return (
    <div
      onClick={handleModalOutsideClick}
      className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div className="w-3/5 h-4/5 bg-white rounded-md overflow-auto">
        <div className="flex justify-between p-5">
          <div className="flex gap-3">
            <button
              className={`${
                speciesOrRegion === 'species' &&
                'object-contain border-b-2 border-yellow-600 font-bold text-yellow-600'
              }`}
              onClick={() => setSpeciesOrRegion('species')}
            >
              종류
            </button>
            <button
              className={`${
                speciesOrRegion === 'region' &&
                'object-contain border-b-2 border-yellow-600 font-bold text-yellow-600'
              }`}
              onClick={() => setSpeciesOrRegion('region')}
            >
              지역
            </button>
          </div>
          <button onClick={handleModalCloseClick} className="text-2xl">
            X
          </button>
        </div>

        <CategoryModalList {...categoryModalListProps} />
      </div>
    </div>
  );
};

export default CategoryModal;
