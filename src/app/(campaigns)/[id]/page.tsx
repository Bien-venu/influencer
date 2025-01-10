/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ClockLoader from "react-spinners/ClockLoader";

interface Campaign {
  _id: string;
  title: string;
  status: string;
  deadline: string;
  instructions: string;
}

const CampaignDetailsPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = React.use(params);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [submissionLink, setSubmissionLink] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  async function getCampaignById() {
    if (!id) return;

    try {
      const response = await fetch(
        `https://influencer-backend.vercel.app/campaigns/${id}`,
      );
      if (response.ok) {
        const campaign = await response.json();
        setCampaign(campaign);
      } else {
        console.error("Failed to fetch campaign", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    if (!submissionLink) {
      alert("Please provide a submission link!");
      return;
    }

    try {
      const response = await fetch(
        `https://influencer-backend.vercel.app/campaigns/${id}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: submissionLink,
          }),
        },
      );

      if (response.ok) {
        setSubmitSuccess(true);
        alert("Submission Successful!");
        setSubmissionLink("");
      } else {
        alert("Failed to submit content");
      }
    } catch (error) {
      console.error("Error submitting content:", error);
      alert("An error occurred while submitting.");
    }
  };

  useEffect(() => {
    getCampaignById();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center text-sm">
        <ClockLoader aria-label="Loading Spinner" data-testid="loader" />
        <p>Waiting...</p>
      </div>
    );
  }

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  return (
    <div className="flex min-h-screen flex-col gap-6 px-8 sm:px-20 xl:px-72">
      <div className="flex items-center gap-4 text-sm">
        <Link href="/">Home</Link>
        {">"} <p className="font-medium">{campaign.title}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-medium">{campaign.title}</h1>
        <div className="text-sm text-gray-600">
          Deadline: ({new Date(campaign.deadline).toLocaleDateString()})
        </div>
        <p>{campaign.instructions}</p>
      </div>
      <div className="flex w-fit flex-col gap-4 rounded-lg border border-gray-200 p-4 px-6">
        <h2 className="text-base font-medium">Submit Your Work</h2>
        <input
          type="text"
          placeholder="Paste your submission link here"
          value={submissionLink}
          onChange={(e) => setSubmissionLink(e.target.value)}
          className="w-96 rounded-md border p-2 text-sm"
        />
        <button
          onClick={handleSubmit}
          className="bg-primary rounded-md px-4 py-2 text-white hover:bg-blue-600"
        >
          Submit
        </button>
        {submitSuccess && (
          <p className="text-green-500">Your submission was successful!</p>
        )}
      </div>
    </div>
  );
};

export default CampaignDetailsPage;
