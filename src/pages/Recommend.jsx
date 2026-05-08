import { useState } from "react";

import SectionTitle from "../components/shared/SectionTitle";
import AIBadge from "../components/shared/AIBadge";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";

import { generateRecommendation } from "../services/recommendationService";
import WorkflowVisualizer from "../components/recommend/WorkflowVisualizer";
import OptimalToolCard from "../components/recommend/OptimalToolCard";

export default function Recommend() {

  const [task, setTask] = useState("");

  const [budget, setBudget] = useState("medium");

  const [priority, setPriority] =
    useState("quality");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  const [recommendation, setRecommendation] =
    useState(null);



  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const payload = {
        task,
        budget,
        priority,
      };

      const response =
        await generateRecommendation(
          payload
        );

      setRecommendation(response.data);

    } catch (err) {

      setError(
        "Failed to generate recommendation"
      );

    } finally {

      setLoading(false);

    }

  };



  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <SectionTitle
          title="AI Recommendation Engine"
          subtitle="Generate optimized AI workflows"
        />

        <AIBadge />

      </div>



      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#0F172A] border border-white/10 rounded-2xl p-6"
      >

        {/* Task */}
        <div className="mb-6">

          <label className="block text-white mb-2">
            Task
          </label>

          <textarea
            value={task}
            onChange={(e) =>
              setTask(e.target.value)
            }
            placeholder="Describe your task..."
            className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none"
          />

        </div>



        {/* Dropdowns */}
        <div className="grid grid-cols-2 gap-6 mb-6">

          {/* Budget */}
          <div>

            <label className="block text-white mb-2">
              Budget
            </label>

            <select
              value={budget}
              onChange={(e) =>
                setBudget(e.target.value)
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white"
            >

              <option value="low">
                Low
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="high">
                High
              </option>

            </select>

          </div>



          {/* Priority */}
          <div>

            <label className="block text-white mb-2">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white"
            >

              <option value="speed">
                Speed
              </option>

              <option value="quality">
                Quality
              </option>

              <option value="cost">
                Cost
              </option>

            </select>

          </div>

        </div>



        {/* Submit Button */}
        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 transition px-6 py-3 rounded-xl text-white font-medium"
        >

          Generate Recommendation

        </button>

      </form>



      {/* Loading */}
      {loading && <LoadingSpinner />}



      {/* Error */}
      {error && (
        <div className="mt-6">
          <ErrorMessage message={error} />
        </div>
      )}



      {/* Recommendation Result */}
      {recommendation && (

        <div className="mt-8 bg-[#0F172A] border border-white/10 rounded-2xl p-6">

          <h2 className="text-2xl font-bold text-white mb-6">
            Recommended Workflow
          </h2>

          <OptimalToolCard
            tool={recommendation.allScores?.[0]}
        />

          {/* Workflow Steps */}
          <div className="space-y-4">

            <WorkflowVisualizer
                workflow={recommendation.orchestrationFlow}
            />

          </div>



          {/* Cost */}
          <div className="mt-8">

            <h3 className="text-white text-xl font-semibold mb-2">
              Estimated Cost
            </h3>

            <p className="text-emerald-400 text-3xl font-bold">
              $
              {recommendation.estimatedCostUSD}
            </p>

          </div>



          {/* Reasoning */}
          <div className="mt-8">

            <h3 className="text-white text-xl font-semibold mb-2">
              AI Reasoning
            </h3>

            <p className="text-gray-300 leading-relaxed">
              {recommendation.reasoning}
            </p>

          </div>

        </div>

      )}

    </div>
  );
}