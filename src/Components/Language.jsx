import tamil from "./../assets/Images/tamil.jpg";
import english from "./../assets/Images/english.jpg";
import hindi from "./../assets/Images/hindi.jpg";
import telugu from "./../assets/Images/japanese.jpg";
import englishVideo from "./../assets/Videos/english.mp4"; // Corrected typo here

function Language() {
  const LanguageList = [
    {
      id: 1,
      image: english,
      video: englishVideo, // Added video for English language
    },
    {
      id: 2,
      image: tamil,
      video: null, // No video provided for Tamil language
    },
    {
      id: 3,
      image: hindi,
      video: null, // No video provided for Hindi language
    },
    {
      id: 4,
      image: telugu,
      video: null, // No video provided for Telugu language
    },
  ];

  return (
    <div
      className="flex gap-10 md:gap-30 p-30 px-40 md:px-20"
      style={{ width: "100%" }}
    >
      {LanguageList.map((item) => (
        <div
          key={item.id}
          className="border-[2px] border-gray-600 rounded-lg hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer relative shaow-xl shadow-gray-800"
        >
          {item.video && ( // Render video if available
            <video
              src={item.video}
              autoPlay
              loop
              playsInline
              muted
              className="absolute z-0 top-0 rounded-md opacity-0 hover:opacity-50"
            />
          )}
          <img
            src={item.image}
            className="w-full z-[1] opacity-100"
            alt={`Language ${item.id}`}
          />
        </div>
      ))}
    </div>
  );
}

export default Language;
