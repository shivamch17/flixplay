import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Spinner from "../../components/spinner/Spinner";
import AnimeCard from "../../components/movieCard/AnimeCard";

const fetchAnimeData = async (pageNum) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url:
      `https://proxymaster-1-q6640207.deta.app/fetch/https://api.anix.cc/movies/filter?limit=40&select=slug%2Cmovie%2Ctype%2Clatest_episode%2Cthumb%2Cname%2Csub_category%2Creleased_year%2Cgenres%2Cstate%2Cintro%2Ccreated_at%2Cother_names&sort_by=latest_episode.created_at&page=${pageNum}`,
    headers: {
      authority: "api.anix.cc",
      accept: "application/json",
      "accept-language": "en-US,en;q=0.5",
      "cache-control": "no-cache",
      "content-type": "application/json",
      origin: "https://www.anix.cc",
      pragma: "no-cache",
      referer: "https://www.anix.cc/",
      "sec-ch-ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Brave";v="122"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "sec-gpc": "1",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    },
  };

  try {
    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const fetchSearchData = async (query) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://proxymaster-1-q6640207.deta.app/fetch/https://api.anix.cc/movies/filter?limit=80&keywords=${query}`,
    headers: {

      authority: "api.anix.cc",
      accept: "application/json",
      "accept-language": "en-US,en;q=0.5",
      "cache-control": "no-cache",
      "content-type": "application/json",
      origin: "https://www.anix.cc",
      pragma: "no-cache",
      referer: "https://www.anix.cc/",
      "sec-ch-ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Brave";v="122"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "sec-gpc": "1",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    },
  };

  try {
    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const ExploreAnime = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchInitialData = () => {
    setLoading(true);
    fetchAnimeData(pageNum).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchAnimeData(pageNum).then((res) => {
      if (data?.docs) {
        setData({
          ...data,
          docs: [...data?.docs, ...res.docs],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  const handleSearch = () => {
    setLoading(true);
    fetchSearchData(searchQuery).then((res) => {
      setData(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    setData(null);
    setPageNum(1);
    fetchInitialData();
  }, []);

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">Explore Anime</div>
          <div className="filters">
            <div className="searchInput">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search Anime"
              />
            </div>
          </div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data?.docs?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.docs?.length || []}
                next={fetchNextPageData}
                hasMore={true}
                loader={<Spinner />}
              >
                {data?.docs?.map((item, index) => {
                  return <AnimeCard key={index} data={item} />;
                })}
              </InfiniteScroll>
            ) : (
              <span className="resultNotFound">Sorry, Results not found!</span>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default ExploreAnime;
