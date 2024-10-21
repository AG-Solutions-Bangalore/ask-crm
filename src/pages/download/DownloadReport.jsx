import React from 'react'
import Layout from '../../layout/Layout'
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import BASE_URL from '../../base/BaseUrl';
import { Button, Card, CardBody } from '@material-tailwind/react';
import { FiDownload } from 'react-icons/fi';
const DownloadReport = () => {
    const downloadReport = async (url, fileName) => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.post(
            url,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              responseType: "blob",
            }
          );
    
          const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
    
          console.log(`${fileName} downloaded successfully.`);
          // toast.success("Member data Download");
        } catch (err) {
          console.error(`Error downloading ${fileName}:`, err);
          toast.error("Err on Downloading");
        }
      };
    
      const downloadMemberData = (e) => {
        e.preventDefault();
        downloadReport(`${BASE_URL}/api/download-summary-report`, "summary.csv");
        toast.success("Download Summary");
      };
    
      const downloadMobileUserData = (e) => {
        e.preventDefault();
        downloadReport(
          `${BASE_URL}/api/download-full-report`,
          "full.csv"
        );
        toast.success("Download Full Success");
      };
  return (
<Layout>
<Toaster
        toastOptions={{
          success: {
            style: {
              background: "white",
              marginTop: "48px",
              padding: "12px",
            },
          },
          error: {
            style: {
              background: "red",
              marginTop: "48px",
              padding: "12px",
            },
          },
        }}
        position="top-right"
        reverseOrder={false}
      />

      {/* <div className="container mx-auto mt-10 px-4">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-8 rounded-lg shadow-xl text-white">
          <h3 className="text-3xl font-extrabold mb-6 text-center">
            Download Data
          </h3>
          <hr className="mb-8 border-indigo-300" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button
              className="w-full bg-white text-indigo-700 font-semibold py-4 rounded-xl hover:bg-gray-100 transition transform hover:-translate-y-1 hover:shadow-lg"
              onClick={downloadMemberData}
            >
              Download Summary
            </button>
            <button
              className="w-full bg-white text-indigo-700 font-semibold py-4 rounded-xl hover:bg-gray-100 transition transform hover:-translate-y-1 hover:shadow-lg"
              onClick={downloadMobileUserData}
            >
               Download Full
            </button>
          </div>
        </div>
      </div> */}
      <div className="w-full p-4">
      <Card>
        <CardBody>
          <form id="addIndiv" autoComplete="off">
            <div className="w-full">
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold">Downloads</h3>
              </div>
              <hr className="my-2" />
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap justify-between">
                <div className="w-full lg:w-1/3 md:w-1/2 sm:w-1/2 p-2">
                  <Button
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
                    onClick={downloadMemberData}
                  >
                    <FiDownload className="mr-2" />
                    Download Summary
                  </Button>
                </div>
                <div className="w-full lg:w-1/3 md:w-1/2 sm:w-1/2 p-2">
                  <Button
                    className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
                    onClick={downloadMobileUserData}
                  >
                    <FiDownload className="mr-2" />
                    Download Full
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
</Layout>
  )
}

export default DownloadReport