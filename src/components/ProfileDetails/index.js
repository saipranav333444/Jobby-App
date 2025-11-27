import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import { useState, useEffect } from "react";

import "./index.css";

const API_STATUS = {
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const ProfileDetails = () => {
  const [profileStatus, setProfileStatus] = useState(API_STATUS.IN_PROGRESS);
  const [profile, setProfile] = useState({});

  const fetchProfile = async () => {
    setProfileStatus(API_STATUS.IN_PROGRESS);

    const jwt = Cookies.get("jwt_token");
    const res = await fetch("https://apis.ccbp.in/profile", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    const data = await res.json();

    if (res.ok) {
      const pd = data.profile_details;
      setProfile({
        name: pd.name,
        profileImageUrl: pd.profile_image_url,
        shortBio: pd.short_bio,
      });
      setProfileStatus(API_STATUS.SUCCESS);
    } else {
      setProfileStatus(API_STATUS.FAILURE);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const renderProfileView = () => (
    <div className="profile-container">
      <img
        src={profile.profileImageUrl}
        alt="profile"
        className="profile_avatar"
      />
      <h1 className="profile-title">{profile.name}</h1>
      <p className="profile-description">{profile.shortBio}</p>
    </div>
  );

  const renderLoading = () => (
    <div className="profile-loader-container">
      <ThreeDots color="ffffff" height="50" width="50" />
    </div>
  );

  const renderFailure = () => (
    <div className="profile-error-container">
      <button className="profile-retry-button" onClick={fetchProfile}>
        Retry
      </button>
    </div>
  );

  switch (profileStatus) {
    case API_STATUS.SUCCESS:
      return renderProfileView();

    case API_STATUS.IN_PROGRESS:
      return renderLoading();

    case API_STATUS.FAILURE:
      return renderFailure();

    default:
      return null;
  }
};

export default ProfileDetails;
