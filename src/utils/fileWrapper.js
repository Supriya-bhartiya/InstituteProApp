export const fileToBase64 = file => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onload = function() {
      resolve(reader.result);
    };
    reader.onerror = function(error) {
      reject(error);
    };
  });
};

export const base64ToFile = (url, filename) => {
  return fetch(url)
    .then(res => res.blob())
    .then(blob => {
      return new File([blob], filename);
    })
    .catch(err => {
      console.log(err);
    });
};

export const isBase64 = str => {
  return str.match(
    /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/
  );
};

export const getFileUrl = image => {
  if (image.includes('base64')) {
    return image;
  } else {
    return process.env.REACT_APP_FILE_SERVER + image;
  }
};
