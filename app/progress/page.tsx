import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import videoData from "@/public/rom_exercises.json";

export default function Component() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-purple-100 pb-8">
            <div className="max-w-4xl mx-auto">
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
                                key={video.name}
                                href={`/progress/${video.name}`}
                            >
                                <Card className="bg-white shadow-lg hover:shadow-xl flex-shrink-0 relative duration-300 transform hover:scale-105">
                                    <CardHeader className="flex flex-col items-center text-center">
                                        <h2 className="text-xl font-semibold mb-4">
                                            {video.title}
                                        </h2>
                                        <div className="h-[100px] w-full flex items-center justify-center mb-4">
                                            <Image
                                                src={`/images/v${video.id}.jpg`}
                                                alt={`Video ${video.name}`}
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
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {video.technologies &&
                                                video.technologies.map(
                                                    (tech, index) => {
                                                        let color =
                                                            "text-gray-700";
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
                                                            color =
                                                                "text-red-700";
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
