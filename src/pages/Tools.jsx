import { useEffect, useState } from "react";

import SectionTitle from "../components/shared/SectionTitle";
import AIBadge from "../components/shared/AIBadge";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";

import ToolCard from "../components/tools/ToolCard";

import ToolComparisonModal from "../components/tools/ToolComparisonModal";

import {
  getAllTools,
  getToolsByCategory,
  compareTools,
} from "../services/toolService";

export default function Tools() {

  const [tools, setTools] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [selectedCategory,
    setSelectedCategory] =
    useState("all");

    const [selectedTools,
    setSelectedTools] = useState([]);

    const [comparisonData,
    setComparisonData] = useState(null);

    const [modalOpen,
    setModalOpen] = useState(false);

    const handleCompare = async () => {

  if (selectedTools.length !== 2) {
    return;
  }

  try {

    const response =
      await compareTools({
        tool1: selectedTools[0],
        tool2: selectedTools[1],
      });

    setComparisonData(response.data);

    setModalOpen(true);

  } catch (err) {

    console.log(err);

  }

};


  const categories = [
    "all",
    "chat",
    "coding",
    "security",
    "devops",
    "data",
    "cloud",
    "video",
    "image",
    "agent",
  ];



  useEffect(() => {

    fetchTools();

  }, [selectedCategory]);



  const fetchTools = async () => {

    setLoading(true);

    try {

      let response;

      if (
        selectedCategory === "all"
      ) {

        response =
          await getAllTools();

      } else {

        response =
          await getToolsByCategory(
            selectedCategory
          );

      }

      setTools(response.data);

    } catch (err) {

      setError(
        "Failed to fetch tools"
      );

    } finally {

      setLoading(false);

    }

  };



  const filteredTools =
    tools.filter((tool) =>
      tool.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );



  if (loading) {
    return <LoadingSpinner />;
  }



  if (error) {
    return (
      <ErrorMessage message={error} />
    );
  }



  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <SectionTitle
          title="AI Tools Catalog"
          subtitle="Browse and compare AI tools"
        />

        <AIBadge />

      </div>



      {/* Search */}
      <div className="mb-6">

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search AI tools..."
          className="w-full bg-[#0F172A] border border-white/10 rounded-2xl p-4 text-white outline-none"
        />

      </div>



      {/* Categories */}
      <div className="flex gap-3 flex-wrap mb-8">

        {categories.map((category) => (

          <button
            key={category}
            onClick={() =>
              setSelectedCategory(
                category
              )
            }
            className={`px-4 py-2 rounded-xl transition ${
              selectedCategory ===
              category
                ? "bg-emerald-500 text-white"
                : "bg-white/5 text-gray-300"
            }`}
          >

            {category}

          </button>

        ))}

      </div>


{/* Compare Action */}

<div className="flex justify-end mb-6">

  <button
    onClick={handleCompare}
    disabled={
      selectedTools.length !== 2
    }
    className={`px-6 py-3 rounded-xl transition ${
      selectedTools.length === 2
        ? "bg-emerald-500 text-white"
        : "bg-gray-700 text-gray-400 cursor-not-allowed"
    }`}
  >

    Compare Tools

  </button>

</div>


      {/* Tools Grid */}
      <div className="grid grid-cols-3 gap-6">

        {filteredTools.map((tool) => (

          <div key={tool._id}>

  <ToolCard tool={tool} />

  <button
    onClick={() => {

      if (
        selectedTools.includes(tool.name)
      ) {

        setSelectedTools(
          selectedTools.filter(
            (item) =>
              item !== tool.name
          )
        );

      } else if (
        selectedTools.length < 2
      ) {

        setSelectedTools([
          ...selectedTools,
          tool.name,
        ]);

      }

    }}
    className={`mt-3 w-full py-2 rounded-xl transition ${
      selectedTools.includes(
        tool.name
      )
        ? "bg-emerald-500 text-white"
        : "bg-white/5 text-gray-300"
    }`}
  >

    {selectedTools.includes(
      tool.name
    )
      ? "Selected"
      : "Compare"}

  </button>

</div>

        ))}

      </div>

      <ToolComparisonModal
  open={modalOpen}
  onClose={() =>
    setModalOpen(false)
  }
  comparison={comparisonData}
/>

    </div>
  );
}