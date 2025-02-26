import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/",
  header: { "ngrok-skip-browser-warning": "true" },
});
