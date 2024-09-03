import React, { useState } from "react";
import { Button, Dropdown, DatePicker, Select, Space, Card } from "antd";
import { FilterOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Option } = Select;

export const Filter = ({ languages, onFilterApply }) => {
  const [dateRange, setDateRange] = useState(null);
  const [language, setLanguage] = useState(null);
  const [stars, setStars] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const handleStarsChange = (value) => {
    setStars(value);
  };

  const handleApplyFilter = () => {
    onFilterApply({
      dateRange,
      language,
      stars,
    });
    setVisible(false);
  };

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const overlay = (
    <Card style={{ width: 300 }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div>
          <h4>Date Range</h4>
          <RangePicker
            onChange={handleDateRangeChange}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <h4>Language</h4>
          <Select
            style={{ width: "100%" }}
            onChange={handleLanguageChange}
            placeholder="Select language">
            <Option value="">All Languages</Option>
            {languages && languages.length > 0 ? (
              languages.map((language) => (
                <Option key={language} value={language.toLowerCase()}>
                  {language}
                </Option>
              ))
            ) : (
              <>
                <Option value="javascript">JavaScript</Option>
                <Option value="python">Python</Option>
                <Option value="java">Java</Option>
                <Option value="typescript">TypeScript</Option>
                <Option value="go">Go</Option>
              </>
            )}
          </Select>
        </div>
        <div>
          <h4>Stars</h4>
          <Select
            style={{ width: "100%" }}
            onChange={handleStarsChange}
            placeholder="Select stars">
            <Option value="">All</Option>
            <Option value="0-10">&lt; 10</Option>
            <Option value="10-100">10 - 100</Option>
            <Option value="100-1000">100 - 1000</Option>
            <Option value="1000+">&gt; 1000</Option>
          </Select>
        </div>
        <Button
          type="secondary"
          onClick={handleApplyFilter}
          style={{ width: "100%" }}>
          Apply Filters
        </Button>
      </Space>
    </Card>
  );

  return (
    <Dropdown
      overlay={overlay}
      trigger={["click"]}
      visible={visible}
      onVisibleChange={handleVisibleChange}>
      <Button>
        Filter <FilterOutlined />
      </Button>
    </Dropdown>
  );
};
