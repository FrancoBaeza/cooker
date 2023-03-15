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