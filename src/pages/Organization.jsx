import {
  useEffect,
  useState,
} from "react";

import SectionTitle from "../components/shared/SectionTitle";
import AIBadge from "../components/shared/AIBadge";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";

import {
  createOrganization,
} from "../services/organizationService";

import {
  getAllTools,
} from "../services/toolService";

export default function Organization() {

  const [tools, setTools] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);

  const [error,
    setError] =
    useState("");

  const [success,
    setSuccess] =
    useState("");



  // Organization Fields
  const [name, setName] =
    useState("");

  const [industry,
    setIndustry] =
    useState("");

  const [organizationSize,
    setOrganizationSize] =
    useState("startup");



  // Subscriptions
  const [subscriptions,
    setSubscriptions] =
    useState([]);



  // Team Fields
  const [teamName,
    setTeamName] =
    useState("");

  const [teamBudget,
    setTeamBudget] =
    useState("");



  // Fetch Tools
  useEffect(() => {

    const fetchTools =
      async () => {

        try {

          const response =
            await getAllTools();

          setTools(response.data);

        } catch (err) {

          console.log(err);

        }

      };

    fetchTools();

  }, []);




  // Submit
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      setError("");

      setSuccess("");

      try {

        const payload = {
          name,
          industry,
          organizationSize,
          subscriptions,

          teams: [
            {
              name: teamName,
              monthlyBudget:
                Number(teamBudget),

              aiTools:
                subscriptions,
            },
          ],
        };

        await createOrganization(
          payload
        );

        setSuccess(
          "Organization created successfully"
        );

      } catch (err) {

        setError(
          "Failed to create organization"
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
          title="Organization Setup"
          subtitle="Configure enterprise AI environment"
        />

        <AIBadge />

      </div>



      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#0F172A] border border-white/10 rounded-2xl p-6"
      >

        {/* Organization Details */}
        <h2 className="text-white text-2xl font-bold mb-6">
          Organization Details
        </h2>



        <div className="grid grid-cols-2 gap-6 mb-6">

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            placeholder="Organization Name"
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white"
          />



          <input
            type="text"
            value={industry}
            onChange={(e) =>
              setIndustry(
                e.target.value
              )
            }
            placeholder="Industry"
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white"
          />

        </div>



        {/* Organization Size */}
        <div className="mb-8">

          <select
            value={organizationSize}
            onChange={(e) =>
              setOrganizationSize(
                e.target.value
              )
            }
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white"
          >

            <option value="startup">
              Startup
            </option>

            <option value="small">
              Small
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="enterprise">
              Enterprise
            </option>

          </select>

        </div>



        {/* Subscriptions */}
        <h2 className="text-white text-2xl font-bold mb-6">
          AI Subscriptions
        </h2>

        <div className="grid grid-cols-3 gap-4 mb-8">

          {tools.map((tool) => (

            <button
              type="button"
              key={tool._id}
              onClick={() => {

                if (
                  subscriptions.includes(
                    tool.name
                  )
                ) {

                  setSubscriptions(
                    subscriptions.filter(
                      (item) =>
                        item !==
                        tool.name
                    )
                  );

                } else {

                  setSubscriptions([
                    ...subscriptions,
                    tool.name,
                  ]);

                }

              }}
              className={`p-4 rounded-xl border transition ${
                subscriptions.includes(
                  tool.name
                )
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "bg-white/5 border-white/10 text-gray-300"
              }`}
            >

              {tool.name}

            </button>

          ))}

        </div>



        {/* Team Setup */}
        <h2 className="text-white text-2xl font-bold mb-6">
          Team Setup
        </h2>

        <div className="grid grid-cols-2 gap-6 mb-8">

          <input
            type="text"
            value={teamName}
            onChange={(e) =>
              setTeamName(
                e.target.value
              )
            }
            placeholder="Team Name"
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white"
          />



          <input
            type="number"
            value={teamBudget}
            onChange={(e) =>
              setTeamBudget(
                e.target.value
              )
            }
            placeholder="Monthly Budget"
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white"
          />

        </div>



        {/* Submit */}
        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 transition px-6 py-3 rounded-xl text-white"
        >

          Create Organization

        </button>

      </form>



      {/* Loading */}
      {loading &&
        <LoadingSpinner />
      }



      {/* Error */}
      {error && (
        <div className="mt-6">
          <ErrorMessage
            message={error}
          />
        </div>
      )}



      {/* Success */}
      {success && (

        <div className="mt-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 text-emerald-400">

          {success}

        </div>

      )}

    </div>
  );
}