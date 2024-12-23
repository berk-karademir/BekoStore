import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import React from "react";

function AboutUs() {
  return (
    <section className="text-justify flex flex-col items-center">
      <Header />
      <h2 className="text-center my-10">About Us</h2>
      <article className="flex flex-col items-center gap-10 p-10">
        <div className="">
          <h3>Türkiye'nin Hepsiburada'sı</h3>
          <p className="indent-5">
            {" "}
            Türkiye'nin Hepsiburada'sı olarak, 30’dan fazla kategoride, 200
            milyondan fazla ürün çeşidini müşterilerimizle buluşturuyoruz. Veri
            ile tecrübeyi harmanlayan ekiplerimizle, aylık yaklaşık on milyon
            siparişi müşterilerimize ulaştırıyoruz. Müşteri deneyimini merkeze
            alan bir felsefeyle, on binlerce işletmeyi bir araya getiren
            pazaryeri modelimizle, Türkiye'nin ve bölgenin en büyüğü olan Akıllı
            Operasyon Merkezimizle, sektörün çıtasını yükselten teknolojik
            çalışmalar yürüttüğümüz Ar-Ge Merkezimizle sektörün gelişimine ve
            dijital dönüşüme liderlik ediyoruz. Yaptığımız yatırımlarla, her
            biri alanına yenilikçi bakış açısı kazandıran HepsiJet,
            HepsiLojistik, Hepsipay, HepsiAd, HepsiGlobal, Hepsiburada Market,
            Hepsiburada Seyahat, gibi yeni marka ve hizmetleri hayata geçirerek,
            tüm paydaşlarımıza ve sektöre fayda sağlıyoruz. Bir teknoloji
            şirketi olarak; teknolojinin yıkıcı değil, yapıcı gücüne
            odaklanıyoruz. Hepsiyürekten çatısı altında birçok farklı dernek ve
            sivil toplum kuruluşuna destek veriyor; toplumsal gelişime katkıda
            bulunuyoruz. 2017'de başlattığımız ve 47 bini aşkın girişimciye
            ulaştığımız Girişimci Kadınlara Teknoloji Gücü programıyla
            kadınların ekonomiye katılımını destekliyor; e-ticarette kendi
            işlerini kurma ve büyütme fırsatı sunuyoruz. 20 yılı aşkın süredir
            inovasyon ve girişimcilik ruhuyla sürdürdüğümüz yolculukta, bugün
            Türkiye'nin Hepsiburada'sı olarak dünya teknoloji borsası NASDAQ'ta
            halka arz edilen ilk ve tek Türk şirketi olmaktan gurur duyuyoruz.
          </p>
        </div>

        <div className="bg-[#23A6F0] text-white p-5 rounded-sm">
          <h4>Hepsiburada Vizyonumuz</h4>
          <br />
          <p className="indent-5 font-[500]">
            {" "}
            Ticaretin dijitalleşmesine liderlik etme vizyonumuzla, bir e-ticaret
            platformundan insanların hayatlarını kolaylaştırmaya odaklanan ve
            sunduğu bütünleşik hizmetlerle tüm paydaşlarına katkı sağlayan dev
            bir ekosisteme dönüşmeyi hedefliyoruz.
          </p>
        </div>

        <div className="bg-[#23A6F0] text-white p-5 rounded-sm">
          <h4>Hepsiburada Misyonumuz</h4>
          <br />
          <p className="indent-5 font-[500]">
            {" "}
            Müşterilerimizin günlük yaşamlarında güvenilir, yenilikçi ve samimi
            bir yol arkadaşı olarak, ekosistemimizdeki her bir paydaşımızın "İyi
            ki varsın Hepsiburada" diye düşünmeleri için var gücümüzle
            çalışıyoruz.
          </p>
        </div>
      </article>
      <div className="flex flex-col items-center gap-10">
        <img src="/images/about-us-1.png" alt="take ma credit card" />
        <h4 className="text-[#252B42] px-10">
          Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
        </h4>
        <p className="text-[#737373] px-10 indent-5">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics.{" "}
        </p>
      </div>

      <div className="container mx-auto mt-14 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800">25K</h2>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800">200K</h2>
            <p className="text-gray-600">Monthly Visitors</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800">20</h2>
            <p className="text-gray-600">Countries Worldwide</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800">200+</h2>
            <p className="text-gray-600 mr-4">Partners</p>
          </div>
          
        </div>
        
      </div>
      <iframe
            className="mt-14"
            src="https://www.youtube.com/embed/wf4F2-9UXUo?si=GvucjSMedscLLEot"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
      <Footer />
    </section>
  );
}

export default AboutUs;
