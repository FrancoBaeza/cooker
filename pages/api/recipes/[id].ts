import { NextApiRequest, NextApiResponse } from "next";

import { connect } from '@/utils/connection'
import { ResponseFuncs } from "@/utils/types";
import { withSessionRoute } from "@/utils/withSession";
import { updateRecipe, deleteRecipe } from '@/backend/controllers/RecipeController'

const routeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    // 1) Capture the method
	const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

    const handleCase: ResponseFuncs = {
        PUT: async (req: NextApiRequest, res: NextApiResponse) => {
			await connect(); // connect to database
			return await updateRecipe(req, res);
		},
        DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
			await connect(); // connect to database
			return await deleteRecipe(req, res);
		},
    };

    // Check if there is a response for the particular method, if so invoke it, if not response with an error
	const response = handleCase[method];
	if (response) response(req, res);
	else res.status(400).json({ error: "No Response for This Request" });

}

export default withSessionRoute(routeHandler);