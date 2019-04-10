import * as Yup from "yup";

export function getUserProfileValidationSchema() {
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Please enter your full name.")
      .matches(/^[A-Za-z.\s_-]+$/, `You can't use numbers.`),
    email: Yup.string()
      .email("Please enter valid email address.")
      .trim()
      .required("Please enter valid email address."),
    address: Yup.string().required("Please enter your address."),
    phoneNumber: Yup.string()
      .trim()
      .required("Please enter your phone number.")
      .matches(
        /^([0][1-9]\d{9}$|^[1-9]\d{9})$|([0-9]{3}[-][0-9]{3}[-][0-9]{4})$/,
        `Please enter phone number in format : XXX-XXX-XXXX`
      )
  });
}

export function createNewBlogSchema() {
  return Yup.object().shape({
    title: Yup.string()
      .trim()
      .required("Please enter title of your post."),
    description: Yup.string()
      .trim()
      .required("Please enter description of your post.")
  });
}

export function createNewCommenSchema() {
  return Yup.object().shape({
    newComment: Yup.string()
      .trim()
      .required("Please enter description of your post.")
  });
}
