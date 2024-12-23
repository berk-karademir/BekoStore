import Header from "@/layout/Header";
import React from "react";

const OurTeam = () => {
  const teamData = [
    {
      name: "Erhan FIRAT",
      role: "Project Owner",
      image: {
        src: "https://avatars.githubusercontent.com/u/2324398?v=4",
        alt: "Erhan FIRAT",
      },
    },
    {
      name: "Gökhan Özdemir",
      role: "Senior Dev, PM, Scrum Master, Technical Support, Juniors' Guide, Aga",
      image: {
        src: "https://avatars.githubusercontent.com/u/8511119?v=4",
        alt: "Gökhan Özdemir",
      },
    },
    {
      name: "Berk KARADEMİR",
      role: "Full Stack Developer",
      image: {
        src: "https://avatars.githubusercontent.com/u/182853888?s=400&u=9794cc07065546dc828386b8d51014ced604a290&v=4",
        alt: "Berk KARADEMİR",
      },
    },
    {
      name: "Şule Yalçınkaya",
      role: "Full Stack Developer",
      image: {
        src: "https://raw.githubusercontent.com/suleyalcinkaya/personalwebsite/refs/heads/master/public/image/img.jpeg",
        alt: "Şule Yalçınkaya",
      },
    },
    {
      name: "Naim KAHYAOĞLU",
      role: "Full Stack Developer",
      image: {
        src: "https://media.licdn.com/dms/image/v2/D4D35AQEJQF9_R1zVtw/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1733670242068?e=1735387200&v=beta&t=_cLbJE6eLEJ2ieZIdfVPQJriyy_iEEACaUm9z0bNDLc",
        alt: "Naim KAHYAOĞLU",
      },
    },
  ];
  return (
    <>
      <Header />
      <section className="flex flex-col items-center my-20">
        <h2> Meet Our Team </h2>
        <div className="flex flex-col gap-20 mt-20">
          {teamData.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={member.image.src}
                alt={member.image.alt}
                className="w-[150px] h-[150px] rounded-full"
              />
              <h3>{member.name}</h3>
              <p className="max-w-[70%] font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default OurTeam;
