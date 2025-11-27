import { AiFillStar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillBriefcaseFill } from "react-icons/bs";

import "./index.css";

const SimilarJobCard = (props) => {
  const { jobDetails } = props;
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails;

  return (
    <li className="similar-job-item">
      <div className="similar-job-header">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-company-logo"
        />
        <div className="similar-job-title-rating">
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-job-rating">
            <AiFillStar className="similar-job-star-icon" />
            <p className="similar-job-rating-text">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="similar-job-section-title">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>

      <div className="similar-job-footer">
        <div className="similar-job-meta-item">
          <IoLocationSharp className="similar-job-meta-icon" />
          <p className="similar-job-meta-text">{location}</p>
        </div>
        <div className="similar-job-meta-item">
          <BsFillBriefcaseFill className="similar-job-meta-icon" />
          <p className="similar-job-meta-text">{employmentType}</p>
        </div>
      </div>
    </li>
  );
};

export default SimilarJobCard;
