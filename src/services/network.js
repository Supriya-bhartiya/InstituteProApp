import history from './history';
const baseUrl =
  process.env.REACT_APP_SERVER_URL + process.env.REACT_APP_BACKEND_ROUTE;

export async function putData(url = '', data = {}, outsideToken) {
  try {
    // Default options are marked with *
    const token = 'test'
    const response = await fetch(baseUrl + url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        token: outsideToken || token,
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  } catch (e) {
    console.log(e);
  }
}

export async function postData(url = '', data = {}) {
  try {
    // Default options are marked with *
    const token = 'test'
    const response = await fetch(baseUrl + url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        token,
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  } catch (e) {
    console.log(e);
  }
}

export async function getData(url = '', query = {}, id) {
  try {
    // const token = store.getState().registration.token;
    const token = 'test'
    let queryUrl = '';
    if (query) {
      queryUrl =
        '?' +
        Object.entries(query)
          .map(
            ([key, val]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
          )
          .join('&');
    } else if (id) {
      queryUrl = '/' + id;
    }

    // Default options are marked with *
    let response = await fetch(baseUrl + url + queryUrl, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client,
    });

    response = await response.json(); // parses JSON response into native JavaScript objects

    if (response && response.status === 200) {
      return response;
    } else if (
      response &&
      (response.message === 'SESSION_EXPIRED' ||
        response.message === 'NOT_AUTHENTICATED')
    ) {
      setTimeout(() => {
        history.push('/');
      }, 200);
    } else {
      console.log('Error in response', response);
    }
  } catch (e) {
    console.log(e);
  }
}
