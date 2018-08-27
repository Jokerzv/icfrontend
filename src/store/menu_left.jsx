const initialState = [
  {
    email:'0',
    pass: 'false'
  }
];

export default function menu_left(state=initialState, action){
  if (action.type === "SING_UP"){
    return [...state, action.payload];
  }else if(action.type === "OK"){
    console.log("re");
    return state;
  }
  return state;
}
