import { useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { AiOutlineClockCircle } from "react-icons/ai";
import {
  MdOutlineSchool,
  MdOutlineHealthAndSafety,
  MdOutlineDirectionsBus,
  MdOutlineStore,
} from "react-icons/md";
import { RiShoppingBag4Line } from "react-icons/ri";
import { CgGym } from "react-icons/cg";
import style from "./PropertyDetail.module.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PropertyDetail = () => {
  const propertyDetailRef = useRef(null);

  const generatePdf = () => {
    const input = propertyDetailRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "px", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("property-details.pdf");
    });
  };

  return (
    <>
      <div className="container-fluid pt-5" ref={propertyDetailRef}>
        <div className="container">
          <div className="row ">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <FiArrowLeft className="mb-2" />
                <h4 className="ms-2">Property Details</h4>
              </div>
              <span className={style.propertyDetailSell}>Sell</span>
              <span className={`text-muted mb-4 ${style.propertyDetailID}`}>
                Property ID: PCA151
              </span>
              <h4 className="mt-3">3BHK, Flat 111, Sector 74, Noida</h4>
              <p className={style.propertyDetailAddress}>
                <GoLocation className="mb-1 me-2" />
                Border st. nicholasville, ky
                <span className="ms-3">
                  <AiOutlineClockCircle className="mb-1 " /> 10 Days Ago
                </span>
              </p>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-end align-items-center mb-5">
                <button
                  type="button"
                  className={`btn  me-2 ${style.propertyDetailEditBtn}`}
                >
                  Edit
                </button>
                <button type="button" className="btn btn-outline-secondary">
                  Delete
                </button>
              </div>
              <div className="d-flex justify-content-end align-items-center ">
                <div className="me-5">
                  <h6 className={style.propertyDetailPropertyTitle}>
                    Sell Price
                  </h6>
                  <p className={style.propertyDetailProperty}>3.5 CR</p>
                </div>
                <div className="me-4">
                  <h6 className={style.propertyDetailPropertyTitle}>Sqft</h6>
                  <p className={style.propertyDetailProperty}>6,500</p>
                </div>
                <button
                  type="button"
                  className={`btn ${style.propertyDetailGenerateBtn}`}
                  onClick={generatePdf}
                >
                  Generate Brochure
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-3">
          <div id="carouselExampleControls" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row">
                  <div className="col-md-6">
                    <img
                      src="../public/img/property.png"
                      className={`d-block ${style.propertyDetailMainImg}`}
                      alt="..."
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="container-fluid">
                      <div className="row row-cols-2">
                        <div className="col">
                          <img
                            src="../public/img/property.png"
                            className={style.propertyDetailImg}
                            alt="..."
                          />
                        </div>
                        <div className="col">
                          <img
                            src="../public/img/property.png"
                            className={style.propertyDetailImg}
                            alt="..."
                          />
                        </div>

                        <div className="col">
                          <img
                            src="../public/img/property.png"
                            className={style.propertyDetailImg}
                            alt="..."
                          />
                        </div>
                        <div className="col">
                          <img
                            src="../public/img/property.png"
                            className={style.propertyDetailImg}
                            alt="..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="./images/property-2.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="./images/property-3.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-7">
              <div className="card mb-3">
                <h5 className="card-header">Property Details</h5>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <p className={`mb-2 ${style.propertyDetailtitles}`}>
                        Year Built
                      </p>
                      <p className={style.propertyDetailContent}>2019-01-09</p>
                    </div>
                    <div className="col-md-3">
                      <p className={style.propertyDetailtitles}>
                        Property Size
                      </p>
                      <p className={style.propertyDetailContent}>1466 Sq Ft</p>
                    </div>
                    <div className="col-md-3">
                      <p className={style.propertyDetailtitles}>Stage</p>
                      <p className={style.propertyDetailContent}>Advance</p>
                    </div>
                    <div className="col-md-3">
                      <p className={style.propertyDetailtitles}>Title check</p>
                      <p className={style.propertyDetailContent}>Clear</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-3">
                      <p className={style.propertyDetailtitles}>
                        Property Type
                      </p>
                      <p className={style.propertyDetailContent}>
                        Full Family Home
                      </p>
                    </div>
                    <div className="col-md-3">
                      <p className={style.propertyDetailtitles}>Bedrooms</p>
                      <p className={style.propertyDetailContent}>04</p>
                    </div>
                    <div className="col-md-3">
                      <p className={style.propertyDetailtitles}>Bathrooms</p>
                      <p className={style.propertyDetailContent}>02</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <h5 className="card-header">Utility Details</h5>
                <div className="card-body">
                  <div className="row mt-2">
                    <div className="col-md-3">
                      <ul className="list">
                        <li className={style.utilityDetailsContent}>
                          TV Cable
                        </li>
                        <li className={style.utilityDetailsContent}>
                          Window Coverings
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-3">
                      <ul className="list">
                        <li className={style.utilityDetailsContent}>
                          Air Conditioning
                        </li>
                        <li className={style.utilityDetailsContent}>
                          Refrigerator
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-3">
                      <ul className="list">
                        <li className={style.utilityDetailsContent}>Washer</li>
                      </ul>
                    </div>
                    <div className="col-md-3">
                      <ul className="list">
                        <li>WiFi</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <h5 className="card-header">Address Details</h5>
                <div className="card-body">
                  <div className="row mt-2">
                    <div className="col-md-4">
                      <p className={style.propertyDetailtitles}>Address</p>
                      <p className={style.propertyDetailContent}>
                        Virginia drive temple hills
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p className={style.propertyDetailtitles}>City</p>
                      <p className={style.propertyDetailContent}>
                        San francisco
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p className={style.propertyDetailtitles}>State</p>
                      <p className={style.propertyDetailContent}>
                        San francisco
                      </p>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-4">
                      <p className={style.propertyDetailtitles}>Zip</p>
                      <p className={style.propertyDetailContent}>4848494</p>
                    </div>
                    <div className="col-md-4">
                      <p className={style.propertyDetailtitles}>Area</p>
                      <p className={style.propertyDetailContent}>Embarcadero</p>
                    </div>
                    <div className="col-md-4">
                      <p className={style.propertyDetailtitles}>Country</p>
                      <p className={style.propertyDetailContent}>
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <h5 className="card-header">What’s Nearby</h5>
                <div className="card-body">
                  <div className="row mt-2">
                    <div className="col-md-3">
                      <ul className="list-unstyled">
                        <li className={style.utilityDetailsContent}>
                          <MdOutlineSchool
                            className={style.propertyDetailNearbyIcons}
                          />
                          School & College
                        </li>
                        <li className={style.utilityDetailsContent}>
                          <CgGym className={style.propertyDetailNearbyIcons} />
                          Gym
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-3">
                      <ul className="list-unstyled">
                        <li className={style.utilityDetailsContent}>
                          <MdOutlineHealthAndSafety
                            className={style.propertyDetailNearbyIcons}
                          />
                          Health & Medical
                        </li>
                        <li className={style.utilityDetailsContent}>
                          <RiShoppingBag4Line
                            className={style.propertyDetailNearbyIcons}
                          />
                          Shopping Mall
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-3">
                      <ul className="list-unstyled">
                        <li className={style.utilityDetailsContent}>
                          <MdOutlineDirectionsBus
                            className={style.propertyDetailNearbyIcons}
                          />
                          Transportation
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-3">
                      <ul className="list-unstyled">
                        <li>
                          <MdOutlineStore
                            className={style.propertyDetailNearbyIcons}
                          />
                          Market
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <div className="card">
                <h5 className="card-header">Description</h5>
                <div className="card-body">
                  <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris in nisl eget nisi gravida elementum ac at risus. Sed
                    egestas gravida mi eget interdum. Phasellus urna nisi,
                    volutpat vel dignissim quis, commodo et nibh. Nam nunc
                    dolor, volutpat eu diam ut, varius hendrerit lorem. Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Mauris in
                    nisl eget nisi gravida elementum ac at risus. Sed egestas
                    gravida mi eget interdum.
                    <br />
                    Mauris in nisl eget nisi gravida elementum ac at risus. Sed
                    egestas gravida mi eget interdum. Phasellus urna nisi,
                    volutpat vel dignissim quis, commodo et nibh.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetail;
