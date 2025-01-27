export const lengthValidate = (value) => {
  if(value.trim().length > 0 ){
    return true;
  }else{
    return false;
  }
}