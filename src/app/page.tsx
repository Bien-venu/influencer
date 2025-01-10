import { useEffect, useState } from "react";

const CampaignListPage = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: "1",
      title: "TikTok Product Promo",
      status: "Ongoing",
      deadline: "2025-01-15",
    },
    {
      id: "2",
      title: "Instagram Story Campaign",
      status: "Completed",
      deadline: "2025-01-10",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Campaign List</h1>
      <ul className="space-y-4">
        {campaigns.map((campaign) => (
          <li
            key={campaign.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{campaign.title}</h2>
              <p className="text-sm text-gray-600">
                Status: <span className="font-medium">{campaign.status}</span>
              </p>
              <p className="text-sm text-gray-600">
                Deadline: {new Date(campaign.deadline).toLocaleDateString()}
              </p>
            </div>
            <a
              href={`/campaigns/${campaign.id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignListPage;