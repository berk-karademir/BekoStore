import { useState, useEffect } from "react";
import Header from "@/layout/Header";
import axios from "axios";
import Footer from "@/layout/Footer";
import { LoaderCircle } from "lucide-react";

const OurTeam = () => {
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.mockfly.dev/mocks/cb370338-48b0-44c2-a501-1304239241df/members"
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
        <LoaderCircle className="animate-spin" />
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

  // Ekip üyelerini yöneticiler ve diğerleri olarak ayır
  const managers = teamData?.members
    ?.filter(
      (member) =>
        member.role.toLowerCase().includes("owner") ||
        member.role.toLowerCase().includes("pm")
    )
    .slice(0, 2);

  const otherMembers = teamData?.members?.filter(
    (member) =>
      !member.role.toLowerCase().includes("owner") &&
      !member.role.toLowerCase().includes("pm")
  );

  const TeamMemberCard = ({ member }) => (
    <div className="flex flex-col items-center text-center transition-transform hover:scale-125 duration-300 bg-[#4a536b]/20 p-6 rounded-xl shadow-lg w-[300px] py-10">
      <img
        src={member.image.src}
        alt={member.image.alt}
        className="w-[180px] h-[180px] rounded-full object-cover shadow-lg border-4 border-white"
      />
      <h3 className="mt-6 text-2xl font-bold text-gray-800">{member.name}</h3>
      <p className="mt-3 text-gray-600 font-medium px-4">{member.role}</p>
      <div className="mt-6 flex items-center justify-center gap-5">
        {member.socials?.linkedin?.profile_url && (
          <a
            href={member.socials?.linkedin?.profile_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 transition-transform"
          >
            <img
              src={member.socials?.linkedin?.icon}
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
  );

  return (
    <>
      <Header />
      <section className="flex flex-col items-center my-20">
        <h2 className="text-4xl font-bold text-gray-800 tracking-wide">
          MEET OUR TEAM
        </h2>

        {/* Yöneticiler Bölümü */}
        <div className="flex justify-center gap-20 mt-20 px-4">
          {managers?.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>

        {/* Diğer Ekip Üyeleri */}
        <div className="flex flex-wrap justify-center gap-20 mt-20 px-4">
          {otherMembers?.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default OurTeam;
