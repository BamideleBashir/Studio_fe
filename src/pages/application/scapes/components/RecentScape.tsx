/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ScapeApi } from "../../../../api/scapeApi";
import { Link } from "react-router-dom";
import { IScape } from "../../../../types";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';

const RecentScape = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IScape[]>([]);

  console.log(data, loading);

  const fetchData = () => {
    setLoading(true);
    ScapeApi.getYourScapes()
      .then((res) => {
        console.log(res);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between mt-4">
        <h4 className="font-medium text-2xl">Recent</h4>
        <div>
          <Link to="/scapes/1">See all</Link>
        </div>
      </div>

      {/* no recent scape */}
      {
        data.length === 0 && (
          <div className="border p-4 rounded-2xl">
            <p className="text-center">No recent scapes.</p>
          </div>
        )
      }

      <div>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          modules={[Pagination]}
          className="pb-8 mb-0"
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {data.map((scape, index) => (
            <SwiperSlide key={index}>
              <div className="border p-4 rounded-2xl">
                <h4 className="font-medium text-xl">{scape.scapeTitle}</h4>
                <p>{scape.about}</p>

                {/* view details button */}
                <div className="mt-2">
                  <Link
                    className="text-blue-500 text-sm underline"
                  to={`/scapes/${scape._id}`}>View details</Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RecentScape;
