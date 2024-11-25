/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { ScapeApi } from '../../../../api/scapeApi';
import { Link } from 'react-router-dom';

const RecentScape = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

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
  }

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
        <div className="border p-4 rounded-2xl">
          <p className="text-center">No recent scapes.</p>
        </div>
    </div>
  )
}

export default RecentScape