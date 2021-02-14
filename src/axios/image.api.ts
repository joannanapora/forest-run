
import axios from "axios";


export const postImage = (
    image: File
): Promise<any> => {
    const config = {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    };

    console.log(config)

    const formData = new FormData();
    formData.append("file", image);

    return axios.post(
        "https://forest-back.herokuapp.com/images/upload",
        formData,
        config
    );
};