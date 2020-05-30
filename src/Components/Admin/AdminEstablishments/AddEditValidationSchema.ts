import * as Yup from "yup";

const schema = Yup.object({
    name: Yup.string().required("Name is required.").min(3, "The name must be at least 3 characters."),
    email: Yup.string().required("Email is required.").email("Invalid email address."),
    imageUrl: Yup.string().required("Image url is required").url("Invalid image url."),
    price: Yup.number().required("Price is required.").min(1, "Minimum price 1$ is required"),
    maxGuests: Yup.number().required("Number of max guests is required.").min(1, "Minimum 1 max guests is required"),
    googleLat: Yup.number()
        .required("Latitude is required")
        .min(-90, "The latitude must me minimum -90")
        .max(90, "The latitude can not be above 90"),
    googleLong: Yup.number()
        .required("Longitude is required")
        .min(-180, "The longitude must me minimum -180")
        .max(180, "The latitude can not be above 180"),
    description: Yup.string()
        .required("Description is required.")
        .min(10, "The description must be at least 10 characters.")
});

export default schema;
