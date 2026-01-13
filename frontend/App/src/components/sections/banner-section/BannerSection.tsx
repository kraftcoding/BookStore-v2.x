import {
  BannerSectionContainer,
  Banner,
  BannerImage,
} from './BannerSection.styles';

const BannerSection = () => {
  return (
    <BannerSectionContainer maxWidth={false}>
      <Banner>
        <BannerImage image="/assets/image-place-holder-banner.png" />
      </Banner>
      <Banner>
        <BannerImage image="/assets/image-place-holder-banner.png" />
      </Banner>
    </BannerSectionContainer>
  );
};

export default BannerSection;
