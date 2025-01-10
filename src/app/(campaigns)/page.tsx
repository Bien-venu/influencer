"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import ClockLoader from "react-spinners/ClockLoader";

interface Campaign {
  _id: string;
  title: string;
  status: string;
  deadline: string;
}

const CampaignListPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  async function getAllCampaigns() {
    try {
      const response = await fetch(
        "https://influencer-backend.vercel.app/campaigns",
      );
      if (response.ok) {
        const campaigns = await response.json();
        setCampaigns(campaigns);
      } else {
        console.error("Failed to fetch campaigns", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllCampaigns();
  }, []);

  return (
    <div className="flex min-h-screen flex-col gap-6 px-8 sm:px-20 xl:px-72">
      <h1 className="text-base font-medium">All Campaigns</h1>

      {loading ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center text-sm">
          <ClockLoader aria-label="Loading Spinner" data-testid="loader" />
          <p>Waiting...</p>
        </div>
      ) : (
        <div className="grid h-fit grid-cols-1 gap-4 overflow-auto md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign, index) => (
            <Link
              href={`/${campaign._id}`}
              key={index}
              className="flex flex-col gap-2 overflow-hidden rounded-lg border border-gray-200 p-4 shadow-md shadow-gray-50 hover:bg-gray-50"
            >
              <h2 className="text-base font-medium">{campaign.title}</h2>
              <p className="text-sm text-gray-600">
                Status: <span className="font-medium">{campaign.status}</span>
              </p>
              <p className="text-sm text-gray-600">
                Deadline: {new Date(campaign.deadline).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignListPage;
