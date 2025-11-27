import { ThreeDots } from "react-loader-spinner";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

import Header from "../Header";
import SimilarJobCard from "../SimilarJobCard";

import "./index.css";

const apiStatus = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const formatJobData = (data) => {
  const job = data.job_details;
  return {
    jobDetails: {
      companyLogoUrl: job.company_logo_url,
      companyWebsiteUrl: job.company_website_url,
      employmentType: job.employment_type,
      jobDescription: job.job_description,
      location: job.location,
      rating: job.rating,
      title: job.title,
      packagePerAnnum: job.package_per_annum,
      skills: job.skills.map((skill) => ({
        imageUrl: skill.image_url,
        name: skill.name,
      })),
      lifeAtCompany: {
        description: job.life_at_company.description,
        imageUrl: job.life_at_company.image_url,
      },
    },
    similarJobs: data.similar_jobs.map((jobItem) => ({
      companyLogoUrl: jobItem.company_logo_url,
      employmentType: jobItem.employment_type,
      id: jobItem.id,
      jobDescription: jobItem.job_description,
      location: jobItem.location,
      rating: jobItem.rating,
      title: jobItem.title,
    })),
  };
};

const JobItemDetails = (props) => {
  const [status, setStatus] = useState(apiStatus.LOADING);
  const [jobDetails, setJobDetails] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  console.log(status);

  const fetchSpecificJobDetails = async () => {
    setStatus(apiStatus.LOADING);
    const { id } = props.match.params;
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://apis.ccbp.in/jobs/${id}`;
    const options = {
      headers: { Authorization: `Bearer ${jwtToken}` },
      method: "GET",
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      const { jobDetails, similarJobs } = formatJobData(data);
      setJobDetails(jobDetails);
      setSimilarJobs(similarJobs);
      setStatus(apiStatus.SUCCESS);
    } else {
      setStatus(apiStatus.FAILURE);
    }
  };

  useEffect(() => {
    fetchSpecificJobDetails();
  }, []);

  const renderLoader = () => (
    <div className="jobs-hooks-loader">
      <ThreeDots height="50" width="50" color="#272727" />
    </div>
  );

  const renderFailure = () => (
    <div className="jobs-hooks-failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-hooks-failure-img"
      />
      <h1 className="jobs-hooks-failure-title">Oops! Something Went Wrong</h1>
      <p className="jobs-hooks-failure-desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="jobs-hooks-retry-btn"
        onClick={fetchSpecificJobDetails}
      >
        Retry
      </button>
    </div>
  );

  const renderSuccess = () => {
    if (!jobDetails) return null;
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
      packagePerAnnum,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
    } = jobDetails;
    return (
      <div className="job-details-main">
        <div className="job-details-card">
          <div className="job-details-header">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="job-details-company-logo"
            />
            <div className="job-details-title-rating">
              <h1 className="job-details-title">{title}</h1>
              <div className="job-details-rating">
                <AiFillStar className="job-details-star-icon" />
                <p className="job-details-rating-text">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-meta">
            <div className="job-details-meta-left">
              <div className="job-details-meta-item">
                <IoLocationSharp className="job-details-meta-icon" />
                <p className="job-details-meta-text">{location}</p>
              </div>
              <div className="job-details-meta-item">
                <BsFillBriefcaseFill className="job-details-meta-icon" />
                <p className="job-details-meta-text">{employmentType}</p>
              </div>
            </div>
            <p className="job-details-salary">{packagePerAnnum}</p>
          </div>
          <hr className="job-details-divider" />
          <div className="job-details-description-header">
            <h1 className="job-details-section-title">Description</h1>
            <a
              href={companyWebsiteUrl}
              className="job-details-company-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit <FiExternalLink className="job-details-external-icon" />
            </a>
          </div>
          <p className="job-details-description">{jobDescription}</p>
          <h1 className="job-details-section-title">Skills</h1>
          <ul className="job-details-skills-list">
            {skills.map((skill) => (
              <li className="job-details-skill-item" key={skill.name}>
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="job-details-skill-image"
                />
                <p className="job-details-skill-name">{skill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="job-details-section-title">Life at Company</h1>
          <div className="job-details-life">
            <p className="job-details-life-text">{lifeAtCompany.description}</p>
            <img
              className="job-details-life-image"
              src={lifeAtCompany.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="job-details-similar-title">Similar Jobs</h1>
        <ul className="job-details-similar-list">
          {similarJobs.map((job) => (
            <SimilarJobCard key={job.id} jobDetails={job} />
          ))}
        </ul>
      </div>
    );
  };

  const renderJobDetailsContent = () => {
    if (status === apiStatus.LOADING) return renderLoader();
    if (status === apiStatus.FAILURE) return renderFailure();
    if (status === apiStatus.SUCCESS) return renderSuccess();
  };

  return (
    <div className="job-details-page">
      <Header />
      {renderJobDetailsContent()}
    </div>
  );
};

export default JobItemDetails;
