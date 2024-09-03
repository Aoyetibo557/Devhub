import React, { useState, useEffect } from "react";
import { StatsCard } from "./card";
import { RepoCard } from "./repocard";
import { Spin, Pagination } from "antd";

const SearchResultList = ({ result, filters,  isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setCurrentPage(1)
  },[result])

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filterRepositories = (repositories, filters) => {
  // If no filters are applied, return all repositories
  if (!filters || Object.keys(filters).every(key => filters[key] === null || filters[key] === undefined)) {
    return repositories;
  }

  return repositories.filter(repo => {
    // Language filter
    if (filters.language && repo.language?.toLowerCase() !== filters.language.toLowerCase()) {
      return false;
    }

    // Stars filter
    if (filters.stars) {
      const starCount = repo.stargazers_count;
      switch (filters.stars) {
        case '0-10':
          if (starCount >= 10) return false;
          break;
        case '10-100':
          if (starCount < 10 || starCount >= 100) return false;
          break;
        case '100-1000':
          if (starCount < 100 || starCount >= 1000) return false;
          break;
        case '1000+':
          if (starCount < 1000) return false;
          break;
      }
    }

    // Date range filter
    if (filters.dateRange && filters.dateRange.length === 2) {
      const repoDate = new Date(repo.created_at);
      const [startDate, endDate] = filters.dateRange;
      if (repoDate < startDate || repoDate > endDate) {
        return false;
      }
    }

    return true;
  });
};

  const filteredResult = filterRepositories(result, filters);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredResult.slice(startIndex, endIndex);
  };

  if (isLoading) {
    return (
      <div
        className={`w-full flex flex-row justify-center mt-10 gap-3 flex-wrap`}>
        <Spin size="large" />
      </div>
    );
  }

  if(filters && filteredResult.length <=0 ) {
    return  <div className={`text-center text-base text-black font-medium`}>No result found!</div>
  }

  return (
    <div className={`flex flex-col items-center`}>
      <div className={`flex flex-row flex-wrap justify-center`}>
        {getPaginatedData().map((item) => (
          <RepoCard key={item.id} {...item} />
        ))}
      </div>
      {filteredResult.length > 10 && (
        <Pagination
          current={currentPage}
          total={filteredResult.length}
          responsive={true}
            showSizeChanger={false}
            pageSize={pageSize}
          onChange={handlePageChange}
          showTotal={(total) => `${total} public repos`}
          className="mt-4"
        />
      )}
    </div>
  );
};

export default SearchResultList;
