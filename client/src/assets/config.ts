export default {
  apiHost:
    process.env.NODE_ENV == "development"
      ? "http://localhost:5000/"
      : window.location.href,
};
