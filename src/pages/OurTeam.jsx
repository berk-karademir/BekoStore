import { useState, useEffect } from "react";
import Header from "@/layout/Header";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Footer from "@/layout/Footer";

const OurTeam = () => {
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://445beb81-518e-4859-8373-14ae012ac636.mock.pstmn.io/members"
        );
        setTeamData(response.data);
      } catch (err) {
        setError("Ekip üyeleri yüklenirken bir hata oluştu.");
        console.error("Ekip verileri çekilirken hata:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-[60vh]">
          <Spinner />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-[60vh] text-red-500">
          {error}
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="flex flex-col items-center my-20">
        <h2 className="text-4xl font-bold text-gray-800 tracking-wide">
          MEET OUR TEAM
        </h2>
        <div className="flex flex-wrap justify-center gap-20 mt-20 px-4">
          {teamData?.members?.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center transition-transform hover:scale-125 duration-300 bg-[#4a536b]/20 p-6 rounded-xl shadow-lg w-[300px] py-10"
            >
              <img
                src={member.image.src}
                alt={member.image.alt}
                className="w-[180px] h-[180px] rounded-full object-cover shadow-lg border-4 border-white"
              />
              <h3 className="mt-6 text-2xl font-bold text-gray-800">
                {member.name}
              </h3>
              <p className="mt-3 text-gray-600 font-medium px-4">
                {member.role}
              </p>
              <div className="mt-6 flex items-center justify-center gap-5">
                {member.socials.linkedin.profile_url && (
                  <a
                    href={member.socials.linkedin.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-125 transition-transform"
                  >
                    <img 
                      src={member.socials.linkedin.icon} 
                      alt="LinkedIn" 
                      className="w-8 h-8"
                    />
                  </a>
                )}
                {member.socials.github.profile_url && (
                  <a
                    href={member.socials.github.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-125 transition-transform"
                  >
                    <img 
                      src={member.socials.github.icon} 
                      alt="GitHub" 
                      className="w-8 h-8"
                    />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default OurTeam;
