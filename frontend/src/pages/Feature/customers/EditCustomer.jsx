/* eslint-disable react/no-unknown-property */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PreviewImg } from "../../../common/imagepath";
import { updatecustomerApi, viewCustomerApi } from "../../../constans/apiname";
import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { ApiServiceContext, successToast } from "../../../core/core-index";
import { schema } from "../../../common/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select } from "antd";

const EditCustomer = () => {
  const {
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { getData, putData } = useContext(ApiServiceContext);
  const [fileImage, setFileImage] = useState([]);
  const [customerListData, setCustomerEditlist] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [membershipType, setMembershipType] = useState("");
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const MembershipTypeData = [
    { label: "Member", value: "Member" },
    { label: "Non-Member", value: "Non-Member" },
  ];

  const { getRootProps } = useDropzone({
    maxLength: 4,
    onDrop: (acceptedFile) => {
      setFileImage(acceptedFile);
      getBase64(acceptedFile?.[0]).then((result) => {
        acceptedFile["base64"] = result;
        setPreviewImage(acceptedFile.base64);
      });
    },
  });

  const navigate = useNavigate();
  let { id } = useParams();
  let _id = id;

  useEffect(() => {
    getCustomerDetails();
  }, [id]);

  const getCustomerDetails = async () => {
    const url = `${viewCustomerApi}/${id}`;
    try {
      const response = await getData(url);
      if (response?.data) {
        setNewValues(response?.data);
        setCustomerEditlist(response?.data);
      }
    } catch {
      return false;
    }
  };

  const onSubmit = async (data) => {
    const image = fileImage?.[0];

    const formData = new FormData();
    formData.append("image", file ? file : "remove");

    const flattenObject = (obj, prefix = "") => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const propKey = prefix ? `${prefix}[${key}]` : key;
          const value = obj[key];

          if (typeof value === "object" && value !== null) {
            flattenObject(value, propKey);
          } else {
            formData.append(propKey, value);
          }
        }
      }
    };

    formData.append("_id", _id);
    flattenObject(data);
    formData.append("membership_type", membershipType); // Added membership type
    const url = `${updatecustomerApi}/${_id}`;
    try {
      const response = await putData(url, formData);
      if (response) {
        successToast("Customer Updated Successfully");
        navigate("/customers");
      }
    } catch {
      return false;
    }
  };

  const setNewValues = (data) => {
    setValue("name", data?.name);
    setValue("email", data?.email || "");
    setValue("phone", data?.phone);
    setValue("villaNumber", data?.villaNumber); // Latching villa number correctly
    setValue("membership_type", data?.membership_type); // Latching membership type
    setMembershipType(data?.membership_type); // Setting membership type in state
    setImageSrc(customerListData?.image);
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataURL = reader.result;
        setImageSrc(imageDataURL);
        setFile(file);
      };
      reader.readAsDataURL(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  };

  const handleRemoveImage = () => {
    customerListData.image = "";
    setFile(null);
    setImageSrc(null);
  };

  const defaultImageSrc = PreviewImg;
  const handleImageError = (event) => {
    return PreviewImg;
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="content-page-header">
              <h5>Edit Customers</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                <div className="card-body">
                  <div className="form-group-item">
                    <h5 className="form-title">Basic Details</h5>
                    <div className="profile-picture">
                      <div
                        className="upload-profile"
                        {...getRootProps({
                          className: "dropzone dz-clickable",
                        })}
                      >
                        <div className="profile-img add-customers">
                          {imageSrc ? (
                            <img
                              id="blah"
                              className="avatar"
                              onError={(e) => handleImageError(e)}
                              src={imageSrc ? imageSrc : defaultImageSrc}
                              alt="Uploaded"
                            />
                          ) : (
                            <img
                              id="blah"
                              className="avatar"
                              onError={(e) => handleImageError(e)}
                              src={
                                customerListData.image
                                  ? customerListData.image
                                  : defaultImageSrc
                              }
                              alt="Default"
                            />
                          )}
                        </div>
                        <div className="add-profile">
                          <h5>Upload a New Photo</h5>
                        </div>
                      </div>
                      <div className="img-upload">
                        <label className="btn btn-primary">
                          Upload{" "}
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                          />
                        </label>
                        <Link
                          className="btn btn-remove"
                          onClick={handleRemoveImage}
                        >
                          Remove
                        </Link>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>
                            Name<span className="text-danger"> *</span>
                          </label>
                          <Controller
                            name="name"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <>
                                <input
                                  className="form-control"
                                  value={value}
                                  type="text"
                                  maxLength={20}
                                  placeholder="Enter Name"
                                  onChange={(val) => {
                                    onChange(val);
                                    trigger("name");
                                  }}
                                />
                                {errors.name && (
                                  <p className="text-danger">
                                    {errors.name.message}
                                  </p>
                                )}
                              </>
                            )}
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Email
                            {/* <span className="text-danger"> *</span> */}
                          </label>
                          <Controller
                            name="email"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <>
                                <input
                                  className="form-control"
                                  value={value}
                                  type="email"
                                  placeholder="Enter Email Address"
                                  onChange={(val) => {
                                    onChange(val);
                                    trigger("email");
                                  }}
                                />
                                {errors.email && (
                                  <p className="text-danger">
                                    {errors.email.message}
                                  </p>
                                )}
                              </>
                            )}
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>
                            Phone Number<span className="text-danger"> *</span>
                          </label>
                          <Controller
                            name="phone"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <>
                                <input
                                  className="form-control"
                                  value={value}
                                  type="tel"
                                  placeholder="Enter Phone Number"
                                  onChange={(val) => {
                                    onChange(val);
                                    trigger("phone");
                                  }}
                                />
                                {errors.phone && (
                                  <p className="text-danger">
                                    {errors.phone.message}
                                  </p>
                                )}
                              </>
                            )}
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>
                            Villa/Flat Number<span className="text-danger"> *</span>
                          </label>
                          <Controller
                            name="villaNumber"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <>
                                <input
                                  className="form-control"
                                  value={value}
                                  type="text"
                                  placeholder="Enter Villa/Flat Number"
                                  onChange={(val) => {
                                    onChange(val);
                                    trigger("villaNumber");
                                  }}
                                />
                                {errors.villaNumber && (
                                  <p className="text-danger">
                                    {errors.villaNumber.message}
                                  </p>
                                )}
                              </>
                            )}
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-group input_text">
                          <label>
                            Membership Type<span className="text-danger"> *</span>
                          </label>
                          <Controller
                            name="membership_type"
                            control={control}
                            render={({ field: { onChange } }) => (
                              <>
                                <Select
                                  placeholder="Select Membership Type"
                                  className={`form-control react-selectcomponent w-100`}
                                  options={MembershipTypeData}
                                  value={membershipType}
                                  onChange={(val) => {
                                    setMembershipType(val);
                                    onChange(val);
                                  }}
                                />
                                {errors.membership_type && (
                                  <p className="text-danger">
                                    {errors.membership_type.message}
                                  </p>
                                )}
                              </>
                            )}
                            defaultValue=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="add-customer-btns text-end">
                    <Link
                      type="button"
                      to="/customers"
                      className="btn btn-primary cancel me-2"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </Link>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCustomer;
