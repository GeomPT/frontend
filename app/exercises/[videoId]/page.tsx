"use client";

import NavBar from "@/app/navBar";

const VideoPage = ({ params }: { params: { videoId: string } }) => {
    const { videoId } = params;

    const videos = [
        {
            id: "1",
            title: "Shoulder Forward Elevation",
            videoLink: "../videos/Part1.mp4",
            steps: [
                "Stand up straight with your arms relaxed at your sides. Good posture, chest up, shoulders back",
                "Lift arms: Slowly raise your arms forward in front of you, keeping them straight. No bending at the elbows.",
                "Continue lifting your arms until they're above your head, or as high as is comfortable.",
                "When you've reached your highest point, pause for a second, and then lower your arms back to your sides",
            ],
        },
        {
            id: "2",
            title: "Wand Shoulder Abduction",
            videoLink:
                "../videos/Wand Shoulder Abduction _ Pursuit Physical Therapy.mp4",
            steps: [
                "Sit or lie down with your injured arm bent at the elbow, resting your forearm across your abdomen.",
                "Hold a stick or wand with both hands, keeping your unaffected arm straight.",
                "Use your uninjured arm to push the wand and rotate your injured arm outward, away from your body.",
                "Move the injured arm only as far as is comfortable, keeping the elbow bent at a 90-degree angle.",
                "Hold the stretch for 10 to 30 seconds.",
                "Slowly return to the starting position and repeat 10 times.",
            ],
        },
        {
            id: "3",
            title: "Shoulder Adduction - Isometric Towel Squeeze",
            videoLink:
                "../videos/Shoulder Adduction - Isometric Towel Squeeze.mp4",
            steps: [
                "Sit or stand with good posture, keeping your shoulders relaxed.",
                "Place a rolled-up towel between your elbow and your body on the injured side.",
                "Press your elbow inward, squeezing the towel against your side.",
                "Hold the squeeze for 5 seconds.",
                "Relax your arm and rest for 5 seconds.",
                "Repeat this exercise for 10 to 15 repetitions.",
            ],
        },
        {
            id: "4",
            title: "Supported Shoulder Rotation (Assisted)",
            videoLink: "../videos/Supported Shoulder Rotation.mp4",
            steps: [
                "Sit at a table or a firm surface with your back straight and feet flat on the ground.",
                "Place your injured arm on the table with your elbow bent at 90 degrees and your forearm resting on the surface.",
                "Hold a stick or wand with both hands, keeping your unaffected arm straight and positioned for support.",
                "Gently use your uninjured arm to assist in rotating your injured arm outward, away from your body.",
                "Move the injured arm only as far as is comfortable.",
                "Hold the position for 10 to 30 seconds, then slowly return to the starting position.",
                "Repeat 10 times, performing the exercise within a pain-free range of motion.",
            ],
        },
        {
            id: "5",
            title: "Hip Abduction and Adduction",
            videoLink: "../videos/Hip Abduction and Adduction.mp4",
            steps: [
                "Lie on the side of your injured leg with both legs straight.",
                "Bend your top leg and cross it over your injured leg.",
                "Raise your injured leg 6 to 8 inches off the floor.",
                "Hold this position for 5 seconds.",
                "Slowly lower your leg and rest for 2 seconds.",
                "Repeat, then complete the exercise on the other side.",
            ],
        },
        {
            id: "6",
            title: "Hip Internal Rotation MMT",
            videoLink: "../videos/Hip Internal Rotation MMT.mp4",
            steps: [
                "Lie on your side on a table or physical therapy bench with a pillow between your thighs.",
                "Bring your top leg forward and lower your foot so that it is below the tabletop.",
                "Rotate your hip and lift your foot as high as possible.",
                "Slowly lower your leg back to the 'start' position, counting to 5.",
                "Repeat, then complete the exercise on the other side.",
            ],
        },
        {
            id: "7",
            title: "Knee to Chest Stretch",
            videoLink: "../videos/Knee to chest stretching.mp4",
            steps: [
                "Sit on the floor with both legs straight in front of you.",
                "Cross one leg over the other.",
                "Slowly twist toward your bent leg, placing your opposite arm on your bent thigh.",
                "Use your arm to help twist further, and hold the stretch for 30 seconds.",
                "Slowly come back to center, reverse leg positions, and repeat on the other side.",
                "Repeat the entire sequence 4 times.",
            ],
        },
        {
            id: "8",
            title: "Prone Hip Extension",
            videoLink: "../videos/Prone Hip Extension.mp4",
            steps: [
                "Lie on your stomach on a firm, flat surface with a pillow under your hips.",
                "Bend one knee at a 90-degree angle.",
                "Lift your leg straight up.",
                "Slowly lower your leg back to the floor, counting to 5.",
                "Repeat the exercise on the other side.",
            ],
        },
        {
            id: "9",
            title: "Seated Spinal Rotation Stretch",
            videoLink: "../videos/Seated Spinal Rotation Stretch.mp4",
            steps: [
                "Sit on the floor with your legs straight in front of you.",
                "Cross one leg over the other.",
                "Slowly twist toward your bent leg, putting your hand behind you for support.",
                "Place your opposite arm on your bent thigh to twist further.",
                "Look over your shoulder and hold the stretch for 30 seconds.",
                "Slowly return to the center and repeat on the other side.",
                "Repeat the sequence 4 times.",
            ],
        },
        {
            id: "10",
            title: "Supine Active Hamstring Stretch",
            videoLink: "../videos/Supine Active Hamstring Stretch.mp4",
            steps: [
                "Lie on the floor with both knees bent.",
                "Lift one leg off the floor and bring the knee toward your chest.",
                "Clasp your hands behind your thigh, just below your knee.",
                "Straighten your leg and gently pull it toward your head until you feel a stretch.",
                "Hold for 30 to 60 seconds, then relax for 30 seconds.",
                "Repeat on the other side and repeat the entire sequence 4 times.",
            ],
        },
        {
            id: "11",
            title: "TFL / IT Band Stretch (Standing)",
            videoLink: "../videos/TFL _ IT Band Stretch (Standing).mp4",
            steps: [
                "Stand next to a wall for support.",
                "Cross the leg closest to the wall behind your other leg.",
                "Lean your hip toward the wall until you feel a stretch on the outside of your hip.",
                "Hold the stretch for 30 seconds.",
                "Repeat on the opposite side, and repeat the entire sequence 4 times.",
            ],
        },
    ];

    const video = videos.find((v) => v.id === videoId);

    if (!video) {
        return <div>Video not found</div>;
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 py-10">
                <NavBar />
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-black text-center mb-10">
                    Details for {video.title}
                </h1>

                {/* Container for two cards in a row */}
                <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 items-center justify-center">
                    {/* Video Card */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex-shrink-0 relative duration-300 transform hover:scale-105 hover:shadow-xl w-full md:w-1/3 flex flex-col">
                        <div className="flex items-center justify-center mb-4 flex-grow">
                            <video className="w-full h-30 rounded-md" controls>
                                <source
                                    className="rounded-md"
                                    src={video.videoLink}
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>

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
        </>
    );
};

export default VideoPage;
