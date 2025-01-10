import { useState } from "react";

const CampaignDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const [campaign, setCampaign] = useState({
    id: "1",
    title: "TikTok Product Promo",
    instructions:
      "Create a 30-second video using #BrandLove and post on TikTok.",
    deadline: "2025-01-15",
  });

  const [submissionLink, setSubmissionLink] = useState("");

  const handleSubmit = () => {
    alert(`Submitted: ${submissionLink}`);
    setSubmissionLink("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">{campaign.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        Deadline: {new Date(campaign.deadline).toLocaleDateString()}
      </p>
      <p className="mb-6">{campaign.instructions}</p>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Submit Your Work</h2>
        <input
          type="text"
          placeholder="Paste your submission link here"
          value={submissionLink}
          onChange={(e) => setSubmissionLink(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CampaignDetailsPage;