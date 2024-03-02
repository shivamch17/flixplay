import React, { useEffect, useState } from "react";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import "./style.scss";
import oridata from "../../assets/keys.json";
import TvCard from "../../components/movieCard/TvCard";
import Select from "react-select";

const ExploreTv = () => {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setData(oridata);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data?.filter((item) =>
    item.channel_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">Explore Live TV Channels</div>
          <div className="filters">
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="content">
          {filteredData?.map((item, index) => {
            return <TvCard key={index} data={item} />;
          })}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default ExploreTv;
