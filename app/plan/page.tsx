import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import Link from "next/link"

const videoData = [
  { id: 1, title: "Shoulder Forward Elevation", description: "Raising arm forward and upward.", technologies: ["Easy", "No other items necessary"] },
  { id: 2, title: "Shoulder Abduction", year: "2023", description: "Raising arm sideways and upward.", technologies: ["Easy"] },
  { id: 3, title: "Shoulder Adduction (Isometric)", year: "2023", description: "Pressing arm inward without movement.", technologies: ["Medium"] },
  { id: 4, title: "Supported Shoulder Rotation (Assisted)", year: "2022", description: "Guided rotation of shoulder joint.", technologies: ["Medium"] },
];

export default function Component() {
  return (
    <div className="min-h-screen w-full bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">GeomPT Progress</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videoData.map((video) => (
            <Link key={video.id} href={`/plan/${video.id}`}>
            <Card 
            key={video.id} 
            className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105" 
          >
              <CardHeader className="flex flex-col items-center text-center">
                <h2 className="text-xl font-semibold mb-4">{video.title}</h2>
                <div className="h-[100px] w-full flex items-center justify-center mb-4">
                  <Image 
                    src={`/images/v${video.id}.jpg`} 
                    alt={`Video ${video.id}`} 
                    width={178} 
                    height={100} 
                    className="max-h-[100px] w-auto"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{video.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {video.technologies.map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <Progress value={33} className="h-2" />
                <p className="text-sm text-gray-500 mt-2">33% complete</p>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}