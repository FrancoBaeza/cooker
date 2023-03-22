import { NextApiRequest, NextApiResponse } from "next";

import { connect } from '@/utils/connection'
import { ResponseFuncs } from "@/utils/types";
import { withSessionRoute } from "@/utils/withSession";
import { getAllRecipes, createRecipe } from '@/backend/controllers/RecipieController'

const routeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    // 1) Capture the method
	const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

    const handleCase: ResponseFuncs = {
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
			await connect(); // connect to database
			return await createRecipe(req, res);
		},
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
			await connect(); // connect to database
			return await getAllRecipes(req, res);
		},
    };

    // Check if there is a response for the particular method, if so invoke it, if not response with an error
	const response = handleCase[method];
	if (response) response(req, res);
	else res.status(400).json({ error: "No Response for This Request" });

}

export default withSessionRoute(routeHandler);