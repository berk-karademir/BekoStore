import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

function ContactUs() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 text-[#252B42] ">
      <Header />
      <div className="  text-center font-[600] px-10">
        <h3>CONTACT US</h3>
        <h2 className="my-10">Get in touch today!</h2>
        <p className="indent-5 my-10">
          We know how large objects will act, but things on a small scale just
          do not act that way.
        </p>
        <p className="text-[25px]">Phone: 123-456-7890</p>
        <p className="text-[25px]">Fax: 123-456-7890</p>
        <div className="flex justify-center gap-5 my-5">
          <a href="#">
            <img src="/images/facebook.png" alt="Facebook" />
          </a>
          <a href="#">
            <img src="/images/x.png" alt="Twitter" />
          </a>
          <a href="#">
            <img src="/images/instagram.png" alt="Instagram" />
          </a>
          <a href="#">
            <img src="/images/youtube.png" alt="youtube" />
          </a>
        </div>
      </div>
      <img src="/images/contact-us-1.png" alt="Shopping family" />
      <div className="bg-[#FAFAFA] text-center flex flex-col items-center gap-10 py-10">
        <h3>VISIT OUR OFFICE</h3>
        <h2>We help small businesses with big ideas</h2>

        <div className="bg-white flex flex-col items-center w-[80%] rounded-md p-5 font-[600] border-[2px] border-[#23A6f0]  gap-2">
          <Phone size={48} color="#23A6f0" strokeWidth={2.5} />
          <p>Leave a call back request</p>
          <p> +50 500 500 50</p>
        </div>

        <div className="bg-[#252B42] flex flex-col items-center w-[80%] rounded-md p-5 font-[600] border-[2px] border-[#23A6f0] gap-2 text-white">
          <MapPin size={48} color="#23A6f0" strokeWidth={2.5} />
          <p>
            Visit our office <span className="block">Get support</span>
          </p>
          <p> Milas, MUGLA, TR</p>
        </div>

          <div className="bg-white flex flex-col items-center w-[80%] rounded-md p-5 font-[600] border-[2px] border-[#23A6f0]  gap-2">
          <Mail size={48} color="#23A6f0" strokeWidth={2.5} />
          <p>Send an e-mail</p>
          <p>berk.karademir@hotmail.com</p>
          <p> </p>
        </div>
      </div>
      <Footer/>
    </section>
  );
}

export default ContactUs;
