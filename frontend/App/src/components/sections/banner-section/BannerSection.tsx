import {
  BannerSectionContainer,
  Banner,
  BannerImage,
} from './BannerSection.styles';

const BannerSection = () => {
  return (
    <BannerSectionContainer maxWidth={false}>
      <Banner>
        <BannerImage image="/assets/ciber-library-image1-612x612.jpg" />
      </Banner>
      <Banner>
        <BannerImage image="/assets/ciber-library-image2-612x612.jpg" />
      </Banner>
    </BannerSectionContainer>
  );
};

export default BannerSection;
