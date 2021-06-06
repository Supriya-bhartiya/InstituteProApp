export const GET_INDIAN_DISTRICTS = 'GET_INDIAN_DISTRICTS';
export const GET_DISTRICTS = 'GET_DISTRICTS';

export const initialState = {
  indianDistricts: [],
  districts: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_INDIAN_DISTRICTS: {
      return {
        ...state,
        indianDistricts: action.data,
      };
    }
    case GET_DISTRICTS: {
      return {
        ...state,
        districts: action.data,
      };
    }
    default:
      return state;
  }
};

export default reducer;
