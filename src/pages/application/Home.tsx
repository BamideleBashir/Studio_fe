import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaArrowRight } from "react-icons/fa6";
import RecentScape from "./scapes/components/RecentScape";
import Logo from "../../assets/logo/image.png";
import NewHomeIllustration from "../../assets/illustrations/new_home_illus.png";

const featurePoints = [
  {
    title: "Map & AR based",
    description: "Anchor your world to real locations on the map.",
  },
  {
    title: "Pin what matters",
    description: "Add real world objects, activities and people.",
  },
  {
    title: "Share & explore",
    description: "Let anyone discover and interact with your scape.",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/create-scape");
  };

  return (
    <div className="mb-10 px-6 py-6">
      {/* Hero */}
      <section className="rounded-3xl border border-gray-100 bg-gradient-to-br from-purple-50 to-blue-50 p-6 shadow-sm sm:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <img src={Logo} alt="Studio logo" className="h-12 w-auto sm:h-14 hidden" />

            <h1 className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              Build map-based virtual worlds
            </h1>
            <p className="mt-3 max-w-xl text-base text-gray-600 sm:text-lg">
              Create scapes — spatial environments for real world activities,
              objects and people.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleButtonClick}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white shadow-sm transition hover:opacity-90"
              >
                <FaPlus className="text-sm" /> Create new scape
              </button>
              <Link
                to="/scapes"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
              >
                View all scapes <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <img
              src={NewHomeIllustration}
              alt="Home illustration"
              className="mx-auto max-h-72 w-full object-contain sm:max-h-80"
            />
          </div>
        </div>
      </section>

      {/* Recent scapes */}
      <section className="mt-10">
        <RecentScape />
      </section>

      {/* What is a scape */}
      <section className="mt-10 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              What is a scape?
            </h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-gray-600">
              A scape is a map or AR-based virtual world that mirrors real world
              spaces. Pin real world objects, activities and people to it so
              anyone can explore, discover and interact with what’s around them.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {featurePoints.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4"
                >
                  <h3 className="font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#FFF3EF] to-purple-50 p-6 text-center">
            <p className="text-lg font-medium text-gray-800">
              Ready to build your world?
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Spin up a new scape in minutes.
            </p>
            <button
              onClick={handleButtonClick}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white shadow-sm transition hover:opacity-90"
            >
              <FaPlus className="text-sm" /> Create new
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
