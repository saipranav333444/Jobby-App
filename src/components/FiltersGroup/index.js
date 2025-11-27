import "./index.css";

const employmentTypesList = [
  { label: "Full Time", employmentTypeId: "FULLTIME" },
  { label: "Part Time", employmentTypeId: "PARTTIME" },
  { label: "Freelance", employmentTypeId: "FREELANCE" },
  { label: "Internship", employmentTypeId: "INTERNSHIP" },
];

const salaryRangesList = [
  { salaryRangeId: "1000000", label: "10 LPA and above" },
  { salaryRangeId: "2000000", label: "20 LPA and above" },
  { salaryRangeId: "3000000", label: "30 LPA and above" },
  { salaryRangeId: "4000000", label: "40 LPA and above" },
];

const FiltersGroup = ({ updatedEmploymentTypesChecked, updatedSalary }) => {
  return (
    <div className="filters-box">
      <h1 className="filters-section-title">Type of Employment</h1>
      <ul className="filters-list">
        {employmentTypesList.map(({ employmentTypeId, label }) => (
          <li className="filters-list-item" key={employmentTypeId}>
            <input
              type="checkbox"
              className="checkbox-input"
              id={employmentTypeId}
              onChange={() => updatedEmploymentTypesChecked(employmentTypeId)}
            />
            <label htmlFor={employmentTypeId} className="filter-label">
              {label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="seperator" />
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filters-list">
        {salaryRangesList.map(({ salaryRangeId, label }) => (
          <li className="filters-list-item" key={salaryRangeId}>
            <input
              type="radio"
              className="checkbox-input"
              id={salaryRangeId}
              name="salary ranges"
              onChange={() => updatedSalary(salaryRangeId)}
            />
            <label className="filter-label" htmlFor={salaryRangeId}>
              {label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FiltersGroup;
