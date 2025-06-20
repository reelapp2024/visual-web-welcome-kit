
import React, { useEffect, useState } from "react";
import { httpFile } from "../../../config.js";
import { MapPin, Clock, Shield } from 'lucide-react';

const CleaningServiceAreas = () => {






    const [projectCategory, setProjectCategory] = useState("");
    const [welcomeLine, setWelcomeLine] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
  const [UpcomingPage, setUpcomingPage]= useState("");
  const [locations, setLocations] = useState([]);
  
    // 1) Read the query-param once:
    const urlParams = new URLSearchParams(window.location.search);
    const site = urlParams.get("siteId");
  
    // 2) Only overwrite localStorage if `site` is a non-null string:
    if (site) {
      const currentSiteId = localStorage.getItem("currentSiteId");
      if (currentSiteId !== site) {
        console.log("Updating site ID:", site);
        localStorage.setItem("currentSiteId", site);
      }
    }
    // If `site` is null, do not touch localStorage at all.
  
    // 3) Now read back from localStorage (or fall back to default):
    const savedSiteId = localStorage.getItem("currentSiteId");
    const projectId = savedSiteId || "683da559d48d4721c48972d5";
  
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await httpFile.post("/webapp/v1/my_site", {
            projectId,
            pageType: "home",
          });
  
          if (data.projectInfo && data.projectInfo.serviceType) {
            setProjectCategory(data.projectInfo.serviceType);
            setWelcomeLine(data.projectInfo.welcomeLine);
            setPhoneNumber(data.aboutUs.phone);
          setUpcomingPage(data.upcomingPage);

              setLocations(data.locations);
         
           
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [projectId]);

    console.log(locations,"--=locaitns=---")


  const areas = [
    { name: 'Downtown Los Angeles', responseTime: '15-30 min', services: 25 },
    { name: 'Hollywood', responseTime: '20-35 min', services: 18 },
    { name: 'Beverly Hills', responseTime: '25-40 min', services: 22 },
    { name: 'Santa Monica', responseTime: '30-45 min', services: 20 },
    { name: 'Pasadena', responseTime: '35-50 min', services: 15 },
    { name: 'West Hollywood', responseTime: '20-35 min', services: 17 }
  ];

  return (
    <section className="py-20 bg-gray-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            Areas We Serve
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional {projectCategory} services throughout Our availability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((area, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3 mr-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{area.name}</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 text-green-500 mr-3" />
                  <span>Response time: Extreme</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Shield className="w-5 h-5 text-emerald-500 mr-3" />
                  <span>100% Original services</span>
                </div>
              </div>
              
              <button className="mt-6 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300">
                See Areas
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CleaningServiceAreas;
