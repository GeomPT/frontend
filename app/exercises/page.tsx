import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";

const videoData = [
    {
        id: 1,
        title: "Shoulder Forward Elevation",
        description: "Raising arm forward and upward.",
        technologies: ["Easy", "No other items necessary"],
    },
    {
        id: 2,
        title: "Shoulder Abduction",
        year: "2023",
        description: "Raising arm sideways and upward.",
        technologies: ["Easy"],
    },
    {
        id: 3,
        title: "Shoulder Adduction (Isometric)",
        year: "2023",
        description: "Pressing arm inward without movement.",
        technologies: ["Medium"],
    },
    {
        id: 4,
        title: "Supported Shoulder Rotation (Assisted)",
        year: "2022",
        description: "Guided rotation of shoulder joint.",
        technologies: ["Medium"],
    },
    {
        id: 5,
        title: "Hip Abduction and Adduction",
        description: "Raising leg outward and inward while lying down.",
        technologies: ["Medium", "Requires mat or flat surface"],
    },
    {
        id: 6,
        title: "Hip Internal Rotation MMT",
        description: "Rotating the hip inward while lying down.",
        technologies: ["Medium", "Requires mat or bench"],
    },
    {
        id: 7,
        title: "Knee to Chest Stretch",
        description: "Pulling knee toward chest.",
        technologies: ["Easy", "No other items necessary"],
    },
    {
        id: 8,
        title: "Prone Hip Extension",
        description: "Lifting leg upward while lying on your stomach.",
        technologies: ["Medium", "Requires flat surface or mat"],
    },
    {
        id: 9,
        title: "Seated Spinal Rotation Stretch",
        description: "Twisting the spine while seated to stretch the back.",
        technologies: ["Easy", "No other items necessary"],
    },
    {
        id: 10,
        title: "Supine Active Hamstring Stretch",
        description: "Stretching hamstrings while lying on your back.",
        technologies: ["Easy", "No other items necessary"],
    },
    {
        id: 11,
        title: "TFL / IT Band Stretch (Standing)",
        description:
            "Stretching the iliotibial band by leaning against a wall.",
        technologies: ["Easy", "Requires wall support"],
    },
];

export default function Component() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-purple-100 pb-8">
            <div className="max-w-4xl mx-auto">
                {/* <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    GeomPT Progress
                </h1> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {videoData.map((video) => {
                        const progressValue =
                            (video.id * 27456783 +
                                ((video.id * 2364372) % 325) +
                                video.id -
                                ((video.id * 2371) % 236)) %
                            (100 - video.id * 3);
                        return (
                            <Link
                                key={video.id}
                                href={`/exercises/${video.id}`}
                            >
                                <Card
                                    key={video.id}
                                    className="bg-white shadow-lg hover:shadow-xl flex-shrink-0 relative duration-300 transform hover:scale-105"
                                >
                                    <CardHeader className="flex flex-col items-center text-center">
                                        <h2 className="text-xl font-semibold mb-4">
                                            {video.title}
                                        </h2>
                                        <div className="h-[100px] w-full flex items-center justify-center mb-4">
                                            <Image
                                                src={`/images/v${video.id}.jpg`}
                                                alt={`Video ${video.title}`}
                                                width={178}
                                                height={100}
                                                className="max-h-[100px] w-auto"
                                                style={{ objectFit: "contain" }}
                                            />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 mb-4">
                                            {video.description}
                                        </p>

                                        <button 
                                            onClick={handleFetchGuidance}
                                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Get Exercise Guidance
                                        </button>
                                        <div className="mt-6 text-lg text-gray-700">
                                            <p>{aiMessage}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {video.technologies.map(
                                                (tech, index) => {
                                                    let color = "text-gray-700";
                                                    if (tech === "Easy") {
                                                        color =
                                                            "text-green-700";
                                                    } else if (
                                                        tech === "Medium"
                                                    ) {
                                                        color =
                                                            "text-yellow-700";
                                                    } else if (
                                                        tech === "Hard"
                                                    ) {
                                                        color = "text-red-700";
                                                    }

                                                    const className = `px-2 py-1 bg-gray-200 rounded-full text-xs ${color}`;

                                                    return (
                                                        <span
                                                            key={index}
                                                            className={
                                                                className
                                                            }
                                                        >
                                                            {tech}
                                                        </span>
                                                    );
                                                }
                                            )}
                                        </div>
                                        <Progress
                                            value={progressValue}
                                            className="h-2"
                                        />
                                        <p className="text-sm text-gray-500 mt-2">
                                            {progressValue}% complete
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
