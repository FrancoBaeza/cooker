import { NextApiRequest, NextApiResponse } from "next";

const catchAsync = (fn: Function) => (req: NextApiRequest, res: NextApiResponse) => {
  fn(req, res).catch((err: any) => {


    console.log('Estoy en el catck async -------------------- (err):')

    if(err.appError){

      //handle error when provoked by appError
      res.status(err.statusCode).json({ status: err.status, message: err.message });

    } else {
      const errors: object[] = [];
      for(let key in err.errors){
        errors.push({ [key]: err.errors[key].message });
      }
      console.log('Devolviendo errores')
      res.status(400).json({ status: 'error', errors });
    }
  });
};

export default catchAsync;