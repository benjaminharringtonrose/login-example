import { EMPLOYEE_UPDATE } from './types';

/*
I can update any prop and value I pass in.
This way I don't have to create multiple action creators.
So we have one action creator that can update 
any action inside our form.
*/
export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value },
  };
};
