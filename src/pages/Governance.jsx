import { useState } from "react";

import SectionTitle from "../components/shared/SectionTitle";
import AIBadge from "../components/shared/AIBadge";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";

import {
  validateWorkflow,
  simulatePolicy,
} from "../services/governanceService";

export default function Governance() {

  // Validation States
  const [task, setTask] = useState("");

  const [budget, setBudget] =
    useState("medium");

  const [priority, setPriority] =
    useState("quality");

  const [restrictedTool, setRestrictedTool] =
    useState("ChatGPT Plus");

  const [maxBudget, setMaxBudget] =
    useState(100);

  const [validationResult,
    setValidationResult] = useState(null);



  // Simulation States
  const [simulationResult,
    setSimulationResult] = useState(null);

  const [simulationTool,
    setSimulationTool] =
    useState("ChatGPT Plus");



  // Common States
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");



  // Validate Workflow
  const handleValidation = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const payload = {
        task,
        budget,
        priority,

        organizationPolicy: {
          restrictedTools: [
            restrictedTool,
          ],

          maxMonthlyBudget:
            Number(maxBudget),
        },
      };

      const response =
        await validateWorkflow(
          payload
        );

      setValidationResult(
        response.data
      );

    } catch (err) {

      setError(
        "Validation failed"
      );

    } finally {

      setLoading(false);

    }

  };



  // Simulate Policy
  const handleSimulation =
    async () => {

      setLoading(true);

      setError("");

      try {

        const payload = {
          currentSubscriptions: [
            "Claude Pro",
          ],

          scenario: {
            action: "add",
            tool: simulationTool,
          },
        };

        const response =
          await simulatePolicy(
            payload
          );

        setSimulationResult(
          response.data
        );

      } catch (err) {

        setError(
          "Simulation failed"
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
          title="Governance & Policy Simulator"
          subtitle="Validate workflows and simulate AI policy impact"
        />

        <AIBadge />

      </div>



      {/* Validation Form */}
      <form
        onSubmit={handleValidation}
        className="bg-[#0F172A] border border-white/10 rounded-2xl p-6 mb-8"
      >

        <h2 className="text-white text-2xl font-bold mb-6">
          Workflow Validation
        </h2>

        {/* Task */}
        <textarea
          value={task}
          onChange={(e) =>
            setTask(e.target.value)
          }
          placeholder="Describe workflow..."
          className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none mb-6"
        />



        {/* Inputs */}
        <div className="grid grid-cols-2 gap-6 mb-6">

          <select
            value={budget}
            onChange={(e) =>
              setBudget(e.target.value)
            }
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white"
          >

            <option value="low">
              Low Budget
            </option>

            <option value="medium">
              Medium Budget
            </option>

            <option value="high">
              High Budget
            </option>

          </select>



          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white"
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



        {/* Restricted Tool */}
        <input
          type="text"
          value={restrictedTool}
          onChange={(e) =>
            setRestrictedTool(
              e.target.value
            )
          }
          placeholder="Restricted Tool"
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white mb-6"
        />



        {/* Budget */}
        <input
          type="number"
          value={maxBudget}
          onChange={(e) =>
            setMaxBudget(
              e.target.value
            )
          }
          placeholder="Max Budget"
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white mb-6"
        />



        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 transition px-6 py-3 rounded-xl text-white"
        >

          Validate Workflow

        </button>

      </form>



      {/* Loading */}
      {loading && <LoadingSpinner />}



      {/* Error */}
      {error && (
        <ErrorMessage message={error} />
      )}



      {/* Validation Result */}
      {validationResult && (

        <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6 mb-8">

          <h2 className="text-white text-2xl font-bold mb-4">
            Compliance Result
          </h2>

          <div
            className={`p-4 rounded-xl ${
              validationResult.isCompliant
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >

            {validationResult.isCompliant
              ? "Workflow Approved"
              : "Policy Violations Detected"}

          </div>



          {/* Violations */}
          {validationResult.violations
            ?.length > 0 && (

            <div className="mt-6">

              <h3 className="text-white font-semibold mb-3">
                Violations
              </h3>

              <div className="space-y-3">

                {validationResult.violations.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400"
                    >

                      {item}

                    </div>

                  )
                )}

              </div>

            </div>

          )}

        </div>

      )}



      {/* Policy Simulation */}
      <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6">

        <h2 className="text-white text-2xl font-bold mb-6">
          Policy Simulation
        </h2>



        <div className="flex gap-4 mb-6">

          <input
            type="text"
            value={simulationTool}
            onChange={(e) =>
              setSimulationTool(
                e.target.value
              )
            }
            placeholder="Tool Name"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-white"
          />



          <button
            onClick={handleSimulation}
            className="bg-blue-500 hover:bg-blue-600 transition px-6 rounded-xl text-white"
          >

            Simulate

          </button>

        </div>



        {/* Simulation Result */}
        {simulationResult && (

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">

            <h3 className="text-white text-xl font-semibold mb-4">
              Impact Analysis
            </h3>

            <p className="text-gray-300 mb-2">
              Previous Spend:
              ${simulationResult.previousSpend}
            </p>

            <p className="text-gray-300 mb-2">
              New Spend:
              ${simulationResult.newSpend}
            </p>

            <p className="text-gray-300 mb-2">
              Spend Difference:
              ${simulationResult.spendDifference}
            </p>

            <p className="text-emerald-400 mt-4">
              {
                simulationResult.impactSummary
              }
            </p>

          </div>

        )}

      </div>

    </div>
  );
}