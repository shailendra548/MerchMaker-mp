import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import app_config from "../../config";

const AddProduct = () => {
  const url = app_config.backend_url;
  const [selImage, setSelImage] = useState("");

  const productForm = useFormik({
    initialValues: {
      title: "",
      price: 0,
      image: "",
      category: "",
      createdAt: new Date(),
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      values.image = selImage;
      console.log(values);
      const response = await fetch(url + "/merch/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log(response.status);
      if (response.status === 200) {
        toast.success("Product added successfully");
        resetForm();
      }
      setSubmitting(false);
    },
    // validationSchema: {},
  });

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("myfile", file);
    fetch(url + "/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("file uploaded");
        setSelImage(file.name);
      }
    });
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#8fc4b7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-10 col-xl-8">
            <div className="card rounded-3">
              <div
                style={{
                  backgroundImage: `url("/merch.jpg")`,
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  height: 250,
                  borderTopLeftRadius: ".3rem",
                  borderTopRightRadius: ".3rem",
                }}
              ></div>
              {/* <img
            src='/merch.jpg'
            className="w-100"
            style={{
              borderTopLeftRadius: ".3rem",
              borderTopRightRadius: ".3rem"
            }}
            alt="Sample"
          /> */}
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                  Add New Merchandise
                </h3>
                <form className="px-md-2" onSubmit={productForm.handleSubmit}>
                  <div className="form-field mb-4">
                    <label className="form-label">Product Name</label>
                    <input
                      className="form-control"
                      name="title"
                      value={productForm.title}
                      onChange={productForm.handleChange}
                    />
                  </div>
                  <div className="form-field mb-4">
                    <label className="form-label">Price</label>
                    <input
                      className="form-control"
                      name="price"
                      value={productForm.price}
                      onChange={productForm.handleChange}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-field">
                        <label className="form-label">Image</label>
                        <input
                          className="form-control"
                          type="file"
                          onChange={uploadImage}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-field">
                        <label className="form-label">Category</label>
                        <input
                          className="form-control"
                          name="category"
                          value={productForm.category}
                          onChange={productForm.handleChange}
                            list="category"
                        />
                        <datalist id="category">
                            <option value="clothing">Clothing</option>
                            <option value="accessories">Accessories</option>
                            <option value="other">Other</option>

                        </datalist>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-success btn-lg mb-1">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
