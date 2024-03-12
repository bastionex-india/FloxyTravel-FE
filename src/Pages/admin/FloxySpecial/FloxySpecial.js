import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useAuth } from "../../../ContextApi/ContextApi";
import axios from "axios";
import { useFormik } from "formik";
import { AddFloxySpecialSchema } from "../schemas/AddFloxySpecialSchema";
import { toast } from "react-toastify";

const FloxySpecial = () => {
  let fileInputRef = useRef(null);
  const [resData, setResData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const { authData } = useAuth();
  console.log(authData?.token);

  const getFloxySpecialData = () => {
    let config = {
      method: "get",
      url: `http://localhost:4000/admin/getfloxyspecialdata`,
      headers: {
        _token: authData?.token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setResData(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
        setResData([]);
      });
  };
  useEffect(() => {
    getFloxySpecialData();
  }, []);

  const initialValues = {
    title: "",
    description: "",
    slug: "",
    image: "",
  };

  let formik = useFormik({
    initialValues: initialValues,
    validationSchema: AddFloxySpecialSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("111")
      const formdata = new FormData();
      formdata.append("image", values?.image);
      formdata.append("title", values?.title);
      formdata.append("description", values?.description);
      formdata.append("slug", values?.slug);

      let config = {
        method: "post",
        url: `http://localhost:4000/admin/addfloxyspecialcontent`,
        headers: { _token: authData.token },
        data: formdata,
      };
      axios
        .request(config)
        .then((response) => {
          toast.success("Data Added Successfully");
          getFloxySpecialData();
          setShow(false)
          resetForm({});
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || error?.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    },
  });

  const { values, errors, handleSubmit } = formik;
  return (
    <div>
      <button onClick={() => setShow(true)}>Add</button>
      <div>
        {resData?.map((item, index) => {
          return (
            <div key={index}>
              <div>{item?.title}</div>
              <div>{item?.description}</div>
              <img
                src={`https://bastionex-travels.b-cdn.net/uploads/floxyspecialimages/${item?.image}`}
              />
            </div>
          );
        })}
      </div>

      <Modal show={show} onHide={handleClose} style={{ marginTop: "100px" }}>
        <Modal.Header closeButton>
          <Modal.Title>Add Update Floxy Special</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={values?.title}
                type="text"
                placeholder="Title"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title ? (
                <div style={{ color: "red" }}>{formik.errors.title}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={values?.description}
                type="text"
                placeholder="Description"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description ? (
                <div style={{ color: "red" }}>{formik.errors.description}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                value={values?.slug}
                type="text"
                placeholder="Slug"
                name="slug"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.slug && formik.errors.slug ? (
                <div style={{ color: "red" }}>{formik.errors.slug}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicImage">
              <Form.Label>Choose Image</Form.Label>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                }}
                onBlur={formik.handleBlur}
                ref={fileInputRef}
              />

              {formik.touched.image && formik.errors.image && (
                <div style={{ color: "red" }}>{formik.errors.image}</div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FloxySpecial;
