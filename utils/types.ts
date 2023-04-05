// Interface to defining our object of response functions
export interface ResponseFuncs {
	GET?: Function;
	POST?: Function;
	PUT?: Function;
	DELETE?: Function;
}

export interface Ingredient {
	_id: string;
	name: string;
	description: string;
}

export interface User {
	_id: string;
	name: string;
	email: string;
	fridge: Recipe[]
}

export interface Recipe {
	_id: string;
	name: string;
	description: string;
	ingredients: Ingredient[];
	difficulty: string;
	duration: number;
}
