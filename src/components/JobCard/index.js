import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillBriefcaseFill } from "react-icons/bs";

import "./index.css";

const useJobInfo = (jobDetails) => {
  return {
    logoUrl: jobDetails.companyLogoUrl,
    type: jobDetails.employmentType,
    description: jobDetails.jobDescription,
    location: jobDetails.location,
    salary: jobDetails.packagePerAnnum,
    rating: jobDetails.rating,
    title: jobDetails.title,
    id: jobDetails.id,
  };
};

const JobCard = ({ jobDetails }) => {
  const { logoUrl, type, description, location, salary, rating, title, id } =
    useJobInfo(jobDetails);

  return (
    <li className="jobcard-root">
      <Link to={`/jobs/${id}`} className="jobcard-link">
        <img src={logoUrl} alt="company logo" className="jobcard-logo" />
        <div>
          <h1 className="jobcard-title">{title}</h1>
          <div className="jobcard-rating">
            <AiFillStar className="jobcard-star" />
            <p className="jobcard-rating-value">{rating}</p>
          </div>
        </div>
        <div className="jobcard-details-row">
          <div className="jobcard-detail">
            <IoLocationSharp className="jobcard-icon" />
            <p className="jobcard-text">{location}</p>
          </div>
          <div className="jobcard-detail">
            <BsFillBriefcaseFill className="jobcard-icon" />
            <p className="jobcard-text">{type}</p>
          </div>
          <p className="jobcard-salary">{salary}</p>
        </div>
        <hr className="jobcard-divider" />
        <h1 className="jobcard-desc-heading">Description</h1>
        <p className="jobcard-desc">{description}</p>
      </Link>
    </li>
  );
};

export default JobCard;
