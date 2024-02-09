import React, { useEffect, useState } from "react";
import { useAuth } from "../../../ContextApi/ContextApi";
import axios from "axios";
import { useFormik } from "formik";
import { AddHeadingSchema } from "../schemas/HeadingAddSchema";
import { environmentVariables } from "../../../config/config";

const GiftCard = () => {
  const [resHeadingData, setResHeadingData] = useState([]);
  const [updatedstate, setUpdatedstate] = useState(false);

  const { authData } = useAuth();
  console.log(authData?.token);

  const initialValues = {
    heading: "",
    type: "",
  };

  let formik = useFormik({
    initialValues,
    validationSchema: AddHeadingSchema,
    onSubmit: async (values, action) => {
      let data = {
        heading: values?.heading,
        type: values?.type,
      };

      let config = {
        method: "post",
        url: `${environmentVariables.apiUrl}/admin/addgiftcard_topupheading`,
        headers: {
          _token: authData?.token,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setUpdatedstate(!updatedstate);
        })
        .catch((error) => {
          console.log(error);
        });
      action.resetForm();
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;

  const getHeading = () => {
    let config = {
      method: "get",
      url: `${environmentVariables.apiUrl}/admin/getgiftcardheading`,
      headers: {
        _token: authData?.token,
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setResHeadingData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getHeading();
  }, [updatedstate]);

  return (
    <div>
      <div>Heading</div>
      <div>
        {resHeadingData?.map((item, index) => {
          return (
            <div key={index}>
              <div>{item?.heading}</div>
              <div>{item?.type}</div>
            </div>
          );
        })}
      </div>
      <div>
        <input
          type="text"
          placeholder="Add Heading"
          value={values.heading}
          name="heading"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.heading && touched.heading ? (
          <div style={{ color: "red" }}>{errors.heading}</div>
        ) : null}
        <input
          type="text"
          placeholder="Type"
          value={values.type}
          name="type"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.type && touched.type ? (
          <div style={{ color: "red" }}>{errors.type}</div>
        ) : null}
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default GiftCard;
