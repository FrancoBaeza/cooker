import { NextApiRequest, NextApiResponse } from "next";

const catchAsync = (fn: Function) => (req: NextApiRequest, res: NextApiResponse) => {
  fn(req, res).catch((err: any) => {


    console.log('Estoy en el catck async --------------------')
    console.log(err)

    if(err.appError){

      //handle error when provoked by appError
      res.status(err.statusCode).json({ status: err.status, message: err.message });

    } else {

      const message = err.errors.description.message;
      const path = err.errors.description.properties.path;

      res.status(400).json({ status: 'error', message, path });
    }
  });
};

export default catchAsync;