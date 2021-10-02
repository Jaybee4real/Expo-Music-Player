const handleError = err => {
  let message = '';
  let status;
  let data = '';
  if (err.response) {
    // error from API
    console.log('API Error', err.response.data);

    status = err.response.status;
    message = err.response.data.detail || err.response.data.error;
    data = err.response.data.error || err.response.data;
  }

  if (err.request && !err.response) {
    // a network error
    console.log('Network Error', err.request, message);
    if (err.request._response.indexOf('internet') !== -1) {
      message = err.request._response;
    }
  }

  if (status === 503) {
    message = 'Service Temporarily Unavailable';
  }
  message = message || 'Something went wrong. Please try again';

  return {
    error: {
      message,
      status,
      data,
    },
  };
};

export default handleError;
