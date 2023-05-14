import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import app_config from "../../config";

const ManageProduct = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = app_config.backend_url;

  const fetchProductData = async () => {
    setLoading(true);
    const response = await fetch(url + "/merch/getall");
    const data = await response.json();
    console.log(data);
    setProductList(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const deleteProduct = async (id) => {
	const response = await fetch(url + "/merch/delete/" + id, {
		method: "DELETE",
	});
	console.log(response.status);
	toast.success("Product deleted successfully");
	await fetchProductData();
	  };


  const showProducts = () => {
    if (!loading)
      return (
        <table className="table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Status</th>
              <th>Position</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
				productList.map(product => (
					<tr key={product._id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={url+"/"+product.image}
                    alt=""
                    style={{ width: 45, height: 45 }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{product.title}</p>
                    <p className="text-muted mb-0">{product.category}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">Software engineer</p>
                <p className="text-muted mb-0">IT department</p>
              </td>
              <td>
                <span className="badge badge-success rounded-pill d-inline">
                  Active
                </span>
              </td>
              <td>Senior</td>
              <td>
                <button
                  type="button"
                  className="btn btn-link btn-sm btn-rounded"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
				  onClick={() => deleteProduct(product._id)}
                  className="btn btn-danger btn-sm btn-rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
				))
			}
            
          </tbody>
        </table>
      );
	  else return <h1>Loading</h1>
  };

  return (
    <div>
      <div className="container">
		<h2>Manage Merchandise Data</h2>
		<hr className="mb-3" />
		{showProducts()}
	  </div>
    </div>
  );
};

export default ManageProduct;
