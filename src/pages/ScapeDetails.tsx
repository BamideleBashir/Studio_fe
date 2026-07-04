/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  PencilSquareIcon,
  ArchiveBoxIcon,
  ArchiveBoxXMarkIcon,
  CameraIcon,
  UserCircleIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  TagIcon,
  UsersIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import { IScape } from "../types";
import { ScapeApi } from "../api/scapeApi";
import ScapeObjectList from "./sections/ScapeObjectList";
import ScapeActivityList from "./sections/ScapeActivityList";
import ScapeLightObjectList from "./sections/ScapeLightObjectList";
import EditScapeModal from "./modals/EditScapeModal";
import { parseKeywords } from "../utility";

const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
    <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-4">
      <span className="text-blue">{icon}</span>
      {title}
    </h3>
    {children}
  </div>
);

const Stat = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex items-center gap-3">
    <div className="w-10 h-10 rounded-xl bg-blue/10 text-blue flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-800 capitalize truncate">
        {value}
      </p>
    </div>
  </div>
);

const ScapeDetails = () => {
  const { id } = useParams<string>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IScape | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [updatingIcon, setUpdatingIcon] = useState(false);
  const iconInputRef = useRef<HTMLInputElement>(null);

  const fetchScape = async () => {
    if (!id) return;

    ScapeApi.getScapeById(id)
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
    fetchScape();
  }, [id]);

  const handleIconChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!id || !file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUpdatingIcon(true);
    try {
      await ScapeApi.update(id, formData);
      toast.success("Scape image updated");
      fetchScape();
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to update image");
    } finally {
      setUpdatingIcon(false);
    }
  };

  const handleArchiveToggle = async () => {
    if (!id || !data) return;

    const willArchive = !data.archived;
    const confirmMessage = willArchive
      ? "Archive this scape? It will no longer be publicly available — only you will be able to view it."
      : "Unarchive this scape? It will become publicly available again.";

    if (!window.confirm(confirmMessage)) return;

    setArchiving(true);
    try {
      if (willArchive) {
        await ScapeApi.archive(id);
        toast.success("Scape archived");
      } else {
        await ScapeApi.unarchive(id);
        toast.success("Scape unarchived");
      }
      fetchScape();
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to update archive status");
    } finally {
      setArchiving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-gray-500 font-medium">Loading scape…</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-gray-500 font-medium">No data found.</p>
      </div>
    );
  }

  if (data.restricted) {
    return (
      <div className="max-w-lg mx-auto mt-16 bg-white border border-gray-100 shadow-sm rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
          <ArchiveBoxIcon className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{data.title}</h2>
        <p className="text-gray-500 text-sm">
          This scape has been archived by its creator and is no longer
          publicly available.
        </p>
      </div>
    );
  }

  const keywords = parseKeywords(data.keywords);

  return (
    <div className="max-w-5xl mx-auto pb-10 space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {data.title}
              </h1>
              {data.archived && (
                <span className="bg-gray-800 text-white text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                  Archived
                </span>
              )}
            </div>
            {data.category && (
              <span className="inline-flex items-center gap-1 bg-blue/10 text-blue px-3 py-1 rounded-full text-xs font-semibold capitalize mt-2">
                <TagIcon className="w-3.5 h-3.5" />
                {data.category}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-1.5 black_button px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap"
            >
              <PencilSquareIcon className="w-4 h-4" />
              Edit Scape
            </button>
            <button
              onClick={handleArchiveToggle}
              disabled={archiving}
              className="flex items-center gap-1.5 border border-gray-300 text-gray-700 hover:border-black px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap disabled:opacity-50"
            >
              {data.archived ? (
                <ArchiveBoxXMarkIcon className="w-4 h-4" />
              ) : (
                <ArchiveBoxIcon className="w-4 h-4" />
              )}
              {archiving
                ? "Please wait…"
                : data.archived
                  ? "Unarchive"
                  : "Archive"}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Icon */}
          {data.icon && (
            <div className="relative w-full sm:w-48 h-48 shrink-0">
              <img
                src={data.icon.url}
                alt={`${data.title} Icon`}
                className="w-full h-full rounded-2xl object-cover border border-gray-100"
              />
              <input
                ref={iconInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleIconChange}
              />
              <button
                type="button"
                onClick={() => iconInputRef.current?.click()}
                disabled={updatingIcon}
                className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/80 backdrop-blur text-white px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap disabled:opacity-50 hover:bg-black"
              >
                <CameraIcon className="w-3.5 h-3.5" />
                {updatingIcon ? "Uploading…" : "Change"}
              </button>
            </div>
          )}

          <div className="flex-1 min-w-0 flex flex-col justify-between">
            {data.description && (
              <p className="text-gray-600 leading-relaxed">
                {data.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
              <UserCircleIcon className="w-5 h-5 text-gray-400" />
              Created by
              <span className="font-semibold text-gray-800">
                {data.user.firstName} {data.user.lastName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat
          icon={<EyeIcon className="w-5 h-5" />}
          label="Viewing Access"
          value={data.viewingAccess}
        />
        <Stat
          icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />}
          label="Comment Access"
          value={data.commentAccess}
        />
        <Stat
          icon={<MagnifyingGlassIcon className="w-5 h-5" />}
          label="Search Engine"
          value={data.enableSearchEngine ? "Enabled" : "Disabled"}
        />
      </div>

      {/* Keywords */}
      {keywords.length > 0 && (
        <Section title="Keywords" icon={<TagIcon className="w-5 h-5" />}>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Admins */}
      {data.admins && data.admins.length > 0 && (
        <Section title="Admins" icon={<UsersIcon className="w-5 h-5" />}>
          <div className="flex flex-col gap-2">
            {data.admins.map((admin) => (
              <div
                key={admin._id}
                className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2"
              >
                <div className="w-9 h-9 rounded-full bg-blue/10 flex items-center justify-center text-sm font-semibold text-blue shrink-0">
                  {admin.firstName[0]}
                  {admin.lastName[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {admin.firstName} {admin.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {admin.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Geometry */}
      {data.geometry && (
        <Section title="Geometry" icon={<MapIcon className="w-5 h-5" />}>
          <div className="flex gap-8">
            <div>
              <p className="text-xs text-gray-500">Type</p>
              <p className="text-sm font-semibold text-gray-800">
                {data.geometry.type}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Coordinates</p>
              <p className="text-sm font-semibold text-gray-800">
                {data.geometry.coordinates.length} points
              </p>
            </div>
          </div>
        </Section>
      )}

      {id && data.objects && data.objects.length > 0 && (
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
          <ScapeObjectList
            scapeId={id}
            objects={data.objects}
            fetchScape={fetchScape}
          />
        </div>
      )}

      {id && data.objects && data.objects.length > 0 && (
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
          <ScapeActivityList
            scapeId={id}
            activities={data.activities}
            fetchScape={fetchScape}
          />
        </div>
      )}

      {id && data.objects && data.objects.length > 0 && (
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
          <ScapeLightObjectList scapeId={id} fetchScape={fetchScape} />
        </div>
      )}

      <EditScapeModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        scape={data}
        onSuccess={fetchScape}
      />
    </div>
  );
};

export default ScapeDetails;
