import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";

import Header from "../Header";
import JobCard from "../JobCard";
import ProfileDetails from "../ProfileDetails";
import FiltersGroup from "../FiltersGroup";

import "./index.css";

const API_STATUS = {
  INITIAL: "INITIAL",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  LOADING: "LOADING",
};

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [salary, setSalary] = useState(1000000);

  const [jobsStatus, setJobsStatus] = useState(API_STATUS.INITIAL);
  const [jobs, setJobs] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  const handleEmploymentType = (typeId) => {
    setEmploymentTypes((prev) => {
      const updated = prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId];
      fetchJobs(updated, salary, search);
      return updated;
    });
  };

  const handleSalary = (salaryId) => {
    setSalary(salaryId);
    fetchJobs(employmentTypes, salaryId, search);
  };

  const fetchJobs = async (
    employmentTypesChecked = employmentTypes,
    salaryRangeId = salary,
    searchInput = search
  ) => {
    setJobsStatus(API_STATUS.LOADING);

    const jwt = Cookies.get("jwt_token");
    const employTypes = employmentTypesChecked.join(",");

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employTypes}&minimum_package=${salaryRangeId}&search=${searchInput}`;

    const options = {
      headers: { Authorization: `Bearer ${jwt}` },
      method: "GET",
    };

    const response = await fetch(apiUrl, options);
    const data = await response.json();

    if (response.ok) {
      const updatedJobs = data.jobs.map((job) => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }));

      setJobs(updatedJobs);
      setJobsStatus(API_STATUS.SUCCESS);
      setCurrentPage(1);
      window.scrollTo(0, 0);
    } else {
      setJobsStatus(API_STATUS.FAILURE);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Search Bar
  const renderSearchBar = (barId) => (
    <div className="jobs-hooks-searchbar" id={barId}>
      <input
        className="jobs-hooks-search-input"
        type="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="jobs-hooks-search-btn"
        type="button"
        onClick={() => fetchJobs(employmentTypes, salary, search)}
      >
        <BsSearch className="jobs-hooks-search-icon" />
      </button>
    </div>
  );

  // Sidebar
  const renderSidebar = () => (
    <div className="jobs-hooks-sidebar">
      {renderSearchBar("jobsHooksSmallBar")}
      <ProfileDetails />
      <FiltersGroup
        updatedEmploymentTypesChecked={handleEmploymentType}
        updatedSalary={handleSalary}
      />
    </div>
  );

  // Loader
  const renderJobsLoader = () => (
    <div className="jobs-hooks-loader">
      <ThreeDots height="50" width="50" color="#ffffff" />
    </div>
  );

  // Failure View
  const renderJobsFailure = () => (
    <div className="jobs-hooks-failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-hooks-failure-img"
      />
      <h1 className="jobs-hooks-failure-title">Oops! Something Went Wrong</h1>
      <p className="jobs-hooks-failure-desc">
        We cannot seem to find the data you are looking for
      </p>
      <button
        type="button"
        className="jobs-hooks-retry-btn"
        onClick={() => fetchJobs()}
      >
        Retry
      </button>
    </div>
  );

  // No Jobs Found view
  const renderNoJobs = () => (
    <div className="jobs-hooks-failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="jobs-hooks-failure-img"
      />
      <h1 className="jobs-hooks-failure-title">No Jobs Found</h1>
      <p className="jobs-hooks-failure-desc">
        We could not find any jobs. Try another search or filter.
      </p>
    </div>
  );

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const renderPagination = () =>
    jobs.length > 10 && (
      <div className="pagination-container">
        <button
          type="button"
          disabled={currentPage === 1}
          className="jobs-hooks-retry-btn"
          onClick={() => {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
          }}
        >
          Previous
        </button>

        <span className="page-number">
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          disabled={currentPage === totalPages}
          className="jobs-hooks-retry-btn"
          onClick={() => {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
          }}
        >
          Next
        </button>
      </div>
    );

  // Success View
  const renderJobsList = () => {
    if (jobs.length === 0) return renderNoJobs();

    return (
      <>
        <ul className="jobs-hooks-list">
          {currentJobs.map((job) => (
            <JobCard key={job.id} jobDetails={job} />
          ))}
        </ul>
        {renderPagination()}
      </>
    );
  };

  // Switch view
  const renderJobsContent = () => {
    switch (jobsStatus) {
      case API_STATUS.LOADING:
        return renderJobsLoader();

      case API_STATUS.FAILURE:
        return renderJobsFailure();

      case API_STATUS.SUCCESS:
        return renderJobsList();

      default:
        return null;
    }
  };

  return (
    <div className="jobs-hooks-main">
      <Header />
      <div className="jobs-hooks-page">
        {renderSidebar()}
        <div className="jobs-hooks-content">
          {renderSearchBar("jobsHooksLargeBar")}
          {renderJobsContent()}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
