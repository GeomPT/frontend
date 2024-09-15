import { useRouter } from 'next/navigation';

const VideoPage = ({ params }: { params: { videoId: string } }) => {
  const { videoId } = params;

  const videos = [
    {
      id: '1',
      title: 'Shoulder Forward Elevation',
      videoLink: '../videos/Part1.mp4',
      steps: [
        'Stand up straight with your arms relaxed at your sides. Good posture, chest up, shoulders back',
        'Lift arms: Slowly raise your arms forward in front of you, keeping them straight. No bending at the elbows.',
        'Continue lifting your arms until they’re above your head, or as high as is comfortable.',
        'When you’ve reached your highest point, pause for a second, and then lower your arms back to your sides'
      ]
    },
    {
      id: '2',
      title: 'Video 2',
      videoLink: 'https://example.com/video2.mp4',
      steps: ['Step A', 'Step B', 'Step C']
    }
  ];

  const video = videos.find(v => v.id === videoId);

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 py-10"> 
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-black text-center mb-10">Details for {video.title}</h1>
        
        {/* Container for two cards in a row */}
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 items-center justify-center">
          
          {/* Video Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex-shrink-0 relative duration-300 transform hover:scale-105 hover:shadow-xl w-full md:w-1/3 flex flex-col">
            <div className="flex items-center justify-center mb-4 flex-grow">
              <video className="w-full h-30 rounded-md" controls>
                <source className="rounded-md" src={video.videoLink} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Steps Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex-shrink-0 relative duration-300 transform hover:scale-105 hover:shadow-xl w-full md:w-1/3 flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-black text-center">Steps:</h2>
            <ol className="list-disc list-inside space-y-2 text-gray-700 flex-grow">
              {video.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

        </div>
      </div>
    </>
  );
};

export default VideoPage;
