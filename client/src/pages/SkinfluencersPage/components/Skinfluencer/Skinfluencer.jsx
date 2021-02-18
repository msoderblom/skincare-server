import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { SiTiktok } from "react-icons/si";
import { HiLink } from "react-icons/hi";
import * as S from "./styled";

const Skinfluencer = ({ skinfluencer }) => {
  const { socialLinks } = skinfluencer;

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return <InstagramIcon />;
      case "twitter":
        return <TwitterIcon />;
      case "youtube":
        return <YouTubeIcon />;
      case "tiktok":
        return <SiTiktok />;

      default:
        return <HiLink />;
    }
  };
  return (
    <S.Container>
      <h3>{skinfluencer.name}</h3>
      <p>{skinfluencer.title}</p>
      <p>{skinfluencer.about}</p>
      {socialLinks.length > 0 && (
        <div>
          {socialLinks.map((socialLink) => (
            <div key={socialLink._id}>
              {getPlatformIcon(socialLink.platform)}
              <a href={socialLink.url} target="_blank" rel="noreferrer">
                {socialLink.linkName}
              </a>
            </div>
          ))}
        </div>
      )}
    </S.Container>
  );
};

export default Skinfluencer;
